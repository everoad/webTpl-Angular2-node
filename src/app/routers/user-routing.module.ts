import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from '../components/user/login.component'
import { JoinComponent } from '../components/user/join.component'

const routes: Routes = [
  {
    path: 'user/login',
    component: LoginComponent
  }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class UserRoutingModule { }