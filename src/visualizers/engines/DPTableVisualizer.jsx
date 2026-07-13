/**
 * DPTableVisualizer — Animated 1D or 2D DP table.
 * Handles: 1-D DP (dpArr), 2-D DP (dpGrid), Prefix Sum.
 */
export default function DPTableVisualizer({ step, data, is2D }) {
  // dpArr: from step or build a zeroed table from data.input length
  const inputArr = data?.input || [];
  const dpArr = step?.dpArr || (inputArr.length > 0 ? new Array(inputArr.length + 1).fill(0) : []);
  const dpGrid = step?.dpGrid || null;
  const highlighted1D = step?.highlighted || [];
  const highlighted2D = step?.highlighted || []; // array of [r,c]


  const isHighlighted2D = (r, c) => highlighted2D.some(([hr, hc]) => hr === r && hc === c);

  const CELL_SIZE = 44;

  if (is2D || dpGrid) {
    const grid = dpGrid || [[0, 1], [1, 2]];
    const rows = grid.length;
    const cols = grid[0]?.length || 0;
    const maxWidth = Math.min(cols * (CELL_SIZE + 4), 500);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, ${CELL_SIZE}px)`,
          gap: 4,
          maxWidth,
          overflowX: 'auto',
        }}>
          {grid.map((row, r) =>
            row.map((val, c) => {
              const isH = isHighlighted2D(r, c);
              const isActive = val !== 0 && !isH;
              return (
                <div
                  key={`${r}-${c}`}
                  style={{
                    width: CELL_SIZE, height: CELL_SIZE,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 8,
                    background: isH
                      ? 'rgba(139,92,246,0.4)'
                      : isActive
                        ? 'rgba(16,185,129,0.2)'
                        : 'rgba(255,255,255,0.04)',
                    border: isH
                      ? '2px solid #8b5cf6'
                      : isActive
                        ? '1.5px solid rgba(16,185,129,0.4)'
                        : '1px solid rgba(255,255,255,0.1)',
                    color: isH ? '#c4b5fd' : isActive ? '#6ee7b7' : '#475569',
                    fontWeight: isH ? 700 : 600,
                    fontSize: '0.85rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    transition: 'all 0.4s ease',
                    boxShadow: isH ? '0 0 12px rgba(139,92,246,0.35)' : 'none',
                  }}
                >
                  {val}
                </div>
              );
            })
          )}
        </div>

        {/* Row/Col index labels */}
        <div style={{ fontSize: '0.72rem', color: '#475569', fontFamily: "'JetBrains Mono', monospace" }}>
          {rows}×{cols} DP Table
        </div>
      </div>
    );
  }

  // 1D DP array
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {dpArr.map((val, idx) => {
          const isH = highlighted1D.includes(idx);
          const isFilled = val !== 0 && val !== undefined;
          return (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div
                style={{
                  width: CELL_SIZE, height: CELL_SIZE,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 10,
                  background: isH
                    ? 'rgba(139,92,246,0.4)'
                    : isFilled
                      ? 'rgba(16,185,129,0.2)'
                      : 'rgba(255,255,255,0.04)',
                  border: isH
                    ? '2px solid #8b5cf6'
                    : isFilled
                      ? '1.5px solid rgba(16,185,129,0.35)'
                      : '1px solid rgba(255,255,255,0.1)',
                  color: isH ? '#c4b5fd' : isFilled ? '#6ee7b7' : '#475569',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                  boxShadow: isH ? '0 0 14px rgba(139,92,246,0.4)' : 'none',
                  transform: isH ? 'scale(1.12)' : 'scale(1)',
                }}
              >
                {val !== null && val !== undefined ? (val > 1000 ? '∞' : val) : '?'}
              </div>
              <span style={{ fontSize: '0.68rem', color: '#475569', fontFamily: "'JetBrains Mono', monospace" }}>
                [{idx}]
              </span>
            </div>
          );
        })}
      </div>

      {/* DP formula hint */}
      <div style={{
        padding: '0.5rem 1rem',
        background: 'rgba(139,92,246,0.08)',
        border: '1px solid rgba(139,92,246,0.2)',
        borderRadius: 8,
        fontSize: '0.8rem',
        color: '#a78bfa',
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        dp[i] = optimal value at index i
      </div>
    </div>
  );
}
