/**
 * GraphVisualizer — Force-layout graph with animated BFS/DFS node visits.
 * Handles: Graphs, Advanced Graphs, Union Find.
 */

// Deterministic positions for up to 8 nodes arranged in a circle
function circleLayout(nodeCount, cx, cy, r) {
  const positions = [];
  for (let i = 0; i < nodeCount; i++) {
    const angle = (2 * Math.PI * i) / nodeCount - Math.PI / 2;
    positions.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) });
  }
  return positions;
}

const NODE_R = 22;

export default function GraphVisualizer({ step, data }) {
  // Support multiple data formats: { nodes, edges } or { input } or adjacency list
  const rawNodes = data?.nodes;
  const rawEdges = data?.edges;
  const rawInput = data?.input;

  let nodes, edges;
  if (Array.isArray(rawNodes) && rawNodes.length > 0) {
    nodes = rawNodes;
    edges = rawEdges || [];
  } else if (Array.isArray(rawInput) && rawInput.length > 0) {
    // Treat flat array as a path graph: 0-1-2-...-n
    nodes = rawInput.map((_, i) => i);
    edges = nodes.slice(0, -1).map((n, i) => [i, i + 1]);
  } else {
    nodes = [0, 1, 2, 3];
    edges = [[0, 1], [1, 2], [2, 3], [3, 0]];
  }

  const highlightedNodes = step?.highlightedNodes || step?.highlights || [];
  const highlightedEdges = step?.highlightedEdges || [];

  const W = 440;
  const H = 260;
  const positions = circleLayout(nodes.length, W / 2, H / 2, Math.min(W, H) / 2 - 36);

  const isNodeActive = (n) => highlightedNodes.includes(n);
  const isEdgeActive = (a, b) =>
    highlightedEdges.some(([x, y]) => (x === a && y === b) || (x === b && y === a));

  const nodeColor = (n) => {
    if (isNodeActive(n)) return { fill: 'rgba(139,92,246,0.4)', stroke: '#8b5cf6', text: '#c4b5fd' };
    return { fill: 'rgba(255,255,255,0.06)', stroke: 'rgba(255,255,255,0.2)', text: '#94a3b8' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <svg width={W} height={H}>
        {/* Edges */}
        {edges.map(([a, b], i) => {
          const pa = positions[a] || { x: 0, y: 0 };
          const pb = positions[b] || { x: 0, y: 0 };
          const active = isEdgeActive(a, b);
          return (
            <line
              key={i}
              x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
              stroke={active ? '#8b5cf6' : 'rgba(255,255,255,0.12)'}
              strokeWidth={active ? 2.5 : 1.5}
              style={{
                filter: active ? 'drop-shadow(0 0 4px rgba(139,92,246,0.5))' : 'none',
                transition: 'all 0.35s ease',
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((n, i) => {
          const p = positions[i] || { x: 0, y: 0 };
          const c = nodeColor(n);
          return (
            <g key={n}>
              <circle
                cx={p.x} cy={p.y} r={NODE_R}
                fill={c.fill}
                stroke={c.stroke}
                strokeWidth={isNodeActive(n) ? 2.5 : 1.5}
                style={{
                  filter: isNodeActive(n) ? 'drop-shadow(0 0 8px rgba(139,92,246,0.5))' : 'none',
                  transition: 'all 0.35s ease',
                }}
              />
              <text
                x={p.x} y={p.y + 5}
                textAnchor="middle"
                fill={c.text}
                fontSize={13}
                fontWeight={700}
                fontFamily="'JetBrains Mono', monospace"
              >
                {n}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.78rem', color: '#64748b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.2)' }} />
          Unvisited
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(139,92,246,0.4)', border: '1.5px solid #8b5cf6' }} />
          Visited/Active
        </div>
      </div>
    </div>
  );
}
