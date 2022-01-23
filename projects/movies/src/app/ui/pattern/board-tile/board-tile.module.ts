import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardTileComponent } from './board-tile.component';

@NgModule({
  declarations: [BoardTileComponent],
  imports: [CommonModule],
  exports: [BoardTileComponent],
})
export class BoardTileModule {}
