import { NgModule } from '@angular/core'

import { BoardRoutingModule } from './routers/board-routing.module'
import { AdminRoutingModule } from './routers/admin-routing.module'

import { RouterModule, Routes } from '@angular/router'
import { MainComponent } from './components/main.component'
import { ErrorComponent } from './components/error/error.component'


const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path:'error',
    component: ErrorComponent
  }
]

@NgModule({
  imports: [BoardRoutingModule, AdminRoutingModule, RouterModule.forRoot(routes)],
  exports: [BoardRoutingModule, AdminRoutingModule, RouterModule]
})

export class AppRoutingModule{}