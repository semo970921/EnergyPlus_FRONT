import React, { useState } from "react";
import "./css/faq.css";
import faqCategories from "./data/faqData"; // 경로는 위치에 맞게 수정

const Faq = () => {
  const [selectedTab, setSelectedTab] = useState("회원/로그인");
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const currentFaqList = faqCategories[selectedTab];

  return (
    <div className="faq-container">
      <h1 className="page-title">자주 묻는 질문</h1>

      <div className="faq-tabs">
        {Object.keys(faqCategories).map((tab) => (
          <button
            key={tab}
            className={`faq-tab-button ${tab === selectedTab ? "active" : ""}`}
            onClick={() => {
              setSelectedTab(tab);
              setActiveIndex(null);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {currentFaqList.map((item, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleAnswer(index)}>
            <em className="qna-mark">Q.</em> {item.question}
          </div>
          {activeIndex === index && (
            <div className="faq-answer">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;
