import { useEffect, useRef, useState } from "react";
import { Board } from "./components/board";
import { useLocalStorage } from "./hooks";
import { targetWord, validLetters } from "./lib/constants";

function App() {
  const [name, setName] = useState("");
  const [attempt, setAttempt] = useLocalStorage("attempt", 0);
  const [displayedName, setDisplayedName] = useState("");
  const [guessWords, setGuessWords] = useLocalStorage<string[]>(
    "guessWords",
    []
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const isMatch =
    targetWord.toLowerCase() === guessWords[guessWords.length - 1];

  useEffect(() => {
    const word = validLetters(displayedName);
    if (word !== "") {
      setGuessWords((prev) => [...prev, word]);
    }
  }, [displayedName, setGuessWords]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const alphaRegex = /^[a-z]+$/i;

    if (alphaRegex.test(input) || input === "") {
      setName(input);
      inputRef.current?.classList.remove(
        "focus:ring-red-400",
        "focus:border-red-400",
        "ring-1"
      );
    } else {
      inputRef.current?.classList.add(
        "focus:ring-red-400",
        "focus:border-red-400",
        "ring-1"
      );
    }
  };

  const handleClick = () => {
    setAttempt(0);
    setDisplayedName("");
    setGuessWords([]);
    setName("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisplayedName(name);
    setName("");
    setAttempt((prev) => prev + 1);
  };

  return (
    <main className="flex flex-col items-center justify-center gap-y-10 min-h-screen bg-sky-100">
      <div className="mt-20 gap-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <input
            type="text"
            id="name"
            value={name}
            ref={inputRef}
            placeholder="Type in word..."
            onChange={handleNameChange}
            className="px-2 border-2 border-blue-200 rounded-md focus:outline-none focus:ring-1"
          />
          <button
            type="submit"
            className="rounded-md h-8 w-16 bg-blue-200 hover:bg-blue-400 disabled:bg-slate-300"
            disabled={
              name === "" || name.length !== 5 || attempt === 6 || isMatch
            }
          >
            Submit
          </button>
        </form>
      </div>
      <Board
        displayWord={displayedName}
        attempt={attempt}
        guessWords={guessWords}
        isMatch={isMatch}
      />
      <span className="flex h-10 items-center justify-center gap-y-5 -mt-8">
        {attempt > 0 && <p className=" w-full">Attempts Made: {attempt}</p>}
        <button
          type="submit"
          className="rounded-md  h-8 w-16 bg-red-200 hover:bg-red-400 disabled:bg-slate-300"
          onClick={handleClick}
        >
          Reset
        </button>
      </span>
    </main>
  );
}

export default App;
