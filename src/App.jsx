import { useState } from "react";
import Card from "./modules/Card";
import WordList from "./modules/WordList";
import { cards as initialCards } from "./modules/data.js";

export default function App() {
  const [learnedWords, setLearnedWords] = useState([]);
  const [wrongWords, setWrongWords] = useState(shuffle(initialCards.map((c) => c.id)));

  const markAsCorrect = (id) => {
    if (!learnedWords.includes(id)) {
      setLearnedWords((prev) => [...prev, id]);
      setWrongWords((prev) => prev.filter((wid) => wid !== id));
    }
  };

  const resetProgress = () => {
    setLearnedWords([]);
    setWrongWords(shuffle(initialCards.map((c) => c.id)));
  };

  return (
    <div className="relative min-h-screen bg-gray-700">
      <button
        onClick={resetProgress}
        className="absolute top-4 right-6 bg-red-500 text-white font-bold px-4 py-2 rounded-md shadow-md hover:cursor-pointer hover:bg-red-600"
      >
        Resetuj
      </button>
      <div className="flex flex-col items-center pt-16">
        <Card cards={initialCards} wrongWords={wrongWords} onCorrect={markAsCorrect} />
        <WordList cards={initialCards} learnedWords={learnedWords} />
      </div>
    </div>
  );
}

function shuffle(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}
