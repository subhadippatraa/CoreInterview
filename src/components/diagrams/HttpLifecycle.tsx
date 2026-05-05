export function HttpLifecycle() {
  return (
    <svg viewBox="0 0 800 300" className="w-full h-auto bg-[var(--color-bg3)] rounded-xl border border-[var(--color-border)] p-4">
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-accent)" />
        </marker>
        <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-green)" />
        </marker>
      </defs>

      {/* Client */}
      <rect x="50" y="100" width="100" height="100" rx="8" fill="var(--color-bg4)" stroke="var(--color-border2)" strokeWidth="2" />
      <text x="100" y="155" textAnchor="middle" fill="var(--color-text)" className="font-heading font-bold text-lg">Browser</text>

      {/* DNS */}
      <rect x="250" y="30" width="100" height="60" rx="8" fill="var(--color-bg2)" stroke="var(--color-amber)" strokeWidth="2" />
      <text x="300" y="65" textAnchor="middle" fill="var(--color-amber)" className="font-heading font-bold">DNS</text>

      {/* Load Balancer */}
      <rect x="350" y="120" width="100" height="60" rx="8" fill="var(--color-bg2)" stroke="var(--color-purple)" strokeWidth="2" />
      <text x="400" y="155" textAnchor="middle" fill="var(--color-purple)" className="font-heading font-bold">Load Balancer</text>

      {/* Server */}
      <rect x="550" y="100" width="100" height="100" rx="8" fill="var(--color-bg2)" stroke="var(--color-green)" strokeWidth="2" />
      <text x="600" y="155" textAnchor="middle" fill="var(--color-green)" className="font-heading font-bold">Server</text>

      {/* Paths */}
      {/* 1. DNS Lookup */}
      <path d="M 120 100 Q 180 60 240 60" fill="none" stroke="var(--color-amber)" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="4 4" />
      <text x="180" y="70" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">1. Lookup IP</text>
      
      {/* 2. TCP/TLS */}
      <line x1="150" y1="130" x2="340" y2="130" stroke="var(--color-purple)" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="250" y="120" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">2. TCP Handshake</text>

      {/* 3. HTTP Req */}
      <line x1="150" y1="150" x2="340" y2="150" stroke="var(--color-accent)" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="250" y="145" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">3. HTTP GET</text>

      {/* LB to Server */}
      <line x1="450" y1="150" x2="540" y2="150" stroke="var(--color-accent)" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="495" y="145" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">Forward</text>

      {/* 4. Response */}
      <line x1="550" y1="170" x2="160" y2="170" stroke="var(--color-green)" strokeWidth="2" markerEnd="url(#arrow-green)" />
      <text x="350" y="190" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">4. HTTP 200 OK (HTML)</text>
    </svg>
  );
}
