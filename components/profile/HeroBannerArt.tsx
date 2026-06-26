/**
 * The little network-graph motif that lives in the hero banner. It's a nod to
 * the "Network Engineering" half of my degree — nodes and links, with a few
 * points that gently twinkle like traffic moving across them. Drawn with theme
 * tokens so it reads on both the dark and the light banner.
 */
export function HeroBannerArt() {
  // Node positions in the 800x200 viewBox. Lines are drawn between neighbours.
  const nodes: [number, number][] = [
    [70, 150], [165, 70], [275, 150], [370, 85], [420, 38],
    [480, 150], [565, 65], [625, 165], [665, 110], [745, 70],
  ];
  const links: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 5], [5, 6], [6, 8], [8, 9],
    [3, 4], [1, 3], [5, 8], [6, 7], [2, 5],
  ];
  const twinkle = new Set([1, 4, 6, 9]); // a few nodes that pulse

  return (
    <svg
      aria-hidden
      viewBox="0 0 800 200"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full text-[hsl(var(--steam-link))]"
    >
      <g stroke="currentColor" strokeWidth="1" opacity="0.22">
        {links.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
      </g>
      <g fill="currentColor">
        {nodes.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={twinkle.has(i) ? 3.4 : 2.4}
            opacity={twinkle.has(i) ? 0.85 : 0.5}
            className={twinkle.has(i) ? "hero-node-twinkle" : undefined}
            style={twinkle.has(i) ? { animationDelay: `${i * 0.7}s` } : undefined}
          />
        ))}
      </g>
    </svg>
  );
}
