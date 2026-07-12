/**
 * LinkedListVisualizer — SVG linked list with pointer animation.
 * Handles: Linked List problems.
 */

const NODE_W = 52;
const NODE_H = 40;
const ARROW_W = 30;

export default function LinkedListVisualizer({ step, data }) {
  const nodes = step?.nodes || data?.list1 || [1, 2, 3, 4, 5];
  const highlighted = step?.highlighted || [];
  const pointers = step?.pointers || {};
  const isCycle = step?.cycle || false;

  const totalWidth = nodes.length * (NODE_W + ARROW_W);
  const H = 120;
  const nodeY = 40;

  const nodeX = (i) => i * (NODE_W + ARROW_W) + ARROW_W / 2;

  const getNodeStyle = (i) => {
    const isH = highlighted.includes(i);
    if (isH) {
      return { fill: 'rgba(139,92,246,0.3)', stroke: '#8b5cf6', text: '#c4b5fd', shadow: '0 0 14px rgba(139,92,246,0.4)' };
    }
    return { fill: 'rgba(255,255,255,0.05)', stroke: 'rgba(255,255,255,0.2)', text: '#e2e8f0', shadow: 'none' };
  };

  const POINTER_COLORS = {
    cur: '#8b5cf6', slow: '#10b981', fast: '#f87171',
    prev: '#fbbf24', next: '#3b82f6', head: '#ec4899',
  };

  const ptrEntries = Object.entries(pointers);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <svg
          width={Math.max(totalWidth + ARROW_W, 320)}
          height={H}
          style={{ display: 'block', margin: '0 auto' }}
        >
          {/* Nodes and arrows */}
          {nodes.map((val, i) => {
            const x = nodeX(i);
            const s = getNodeStyle(i);
            return (
              <g key={i}>
                {/* Node box */}
                <rect
                  x={x} y={nodeY}
                  width={NODE_W} height={NODE_H}
                  rx={8}
                  fill={s.fill}
                  stroke={s.stroke}
                  strokeWidth={highlighted.includes(i) ? 2 : 1.5}
                  style={{ filter: s.shadow !== 'none' ? `drop-shadow(0 0 6px rgba(139,92,246,0.4))` : 'none', transition: 'all 0.35s ease' }}
                />
                {/* Value */}
                <text
                  x={x + NODE_W / 2} y={nodeY + NODE_H / 2 + 5}
                  textAnchor="middle"
                  fill={s.text}
                  fontSize={14}
                  fontWeight={700}
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {val}
                </text>

                {/* Arrow to next */}
                {i < nodes.length - 1 && (
                  <g>
                    <line
                      x1={x + NODE_W} y1={nodeY + NODE_H / 2}
                      x2={x + NODE_W + ARROW_W - 6} y2={nodeY + NODE_H / 2}
                      stroke="rgba(255,255,255,0.25)"
                      strokeWidth={1.5}
                      markerEnd="url(#arrowhead)"
                    />
                  </g>
                )}

                {/* Null at end */}
                {i === nodes.length - 1 && !isCycle && (
                  <text
                    x={x + NODE_W + 8} y={nodeY + NODE_H / 2 + 5}
                    fill="#475569"
                    fontSize={11}
                    fontFamily="'JetBrains Mono', monospace"
                    fontWeight={600}
                  >
                    NULL
                  </text>
                )}

                {/* Cycle arrow (curved back) */}
                {i === nodes.length - 1 && isCycle && (
                  <path
                    d={`M ${x + NODE_W} ${nodeY + NODE_H / 2} Q ${x + NODE_W + 20} ${nodeY + NODE_H + 30} ${nodeX(1) + NODE_W / 2} ${nodeY + NODE_H + 30} Q ${nodeX(1) - 20} ${nodeY + NODE_H + 30} ${nodeX(1) + NODE_W / 2} ${nodeY + NODE_H}`}
                    fill="none"
                    stroke="#f87171"
                    strokeWidth={1.5}
                    strokeDasharray="5,3"
                  />
                )}

                {/* Pointer labels below node */}
                {ptrEntries
                  .filter(([, idx]) => idx === i)
                  .map(([name], pi) => (
                    <text
                      key={name}
                      x={x + NODE_W / 2}
                      y={nodeY + NODE_H + 16 + pi * 14}
                      textAnchor="middle"
                      fill={POINTER_COLORS[name] || '#94a3b8'}
                      fontSize={11}
                      fontWeight={700}
                      fontFamily="'JetBrains Mono', monospace"
                    >
                      ↑{name}
                    </text>
                  ))}
              </g>
            );
          })}

          {/* Arrowhead marker */}
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
              <polygon points="0 0, 6 2, 0 4" fill="rgba(255,255,255,0.3)" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* Pointer legend */}
      {ptrEntries.length > 0 && (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {ptrEntries.map(([name, idx]) => (
            <div key={name} style={{
              padding: '0.25rem 0.7rem',
              borderRadius: 8,
              background: `${POINTER_COLORS[name] || '#94a3b8'}18`,
              border: `1px solid ${POINTER_COLORS[name] || '#94a3b8'}44`,
              fontSize: '0.78rem',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              <span style={{ color: POINTER_COLORS[name] || '#94a3b8', fontWeight: 700 }}>{name}</span>
              <span style={{ color: '#64748b', margin: '0 4px' }}>@</span>
              <span style={{ color: '#e2e8f0' }}>node[{idx}]</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
