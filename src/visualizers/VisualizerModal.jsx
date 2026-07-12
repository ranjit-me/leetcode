import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Play, Pause, SkipBack, SkipForward, ChevronLeft, ChevronRight, Zap, Clock, Database } from 'lucide-react';
import { getSolution } from '../data/solutions.js';
import ArrayVisualizer from './engines/ArrayVisualizer.jsx';
import TreeVisualizer from './engines/TreeVisualizer.jsx';
import GraphVisualizer from './engines/GraphVisualizer.jsx';
import DPTableVisualizer from './engines/DPTableVisualizer.jsx';
import LinkedListVisualizer from './engines/LinkedListVisualizer.jsx';
import StackQueueVisualizer from './engines/StackQueueVisualizer.jsx';
import MatrixVisualizer from './engines/MatrixVisualizer.jsx';
import BacktrackVisualizer from './engines/BacktrackVisualizer.jsx';

const SPEED_OPTIONS = [
  { label: '0.5×', ms: 2400 },
  { label: '1×', ms: 1200 },
  { label: '2×', ms: 600 },
  { label: '3×', ms: 300 },
];

function VisualizerEngine({ visualType, step, data }) {
  switch (visualType) {
    case 'array': return <ArrayVisualizer step={step} data={data} />;
    case 'tree': return <TreeVisualizer step={step} data={data} />;
    case 'graph': return <GraphVisualizer step={step} data={data} />;
    case 'dp': return <DPTableVisualizer step={step} data={data} is2D={false} />;
    case 'dp2d': return <DPTableVisualizer step={step} data={data} is2D={true} />;
    case 'linkedlist': return <LinkedListVisualizer step={step} data={data} />;
    case 'stack': return <StackQueueVisualizer step={step} data={data} />;
    case 'matrix': return <MatrixVisualizer step={step} data={data} />;
    case 'backtrack': return <BacktrackVisualizer step={step} data={data} />;
    default: return <ArrayVisualizer step={step} data={data} />;
  }
}

