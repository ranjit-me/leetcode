/**
 * BacktrackVisualizer — Shows the recursion tree path for backtracking problems.
 * Handles: Backtracking, Subsets, Combinations, Permutations.
 */

export default function BacktrackVisualizer({ step, data }) {
  const path = step?.path || [];
  const found = step?.found || false;
  const candidates = data?.candidates || data?.input || [1, 2, 3, 4];
  const highlights = step?.highlights || [];
  const target = data?.target;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      {/* Candidates */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
        <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
          Candidates
        </span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {candidates.map((c, i) => (
            <div
              key={i}
              style={{
                width: 48, height: 48,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 10,
                background: highlights.includes(i) ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.05)',
                border: highlights.includes(i) ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.12)',
                color: highlights.includes(i) ? '#c4b5fd' : '#e2e8f0',
                fontWeight: 700,
                fontSize: '1rem',
                fontFamily: "'JetBrains Mono', monospace",
                transition: 'all 0.3s ease',
                boxShadow: highlights.includes(i) ? '0 0 12px rgba(139,92,246,0.4)' : 'none',
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* Current path */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
          Current Path
        </span>
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', minHeight: 48 }}>
          <span style={{ color: '#475569', fontSize: '1.2rem' }}>[</span>
          {path.length === 0 ? (
            <span style={{ color: '#374151', fontSize: '0.85rem', fontFamily: "'JetBrains Mono', monospace" }}>empty</span>
          ) : (
            path.map((v, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{
                  width: 44, height: 44,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 10,
                  background: found ? 'rgba(16,185,129,0.25)' : 'rgba(251,191,36,0.15)',
                  border: found ? '2px solid #10b981' : '1.5px solid rgba(251,191,36,0.4)',
                  color: found ? '#10b981' : '#fde68a',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: 'all 0.3s ease',
                  boxShadow: found ? '0 0 10px rgba(16,185,129,0.35)' : 'none',
                }}>
                  {v}
                </div>
                {i < path.length - 1 && (
                  <span style={{ color: '#475569', fontSize: '0.75rem' }}>+</span>
                )}
              </div>
            ))
          )}
          <span style={{ color: '#475569', fontSize: '1.2rem' }}>]</span>

          {/* Sum display */}
          {path.length > 0 && (
            <div style={{
              marginLeft: '0.5rem',
              padding: '0.25rem 0.6rem',
              borderRadius: 8,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              fontSize: '0.82rem',
              fontFamily: "'JetBrains Mono', monospace",
              color: found ? '#10b981' : '#94a3b8',
            }}>
              sum = {path.reduce((a, b) => a + b, 0)}
              {target !== undefined && (
                <span style={{ color: '#475569' }}> / {target}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Found indicator */}
      {found && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.6rem 1.25rem',
          borderRadius: 10,
          background: 'rgba(16,185,129,0.15)',
          border: '1.5px solid #10b981',
          color: '#10b981',
          fontWeight: 700,
          fontSize: '0.9rem',
          animation: 'pulseGreen 1s ease-in-out',
        }}>
          ✓ Valid solution found! Adding to results.
        </div>
      )}

      {/* Backtrack indicator */}
      {step?.desc && step.desc.toLowerCase().includes('backtrack') && !found && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.4rem 1rem',
          borderRadius: 10,
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.3)',
          color: '#f87171',
          fontSize: '0.82rem',
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          ↩ Backtracking — remove last element and try next
        </div>
      )}
    </div>
  );
}
