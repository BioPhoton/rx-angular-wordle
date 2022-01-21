import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppShellModule } from './app-shell/app-shell.module';
import { SCHEDULED_APP_INITIALIZER_PROVIDER } from './shared/app-initializer/chunk-app-initializer.provider';
import { RXA_PROVIDER } from './shared/rxa-custom/rxa.provider';
import { RootInjectorShortcutModule } from './shared/injector/root-injector.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    /**
     * **🚀 Perf Tip for TBT, LCP:**
     *
     * Save 0.6KB plus scripting time for every service class wrapper, by accessing injectors directly.
     *
     * ⚠ Notice:
     * You have to import this module in the root module of your application to initialize the "hack"
     */
    RootInjectorShortcutModule,
    AppShellModule
  ],
  providers: [
    /**
     * **🚀 Perf Tip for TBT:**
     *
     * Chunk app bootstrap over APP_INITIALIZER.
     */
    SCHEDULED_APP_INITIALIZER_PROVIDER,
    /**
     * **🚀 Perf Tip for TBT, LCP, CLS:**
     *
     * Configure RxAngular to get maximum performance.
     */
    RXA_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
