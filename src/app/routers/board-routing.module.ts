import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BoardComponent } from '../components/board/board.component'
import { BoardDetailComponent } from '../components/board/board-detail.component'
import { BoardAddComponent } from '../components/board/board-add.component'

const routes: Routes = [

  {
    path: 'board/:menu_fir_seq/:menu_sec_seq',
    component: BoardComponent
  },
  {
    path: 'board/:menu_fir_seq/:menu_sec_seq/add',
    component: BoardAddComponent
  },
  {
    path: 'board/:menu_fir_seq/:menu_sec_seq/:board_seq',
    component: BoardDetailComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
