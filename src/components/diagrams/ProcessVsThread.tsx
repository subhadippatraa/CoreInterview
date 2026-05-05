export function ProcessVsThread() {
  return (
    <svg viewBox="0 0 800 350" className="w-full h-auto bg-[var(--color-bg3)] rounded-xl border border-[var(--color-border)] p-4">
      {/* Process 1 */}
      <rect x="50" y="50" width="300" height="250" rx="12" fill="var(--color-bg2)" stroke="var(--color-border2)" strokeWidth="2" strokeDasharray="4 4" />
      <text x="200" y="80" textAnchor="middle" fill="var(--color-text)" className="font-heading font-bold text-lg">Process 1</text>
      <text x="200" y="100" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">Isolated Memory Space</text>

      {/* Process 1 - Threads */}
      <rect x="80" y="120" width="100" height="80" rx="8" fill="var(--color-bg4)" stroke="var(--color-accent)" strokeWidth="2" />
      <text x="130" y="165" textAnchor="middle" fill="var(--color-accent)" className="font-heading font-bold">Thread A</text>
      
      <rect x="220" y="120" width="100" height="80" rx="8" fill="var(--color-bg4)" stroke="var(--color-accent)" strokeWidth="2" />
      <text x="270" y="165" textAnchor="middle" fill="var(--color-accent)" className="font-heading font-bold">Thread B</text>

      {/* Shared Heap */}
      <rect x="80" y="220" width="240" height="60" rx="6" fill="rgba(91,127,255,0.1)" stroke="var(--color-accent)" strokeWidth="1" />
      <text x="200" y="255" textAnchor="middle" fill="var(--color-text)" className="font-dm text-sm">Shared Heap / Data</text>

      {/* Process 2 */}
      <rect x="450" y="50" width="300" height="250" rx="12" fill="var(--color-bg2)" stroke="var(--color-border2)" strokeWidth="2" strokeDasharray="4 4" />
      <text x="600" y="80" textAnchor="middle" fill="var(--color-text)" className="font-heading font-bold text-lg">Process 2</text>
      <text x="600" y="100" textAnchor="middle" fill="var(--color-text2)" className="font-dm text-xs">Isolated Memory Space</text>

      {/* Process 2 - Threads */}
      <rect x="550" y="120" width="100" height="80" rx="8" fill="var(--color-bg4)" stroke="var(--color-green)" strokeWidth="2" />
      <text x="600" y="165" textAnchor="middle" fill="var(--color-green)" className="font-heading font-bold">Thread C</text>

      {/* Shared Heap */}
      <rect x="480" y="220" width="240" height="60" rx="6" fill="rgba(62,207,142,0.1)" stroke="var(--color-green)" strokeWidth="1" />
      <text x="600" y="255" textAnchor="middle" fill="var(--color-text)" className="font-dm text-sm">Shared Heap / Data</text>

      {/* IPC Arrow */}
      <defs>
        <marker id="ipc-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-amber)" />
        </marker>
        <marker id="ipc-arrow-rev" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="10 0, 0 3.5, 10 7" fill="var(--color-amber)" />
        </marker>
      </defs>
      <path d="M 360 175 C 390 150, 410 150, 440 175" fill="none" stroke="var(--color-amber)" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#ipc-arrow)" markerStart="url(#ipc-arrow-rev)" />
      <text x="400" y="145" textAnchor="middle" fill="var(--color-amber)" className="font-dm text-xs font-bold">IPC (Slow)</text>
    </svg>
  );
}
