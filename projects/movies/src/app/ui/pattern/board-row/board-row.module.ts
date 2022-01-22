import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRowComponent } from './board-row.component';
import { RxForModule } from '../../../shared/rxa-custom/rx-for/rx-for.module';
import { BoardTileModule } from '../board-tile/board-tile.module';

@NgModule({
  declarations: [BoardRowComponent],
  imports: [CommonModule, RxForModule, BoardTileModule],
  exports: [BoardRowComponent],
})
export class BoardRowModule {}
