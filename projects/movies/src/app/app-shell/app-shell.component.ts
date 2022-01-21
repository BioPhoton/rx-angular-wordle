import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameState } from '../shared/game/game.state';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellComponent {
  constructor(public gameState: GameState) {
  }
}
