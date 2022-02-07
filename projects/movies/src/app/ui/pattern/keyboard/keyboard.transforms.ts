import { LetterState } from '../internal/letter.model';
import { GameUiInputModel } from '../internal/game-ui-input.model';
import { Keys } from './keyboard.model';


const keyboardRow1 = 'qwertyuiop'.split('');
const keyboardRow2 = 'asdfghhjkl'.split('');
const keyboardRow3 = 'zxcvbnm'.split('');
const keys = [...keyboardRow1, ...keyboardRow2, ...keyboardRow3];

export function getKeyBoardState({ boardState, evaluations }: GameUiInputModel): Keys[] {
  const keysMap: Record<string, LetterState> = keys.reduce(
    (map, letter) => ({
      ...map,
      [letter]: 'empty'
    }),
    {}
  );

  evaluations.forEach((row, rowIdx) => {
      row.forEach((state, letterIdx) => {
        keysMap[boardState[rowIdx][letterIdx]] = state;
      });
    }
  );

  const allKeys = Object.entries(keysMap).map(([letter, state]) => ({
    letter,
    state
  }));

  return [
    allKeys.splice(0, keyboardRow1.length),
    allKeys.splice(0, keyboardRow2.length),
    allKeys.splice(0, keyboardRow3.length)
  ];
}
