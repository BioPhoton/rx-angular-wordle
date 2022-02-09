import { addCharacter, removeCharacter } from './browser-game-state.transforms';
import { BrowserGameModel } from './browser-game-state.model';
import { Word } from '../../shared/game-resource/server-game.model';

const gameWordEmpty: Pick<BrowserGameModel, 'boardState' | 'rowIndex'> = {
  boardState: ['teams', 'trace'],
  rowIndex: 3
};
const firstKey = 'd';
const gameWord1: Pick<BrowserGameModel, 'boardState' | 'rowIndex'> = {
  boardState: ['teams', 'trace', 'd'],
  rowIndex: 3
};

const secondKey = 'r';
const gameWord2: Pick<BrowserGameModel, 'boardState' | 'rowIndex'> = {
  boardState: ['teams', 'trace', 'dr'],
  rowIndex: 3
};

const gameWord4: Pick<BrowserGameModel, 'boardState' | 'rowIndex'> = {
  boardState: ['teams', 'trace', 'drea'],
  rowIndex: 3
};

const lastKey = 'm';
const gameWord5: Pick<BrowserGameModel, 'boardState' | 'rowIndex'> = {
  boardState: ['teams', 'trace', 'dream'],
  rowIndex: 3
};

describe('browser-game-state.transforms', () => {
  describe('addCharacter', () => {
    it('should add a word if the first character is added', () => {
      const wordIdx = gameWordEmpty.rowIndex - 1;
      const newState: Word[] = addCharacter(gameWordEmpty.boardState, gameWordEmpty.rowIndex, firstKey);
      expect(newState[wordIdx]).toBe(gameWord1.boardState[wordIdx]);
    });
    it('should add a char to a 1 char string', () => {
      const rowIndex = gameWord1.rowIndex;
      const newState: Word[] = addCharacter(gameWord1.boardState, rowIndex, secondKey);
      expect(newState[rowIndex]).toBe(gameWord2.boardState[rowIndex]);
    });

    it('should not add a character to a 5 char string', () => {
      const rowIndex = gameWord5.rowIndex - 1;
      const newState: Word[] = addCharacter(gameWord5.boardState, gameWord5.rowIndex, lastKey);
      expect(newState[rowIndex]).toBe(gameWord5.boardState[rowIndex]);
    });

  });
  describe('removeCharacter', () => {
    it('should not remove a character from a 5 char string', () => {
      const rowIndex = gameWord4.rowIndex - 1;
      const newState: Word[] = removeCharacter(gameWord5.boardState, gameWord4.rowIndex);
      expect(newState[rowIndex]).toBe(gameWord4.boardState[rowIndex]);
    });

    it('should remove a word if the last character is removed', () => {
      const rowIndex = gameWord1.rowIndex - 1;
      const newState: Word[] = removeCharacter(gameWord1.boardState, gameWord1.rowIndex);
      expect(newState[rowIndex]).toBe(gameWordEmpty.boardState[rowIndex]);
    });

    it('should do nothing if a character is removed from an empty word', () => {
      const rowIndex = gameWordEmpty.rowIndex - 1;
      const newState: Word[] = removeCharacter(gameWordEmpty.boardState, gameWordEmpty.rowIndex);
      expect(newState[rowIndex]).toBe(gameWordEmpty.boardState[rowIndex]);
    });

  });
});