export default function VisualizerModal({ question, onClose }) {
  const solution = getSolution(question);
  const [approachIdx, setApproachIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(1); // default 1×
  const intervalRef = useRef(null);

  const approach = solution.approaches[approachIdx];
  const steps = approach.steps;
  const currentStep = steps[stepIdx];

  // Auto-play logic
  const stopPlay = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const startPlay = useCallback(() => {
    stopPlay();
    intervalRef.current = setInterval(() => {
      setStepIdx(prev => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, SPEED_OPTIONS[speedIdx].ms);
  }, [steps.length, speedIdx, stopPlay]);

  useEffect(() => {
    if (isPlaying) startPlay();
    else stopPlay();
    return stopPlay;
  }, [isPlaying, startPlay, stopPlay]);

  // Reset on approach change
  const switchApproach = (idx) => {
    setIsPlaying(false);
    setApproachIdx(idx);
    setStepIdx(0);
  };

  const goNext = () => {
    if (stepIdx < steps.length - 1) setStepIdx(s => s + 1);
    else { setIsPlaying(false); }
  };
  const goPrev = () => { if (stepIdx > 0) setStepIdx(s => s - 1); };
  const goFirst = () => { setStepIdx(0); setIsPlaying(false); };
  const goLast = () => { setStepIdx(steps.length - 1); setIsPlaying(false); };

  // ESC to close
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const progress = ((stepIdx + 1) / steps.length) * 100;

  return (
    <div className="viz-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="viz-modal">
        {/* ── HEADER ── */}
        <div className="viz-header">
          <div className="viz-header-left">
            <span className="viz-badge">🎬 Animated</span>
            <div>
              <h2 className="viz-title">#{question.id} — {question.title}</h2>
              <span className="viz-topic">{question.topic} · {question.difficulty}</span>
            </div>
          </div>
          <button className="viz-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* ── APPROACH TABS ── */}
        <div className="viz-approach-tabs">
          {solution.approaches.map((ap, i) => (
            <button
              key={i}
              className={`viz-tab ${i === approachIdx ? 'active' : ''}`}
              onClick={() => switchApproach(i)}
            >
              <span className="viz-tab-num">{i + 1}</span>
              {ap.name}
            </button>
          ))}
        </div>

        {/* ── COMPLEXITY BANNER ── */}
        <div className="viz-complexity">
          <div className="viz-complex-item">
            <Clock size={13} />
            <span>Time: <strong>{approach.complexity.time}</strong></span>
          </div>
          <div className="viz-complex-divider" />
          <div className="viz-complex-item">
            <Database size={13} />
            <span>Space: <strong>{approach.complexity.space}</strong></span>
          </div>
        </div>

        {/* ── MAIN BODY ── */}
        <div className="viz-body">
          {/* Animation Canvas */}
          <div className="viz-canvas-col">
            {/* Step counter + progress */}
            <div className="viz-progress-row">
              <span className="viz-step-label">
                Step <strong>{stepIdx + 1}</strong> of <strong>{steps.length}</strong>
              </span>
              <div className="viz-progress-track">
                <div className="viz-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Animation area */}
            <div className="viz-canvas">
              <VisualizerEngine
                visualType={solution.visualType}
                step={currentStep}
                data={solution.example}
              />
            </div>

            {/* Step description */}
            <div className="viz-step-desc">
              <Zap size={15} className="viz-step-icon" />
              <span>{currentStep?.desc || 'Ready'}</span>
            </div>

            {/* Controls */}
            <div className="viz-controls">
              {/* Playback */}
              <div className="viz-control-group">
                <button className="viz-btn-icon" onClick={goFirst} title="First step" disabled={stepIdx === 0}>
                  <SkipBack size={16} />
                </button>
                <button className="viz-btn-icon" onClick={goPrev} title="Previous" disabled={stepIdx === 0}>
                  <ChevronLeft size={18} />
                </button>
                <button
                  className={`viz-btn-play ${isPlaying ? 'playing' : ''}`}
                  onClick={() => setIsPlaying(p => !p)}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button className="viz-btn-icon" onClick={goNext} title="Next" disabled={stepIdx === steps.length - 1}>
                  <ChevronRight size={18} />
                </button>
                <button className="viz-btn-icon" onClick={goLast} title="Last step" disabled={stepIdx === steps.length - 1}>
                  <SkipForward size={16} />
                </button>
              </div>

              {/* Speed selector */}
              <div className="viz-speed-group">
                {SPEED_OPTIONS.map((s, i) => (
                  <button
                    key={i}
                    className={`viz-speed-btn ${i === speedIdx ? 'active' : ''}`}
                    onClick={() => { setSpeedIdx(i); if (isPlaying) { stopPlay(); startPlay(); } }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Code Panel */}
          <div className="viz-code-col">
            <div className="viz-code-header">
              <span className="viz-code-title">Pseudocode</span>
              <span className="viz-code-lang">Python</span>
            </div>
            <div className="viz-code-body">
              <pre className="viz-code-pre">
                {approach.code.split('\n').map((line, i) => {
                  // Highlight lines that relate to current step (naive: just use step index heuristic)
                  const totalLines = approach.code.split('\n').length;
                  const activeLineStart = Math.floor((stepIdx / steps.length) * totalLines);
                  const activeLineEnd = Math.floor(((stepIdx + 1) / steps.length) * totalLines);
                  const isActive = i >= activeLineStart && i < activeLineEnd;
                  return (
                    <div
                      key={i}
                      className={`viz-code-line ${isActive ? 'active' : ''}`}
                    >
                      <span className="viz-line-num">{i + 1}</span>
                      <span className="viz-line-content">{line || ' '}</span>
                    </div>
                  );
                })}
              </pre>
            </div>

            {/* Step list */}
            <div className="viz-step-list">
              <div className="viz-step-list-title">Steps</div>
              {steps.map((s, i) => (
                <button
                  key={i}
                  className={`viz-step-item ${i === stepIdx ? 'active' : ''} ${i < stepIdx ? 'done' : ''}`}
                  onClick={() => { setStepIdx(i); setIsPlaying(false); }}
                >
                  <span className="viz-step-num">{i + 1}</span>
                  <span className="viz-step-text">{s.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
