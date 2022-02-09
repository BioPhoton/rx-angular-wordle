import { Word } from '../../shared/game-resource/server-game.model';

export function addCharacter(boardState: Word[], rowIndex: number, char: string): Word[] {
  const wordIdx: number = rowIndex - 1;
  const currentWord: Word = boardState[wordIdx] !== undefined ? boardState[wordIdx] : '';

  if (currentWord.length < 5) {
    boardState[wordIdx] = currentWord + char;
  }
  return [...boardState];
}

export function removeCharacter(boardState: Word[], rowIndex: number): Word[] {
  const wordIdx = rowIndex - 1;
  let currentWord: string = boardState[wordIdx];
  if (currentWord !== undefined) {
    if (currentWord.length > 1) {
      boardState[wordIdx] = currentWord.split('').slice(0, currentWord.length - 1).join('');
    } else {
      boardState.pop();
    }
  }
  return [...boardState];
}
