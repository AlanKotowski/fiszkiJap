import { useState } from "react";
import Card from "./modules/Card";
import WordList from "./modules/WordList";
import { cards as initialCards } from "./modules/dataKana.js";

export default function App() {
  const [learnedWords, setLearnedWords] = useState([]);
  const [wrongWords, setWrongWords] = useState(
    shuffle(initialCards.map((c) => c.id)) || []
  );
  const [mode, setMode] = useState("pol-romanji");

  const markAsCorrect = (id) => {
    if (!learnedWords.includes(id)) {
      setLearnedWords((prev) => [...prev, id]);
      setWrongWords((prev) => prev.filter((wid) => wid !== id));
    }
  };

  const resetProgress = () => {
    setLearnedWords([]);
    setWrongWords(shuffle(initialCards.map((c) => c.id)) || []);
  };

  const remainingWords = initialCards.length - learnedWords.length;

  return (
    <div className="h-screen bg-gray-700 flex flex-col items-center overflow-hidden">
      <div className="w-full flex flex-col items-center shrink-0 pt-4">
        <div className="relative w-80 h-14 sm:mt-6 mt-0 mx-auto border-2 border-gray-500 rounded-full flex overflow-hidden select-none">
          <div
            className="absolute top-0 h-full w-1/2 bg-blue-500 rounded-full transition-all duration-300"
            style={{ left: mode === "pol-romanji" ? "0%" : "50%" }}
          />

          <div
            className="relative z-10 w-1/2 flex justify-center items-center cursor-pointer"
            onClick={() => setMode("pol-romanji")}
          >
            <div
              className={`flex gap-2 font-bold text-sm md:text-base ${
                mode === "pol-romanji" ? "text-white" : "text-black"
              }`}
            >
              <span>Polski - </span>
              <span>Romanji</span>
            </div>
          </div>

          <div
            className="relative z-10 w-1/2 flex justify-center items-center cursor-pointer"
            onClick={() => setMode("kana-pol")}
          >
            <div
              className={`flex gap-2 font-bold text-sm md:text-base ${
                mode === "kana-pol" ? "text-white" : "text-black"
              }`}
            >
              <span>Kana - </span>
              <span>Polski</span>
            </div>
          </div>
        </div>

        <button
          onClick={resetProgress}
          className="mt-4 bg-red-500 text-white font-bold px-4 py-2 rounded-md shadow-md hover:bg-red-600"
        >
          Resetuj
        </button>


        <div className="w-full max-w-md mt-2 flex-shrink-0">
          <Card
            cards={initialCards}
            wrongWords={wrongWords}
            onCorrect={markAsCorrect}
            mode={mode}
          />
        </div>
        <div className="w-80 text-center text-white font-bold mt-4 mb-2">
          Pozostało słówek: {remainingWords}
        </div>
      </div>

      <div className="flex-1 w-full max-w-md mt-4 mb-4 overflow-y-auto">
        <WordList
          cards={initialCards}
          learnedWords={learnedWords}
          mode={mode}
        />
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
