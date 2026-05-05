export function MiddlewarePipeline() {
  return (
    <svg viewBox="0 0 800 300" className="w-full h-auto bg-[var(--color-bg3)] rounded-xl border border-[var(--color-border)] p-4">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-accent)" />
        </marker>
        <marker id="arrowhead-back" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="10 0, 0 3.5, 10 7" fill="var(--color-purple)" />
        </marker>
      </defs>

      {/* Client */}
      <rect x="50" y="100" width="100" height="100" rx="8" fill="var(--color-bg4)" stroke="var(--color-border2)" strokeWidth="2" />
      <text x="100" y="155" textAnchor="middle" fill="var(--color-text)" className="font-heading font-bold text-lg">Client</text>

      {/* Middleware 1 */}
      <rect x="250" y="50" width="120" height="200" rx="8" fill="var(--color-bg2)" stroke="var(--color-accent)" strokeWidth="2" />
      <text x="310" y="80" textAnchor="middle" fill="var(--color-accent)" className="font-heading font-bold">Middleware 1</text>
      <text x="310" y="110" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-sm">Auth</text>

      {/* Middleware 2 */}
      <rect x="420" y="70" width="120" height="160" rx="8" fill="var(--color-bg2)" stroke="var(--color-green)" strokeWidth="2" />
      <text x="480" y="100" textAnchor="middle" fill="var(--color-green)" className="font-heading font-bold">Middleware 2</text>
      <text x="480" y="130" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-sm">Logging</text>

      {/* Endpoint */}
      <rect x="590" y="90" width="120" height="120" rx="8" fill="var(--color-bg2)" stroke="var(--color-amber)" strokeWidth="2" />
      <text x="650" y="140" textAnchor="middle" fill="var(--color-amber)" className="font-heading font-bold">Endpoint</text>
      <text x="650" y="165" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-sm">Controller</text>

      {/* Request Arrows (Forward) */}
      <line x1="150" y1="120" x2="240" y2="120" stroke="var(--color-accent)" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="4 2" />
      <text x="195" y="110" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">Request</text>
      
      <line x1="370" y1="120" x2="410" y2="120" stroke="var(--color-accent)" strokeWidth="2" markerEnd="url(#arrowhead)" />
      <text x="390" y="110" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">next()</text>

      <line x1="540" y1="120" x2="580" y2="120" stroke="var(--color-accent)" strokeWidth="2" markerEnd="url(#arrowhead)" />
      <text x="560" y="110" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">next()</text>

      {/* Response Arrows (Backward) */}
      <line x1="580" y1="180" x2="550" y2="180" stroke="var(--color-purple)" strokeWidth="2" markerEnd="url(#arrowhead-back)" />
      
      <line x1="410" y1="180" x2="380" y2="180" stroke="var(--color-purple)" strokeWidth="2" markerEnd="url(#arrowhead-back)" />

      <line x1="240" y1="180" x2="160" y2="180" stroke="var(--color-purple)" strokeWidth="2" markerEnd="url(#arrowhead-back)" strokeDasharray="4 2" />
      <text x="195" y="200" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">Response</text>
    </svg>
  );
}
