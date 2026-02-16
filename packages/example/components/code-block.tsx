'use client';

import { useState, useCallback } from 'react';
import { highlight } from 'sugar-high';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
}

export default function CodeBlock({ code }: CodeBlockProps) {
  const html = highlight(code);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="group relative">
      <pre className="code-block pr-12">
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2.5 right-2.5 flex items-center justify-center w-8 h-8 rounded-md bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
