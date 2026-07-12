/**
 * TreeVisualizer — SVG binary tree with animated node traversal.
 * Handles: Trees, Tries (prefix), Segment Trees, Recursion & D&C.
 */

const NODE_RADIUS = 22;
const H_GAP = 56;
const V_GAP = 70;

function layoutTree(node, x, y, spread) {
  if (!node) return [];
  const nodes = [{ val: node.val, x, y }];
  if (node.left) nodes.push(...layoutTree(node.left, x - spread, y + V_GAP, spread / 2));
  if (node.right) nodes.push(...layoutTree(node.right, x + spread, y + V_GAP, spread / 2));
  return nodes;
}

function layoutEdges(node, x, y, spread) {
  if (!node) return [];
  const edges = [];
  if (node.left) {
    edges.push({ x1: x, y1: y, x2: x - spread, y2: y + V_GAP });
    edges.push(...layoutEdges(node.left, x - spread, y + V_GAP, spread / 2));
  }
  if (node.right) {
    edges.push({ x1: x, y1: y, x2: x + spread, y2: y + V_GAP });
    edges.push(...layoutEdges(node.right, x + spread, y + V_GAP, spread / 2));
  }
  return edges;
}

// Default example tree
const DEFAULT_TREE = {
  val: 4,
  left: { val: 2, left: { val: 1 }, right: { val: 3 } },
  right: { val: 7, left: { val: 6 }, right: { val: 9 } },
};

// Build a simple tree from traversal order (for steps that specify traversalOrder)
function getExampleTree(data) {
  if (data?.tree) return data.tree;
  return DEFAULT_TREE;
}

export default function TreeVisualizer({ step, data }) {
  const tree = getExampleTree(data);
  const traversalOrder = step?.traversalOrder || [];
  const currentNode = step?.currentNode;

  const W = 480;
  const H = 260;
  const cx = W / 2;
  const cy = 38;
  const spread = 100;

  const nodes = layoutTree(tree, cx, cy, spread);
  const edges = layoutEdges(tree, cx, cy, spread);

  const isVisited = (val) => traversalOrder.includes(val);
  const isCurrent = (val) => val === currentNode;

  const nodeColor = (val) => {
    if (isCurrent(val)) return { fill: '#8b5cf6', stroke: '#c4b5fd', text: '#fff' };
    if (isVisited(val)) return { fill: 'rgba(16,185,129,0.3)', stroke: '#10b981', text: '#10b981' };
    return { fill: 'rgba(255,255,255,0.05)', stroke: 'rgba(255,255,255,0.2)', text: '#e2e8f0' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <svg width={W} height={H} style={{ overflow: 'visible' }}>
        {/* Edges */}
        {edges.map((e, i) => (
          <line
            key={i}
            x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={1.5}
          />
        ))}

        {/* Nodes */}
        {nodes.map((n, i) => {
          const c = nodeColor(n.val);
          return (
            <g key={i} style={{ transition: 'all 0.4s ease' }}>
              <circle
                cx={n.x} cy={n.y} r={NODE_RADIUS}
                fill={c.fill}
                stroke={c.stroke}
                strokeWidth={isCurrent(n.val) ? 3 : 1.5}
                style={{
                  filter: isCurrent(n.val) ? 'drop-shadow(0 0 8px rgba(139,92,246,0.6))' : 'none',
                  transition: 'all 0.35s ease',
                }}
              />
              <text
                x={n.x} y={n.y + 5}
                textAnchor="middle"
                fill={c.text}
                fontSize={13}
                fontWeight={700}
                fontFamily="'JetBrains Mono', monospace"
              >
                {n.val}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Traversal order display */}
      {traversalOrder.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Traversal Order</span>
          <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
            {traversalOrder.map((v, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <div style={{
                  width: 34, height: 34,
                  borderRadius: 8,
                  background: 'rgba(16,185,129,0.2)',
                  border: '1.5px solid #10b981',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#10b981', fontWeight: 700, fontSize: '0.85rem',
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {v}
                </div>
                {i < traversalOrder.length - 1 && (
                  <span style={{ color: '#475569', fontSize: '0.75rem' }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
