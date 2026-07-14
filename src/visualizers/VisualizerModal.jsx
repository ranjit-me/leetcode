import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Play, Pause, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
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
  { label: '1×',  ms: 1200 },
  { label: '2×',  ms: 600  },
  { label: '3×',  ms: 300  },
];

function highlightCode(code, lang) {
  if (!code) return [];
  return code.split('\n').map((line, i) => ({ raw: line, lineNum: i + 1 }));
}

function VisualizerEngine({ visualType, step, data }) {
  switch (visualType) {
    case 'array':     return <ArrayVisualizer      step={step} data={data} />;
    case 'tree':      return <TreeVisualizer        step={step} data={data} />;
    case 'graph':     return <GraphVisualizer       step={step} data={data} />;
    case 'dp':        return <DPTableVisualizer     step={step} data={data} is2D={false} />;
    case 'dp2d':      return <DPTableVisualizer     step={step} data={data} is2D={true}  />;
    case 'linkedlist':return <LinkedListVisualizer  step={step} data={data} />;
    case 'stack':     return <StackQueueVisualizer  step={step} data={data} />;
    case 'matrix':    return <MatrixVisualizer      step={step} data={data} />;
    case 'backtrack': return <BacktrackVisualizer   step={step} data={data} />;
    default:          return <ArrayVisualizer       step={step} data={data} />;
  }
}

function CodeLine({ line, isActive, lang }) {
  const tokens = tokenize(line, lang);
  return (
    <div className={`viz-code-line ${isActive ? 'active' : ''}`}>
      <span className="viz-line-num">{tokens.lineNum}</span>
      <span className="viz-line-content">
        {tokens.parts.map((part, i) => (
          <span key={i} style={{ color: part.color }}>{part.text}</span>
        ))}
      </span>
    </div>
  );
}

function tokenize(lineObj, lang) {
  const { raw, lineNum } = lineObj;
  if (!raw.trim()) return { lineNum, parts: [{ text: raw || ' ', color: 'inherit' }] };

  const commentStart = lang === 'python' ? raw.indexOf('#') : raw.indexOf('//');
  if (commentStart !== -1) {
    const before = raw.slice(0, commentStart);
    const comment = raw.slice(commentStart);
    return {
      lineNum,
      parts: [
        ...coloriseSegment(before, lang),
        { text: comment, color: '#6a9955' },
      ],
    };
  }
  return { lineNum, parts: coloriseSegment(raw, lang) };
}

function coloriseSegment(text, lang) {
  if (!text) return [];
  const keywords = lang === 'python' ? [
    'def','return','if','else','elif','for','while','in','not','and','or',
    'True','False','None','class','import','from','as','pass','break',
    'continue','lambda','yield','raise','try','except','finally','with','self',
  ] : [
    'public','private','protected','static','void','int','boolean','char',
    'long','double','float','String','return','if','else','for','while',
    'new','class','null','true','false','this','super','final','abstract',
    'Integer','Arrays','Math','List','Map','Set','Queue','Deque',
    'ArrayList','HashMap','HashSet','LinkedList','ArrayDeque','PriorityQueue',
  ];

  const parts = [];
  const wordRe = /(\w+|[^\w])/g;
  let m;
  while ((m = wordRe.exec(text)) !== null) {
    const word = m[0];
    if (keywords.includes(word)) {
      parts.push({ text: word, color: lang === 'python' ? '#c586c0' : '#569cd6' });
    } else if (/^\d+$/.test(word)) {
      parts.push({ text: word, color: '#b5cea8' });
    } else if (/^[a-z_]\w*$/.test(word) && lang === 'python') {
      parts.push({ text: word, color: '#9cdcfe' });
    } else if (/^[A-Z]/.test(word)) {
      parts.push({ text: word, color: '#4ec9b0' });
    } else {
      parts.push({ text: word, color: '#d4d4d4' });
    }
  }
  return parts;
}

