export function DIFlow() {
  return (
    <svg viewBox="0 0 800 350" className="w-full h-auto bg-[var(--color-bg3)] rounded-xl border border-[var(--color-border)] p-4">
      {/* DI Container */}
      <rect x="50" y="50" width="160" height="250" rx="12" fill="var(--color-bg2)" stroke="var(--color-purple)" strokeWidth="2" />
      <text x="130" y="90" textAnchor="middle" fill="var(--color-purple)" className="font-heading font-bold text-lg">DI Container</text>
      
      <rect x="70" y="110" width="120" height="40" rx="4" fill="var(--color-bg4)" stroke="var(--color-border2)" />
      <text x="130" y="135" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">Singleton</text>
      
      <rect x="70" y="160" width="120" height="40" rx="4" fill="var(--color-bg4)" stroke="var(--color-border2)" />
      <text x="130" y="185" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">Scoped</text>
      
      <rect x="70" y="210" width="120" height="40" rx="4" fill="var(--color-bg4)" stroke="var(--color-border2)" />
      <text x="130" y="235" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">Transient</text>

      {/* Controller */}
      <rect x="350" y="150" width="140" height="80" rx="8" fill="var(--color-bg2)" stroke="var(--color-accent)" strokeWidth="2" />
      <text x="420" y="185" textAnchor="middle" fill="var(--color-accent)" className="font-heading font-bold text-md">UserController</text>
      <text x="420" y="210" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">Needs IUserService</text>

      {/* Service */}
      <rect x="600" y="90" width="140" height="80" rx="8" fill="var(--color-bg2)" stroke="var(--color-green)" strokeWidth="2" />
      <text x="670" y="125" textAnchor="middle" fill="var(--color-green)" className="font-heading font-bold text-md">UserService</text>
      <text x="670" y="150" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">Needs IDbContext</text>

      {/* DbContext */}
      <rect x="600" y="220" width="140" height="80" rx="8" fill="var(--color-bg2)" stroke="var(--color-amber)" strokeWidth="2" />
      <text x="670" y="255" textAnchor="middle" fill="var(--color-amber)" className="font-heading font-bold text-md">AppDbContext</text>
      
      {/* Arrows */}
      <defs>
        <marker id="di-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-text2)" />
        </marker>
        <marker id="inject-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-accent)" />
        </marker>
      </defs>

      {/* Request resolution */}
      <path d="M 210 190 Q 280 190 350 190" fill="none" stroke="var(--color-accent)" strokeWidth="2" markerEnd="url(#inject-arrow)" strokeDasharray="4 2" />
      <text x="280" y="180" textAnchor="middle" fill="var(--color-accent)" className="font-dm text-xs font-bold">1. Instantiates</text>

      {/* Dependency graph */}
      <path d="M 490 190 Q 545 190 545 130 T 600 130" fill="none" stroke="var(--color-text2)" strokeWidth="2" markerEnd="url(#di-arrow)" />
      <text x="520" y="120" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">2. Injects</text>

      <path d="M 670 170 L 670 220" fill="none" stroke="var(--color-text2)" strokeWidth="2" markerEnd="url(#di-arrow)" />
      <text x="700" y="200" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">3. Injects</text>
    </svg>
  );
}
