import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { AppRoutingModule } from './app-routing.module'

import { LocationStrategy,
         HashLocationStrategy } from '@angular/common'

import { BoardService } from './services/board.service'
import { IndexService } from './services/index.service'
import { UserService }  from './services/user.service'

import { SafeHtmlPipe } from './pipes/safehtml.pipe'

import { AppComponent } from './app.component'
import { MainComponent } from './components/main.component'

import { BoardComponent } from './components/board/board.component'
import { BoardAddComponent } from './components/board/board-add.component'
import { BoardDetailComponent } from './components/board/board-detail.component'

import { LoginComponent } from './components/user/login.component'
import { JoinComponent } from './components/user/join.component'

import { HeaderComponent } from './components/templates/header/header.component'


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BoardComponent,
    BoardAddComponent,
    BoardDetailComponent,
    LoginComponent,
    JoinComponent,
    HeaderComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    IndexService,
    BoardService, 
    UserService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
