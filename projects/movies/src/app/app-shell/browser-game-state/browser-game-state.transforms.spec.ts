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

const lastKey = 'm';
const gameWord5: Pick<BrowserGameModel, 'boardState' | 'rowIndex'> = {
  boardState: ['teams', 'trace', 'dream'],
  rowIndex: 3
};


describe('browser-game-state.transforms', () => {
  describe('addCharacter', () => {
    it('should remove a word if the last character is removed', () => {
      const newState: Word[] = addCharacter(gameWordEmpty.boardState, gameWordEmpty.rowIndex, firstKey);
      expect(newState[gameWordEmpty.rowIndex]).toBe(gameWord1.boardState[gameWordEmpty.rowIndex]);
    });
    it('should add a char to a 1 char string', () => {
      const newState: Word[] = addCharacter(gameWord1.boardState, gameWord1.rowIndex, secondKey);
      expect(newState[gameWord1.rowIndex]).toBe(gameWord2.boardState[gameWord1.rowIndex]);
    });

    it('should not add a character to a 5 char string', () => {
      const newState: Word[] = addCharacter(gameWord5.boardState, gameWord5.rowIndex, lastKey);
      expect(newState).toBe(gameWord5.boardState[gameWord5.rowIndex - 1]);
    });
    // pending word on x + rowIndex !== x (any state where a word with length !== 5 is not the rowIndex)
    it('should throw if rowindex is incorrect', () => {
      expect(() => addCharacter(gameWord2.boardState, 4, lastKey)).toThrowError('`rowIndex` and state are in an inconsistent state.');
    });
  });
  describe('removeCharacter', () => {
    removeCharacter
  });
});
