import { Injectable } from '@angular/core';
import { exhaustMap } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { getActions } from '../rxa-custom/actions';
import { AppInitializer } from '../rxa-custom/app-initializer';
import { getGame } from './game.resource';
import { GameStateModel } from './game.model';

interface State {
  game: GameStateModel;
}

interface Actions {
  refreshGame: void;
}

@Injectable({
  providedIn: 'root',
})
export class GameState extends RxState<State> implements AppInitializer {
  private actions = getActions<Actions>();

  readonly game$ = this.select('game');

  readonly refreshGame = this.actions.refreshGame;

  constructor() {
    super();

    this.set({
      game: {
        gameStatus: 'PENDING',
        guesses: [
          [
            { letter: 'd', state: 'absent' },
            { letter: 'r', state: 'correct' },
            { letter: 'e', state: 'absent' },
            { letter: 'a', state: 'present' },
            { letter: 'm', state: 'absent' },
          ],
        ],
        lastCompletedTs: 0,
        lastPlayedTs: 0,
        restoringFromLocalStorage: 0,
        solution: 'treat',
        hardMode: 0,
      },
    });

    this.connect('game', this.actions.refreshGame$.pipe(exhaustMap(getGame)));
  }

  initialize(): void {
    this.refreshGame();
  }
}
