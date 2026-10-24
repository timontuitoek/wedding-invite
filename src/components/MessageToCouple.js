import React from 'react';
import Card from './ui/Card';

function MessageToCouple() {
  return (
    <main className="min-h-screen bg-ivory-50 pt-28 pb-26">
      <div className="section-container">
        <div className="text-center mb-12">
          <h1 className="section-header text-4xl sm:text-title font-semibold text-sage-900">
            Message to the Couple
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            We would love to hear from you. A message form will be added here soon.
          </p>
        </div>
        <Card className="max-w-2xl mx-auto p-8 text-center">
          <p className="text-sage-700">
            Please check back soon to share your wishes with us.
          </p>
        </Card>
      </div>
    </main>
  );
}

export default MessageToCouple;
