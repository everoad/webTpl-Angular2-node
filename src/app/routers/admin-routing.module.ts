import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdminMenuComponent } from '../components/admin/admin.menu.component'
import { AdminHomeComponent } from '../components/admin/admin.home.component'



const routes: Routes = [
  {
    path: 'admin/menu',
    component: AdminMenuComponent
  },
  // {
  //   path: 'admin/home',
  //   component: AdminHomeComponent
  // }
]



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AdminRoutingModule { }