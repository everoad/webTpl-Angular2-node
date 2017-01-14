import { NgModule } from '@angular/core'

import { BoardRoutingModule } from './routers/board-routing.module'

import { RouterModule, Routes } from '@angular/router'
import { MainComponent } from './components/main.component'

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
]

@NgModule({
  imports: [BoardRoutingModule, RouterModule.forRoot(routes)],
  exports: [BoardRoutingModule, RouterModule]
})

export class AppRoutingModule{}