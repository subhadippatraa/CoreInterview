export function LoadBalancing() {
  return (
    <svg viewBox="0 0 800 300" className="w-full h-auto bg-[var(--color-bg3)] rounded-xl border border-[var(--color-border)] p-4">
      <defs>
        <marker id="lb-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-accent)" />
        </marker>
      </defs>

      {/* Clients */}
      <g stroke="var(--color-border2)" strokeWidth="2" fill="var(--color-bg4)">
        <rect x="50" y="80" width="80" height="40" rx="4" />
        <rect x="50" y="130" width="80" height="40" rx="4" />
        <rect x="50" y="180" width="80" height="40" rx="4" />
      </g>
      <g fill="var(--color-text)" className="font-dm text-sm font-medium" textAnchor="middle">
        <text x="90" y="105">Client 1</text>
        <text x="90" y="155">Client 2</text>
        <text x="90" y="205">Client 3</text>
      </g>

      {/* Load Balancer */}
      <rect x="250" y="80" width="100" height="140" rx="8" fill="var(--color-bg2)" stroke="var(--color-purple)" strokeWidth="2" />
      <text x="300" y="155" textAnchor="middle" fill="var(--color-purple)" className="font-heading font-bold">Load Balancer</text>

      {/* Servers */}
      <g stroke="var(--color-green)" strokeWidth="2" fill="var(--color-bg2)">
        <rect x="450" y="50" width="120" height="50" rx="8" />
        <rect x="450" y="125" width="120" height="50" rx="8" />
        <rect x="450" y="200" width="120" height="50" rx="8" />
      </g>
      <g fill="var(--color-green)" className="font-heading font-bold" textAnchor="middle">
        <text x="510" y="80">Server A</text>
        <text x="510" y="155">Server B</text>
        <text x="510" y="230">Server C</text>
      </g>

      {/* Incoming Arrows */}
      <g stroke="var(--color-text2)" strokeWidth="2" markerEnd="url(#lb-arrow)">
        <line x1="140" y1="100" x2="240" y2="130" />
        <line x1="140" y1="150" x2="240" y2="150" />
        <line x1="140" y1="200" x2="240" y2="170" />
      </g>

      {/* Distributed Arrows */}
      <g stroke="var(--color-accent)" strokeWidth="2" markerEnd="url(#lb-arrow)">
        <line x1="360" y1="120" x2="440" y2="75" />
        <line x1="360" y1="150" x2="440" y2="150" />
        <line x1="360" y1="180" x2="440" y2="225" />
      </g>
    </svg>
  );
}