export default function VisualizerModal({ question, isSolved, toggleSolved, onClose }) {
  const solution = getSolution(question);
  const [approachIdx, setApproachIdx] = useState(0);
  const [stepIdx,     setStepIdx]     = useState(0);
  const [isPlaying,   setIsPlaying]   = useState(false);
  const [speedIdx,    setSpeedIdx]    = useState(1);
  const [language,    setLanguage]    = useState('java'); 
  const [testCaseIdx, setTestCaseIdx] = useState(0);
  const [customInputText, setCustomInputText] = useState('');
  const [customCases, setCustomCases] = useState([]);
  const [copied, setCopied] = useState(false);

  const [status, setStatus] = useState(() => {
    return localStorage.getItem(`status-${question.id}`) || (isSolved ? 'Solved' : '-- Not set --');
  });

  const intervalRef = useRef(null);

  const allTestCases = [...customCases, ...solution.testCases];
  const approach    = solution.approaches[approachIdx];
  const steps       = approach.steps[testCaseIdx] || approach.steps[0] || [];
  const currentStep = steps[stepIdx];
  const activeCode  = approach[language] || approach.java || approach.python || '';

  const stopPlay = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const startPlay = useCallback(() => {
    stopPlay();
    intervalRef.current = setInterval(() => {
      setStepIdx(prev => {
        if (prev >= steps.length - 1) { setIsPlaying(false); return prev; }
        return prev + 1;
      });
    }, SPEED_OPTIONS[speedIdx].ms);
  }, [steps.length, speedIdx, stopPlay]);

  useEffect(() => {
    if (isPlaying) startPlay(); else stopPlay();
    return stopPlay;
  }, [isPlaying, startPlay, stopPlay]);

  const switchApproach = (idx) => {
    setIsPlaying(false); setApproachIdx(idx); setStepIdx(0);
  };

  const switchTestCase = (idx) => {
    setIsPlaying(false); setTestCaseIdx(idx); setStepIdx(0);
  };

  const goNext  = () => { if (stepIdx < steps.length - 1) setStepIdx(s => s + 1); else setIsPlaying(false); };
  const goPrev  = () => { if (stepIdx > 0) setStepIdx(s => s - 1); };
  const goFirst = () => { setStepIdx(0); setIsPlaying(false); };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    localStorage.setItem(`status-${question.id}`, newStatus);
    if (newStatus === 'Solved') {
      if (!isSolved) toggleSolved(question.id);
    } else {
      if (isSolved) toggleSolved(question.id);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCustom = () => {
    if (!customInputText.trim()) return;
    
    let cleanText = customInputText.trim();
    if (cleanText.startsWith('[') && cleanText.endsWith(']')) {
      cleanText = cleanText.slice(1, -1);
    }
    const parts = cleanText.split(/[\s,]+/).map(x => {
      const num = Number(x);
      return isNaN(num) ? x : num;
    });

    let data = {};
    if (solution.visualType === 'tree') {
      data = { nodes: parts };
    } else if (solution.visualType === 'graph') {
      data = { nodes: parts.map((_, i) => i), edges: parts.slice(0, -1).map((_, i) => [i, i+1]) };
    } else if (solution.visualType === 'linkedlist') {
      data = { nodes: parts };
    } else if (solution.visualType === 'stack') {
      data = { input: parts };
    } else if (solution.visualType === 'matrix') {
      data = { grid: [parts], input: parts };
    } else {
      data = { input: parts };
    }

    const customCase = {
      data,
      label: `Custom: ${parts.slice(0,3).join(',')}`
    };

    setCustomCases(prev => [customCase, ...prev]);
    setTestCaseIdx(0); 
    setStepIdx(0);
    setIsPlaying(false);
  };

  const formatTestCaseLabel = (tc) => {
    const inp = tc.data.input || tc.data.nodes || tc.data.grid || tc.data.candidates;
    if (Array.isArray(inp)) {
      return JSON.stringify(inp);
    }
    return tc.label || 'Test Case';
  };

  const progress = ((stepIdx + 1) / steps.length) * 100;
  const codeLines = highlightCode(activeCode, language);
  const activeLine = currentStep?.codeLineActive ?? Math.floor((stepIdx / Math.max(steps.length - 1, 1)) * (codeLines.length - 1)) + 1;
  const codeBodyRef = useRef(null);

  useEffect(() => {
    if (!codeBodyRef.current) return;
    const lineEl = codeBodyRef.current.querySelector('.viz-code-line.active');
    if (lineEl) lineEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeLine]);

  return (
    <div className="viz-overlay" onClick={(e) => e.stopPropagation()}>
      <div className="viz-modal">

        {/* ── TOP HEADER ── */}
        <header className="viz-top-navbar">
          <div className="viz-navbar-left">
            <button className="viz-back-btn" onClick={onClose}>
              ← Back to LeetCode Tracker
            </button>
            <h1 className="viz-navbar-title">{question.title}</h1>
            <div className="viz-navbar-badges">
              <span className="viz-badge-lc">LC #{question.id}</span>
              <span className={`viz-badge-diff diff-${question.difficulty.toLowerCase()}`}>
                {question.difficulty.toUpperCase()}
              </span>
              <span className="viz-badge-topic">{question.topic}</span>
            </div>
          </div>

          <div className="viz-navbar-right">
            <a 
              href={question.link} 
              target="_blank" 
              rel="noreferrer"
              className="viz-practice-btn"
            >
              Practice now
            </a>
            
            <div className="viz-status-dropdown-container">
              <span className="viz-status-label">STATUS</span>
              <select 
                value={status} 
                onChange={(e) => handleStatusChange(e.target.value)}
                className="viz-status-select"
              >
                <option value="-- Not set --">-- Not set --</option>
                <option value="In progress">In progress</option>
                <option value="Practice pending">Practice pending</option>
                <option value="Solved">Solved</option>
                <option value="Need to revise">Need to revise</option>
              </select>
            </div>
          </div>
        </header>

        {/* ── MAIN WORKSPACE ── */}
        <div className="viz-workspace-body">
          
          {/* ── LEFT COLUMN ── */}
          <div className="viz-workspace-left">
            
            {/* PROBLEM DESCRIPTION BOX */}
            <section className="viz-panel-box">
              <div className="viz-panel-title">PROBLEM</div>
              <div className="viz-panel-desc">
                {solution.description || question.description || 'Given the inputs, compute the required outputs using the active algorithmic constraints.'}
              </div>

              {solution.examples && solution.examples.length > 0 && (
                <div className="viz-panel-examples">
                  {solution.examples.map((ex, idx) => (
                    <div key={idx} className="viz-example-card">
                      <div className="viz-example-num">EXAMPLE {ex.example_num || idx + 1}</div>
                      <pre className="viz-example-text">{ex.example_text}</pre>
                    </div>
                  ))}
                </div>
              )}

              {solution.constraints && solution.constraints.length > 0 && (
                <div className="viz-panel-constraints">
                  <div className="viz-constraints-header">Constraints:</div>
                  <ul className="viz-constraints-list">
                    {solution.constraints.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* TRY EXAMPLES BOX */}
            <section className="viz-panel-box">
              <div className="viz-panel-title">TRY EXAMPLES</div>
              <div className="viz-try-buttons-row">
                {allTestCases.map((tc, i) => (
                  <button
                    key={i}
                    className={`viz-try-case-btn ${i === testCaseIdx ? 'active' : ''}`}
                    onClick={() => switchTestCase(i)}
                  >
                    {formatTestCaseLabel(tc)}
                  </button>
                ))}
              </div>
              <div className="viz-custom-input-row">
                <span className="viz-custom-label">Custom:</span>
                <input
                  type="text"
                  className="viz-custom-input-field"
                  placeholder="e.g. 1 2 1"
                  value={customInputText}
                  onChange={(e) => setCustomInputText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleRunCustom(); }}
                />
                <button className="viz-custom-run-btn" onClick={handleRunCustom}>
                  Run
                </button>
              </div>
            </section>

            {/* PLAYBACK CONTROLS BOX */}
            <section className="viz-panel-box">
              <div className="viz-playback-controls">
                <button className="viz-ctrl-btn" onClick={goPrev} disabled={stepIdx === 0}>
                  ◀ Prev
                </button>
                <button
                  className="viz-ctrl-btn-play"
                  onClick={() => setIsPlaying(p => !p)}
                >
                  {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>
                <button className="viz-ctrl-btn" onClick={goNext} disabled={stepIdx === steps.length - 1}>
                  Next ▶
                </button>
                <button className="viz-ctrl-btn" onClick={goFirst}>
                  🔄 Reset
                </button>

                <div className="viz-speed-slider-group">
                  <span className="viz-speed-label">Speed</span>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={speedIdx}
                    onChange={(e) => {
                      const newSpeedIdx = Number(e.target.value);
                      setSpeedIdx(newSpeedIdx);
                      if (isPlaying) {
                        stopPlay();
                        startPlay();
                      }
                    }}
                    className="viz-speed-slider"
                  />
                  <span className="viz-speed-label">Slow</span>
                </div>

                <div className="viz-step-indicator">
                  {stepIdx + 1} / {steps.length}
                </div>
              </div>

              <div className="viz-playback-progress-track">
                <div className="viz-playback-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </section>

            {/* VISUALIZATION CANVAS */}
            <section className="viz-panel-box">
              <div className="viz-panel-title">{solution.visualType.toUpperCase()} VISUALIZATION</div>
              <div className="viz-visualizer-canvas-inner">
                <VisualizerEngine
                  visualType={solution.visualType}
                  step={currentStep}
                  data={allTestCases[testCaseIdx]?.data}
                />
              </div>
            </section>

            {/* VARIABLES PANEL */}
            {currentStep?.vars && Object.keys(currentStep.vars).length > 0 && (
              <section className="viz-panel-box">
                <div className="viz-panel-title">VARIABLES</div>
                <div className="viz-variables-flex">
                  {Object.entries(currentStep.vars).map(([k, v]) => (
                    <div key={k} className="viz-var-card-box">
                      <div className="viz-var-card-name">{k}</div>
                      <div className="viz-var-card-val">{JSON.stringify(v)}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* STEP LOGIC BOX */}
            <section className="viz-panel-box">
              <div className="viz-panel-title">STEP LOGIC</div>
              <div className="viz-step-logic-alert">
                <Zap size={16} className="viz-step-logic-zap" />
                <span>{currentStep?.desc || 'Initializing...'}</span>
              </div>
            </section>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="viz-workspace-right">
            
            {/* WORKING CODE BOX */}
            <section className="viz-right-panel-box">
              <div className="viz-code-panel-header">
                <h3 className="viz-code-panel-title">{question.title}</h3>
                <div className="viz-code-panel-controls">
                  <button className="viz-code-copy-btn" onClick={handleCopy}>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button 
                    className={`viz-code-lang-btn ${language === 'java' ? 'active' : ''}`}
                    onClick={() => setLanguage('java')}
                  >
                    Java
                  </button>
                  <button 
                    className={`viz-code-lang-btn ${language === 'python' ? 'active' : ''}`}
                    onClick={() => setLanguage('python')}
                  >
                    Python
                  </button>
                </div>
              </div>
              
              {solution.approaches.length > 1 && (
                <div className="viz-approach-toggle-row">
                  <span className="viz-approach-label">APPROACH:</span>
                  {solution.approaches.map((ap, i) => (
                    <button
                      key={i}
                      className={`viz-approach-toggle-btn ${i === approachIdx ? 'active' : ''}`}
                      onClick={() => switchApproach(i)}
                    >
                      {ap.name}
                    </button>
                  ))}
                </div>
              )}

              <div className="viz-code-panel-body" ref={codeBodyRef}>
                <pre className="viz-code-panel-pre">
                  {codeLines.map((lineObj, i) => (
                    <CodeLine
                      key={i}
                      line={lineObj}
                      isActive={lineObj.lineNum === activeLine}
                      lang={language}
                    />
                  ))}
                </pre>
              </div>
            </section>

            {/* ALGORITHM BOX */}
            <section className="viz-right-panel-box">
              <div className="viz-panel-title">ALGORITHM — {approach.name}</div>
              <div className="viz-algo-steps-list">
                {(approach.algorithm || []).map((step, idx) => (
                  <div key={idx} className="viz-algo-step-row">
                    <span className="viz-algo-step-number">{idx + 1}</span>
                    <span className="viz-algo-step-desc-text">{step}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* COMPLEXITY CARDS */}
            <section className="viz-complexity-cards-row">
              <div className="viz-complexity-card-box">
                <span className="viz-complexity-card-lbl">Time Complexity</span>
                <span className="viz-complexity-card-val">{approach.complexity.time}</span>
              </div>
              <div className="viz-complexity-card-box">
                <span className="viz-complexity-card-lbl">Space Complexity</span>
                <span className="viz-complexity-card-val">{approach.complexity.space}</span>
              </div>
            </section>

            {/* WHY IT WORKS BOX */}
            <section className="viz-right-panel-box">
              <div className="viz-panel-title">WHY IT WORKS</div>
              <div className="viz-why-it-works-content">
                {approach.whyItWorks || 'Efficient implementation using optimal algorithms.'}
              </div>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
}
