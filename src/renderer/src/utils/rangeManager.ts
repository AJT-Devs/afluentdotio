import {Word} from '../types/brainstorm'

export function moveWordToRange(
    words: Word[],
    wordId: string,
    targetRange: number
): Word[] {
    const word = words.find((w) => w.id === wordId)
    if (!word) {
        console.warn(`Palavra com id "${wordId}" não encontrada`);
        return words;
    }

    const oldRange = word.range;

    if (oldRange === targetRange) {
        return words;
    }

    const withoutWord = words.filter((w) => w.id !== wordId);

    const compacted = withoutWord.map((w) => ({
        ...w,
        range: w.range > oldRange ? w.range - 1 : w.range,
    }));

    const withSpace = compacted.map((w) => ({
        ...w,
        range: w.range >= targetRange ? w.range + 1 : w.range,
    }));

    const result = [...withSpace, { ...word, range: targetRange }];

    return result.sort((a, b) => a.range - b.range);
}

export function addWord(
    words: Word[],
    newWord: Omit<Word, 'range'>,
): Word[] {
    const incrementedWords = words.map((w) => ({
        ...w,
        range: w.range + 1,
    }));

    const wordWithRange: Word = {
        ...newWord,
        range: 0,
    };

    return [wordWithRange, ...incrementedWords];
}

export function removeWord(words: Word[], wordId: string): Word[] {

  const word = words.find((w) => w.id === wordId);

  if (!word) {
    console.warn(`Palavra com id "${wordId}" não encontrada`);
    return words;
  }

  const removedRange = word.range;

  return words
    .filter((w) => w.id !== wordId)
    .map((w) => ({
      ...w,
      
      range: w.range > removedRange ? w.range - 1 : w.range,
    }));
}

export function updateWordPosition(
  words: Word[],
  wordId: string,
  x: number,
  y: number
): Word[] {
  return words.map((w) =>
    w.id === wordId ? { ...w, x, y } : w
  );
}

export function updateWordText(
  words: Word[],
  wordId: string,
  text: string
): Word[] {
  return words.map((w) =>
    w.id === wordId ? { ...w, text } : w
  );
}

// Gera id por enquanto ou nao
export function generateWordId(): string {
  // Usa crypto API se disponível (browsers modernos)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback: gera manualmente
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}