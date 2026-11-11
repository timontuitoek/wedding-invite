import React, { useState } from 'react';

/**
 * Highlight text matching search query
 */
const highlightText = (text, query) => {
  if (!query) return text;
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-rose-200 text-sage-900 px-1 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

/**
 * Apple-style Accordion component
 */
function Accordion({ items, className = '', highlightQuery = '' }) {
  const [openIndex, setOpenIndex] = useState(null);
  
  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="modern-panel mb-4 overflow-hidden rounded-2xl">
          <button
            onClick={() => toggle(index)}
            className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/40"
          >
            <span className="font-medium text-sage-900">
              {highlightQuery ? highlightText(item.title, highlightQuery) : item.title}
            </span>
            <svg
              className={`w-5 h-5 text-sage-500 transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === index && (
            <div className="animate-slide-up border-t border-ivory-200 bg-white/25 px-6 py-5">
              <p className="text-sage-700">
                {highlightQuery ? highlightText(item.content, highlightQuery) : item.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Accordion;
