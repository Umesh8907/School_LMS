// components/Tabs.tsx
'use client'
import { useState } from 'react';

// data.ts
export interface KeyPoint {
  id: number;
  title: string;
  description: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface Suggestion {
  id: number;
  suggestion: string;
}

export const keyPoints: KeyPoint[] = [
  { id: 1, title: "HTML", description: "The foundational structure of web pages." },
  { id: 2, title: "CSS", description: "Used to style web pages and make them visually appealing." },
  { id: 3, title: "JavaScript", description: "Adds interactivity and dynamic behavior to websites." },
  { id: 4, title: "Responsive Design", description: "Ensures websites work on all device sizes." },
];

export const faqs: FAQ[] = [
  { id: 1, question: "What is HTML?", answer: "HTML is a markup language for creating web pages." },
  { id: 2, question: "What is CSS?", answer: "CSS is a stylesheet language used to describe the presentation of a document." },
  { id: 3, question: "Why is JavaScript important?", answer: "JavaScript allows developers to create dynamic and interactive websites." },
  { id: 4, question: "What is responsive design?", answer: "Responsive design ensures a website looks good on all devices." },
];

export const suggestions: Suggestion[] = [
  { id: 1, suggestion: "Consider using a CSS framework like Tailwind for faster design." },
  { id: 2, suggestion: "Try adding animations to make the site feel more dynamic." },
  { id: 3, suggestion: "Improve performance by optimizing images and minifying assets." },
];

type Tab = 'keyPoints' | 'faqs' | 'suggestions';

const TabsDemo = () => {
  const [activeTab, setActiveTab] = useState<Tab>('keyPoints');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id); // Toggle open/close FAQ
  };

  return (
    <div className="w-full   mx-auto p-4 rounded-lg">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab('keyPoints')}
          className={` py-3 px-4 text-sm font-medium text-center transition-colors duration-200 ${
            activeTab === 'keyPoints' ? 'border-b-4 border-[#b955aa] text-[#b955aa]' : 'text-gray-500 hover:text-[#b955aa]'
          }`}
        >
          Key Points
        </button>
        <button
          onClick={() => setActiveTab('suggestions')}
          className={` py-3 px-4 text-sm font-medium text-center transition-colors duration-200 ${
            activeTab === 'suggestions' ? 'border-b-4 border-[#b955aa] text-[#b955aa]' : 'text-gray-500 hover:text-[#b955aa]'
          }`}
        >
          Suggestions
        </button>
        <button
          onClick={() => setActiveTab('faqs')}
          className={`py-3 px-4 text-sm font-medium text-center transition-colors duration-200 ${
            activeTab === 'faqs' ? 'border-b-4 border-[#b955aa] text-[#b955aa]' : 'text-gray-500 hover:text-[#b955aa]'
          }`}
        >
          FAQs
        </button>
       
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'keyPoints' && (
          <div>
            {keyPoints.map((point: KeyPoint) => (
              <div key={point.id} className="mb-4 p-3 bg-gray-50 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
              </div>
            ))}
          </div>
        )}
         {activeTab === 'suggestions' && (
          <div>
            {suggestions.map((suggestion: Suggestion) => (
              <div key={suggestion.id} className="mb-4 p-3 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-gray-600">{suggestion.suggestion}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'faqs' && (
          <div>
            {faqs.map((faq: FAQ) => (
              <div key={faq.id} className="mb-4">
                <div
                  onClick={() => toggleFAQ(faq.id)}
                  className="p-3 bg-gray-100 rounded-lg cursor-pointer shadow-sm flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                  <span>{openFAQ === faq.id ? '-' : '+'}</span>
                </div>
                {openFAQ === faq.id && (
                  <div className="p-3 bg-gray-50 rounded-lg shadow-sm mt-2">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
       
      </div>
    </div>
  );
};

export default TabsDemo;
