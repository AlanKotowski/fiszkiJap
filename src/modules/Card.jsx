import { useState } from "react";
import { FaCheck, FaTimes, FaRandom } from "react-icons/fa";

export default function Card({ cards, wrongWords, onCorrect, mode }) {
  const [index, setIndex] = useState(() => {
    const valid = cards.filter((c) => wrongWords.includes(c.id));
    return valid.length > 0 ? Math.floor(Math.random() * valid.length) : 0;
  });
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);

  const availableCards = cards.filter((c) => wrongWords.includes(c.id));
  const currentCard = availableCards[index] || null;

  const handleNext = () => {
    if (availableCards.length <= 1) {
      setIndex(0);
    } else {
      let newIndex = index;
      while (newIndex === index) {
        newIndex = Math.floor(Math.random() * availableCards.length);
      }
      setIndex(newIndex);
    }
    setInputValue("");
    setIsCorrect(null);
    setHasChecked(false);
  };

  const handleClickOrEnter = () => {
    if (!hasChecked) {
      const correctAnswer =
        mode === "pol-romanji" ? currentCard.jap : currentCard.pol;
      const correct =
        inputValue.trim().toLowerCase() === correctAnswer.toLowerCase();
      setIsCorrect(correct);
      setHasChecked(true);
    } else {
      if (isCorrect) onCorrect(currentCard.id);
      handleNext();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleClickOrEnter();
  };

  if (!currentCard) {
    return (
      <div className="text-center mt-10 text-2xl font-extrabold text-white">
        Wszystkie słowa opanowane!
      </div>
    );
  }

  const textClass = "text-2xl md:text-3xl font-extrabold text-center";

  return (
    <div className="card relative mx-auto bg-gray-400 text-black md:rounded-xl border-2 border-black p-6 text-center w-full max-w-md min-h-[12rem] flex flex-col justify-center items-center space-y-4">
      <span className="absolute top-2 right-3 text-sm text-gray-500">
        {currentCard.id}
      </span>

      <div className="w-full">
        <h1 className={`${textClass} break-words`}>
          {mode === "pol-romanji" ? currentCard.pol : currentCard.kana}
        </h1>
      </div>

      {isCorrect === true && (
        <div className="flex justify-center items-center text-green-700">
          <h1 className={textClass}>
            {mode === "pol-romanji" ? currentCard.jap : currentCard.pol}
          </h1>
          <FaCheck className="ml-2" />
        </div>
      )}
      {isCorrect === false && (
        <div className="flex justify-center items-center text-red-700">
          <h1 className={textClass}>
            {mode === "pol-romanji" ? currentCard.jap : currentCard.pol}
          </h1>
          <FaTimes className="ml-2" />
        </div>
      )}
      {isCorrect === null && (
        <div className="text-gray-400 italic select-none">•••</div>
      )}

      <div className="flex justify-center items-center gap-2 w-full mt-2">
        <input
          autoFocus
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`border-2 border-black bg-gray-300 px-2 py-1 text-center rounded-md focus:outline-none w-2/3 max-w-full ${textClass} ${
            isCorrect === true
              ? "bg-green-100 text-green-700 border-green-700"
              : isCorrect === false
              ? "bg-red-100 text-red-700 border-red-700"
              : ""
          }`}
        />
        <button
          onClick={handleClickOrEnter}
          className="hover:cursor-pointer bg-gray-400 px-3 py-2 rounded-md border-2 border-black w-auto hover:bg-gray-500 flex items-center justify-center"
        >
          {!hasChecked ? <FaCheck /> : <FaRandom />}
        </button>
      </div>
    </div>
  );
}
