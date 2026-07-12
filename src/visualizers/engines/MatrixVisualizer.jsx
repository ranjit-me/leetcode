/**
 * MatrixVisualizer — 2D grid for matrix/graph problems.
 * Handles: Graphs (island problems), Matrix rotation, Flood Fill.
 */

export default function MatrixVisualizer({ step, data }) {
  const grid = step?.dpGrid || data?.grid || [
    ['1', '1', '0', '0'],
    ['1', '1', '0', '0'],
    ['0', '0', '1', '0'],
    ['0', '0', '0', '1'],
  ];
  const highlights = step?.highlights || [];
  const current = step?.current;

  const rows = grid.length;
  const cols = grid[0]?.length || 0;

  // Cell size scales with grid dimensions
  const CELL = Math.min(52, Math.floor(380 / Math.max(rows, cols)));

  const isHighlighted = (r, c) => highlights.some(([hr, hc]) => hr === r && hc === c);
  const isCurrent = (r, c) => current && current[0] === r && current[1] === c;

  const cellColor = (val, r, c) => {
    if (isCurrent(r, c)) return { bg: 'rgba(139,92,246,0.5)', border: '#8b5cf6', text: '#fff', shadow: '0 0 14px rgba(139,92,246,0.5)' };
    if (isHighlighted(r, c)) return { bg: 'rgba(16,185,129,0.3)', border: '#10b981', text: '#10b981', shadow: '0 0 10px rgba(16,185,129,0.35)' };
    if (val === '1' || val === 1) return { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.4)', text: '#93c5fd', shadow: 'none' };
    return { bg: 'rgba(0,0,0,0.2)', border: 'rgba(255,255,255,0.06)', text: '#374151', shadow: 'none' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      {/* Column indices */}
      <div style={{ display: 'flex', gap: 4, marginLeft: 24 }}>
        <div style={{ width: 4 }} />
        {Array.from({ length: cols }, (_, c) => (
          <div key={c} style={{
            width: CELL, textAlign: 'center',
            fontSize: '0.65rem', color: '#475569',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {c}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {/* Row indices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}>
          {Array.from({ length: rows }, (_, r) => (
            <div key={r} style={{
              height: CELL, display: 'flex', alignItems: 'center',
              fontSize: '0.65rem', color: '#475569',
              fontFamily: "'JetBrains Mono', monospace",
              width: 16, justifyContent: 'flex-end', paddingRight: 4,
            }}>
              {r}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, ${CELL}px)`,
          gap: 4,
        }}>
          {grid.map((row, r) =>
            row.map((val, c) => {
              const s = cellColor(val, r, c);
              return (
                <div
                  key={`${r}-${c}`}
                  style={{
                    width: CELL, height: CELL,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 8,
                    background: s.bg,
                    border: `${isCurrent(r,c) || isHighlighted(r,c) ? '2px' : '1px'} solid ${s.border}`,
                    color: s.text,
                    fontWeight: 700,
                    fontSize: CELL < 40 ? '0.75rem' : '0.9rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    boxShadow: s.shadow,
                    transition: 'all 0.35s ease',
                    transform: isCurrent(r, c) ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {val}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.4)' }} />
          <span style={{ color: '#64748b' }}>Land (1)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: 'rgba(16,185,129,0.3)', border: '1px solid #10b981' }} />
          <span style={{ color: '#64748b' }}>Visited</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: 'rgba(139,92,246,0.5)', border: '1px solid #8b5cf6' }} />
          <span style={{ color: '#64748b' }}>Current</span>
        </div>
      </div>
    </div>
  );
}
