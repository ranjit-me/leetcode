/**
 * StackQueueVisualizer — Animated stack and queue visualization.
 * Handles: Stack, Queue, Monotonic Stack, Design problems.
 */

const CELL_W = 64;
const CELL_H = 44;

export default function StackQueueVisualizer({ step, data }) {
  const stackState = step?.stackState || [];
  const stackState2 = step?.stackState2 || null; // optional second stack (e.g. minStack)
  const current = step?.current;

  const renderStack = (items, label, color = '#8b5cf6') => {
    const maxItems = 8;
    const displayItems = items.slice(-maxItems);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{
          fontSize: '0.72rem', color: '#64748b',
          textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600,
        }}>{label}</span>

        {/* Stack (rendered top-to-bottom, but logically top is last) */}
        <div style={{
          display: 'flex', flexDirection: 'column-reverse', alignItems: 'center',
          gap: 3,
          minHeight: 200,
          justifyContent: 'flex-start',
        }}>
          {displayItems.length === 0 ? (
            <div style={{
              width: CELL_W + 24, height: CELL_H,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.03)',
              border: '1px dashed rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#374151', fontSize: '0.75rem',
            }}>
              empty
            </div>
          ) : displayItems.map((item, i) => {
            const isTop = i === displayItems.length - 1;
            return (
              <div key={i} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {isTop && (
                  <span style={{
                    position: 'absolute', right: '100%', marginRight: 8,
                    fontSize: '0.72rem', color, fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    whiteSpace: 'nowrap',
                  }}>
                    TOP →
                  </span>
                )}
                <div style={{
                  width: CELL_W + 24, height: CELL_H,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 8,
                  background: isTop
                    ? `${color}30`
                    : 'rgba(255,255,255,0.04)',
                  border: isTop
                    ? `2px solid ${color}`
                    : '1px solid rgba(255,255,255,0.12)',
                  color: isTop ? color : '#94a3b8',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  boxShadow: isTop ? `0 0 12px ${color}33` : 'none',
                  transition: 'all 0.3s ease',
                }}>
                  {String(item)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom wall */}
        <div style={{
          width: CELL_W + 24, height: 6, borderRadius: 3,
          background: `linear-gradient(90deg, transparent, ${color}44, transparent)`,
        }} />
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      {/* Current element being processed */}
      {current !== undefined && current !== null && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.5rem 1.25rem',
          background: 'rgba(251,191,36,0.1)',
          border: '1.5px solid rgba(251,191,36,0.35)',
          borderRadius: 10,
          fontSize: '0.85rem',
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          <span style={{ color: '#64748b' }}>Processing:</span>
          <span style={{ color: '#fbbf24', fontWeight: 700, fontSize: '1rem' }}>{String(current)}</span>
        </div>
      )}

      {/* Stack(s) side by side */}
      <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end' }}>
        {renderStack(stackState, stackState2 ? 'Main Stack' : 'Stack', '#8b5cf6')}
        {stackState2 && renderStack(stackState2, 'Min Stack', '#10b981')}
      </div>
    </div>
  );
}
