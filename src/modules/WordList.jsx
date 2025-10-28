export default function WordList({ cards, learnedWords }) {
  const learned = cards.filter((c) => learnedWords.includes(c.id));

  return (
    <div className="mt-6 w-full max-w-md bg-gray-400 border-2 border-black rounded-xl p-4 flex flex-col">
      <h2 className="text-xl font-medium text-black mb-3 text-center">Opanowane słówka:</h2>
      <div className="overflow-y-auto max-h-64 w-full">
        {learned.length === 0 ? (
          <div className="text-gray-500 italic text-center">Na razie nie masz poprawnych odpowiedzi.</div>
        ) : (
          <ul className="flex flex-col items-center gap-2">
            {learned.map((word) => (
              <li key={word.id} className="text-center text-black">
                {word.jap}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
