import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';

@NgModule({
  declarations: [PageComponent],
  exports: [PageComponent],
  imports: [CommonModule],
})
export class PageModule {}
