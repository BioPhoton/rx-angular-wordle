import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RxState, selectSlice } from '@rx-angular/state';
import { getGame } from '../shared/game-resource/game.resource';
import { GameStatus, Word } from '../shared/game-resource/server-game.model';
import { filter, map, Subject, withLatestFrom } from 'rxjs';
import { BoardState } from './app-shell.model';

// the browser model includes the current try
interface BrowserGameModel {
  guesses: BoardState;
  solution: Word;
  gameStatus: GameStatus;
  // local JavaScript time stamp of last played e.g. 1642732127592
  lastPlayedTs: number;
  // local JavaScript time stamp of last completed game e.g. 1642732127543
  lastCompletedTs: number;
  hardMode: number;
}

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellComponent extends RxState<{
  showInstructions: boolean;
  showSettings: boolean;
  game: BrowserGameModel
}> {
  public uiInput$ = this.select(map(s => s.game), selectSlice(['guesses']));
  public keyboardOutput$ = new Subject<string>();
  public back$ = this.keyboardOutput$.pipe(filter(k => k === 'BACK'));
  public enter$ = this.keyboardOutput$.pipe(filter(k => k === 'ENTER'));
  public character$ = this.keyboardOutput$.pipe(filter(k => k !== 'BACK' && k !== 'ENTER'));

  public rowIndex$ = this.select(map(s => s.game));

  public showInstructions$ = this.select('showInstructions');
  public showSettings$ = this.select('showSettings');

  constructor(public gameState:) {
    super();
    this.set({ showInstructions: false, showSettings: false });
    this.connect('game', getGame());
    this.character$.pipe(
      withLatestFrom()
    );

    this.connect(
      'boardState',
      this.character$,
      (({ gu, rowIndex }, char) => {
        const wordIndex: number = rowIndex - 1;
        const currentWord: string = boardState[wordIndex] || '';
        console.log('character$: ', char, currentWord, rowIndex, boardState);
        if (currentWord.length < 5) {
          boardState[wordIndex] = currentWord + char;
        }
        console.log('new : ', char, boardState, rowIndex);
        return [...boardState];
      }));

    this.connect(
      'boardState',
      this.back$,
      (({ boardState, rowIndex }, char) => {
        console.log('back$: ', char);
        const currentWord: string = boardState[rowIndex] || '';
        if (currentWord.length > 0) {
          boardState[rowIndex] = currentWord.slice(-1);
        }
        return boardState;
      }));

    this.hold(this.enter$, () => console.log('server post'));
  }

  public showInstructions(): void {
    this.set({ showInstructions: true });
  }

  public hideInstructions(): void {
    this.set({ showInstructions: false });
  }

  public showSettings(): void {
    this.set({ showSettings: true });
  }

  public hideSettings(): void {
    this.set({ showSettings: false });
  }
}
