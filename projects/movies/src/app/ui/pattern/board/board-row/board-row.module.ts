import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRowComponent } from './board-row.component';
import { ForModule } from '@rx-angular/template/experimental/for';
import { BoardTileModule } from '../board-tile/board-tile.module';

@NgModule({
  declarations: [BoardRowComponent],
  imports: [CommonModule, ForModule, BoardTileModule],
  exports: [BoardRowComponent],
})
export class BoardRowModule {}
