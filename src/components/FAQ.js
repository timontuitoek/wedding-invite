import React, { useState } from 'react';
import siteConfig from '../siteConfig';
import Accordion from './ui/Accordion';
import Input from './ui/Input';

function FAQ({ embedded = false }) {
  const [searchQuery, setSearchQuery] = useState('');
  const questions = siteConfig.faq?.questions || [];

  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      id={embedded ? 'faq' : undefined}
      className={`modern-section min-h-screen ${embedded ? 'scroll-mt-20 py-20' : 'pt-28 pb-26'}`}
    >
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-4">
            <h1 className="section-header text-4xl sm:text-title font-semibold text-sage-900">
              {siteConfig.faq?.title || 'Frequently Asked Questions'}
            </h1>
            <button
              onClick={() => window.print()}
              className="no-print px-3 py-2 text-sage-600 hover:text-sage-900 transition-colors"
              aria-label="Print page"
              title="Print FAQs"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>
          </div>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            {siteConfig.faq?.subtitle || 'Everything you need to know'}
          </p>
        </div>

        {/* Search */}
        {questions.length > 0 && (
          <div className="modern-panel mx-auto mb-8 max-w-2xl rounded-2xl p-3">
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        )}

        {/* FAQ Items */}
        {filteredQuestions.length > 0 ? (
          <div className="mx-auto max-w-3xl">
            <Accordion
              items={filteredQuestions.map((q) => ({
                title: q.title,
                content: q.content,
              }))}
              highlightQuery={searchQuery}
            />
          </div>
        ) : questions.length === 0 ? (
          <div className="modern-panel mx-auto max-w-2xl rounded-2xl py-20 text-center">
            <p className="text-sage-600 text-lg">FAQ information coming soon!</p>
          </div>
        ) : (
          <div className="modern-panel mx-auto max-w-2xl rounded-2xl py-20 text-center">
            <p className="text-sage-600 text-lg">No questions found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FAQ;
