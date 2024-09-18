"use client";
import { useCourse } from "@/context/CourseContext";
import { useState } from "react";

const TabsDemo = () => {
  const { activeChapter } = useCourse();

  const [tab, setTab] = useState("keyPoints");

  if (!activeChapter) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>No chapter selected or available</p>
      </div>
    );
  }

  return (
    <div className="w-full   mx-auto p-4 rounded-lg">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setTab('keyPoints')}
          className={` py-3 px-4 text-sm font-medium text-center transition-colors duration-200 ${
            tab === 'keyPoints' ? 'border-b-4 border-[#b955aa] text-[#b955aa]' : 'text-gray-500 hover:text-[#b955aa]'
          }`}
        >
          Key Points
        </button>
     
        <button
          onClick={() => setTab('suggestions')}
          className={` py-3 px-4 text-sm font-medium text-center transition-colors duration-200 ${
            tab === 'suggestions' ? 'border-b-4 border-[#b955aa] text-[#b955aa]' : 'text-gray-500 hover:text-[#b955aa]'
          }`}
        >
          Suggestions
        </button>
     
        <button
          onClick={() => setTab('faqs')}
          className={` py-3 px-4 text-sm font-medium text-center transition-colors duration-200 ${
            tab === 'faqs' ? 'border-b-4 border-[#b955aa] text-[#b955aa]' : 'text-gray-500 hover:text-[#b955aa]'
          }`}
        >
          FAQs
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tab === 'keyPoints' && (
          <div>
            {activeChapter.keyPoints?.map((point: string, index: number) => (
              <div key={index} className="mb-4 p-3 bg-gray-50 rounded-lg shadow-sm">
                
                <p className="text-gray-600">{point}</p>
              </div>
            ))}
          </div>
        )}
         {tab === 'suggestions' && (
          <div>
            {activeChapter.suggestions?.map((suggestion: string, index: number) => (
              <div key={index} className="mb-4 p-3 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-gray-600">{suggestion}</p>
              </div>
            ))}
          </div>
        )}
       {tab === "faqs" && (
          <div>
            <h3 className="text-lg font-semibold">FAQs</h3>
            <ul className="list-disc pl-5">
              {activeChapter.faQs?.map(
                (faq: { question: string; answer: string }, index: number) => (
                  <li key={index}>
                    <strong>{faq.question}</strong>: {faq.answer}
                  </li>
                )
              ) || <li>No FAQs available</li>}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabsDemo;
