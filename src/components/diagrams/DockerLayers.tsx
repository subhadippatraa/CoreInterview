export function DockerLayers() {
  return (
    <svg viewBox="0 0 800 350" className="w-full h-auto bg-[var(--color-bg3)] rounded-xl border border-[var(--color-border)] p-4">
      {/* Docker Image (Read-Only) */}
      <g stroke="var(--color-border2)" strokeWidth="2">
        <rect x="100" y="240" width="200" height="40" fill="var(--color-bg4)" />
        <rect x="100" y="200" width="200" height="40" fill="var(--color-bg4)" />
        <rect x="100" y="160" width="200" height="40" fill="var(--color-bg4)" />
        <rect x="100" y="120" width="200" height="40" fill="var(--color-bg4)" />
      </g>
      
      <g fill="var(--color-text)" className="font-dm text-sm font-medium" textAnchor="middle">
        <text x="200" y="265">Base OS (Alpine)</text>
        <text x="200" y="225">Dependencies</text>
        <text x="200" y="185">Source Code</text>
        <text x="200" y="145">Entrypoint</text>
      </g>

      <text x="200" y="310" textAnchor="middle" fill="var(--color-accent)" className="font-heading font-bold text-lg">Docker Image</text>
      <text x="200" y="330" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">(Read-Only Layers)</text>

      {/* Arrow */}
      <defs>
        <marker id="run-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-accent)" />
        </marker>
      </defs>
      <line x1="350" y1="180" x2="450" y2="180" stroke="var(--color-accent)" strokeWidth="3" markerEnd="url(#run-arrow)" />
      <text x="400" y="170" textAnchor="middle" fill="var(--color-accent)" className="font-dm text-sm font-bold">docker run</text>

      {/* Docker Container (Read-Write) */}
      <g stroke="var(--color-green)" strokeWidth="2" strokeDasharray="4 4">
        <rect x="500" y="80" width="200" height="200" fill="rgba(62,207,142,0.05)" rx="8" />
      </g>

      {/* R/W Layer */}
      <rect x="520" y="100" width="160" height="40" fill="var(--color-bg2)" stroke="var(--color-green)" strokeWidth="2" />
      <text x="600" y="125" textAnchor="middle" fill="var(--color-green)" className="font-heading font-bold text-sm">Container Layer (R/W)</text>

      {/* Image Layers Inside Container */}
      <g stroke="var(--color-border2)" strokeWidth="2" fill="var(--color-bg4)" opacity="0.6">
        <rect x="520" y="150" width="160" height="30" />
        <rect x="520" y="180" width="160" height="30" />
        <rect x="520" y="210" width="160" height="30" />
        <rect x="520" y="240" width="160" height="30" />
      </g>

      <text x="600" y="310" textAnchor="middle" fill="var(--color-green)" className="font-heading font-bold text-lg">Running Container</text>
      <text x="600" y="330" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">(Isolated Instance)</text>
    </svg>
  );
}
