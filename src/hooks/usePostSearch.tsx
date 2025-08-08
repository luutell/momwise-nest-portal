import { useState, useMemo } from 'react';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  image_url?: string;
  introduction?: string;
  practical_tip?: string;
}

interface SearchResult {
  post: Post;
  matchedSentences: string[];
}

export function usePostSearch(posts: Post[] = []) {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm.trim() || !posts.length) return [];
    
    const keyword = searchTerm.toLowerCase().trim();
    const results: SearchResult[] = [];
    
    posts.forEach(post => {
      // Combine all searchable text
      const searchableText = [
        post.title,
        post.content,
        post.introduction || '',
        post.practical_tip || ''
      ].join(' ');
      
      // Split into sentences and find matches
      const sentences = searchableText
        .split(/[.!?]+/)
        .map(s => s.trim())
        .filter(s => s.length > 0);
      
      const matchedSentences: string[] = [];
      
      sentences.forEach(sentence => {
        if (sentence.toLowerCase().includes(keyword)) {
          // Highlight the keyword in bold
          const highlightedSentence = sentence.replace(
            new RegExp(`(${keyword})`, 'gi'),
            '<strong>$1</strong>'
          );
          matchedSentences.push(highlightedSentence);
        }
      });
      
      // Get the last 3 occurrences
      if (matchedSentences.length > 0) {
        results.push({
          post,
          matchedSentences: matchedSentences.slice(-3)
        });
      }
    });
    
    return results;
  }, [posts, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    hasResults: searchResults.length > 0,
    isSearching: searchTerm.trim().length > 0
  };
}