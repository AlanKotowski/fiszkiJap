import { useState, useEffect, useCallback, useMemo } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function Card({ cards, wrongWords: propWrongWords, onCorrect }) {
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const availableCards = useMemo(() => {
    const validWrongWords = Array.isArray(propWrongWords) ? propWrongWords : [];
    return cards.filter((c) => validWrongWords.includes(c.id));
  }, [cards, propWrongWords]);

  const currentCard =
    availableCards.length > 0
      ? availableCards[index % availableCards.length]
      : null;

  const resetState = useCallback(() => {
    setInputValue("");
    setIsCorrect(null);
  }, []);

  const randomCard = useCallback(() => {
    if (availableCards.length === 0) return;

    let newIndex;
    if (availableCards.length === 1) {
      newIndex = 0;
    } else {
      do {
        newIndex = Math.floor(Math.random() * availableCards.length);
      } while (newIndex === index);
    }

    setIndex(newIndex);
    resetState();
  }, [availableCards, index, resetState]);

  useEffect(() => {
    if (availableCards.length > 0) {
      const firstIndex = Math.floor(Math.random() * availableCards.length);
      setIndex(firstIndex);
    }
  }, [availableCards.length]);

  const handleCheck = () => {
    if (!currentCard || inputValue.trim() === "") return;

    setIsCorrect(
      inputValue.trim().toLowerCase() === currentCard.jap.toLowerCase()
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (isCorrect === null) {
        handleCheck();
      } else {
        if (isCorrect) onCorrect(currentCard.id);
        randomCard();
      }
    }
  };

  const checkInput = () => {
    if (isCorrect === null) {
        handleCheck();
      } else {
        if (isCorrect) onCorrect(currentCard.id);
        randomCard();
      }
  }

  if (!currentCard) {
    return (
      <div className="text-center mt-10 text-xl font-bold text-white">
        Wszystkie słowa opanowane!
      </div>
    );
  }

  return (
    <>
      <div className="card relative mx-auto bg-gray-400 text-black text-2xl rounded-xl border-2 border-black font-extrabold p-4 text-center w-full h-1/2 md:w-1/2 md:h-2xl flex flex-col justify-center">
        <span className="absolute top-2 right-3 text-sm text-gray-500">
          {currentCard.id}
        </span>
        <h1 className="mt-6">{currentCard.pol}</h1>

        {isCorrect === true && (
          <div className="flex justify-center items-center mt-4 text-green-700">
            <h1>{currentCard.jap}</h1>
            <FaCheck className="ml-2" />
          </div>
        )}
        {isCorrect === false && (
          <div className="flex justify-center items-center mt-4 text-red-700">
            <h1>{currentCard.jap}</h1>
            <FaTimes className="ml-2" />
          </div>
        )}
        {isCorrect === null && (
          <div className="mt-4 text-gray-400 italic select-none">•••</div>
        )}

        <div className="flex justify-center items-center mt-6 gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`border-2 border-black bg-gray-300 px-2 py-1 text-center rounded-md focus:outline-none w-2/3 max-w-full ${
              isCorrect === true
                ? "bg-green-100 text-green-700 border-green-700"
                : isCorrect === false
                ? "bg-red-100 text-red-700 border-red-700"
                : ""
            }`}
          />
          <button
            onClick={checkInput}
            className="hover:cursor-pointer bg-gray-400 px-3 py-2 rounded-md border-2 border-black w-auto hover:bg-gray-500"
          >
            <FaCheck />
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm italic text-white">
        Pozostało słówek: {availableCards.length}
      </div>
    </>
  );
}
