import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { AppRoutingModule } from './app-routing.module'
import { LocalStorageModule } from 'angular-2-local-storage'
import { DragulaModule } from 'ng2-dragula'

import { ErrorHandler } from '@angular/core'

import { LocationStrategy,
         HashLocationStrategy } from '@angular/common'

import { BoardService } from './services/board.service'
import { IndexService } from './services/index.service'
import { UserService }  from './services/user.service'
import { EventService } from './services/event.service'
import { AdminService } from './services/admin.service'
import { ExceptionHandler } from './services/exception.handler'
import { AuthGuard } from './services/auth.guard'

import { SafeHtmlPipe } from './pipes/safehtml.pipe'

import { AppComponent } from './app.component'
import { MainComponent } from './components/main.component'

import { BoardComponent } from './components/board/board.component'
import { BoardAddComponent } from './components/board/board-add.component'
import { BoardEditComponent } from './components/board/board-edit.component'
import { BoardDetailComponent } from './components/board/board-detail.component'
import { BoardReplyComponent } from './components/board/board-reply.component'

import { LoginComponent } from './components/user/login.component'
import { JoinComponent } from './components/user/join.component'

import { HeaderComponent } from './components/templates/header/header.component'
import { ChatComponent } from './components/chat/chat.component'
import { AdminMenuComponent } from './components/admin/admin.menu.component'

import { ErrorComponent } from './components/error/error.component'


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BoardComponent,
    BoardAddComponent,
    BoardEditComponent,
    BoardDetailComponent,
    BoardReplyComponent,
    LoginComponent,
    JoinComponent,
    HeaderComponent,
    ChatComponent,
    AdminMenuComponent,
    ErrorComponent,
    SafeHtmlPipe
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DragulaModule,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'sessionStorage'
    })
  ],
  
  providers: [
    IndexService,
    BoardService, 
    UserService,
    EventService,
    AdminService,
    AuthGuard,
    { provide: ErrorHandler, useClass: ExceptionHandler },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
