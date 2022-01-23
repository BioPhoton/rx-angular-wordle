import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageModule } from '../../../ui/component/page/page.module';
import { BoardRowModule } from '../../../ui/pattern/board/board-row/board-row.module';
import { InstructionsComponent } from './instructions.component';

@NgModule({
  declarations: [InstructionsComponent],
  exports: [InstructionsComponent],
  imports: [CommonModule, PageModule, BoardRowModule],
})
export class InstructionsModule {}
