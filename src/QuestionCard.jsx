import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, Circle, ExternalLink, ChevronDown, ChevronUp, Trash2, Code, PlayCircle } from 'lucide-react';
import VisualizerModal from './visualizers/VisualizerModal.jsx';

function QuestionCard({ q, isSolved, toggleSolved, savedCodes, onSaveCode, onDeleteCode }) {
  const [expanded, setExpanded] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCode, setNewCode] = useState('');
  const [showVisualizer, setShowVisualizer] = useState(false);

  const handleSave = () => {
    if (!newTitle.trim() || !newCode.trim()) return;
    onSaveCode(q.id, newTitle, newCode);
    setNewTitle('');
    setNewCode('');
  };

  const questionCodes = savedCodes.filter(c => c.questionId === q.id);

  return (
    <div 
      className="question-card" 
      style={{ 
        flexDirection: 'column', 
        alignItems: 'stretch', 
        padding: '1.25rem',
        background: isSolved ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.03)',
        borderColor: isSolved ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
        gap: 0
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <button 
          onClick={() => toggleSolved(q.id)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '1rem', color: isSolved ? 'var(--success)' : 'var(--text-muted)' }}
        >
          {isSolved ? <CheckCircle size={24} /> : <Circle size={24} />}
        </button>
        
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <span className="code-font" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>#{q.id}</span>
            <span style={{ fontSize: '1.1rem', fontWeight: 500, color: isSolved ? 'var(--text-muted)' : 'var(--text-main)', textDecoration: isSolved ? 'line-through' : 'none' }}>
              {q.title}
            </span>
          </div>
          <span className={`difficulty-badge diff-${q.difficulty.toLowerCase()}`}>
            {q.difficulty}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setExpanded(!expanded)}
            className="btn"
            style={{ 
              background: expanded ? 'rgba(255,255,255,0.1)' : 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '0.5rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-main)'
            }}
          >
            <Code size={16} />
            Snippets ({questionCodes.length})
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          <button
            onClick={() => setShowVisualizer(true)}
            className="btn btn-visualize"
            style={{
              padding: '0.5rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            title="Animate solution"
          >
            <PlayCircle size={16} />
            Visualize
          </button>
          
          <a 
            href={q.link} 
            target="_blank" 
            rel="noreferrer"
            className="btn btn-secondary"
            style={{ textDecoration: 'none', padding: '0.5rem 1rem' }}
          >
            Solve <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* List of saved codes */}
          {questionCodes.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: 500, margin: 0 }}>Saved Snippets</h4>
              {questionCodes.map(codeItem => (
                <div key={codeItem._id} style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 500, color: 'var(--primary)' }}>{codeItem.title}</span>
                    <button 
                      onClick={() => onDeleteCode(codeItem._id)}
                      style={{ background: 'none', border: 'none', color: 'var(--danger, #ef4444)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0.25rem' }}
                      title="Delete snippet"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <pre style={{ margin: 0, padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', overflowX: 'auto', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                    <code>{codeItem.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}

          {/* Add new code form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 500, margin: 0 }}>Add New Snippet</h4>
            
            <input 
              type="text" 
              placeholder="Snippet Title (e.g. Optimized O(n) solution)" 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                background: 'rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-main)',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            
            <textarea 
              placeholder="Paste your code here..." 
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              rows={6}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                background: 'rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-main)',
                outline: 'none',
                fontFamily: 'monospace',
                resize: 'vertical'
              }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={handleSave}
                disabled={!newTitle.trim() || !newCode.trim()}
                className="btn btn-primary"
                style={{ opacity: (!newTitle.trim() || !newCode.trim()) ? 0.5 : 1, cursor: (!newTitle.trim() || !newCode.trim()) ? 'not-allowed' : 'pointer' }}
              >
                Save Snippet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Visualizer Modal */}
      {showVisualizer && createPortal(
        <VisualizerModal
          question={q}
          onClose={() => setShowVisualizer(false)}
        />,
        document.body
      )}
    </div>
  );
}

export default QuestionCard;
