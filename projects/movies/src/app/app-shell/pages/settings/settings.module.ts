import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetModule } from '@rx-angular/template/let';
import { SettingsComponent } from './settings.component';
import { PageModule } from '../../../ui/component/page/page.module';
import { ToggleModule } from '../../../ui/component/toggle/toggle.module';

@NgModule({
  declarations: [SettingsComponent],
  exports: [SettingsComponent],
  imports: [CommonModule, LetModule, PageModule, ToggleModule],
})
export class SettingsModule {}
