import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { ForModule } from '@rx-angular/template/experimental/for';
import { BoardRowModule } from './board-row/board-row.module';

@NgModule({
  declarations: [BoardComponent],
  imports: [CommonModule, ForModule, BoardRowModule],
  exports: [BoardComponent],
})
export class BoardModule {}
