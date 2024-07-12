import { targetWord } from "../lib/constants";
import { cn } from "../lib/utils";

type BoardProps = {
  displayWord: string;
  attempt: number;
  guessWords: string[];
  isMatch: boolean;
};

export const Board = ({
  displayWord,
  attempt,
  guessWords,
  isMatch
}: BoardProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {attempt === 5 && !isMatch && (
        <p className="text-red-400 mb-2 -mt-4">
          No more attempts left! Try again.
        </p>
      )}
      {isMatch && <p className="mb-2 -mt-4">You guessed correctly! 🥳</p>}
      <section className="border gap-1 border-zinc-100 bg-zinc-100 shadow-md w-56 h-60">
        {guessWords.map((guess, idx) => (
          <div
            key={`${displayWord} ${guess} ${idx}`}
            className="h-1/5 w-full flex items-center"
          >
            {guessWords[idx].split("").map((letter, idx) => (
              <span
                key={`${guess}-${letter}-${idx}`}
                className={cn(
                  "border  h-full w-full flex items-center justify-center",
                  {
                    "bg-green-600 bg-opacity-85 text-white":
                      letter === targetWord.toLowerCase()[idx],
                    "bg-yellow-300 bg-opacity-85 text-white":
                      targetWord.toLowerCase().includes(letter) &&
                      letter !== targetWord.toLowerCase()[idx],
                    "bg-zinc-300 text-white":
                      !targetWord.toLowerCase().includes(letter) &&
                      letter !== targetWord.toLowerCase()[idx]
                  }
                )}
              >
                {letter}
              </span>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};
