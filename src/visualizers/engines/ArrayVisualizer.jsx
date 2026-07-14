import { useEffect, useRef } from 'react';

/**
 * ArrayVisualizer — Animated array with pointer arrows and cell highlights.
 * Supports single array, dual arrays (e.g. Merge Sorted Array / Sorting + Two Pointers),
 * HashMap visualization, List / ArrayList search visualization, and index subLabels.
 */
export default function ArrayVisualizer({ step, data }) {
  const arr1 = step?.arr1 ||
               (Array.isArray(step?.vars?.nums) ? step.vars.nums : null) ||
               (Array.isArray(step?.vars?.arr) ? step.vars.arr : null) ||
               (Array.isArray(step?.vars?.digits) ? step.vars.digits : null) ||
               step?.result ||
               (Array.isArray(data?.input) ? data.input : [3, 1, 4, 1, 5, 9, 2, 6]);
  const arr2 = step?.arr2 || data?.input2 || data?.nums2 || null;

  const highlights = step?.highlights || [];
  const highlights2 = step?.highlights2 || [];
  const found = step?.found || [];
  const found2 = step?.found2 || [];

  const map = step?.map !== undefined ? step.map :
              (step?.vars?.seen !== undefined ? step.vars.seen :
              (step?.vars?.map !== undefined ? step.vars.map :
              (step?.vars?.hashMap !== undefined ? step.vars.hashMap :
              (step?.vars?.hash_map !== undefined ? step.vars.hash_map : null))));

  const list = step?.list !== undefined ? step.list :
               (step?.vars?.list !== undefined ? step.vars.list :
               (step?.vars?.arrayList !== undefined ? step.vars.arrayList : null));

  const allPointers = step?.pointers || {};

  const POINTER_COLORS = {
    i: '#8b5cf6', j: '#f59e0b', L: '#3b82f6', R: '#ec4899',
    left: '#8b5cf6', right: '#ec4899',
    slow: '#10b981', fast: '#f87171', buy: '#10b981', sell: '#f87171',
    p: '#a78bfa', p1: '#60a5fa', p2: '#f472b6', M: '#fbbf24',
  };

  const getPointerColor = (name) => POINTER_COLORS[name] || '#94a3b8';

  // Separate pointers for array 1 and array 2
  let pointers1 = step?.pointers1 || {};
  let pointers2 = step?.pointers2 || {};
  if (!step?.pointers1 && !step?.pointers2) {
    Object.entries(allPointers).forEach(([k, v]) => {
      if (k === 'p2' || k === 'j2' || k === 'left2' || k === 'right2') {
        pointers2[k] = v;
      } else {
        pointers1[k] = v;
      }
    });
  }

  const renderArrayBlock = (arr, ptrs, hl, fnd, title, subLabels) => {
    const pointerEntries = Object.entries(ptrs || {});
    const ptrByIndex = {};
    pointerEntries.forEach(([name, idx]) => {
      if (!ptrByIndex[idx]) ptrByIndex[idx] = [];
      ptrByIndex[idx].push(name);
    });

    const cellStyle = (idx) => {
      const isFound = (fnd || []).includes(idx);
      const isHighlighted = (hl || []).includes(idx);
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

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', width: '100%', marginBottom: '0.75rem' }}>
        {title && (
          <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', color: '#60a5fa', textTransform: 'uppercase' }}>
            {title}
          </div>
        )}

        {/* Pointer labels ABOVE */}
        <div style={{ display: 'flex', gap: '0.5rem', height: '1.5rem', alignItems: 'flex-end', width: 'fit-content' }}>
          {arr.map((_, idx) => {
            const pList = ptrByIndex[idx];
            return (
              <div key={idx} style={{ width: 56, textAlign: 'center', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.03em' }}>
                {pList && pList.map(p => (
                  <span key={p} style={{ color: getPointerColor(p), display: 'block' }}>{p}</span>
                ))}
              </div>
            );
          })}
        </div>

        {/* Cells */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {arr.map((val, idx) => {
            const s = cellStyle(idx);
            return (
              <div
                key={idx}
                style={{
                  width: 56, height: 56,
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

        {/* Index labels BELOW with optional subLabels */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {arr.map((_, idx) => (
            <div key={idx} style={{ width: 56, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
              <div style={{ fontSize: '0.7rem', color: 'rgba(148,163,184,0.6)' }}>[{idx}]</div>
              {subLabels && subLabels[idx] && (
                <div style={{
                  fontSize: '0.64rem',
                  color: '#38bdf8',
                  fontWeight: 600,
                  background: 'rgba(56,189,248,0.12)',
                  border: '1px solid rgba(56,189,248,0.3)',
                  padding: '1px 4px',
                  borderRadius: 4,
                  whiteSpace: 'nowrap'
                }}>
                  {subLabels[idx]}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pointer badges */}
        {pointerEntries.length > 0 && (
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.25rem' }}>
            {pointerEntries.map(([name, idx]) => (
              <div key={name} style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.25rem 0.65rem',
                borderRadius: 6,
                background: `${getPointerColor(name)}18`,
                border: `1px solid ${getPointerColor(name)}44`,
                fontSize: '0.75rem',
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                <span style={{ color: getPointerColor(name), fontWeight: 700 }}>{name}</span>
                <span style={{ color: 'rgba(148,163,184,0.7)' }}>→</span>
                <span style={{ color: '#e2e8f0' }}>index {idx}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center', padding: '1rem 0', width: '100%' }}>
      {arr2 && Array.isArray(arr2) ? (
        <>
          {renderArrayBlock(
            arr1,
            pointers1,
            highlights,
            found,
            step?.arrayTitle1 || 'ORIGINAL ARRAY (nums)',
            step?.subLabels || step?.subLabels1
          )}
          {renderArrayBlock(
            arr2,
            pointers2,
            highlights2,
            found2,
            step?.arrayTitle2 || 'ARRAY 2',
            step?.subLabels2
          )}
        </>
      ) : (
        renderArrayBlock(
          arr1,
          allPointers,
          highlights,
          found,
          step?.arrayTitle1 || null,
          step?.subLabels || step?.subLabels1
        )
      )}

      {/* HashMap visualization */}
      {map !== null && typeof map === 'object' && (
        <div style={{ width: '100%', maxWidth: 520, background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 12, padding: '0.85rem 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#a78bfa', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6', display: 'inline-block' }}></span>
              HashMap / Lookup Table (seen)
            </span>
            <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>
              {Object.keys(map).length} {Object.keys(map).length === 1 ? 'entry' : 'entries'}
            </span>
          </div>
          {Object.keys(map).length === 0 ? (
            <div style={{ textAlign: 'center', padding: '0.6rem', color: '#64748b', fontSize: '0.82rem', fontStyle: 'italic', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px dashed rgba(148,163,184,0.15)' }}>
              HashMap is currently empty — elements will be stored as (value → index)
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {Object.entries(map).map(([k, v]) => {
                const isMatched = (step?.matchKey !== undefined && String(step.matchKey) === String(k)) ||
                                  (step?.isMatch === true && ((step?.vars?.comp !== undefined && String(step.vars.comp) === String(k)) || (step?.vars?.complement !== undefined && String(step.vars.complement) === String(k))));
                const isChecking = (step?.checkingKey !== undefined && String(step.checkingKey) === String(k));
                return (
                  <div key={k} style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.4rem 0.85rem',
                    borderRadius: 8,
                    background: isMatched ? 'rgba(16,185,129,0.25)' : isChecking ? 'rgba(245,158,11,0.2)' : 'rgba(139,92,246,0.18)',
                    border: isMatched ? '2px solid #10b981' : isChecking ? '1.5px solid #f59e0b' : '1.5px solid rgba(139,92,246,0.45)',
                    fontSize: '0.88rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    boxShadow: isMatched ? '0 0 14px rgba(16,185,129,0.35)' : isChecking ? '0 0 12px rgba(245,158,11,0.3)' : '0 0 10px rgba(139,92,246,0.15)',
                    transform: isMatched ? 'scale(1.06)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}>
                    <span style={{ color: isMatched ? '#34d399' : isChecking ? '#fbbf24' : '#fde68a', fontWeight: 700 }}>key: {k}</span>
                    <span style={{ color: '#94a3b8' }}>→</span>
                    <span style={{ color: isMatched ? '#10b981' : isChecking ? '#fbbf24' : '#60a5fa', fontWeight: 700 }}>idx: {v}</span>
                    {isMatched && <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700, marginLeft: 2 }}>MATCH!</span>}
                    {isChecking && !isMatched && <span style={{ fontSize: '0.68rem', color: '#fbbf24', fontWeight: 700, marginLeft: 2 }}>CHECKING</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* List / ArrayList visualization */}
      {list && Array.isArray(list) && (
        <div style={{ width: '100%', maxWidth: 520, background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: 12, padding: '0.85rem 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#60a5fa', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }}></span>
              List / ArrayList Storage
            </span>
            <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>
              size: {list.length}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {list.map((item, idx) => {
              const isMatched = (step?.vars?.complement !== undefined && String(step.vars.complement) === String(item) && idx !== step?.vars?.i) ||
                                (step?.listMatchIndex === idx);
              return (
                <div key={idx} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 8,
                  background: isMatched ? 'rgba(16,185,129,0.25)' : 'rgba(59,130,246,0.15)',
                  border: isMatched ? '2px solid #10b981' : '1.5px solid rgba(59,130,246,0.4)',
                  fontFamily: "'JetBrains Mono', monospace",
                  boxShadow: isMatched ? '0 0 14px rgba(16,185,129,0.35)' : 'none',
                  transform: isMatched ? 'scale(1.06)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}>
                  <span style={{ color: isMatched ? '#34d399' : '#e2e8f0', fontWeight: 700, fontSize: '0.95rem' }}>{item}</span>
                  <span style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.65rem' }}>idx {idx}</span>
                  {isMatched && <span style={{ fontSize: '0.62rem', color: '#10b981', fontWeight: 700 }}>FOUND!</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

