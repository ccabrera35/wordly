export const targetWord = "Flint";
export let guess = "";

export const validLetters = (name: string) => {
  guess = name.toLowerCase();

  return guess;
};
