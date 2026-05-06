import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline';

interface CodeBlockProps {
  codeString: string;
  defaultLanguage?: string;
}

export function CodeBlock({ codeString, defaultLanguage = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Map section IDs to language
  const mapSectionToLanguage = (section: string) => {
    if (section.includes('sql')) return 'sql';
    if (section.includes('csharp')) return 'csharp';
    if (section.includes('dotnet')) return 'csharp';
    if (section.includes('efcore')) return 'csharp';
    if (section.includes('aspnet')) return 'csharp';
    if (section.includes('js') || section.includes('javascript')) return 'javascript';
    if (section.includes('react')) return 'tsx';
    return section;
  };

  // Extract language from markdown block
  let code = codeString.trim();
  let language = mapSectionToLanguage(defaultLanguage);

  // If it starts with ```, extract it
  if (code.startsWith('```')) {
    const lines = code.split('\n');
    const firstLine = lines[0];
    language = firstLine.replace('```', '').trim() || 'tsx';
    
    // Some basic mapping
    if (language === 'c#') language = 'csharp';
    
    // Remove first and last lines
    code = lines.slice(1, -1).join('\n');
  }
  
  // Unescape html entities that might have been stored in JSON
  code = code
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-[var(--color-border)] bg-[#1e1e1e] my-4 shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#252526]">
        <div className="flex items-center gap-2">
          {/* Mac-like dots */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="ml-2 text-xs font-mono text-[var(--color-text3)] uppercase tracking-wider">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all"
          title="Copy code"
        >
          {copied ? (
            <CheckIcon className="w-4 h-4 text-green-400" />
          ) : (
            <DocumentDuplicateIcon className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="p-4 overflow-x-auto nice-scrollbar bg-[#1e1e1e]">
        <Highlight theme={themes.vsDark} code={code} language={language as any}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} font-mono text-[13px] leading-relaxed`} style={{ ...style, backgroundColor: 'transparent' }}>
              {tokens.map((line, i) => {
                const lineContent = line.map(t => t.content).join('');
                
                // Diff style logic (if starts with + or -)
                const isAddition = language === 'diff' ? lineContent.startsWith('+') : false;
                const isDeletion = language === 'diff' ? lineContent.startsWith('-') : false;
                
                let lineClass = 'px-1 py-0.5 rounded-sm border-l-2 border-transparent transition-colors ';
                if (isAddition || lineContent.trim().startsWith('// +')) {
                  lineClass = 'bg-green-500/10 border-green-500 -mx-4 px-5 ';
                } else if (isDeletion || lineContent.trim().startsWith('// -')) {
                  lineClass = 'bg-red-500/10 border-red-500 -mx-4 px-5 ';
                }

                // Small trick to mimic hover on lines for better reading
                lineClass += ' hover:bg-white/5';
                
                return (
                  <div key={i} {...getLineProps({ line, key: i })} className={lineClass}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
