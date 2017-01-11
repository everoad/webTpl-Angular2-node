import { NgModule } from '@angular/core'

import { BoardRoutingModule } from './routers/board-routing.module'
import { UserRoutingModule } from './routers/user-routing.module'

import { RouterModule, Routes } from '@angular/router'
import { MainComponent } from './components/main.component'

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
]

@NgModule({
  imports: [BoardRoutingModule, UserRoutingModule, RouterModule.forRoot(routes)],
  exports: [BoardRoutingModule, UserRoutingModule, RouterModule]
})

export class AppRoutingModule{}