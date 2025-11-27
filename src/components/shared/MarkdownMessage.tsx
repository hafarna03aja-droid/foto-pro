import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownMessageProps {
  content: string;
  searchQuery?: string;
}

const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ content, searchQuery }) => {
  // Highlight search text
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part) =>
      part.toLowerCase() === query.toLowerCase()
        ? `<mark class="bg-yellow-300 dark:bg-yellow-600 rounded px-1">${part}</mark>`
        : part
    ).join('');
  };

  // Process content with search highlighting
  const processedContent = searchQuery ? highlightText(content, searchQuery) : content;

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings
          h1: ({ node: _node, ...props }) => (
            <h1 className="text-2xl font-bold mb-4 mt-6 text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2" {...props} />
          ),
          h2: ({ node: _node, ...props }) => (
            <h2 className="text-xl font-bold mb-3 mt-5 text-gray-900 dark:text-white" {...props} />
          ),
          h3: ({ node: _node, ...props }) => (
            <h3 className="text-lg font-semibold mb-2 mt-4 text-gray-800 dark:text-gray-100" {...props} />
          ),
          h4: ({ node: _node, ...props }) => (
            <h4 className="text-base font-semibold mb-2 mt-3 text-gray-800 dark:text-gray-100" {...props} />
          ),

          // Paragraphs
          p: ({ node: _node, ...props }) => (
            <p className="mb-3 leading-relaxed text-gray-700 dark:text-gray-200" {...props} />
          ),

          // Lists
          ul: ({ node: _node, ...props }) => (
            <ul className="list-disc list-inside mb-3 space-y-1 text-gray-700 dark:text-gray-200" {...props} />
          ),
          ol: ({ node: _node, ...props }) => (
            <ol className="list-decimal list-inside mb-3 space-y-1 text-gray-700 dark:text-gray-200" {...props} />
          ),
          li: ({ node: _node, ...props }) => (
            <li className="ml-4" {...props} />
          ),

          // Code
          code: ({ node: _node, inline, ...props }: any) =>
            inline ? (
              <code className="bg-gray-100 dark:bg-gray-700 text-teal-600 dark:text-teal-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
            ) : (
              <code className="block bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono mb-3" {...props} />
            ),
          pre: ({ node: _node, ...props }) => (
            <pre className="bg-gray-900 dark:bg-gray-950 rounded-lg mb-3 overflow-hidden" {...props} />
          ),

          // Blockquote
          blockquote: ({ node: _node, ...props }) => (
            <blockquote className="border-l-4 border-teal-500 pl-4 py-2 mb-3 italic bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300" {...props} />
          ),

          // Links
          a: ({ node: _node, ...props }) => (
            <a className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 underline" target="_blank" rel="noopener noreferrer" {...props} />
          ),

          // Tables
          table: ({ node: _node, ...props }) => (
            <div className="overflow-x-auto mb-3">
              <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg" {...props} />
            </div>
          ),
          thead: ({ node: _node, ...props }) => (
            <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
          ),
          th: ({ node: _node, ...props }) => (
            <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600" {...props} />
          ),
          td: ({ node: _node, ...props }) => (
            <td className="px-4 py-2 text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700" {...props} />
          ),

          // Horizontal Rule
          hr: ({ node: _node, ...props }) => (
            <hr className="my-6 border-t-2 border-gray-300 dark:border-gray-600" {...props} />
          ),

          // Strong/Bold
          strong: ({ node: _node, ...props }) => (
            <strong className="font-bold text-gray-900 dark:text-white" {...props} />
          ),

          // Emphasis/Italic
          em: ({ node: _node, ...props }) => (
            <em className="italic text-gray-800 dark:text-gray-100" {...props} />
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownMessage;
