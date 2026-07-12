import { useEffect, useRef } from 'react';

/**
 * ArrayVisualizer — Animated array with pointer arrows and cell highlights.
 * Handles: Arrays & Hashing, Two Pointers, Sliding Window, Binary Search, Greedy, Sorting.
 */
export default function ArrayVisualizer({ step, data }) {
  const arr = Array.isArray(data?.input) ? data.input : [3, 1, 4, 1, 5, 9, 2, 6];
  const highlights = step?.highlights || [];
  const pointers = step?.pointers || {};
  const found = step?.found || [];
  const map = step?.map || null;
  const result = step?.result || null;

  const displayArr = result || arr;
  const pointerEntries = Object.entries(pointers);

  // Group pointers by index for stacking
  const ptrByIndex = {};
  pointerEntries.forEach(([name, idx]) => {
    if (!ptrByIndex[idx]) ptrByIndex[idx] = [];
    ptrByIndex[idx].push(name);
  });

  const cellStyle = (idx) => {
    const isFound = found.includes(idx);
    const isHighlighted = highlights.includes(idx);
    const isPointed = ptrByIndex[idx];
    let bg = 'rgba(255,255,255,0.05)';
    let border = '1px solid rgba(255,255,255,0.12)';
    let color = '#e2e8f0';
    let transform = 'scale(1)';
    let boxShadow = 'none';

    if (isFound) {
      bg = 'rgba(16,185,129,0.3)';
      border = '2px solid #10b981';
      color = '#10b981';
      transform = 'scale(1.12)';
      boxShadow = '0 0 16px rgba(16,185,129,0.4)';
    } else if (isHighlighted) {
      bg = 'rgba(139,92,246,0.25)';
      border = '2px solid #8b5cf6';
      color = '#c4b5fd';
      transform = 'scale(1.08)';
      boxShadow = '0 0 12px rgba(139,92,246,0.35)';
    } else if (isPointed) {
      bg = 'rgba(251,191,36,0.15)';
      border = '1.5px solid #fbbf24';
      color = '#fde68a';
    }

    return { bg, border, color, transform, boxShadow };
  };

  const POINTER_COLORS = {
    i: '#8b5cf6', j: '#f59e0b', L: '#3b82f6', R: '#ec4899',
    slow: '#10b981', fast: '#f87171', buy: '#10b981', sell: '#f87171',
    p: '#a78bfa', p1: '#60a5fa', p2: '#f472b6', M: '#fbbf24',
  };

  const getPointerColor = (name) => POINTER_COLORS[name] || '#94a3b8';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', padding: '1rem 0' }}>
      {/* Array row */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
        {/* Pointer labels ABOVE */}
        <div style={{ display: 'flex', gap: '0.5rem', height: '1.5rem', alignItems: 'flex-end', width: 'fit-content' }}>
          {displayArr.map((_, idx) => {
            const ptrs = ptrByIndex[idx];
            return (
              <div key={idx} style={{ width: 52, textAlign: 'center', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.03em' }}>
                {ptrs && ptrs.map(p => (
                  <span key={p} style={{ color: getPointerColor(p), display: 'block' }}>{p}</span>
                ))}
              </div>
            );
          })}
        </div>

        {/* Cells */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {displayArr.map((val, idx) => {
            const s = cellStyle(idx);
            return (
              <div
                key={idx}
                style={{
                  width: 52, height: 52,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 10,
                  background: s.bg,
                  border: s.border,
                  color: s.color,
                  fontWeight: 700,
                  fontSize: '1rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  transform: s.transform,
                  boxShadow: s.boxShadow,
                  transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                  position: 'relative',
                }}
              >
                {val}
              </div>
            );
          })}
        </div>

        {/* Index labels BELOW */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {displayArr.map((_, idx) => (
            <div key={idx} style={{ width: 52, textAlign: 'center', fontSize: '0.7rem', color: 'rgba(148,163,184,0.6)' }}>
              {idx}
            </div>
          ))}
        </div>
      </div>

      {/* Pointer arrows (visual) */}
      {pointerEntries.length > 0 && (
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {pointerEntries.map(([name, idx]) => (
            <div key={name} style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.3rem 0.8rem',
              borderRadius: 8,
              background: `${getPointerColor(name)}18`,
              border: `1px solid ${getPointerColor(name)}44`,
              fontSize: '0.8rem',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              <span style={{ color: getPointerColor(name), fontWeight: 700 }}>{name}</span>
              <span style={{ color: 'rgba(148,163,184,0.7)' }}>→</span>
              <span style={{ color: '#e2e8f0' }}>index {idx}</span>
            </div>
          ))}
        </div>
      )}

      {/* HashMap visualization */}
      {map && Object.keys(map).length > 0 && (
        <div style={{ width: '100%', maxWidth: 480 }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem', textAlign: 'center', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>HashMap</div>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {Object.entries(map).map(([k, v]) => (
              <div key={k} style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 8,
                background: 'rgba(139,92,246,0.12)',
                border: '1px solid rgba(139,92,246,0.3)',
                fontSize: '0.82rem',
                fontFamily: "'JetBrains Mono', monospace",
                color: '#c4b5fd',
              }}>
                <span style={{ color: '#a78bfa' }}>{k}</span>
                <span style={{ color: '#64748b', margin: '0 4px' }}>:</span>
                <span style={{ color: '#e2e8f0' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
