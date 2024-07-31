import React, { useState } from 'react';
import QuizQuestion from './QuizQuestion';
import Notice from './Notice';

const Quiz = ({ quizData }) => {
    const [score, setScore] = useState(0);
    let scoreValue;
    const [showScore, setShowScore] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(
        Array(quizData.length).fill(null)
    );

    const handleOptionChange = (questionIndex, selectedOption) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[questionIndex] = selectedOption;
        setSelectedOptions(newSelectedOptions);
    };

    const handleSubmit = async () => {
        if (selectedOptions.some(option => option === null)) {
            alert('Please answer all questions before submitting.');
            return;
        }
        let newScore = 0;
        selectedOptions.forEach((option, index) => {
            if (option === quizData[index].correctAnswer) {
                newScore += 1;
            }
        });
        setScore(newScore);
        setShowScore(true);

         scoreValue = (newScore / quizData.length) * 100;
    };

    return (
        <div className="quiz-app">
            {showScore ? (
                <Notice score={scoreValue} />
            ) : (
                <div className="py-[50px] h-screen flex flex-col bg-dark">
                    <div className="container mx-auto flex flex-col justify-center h-full">
                        <h1 className="text-5xl mb-12 text-center font-bold text-dark100">İmtahan</h1>
                        <div className="flex-grow overflow-y-auto scrollbar mb-6">
                            {quizData.map((questionData, index) => (
                                <QuizQuestion
                                    key={index}
                                    questionIndex={index}
                                    questionData={questionData}
                                    handleOptionChange={handleOptionChange}
                                    selectedOption={selectedOptions[index]}
                                />
                            ))}
                            <div className="py-12 flex justify-center">
                                <button
                                    onClick={handleSubmit}
                                    className="w-64 font-semibold text-xl bg-light200 text-darkblack mb-6 h-[60px] rounded-[10px] hover:scale-95 transition-all duration-200">
                                    İmtahanı Bitir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Quiz;
