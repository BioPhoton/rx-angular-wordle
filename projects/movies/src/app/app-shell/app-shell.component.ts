import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { GameState } from '../shared/game/game.state';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent extends RxState<{
  showInstructions: boolean;
  showSettings: boolean;
}> {
  public showInstructions$ = this.select('showInstructions');
  public showSettings$ = this.select('showSettings');

  constructor(public gameState: GameState) {
    super();
    this.set({ showInstructions: false, showSettings: false });
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
