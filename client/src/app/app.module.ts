import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './modules/app-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AppComponent } from './pages/app/app.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { BoardComponent } from './components/board/board.component';
import { SolverComponent } from './components/solver/solver.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    KeyboardComponent,
    BoardComponent,
    SolverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
