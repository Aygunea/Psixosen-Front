import React from 'react';

const QuizQuestion = ({ questionData, questionIndex, handleOptionChange, selectedOption }) => {
  const { question, options } = questionData;

  return (
    <div className="quiz-question">
      <h3 className='text-[#EBEBEB] mb-3'>{questionIndex + 1}. {question}</h3>
      <ul className='mb-9'>
        {options.map((option, index) => (
          <li key={index}>
            <label className='text-[#EBEBEB]'>
              <input
                type="radio"
                className='mr-2'
                name={`question-${questionIndex}`}
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(questionIndex, option)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizQuestion;
