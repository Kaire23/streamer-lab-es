import { useMemo } from 'react';

interface ContentRendererProps {
  content: string;
}

const ContentRenderer = ({ content }: ContentRendererProps) => {
  const processedContent = useMemo(() => {
    // Process markdown-like content for basic formatting
    let processed = content;
    
    // Convert headers
    processed = processed.replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">$1</h3>');
    processed = processed.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-10">$1</h2>');
    processed = processed.replace(/^#### (.*$)/gm, '<h4 class="text-lg font-medium text-gray-900 dark:text-white mb-3 mt-6">$1</h4>');
    
    // Convert bold text
    processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>');
    
    // Convert links (preserve Amazon affiliate links)
    processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Convert lists
    processed = processed.replace(/^- (.*$)/gm, '<li class="text-gray-700 dark:text-gray-300 mb-2">• $1</li>');
    
    // Convert paragraphs
    processed = processed.replace(/^(?!<[h|l|s])(.*$)/gm, (match, content) => {
      if (content.trim() === '') return '<br>';
      if (content.startsWith('<')) return match;
      return `<p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">${content}</p>`;
    });
    
    // Wrap lists
    processed = processed.replace(/(<li class="[^"]*">.*?<\/li>\s*)+/gs, '<ul class="space-y-2 mb-6 ml-6">$&</ul>');
    
    return processed;
  }, [content]);

  return (
    <div 
      className="prose prose-lg max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};

export default ContentRenderer;