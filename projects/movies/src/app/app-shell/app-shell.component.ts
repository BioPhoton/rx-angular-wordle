import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RxState, selectSlice } from '@rx-angular/state';
import { getGame } from '../shared/game-resource/game.resource';
import { filter, Subject } from 'rxjs';
import { BrowserGameModel } from './browser-game-state/browser-game-state.model';
import { addCharacter, removeCharacter } from './browser-game-state/browser-game-state.transforms';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellComponent extends RxState<{
  showInstructions: boolean;
  showSettings: boolean;
} & BrowserGameModel> {

  public uiInput$ = this.select(selectSlice(['boardState', 'evaluations']));
  public keyboardOutput$ = new Subject<string>();
  public back$ = this.keyboardOutput$.pipe(filter(k => k === 'BACK'));
  public enter$ = this.keyboardOutput$.pipe(filter(k => k === 'ENTER'));
  public character$ = this.keyboardOutput$.pipe(filter(k => k !== 'BACK' && k !== 'ENTER'));

  public rowIndex$ = this.select('rowIndex');

  public showInstructions$ = this.select('showInstructions');
  public showSettings$ = this.select('showSettings');

  constructor() {
    super();
    this.set({ showInstructions: false, showSettings: false });
    // fetch and set server state once
    this.connect(getGame());

    this.connect(
      'boardState',
      this.character$,
      (({ boardState, rowIndex }, char) => addCharacter(boardState, rowIndex, char))
    );

    this.connect(
      'boardState',
      this.back$,
      (({ boardState, rowIndex }) => removeCharacter(boardState, rowIndex))
    );

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

