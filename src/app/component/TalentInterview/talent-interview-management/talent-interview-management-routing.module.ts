import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TalentInterviewComponent } from './talent-interview/talent-interview.component';
import { ConfirmInterviewListComponent } from './confirm-interview-list/confirm-interview-list.component'

const routes: Routes = [
  {
    path : '',
    children : [
      {
        path : 'interview-list',
        component : TalentInterviewComponent,
        data : {
          title : 'interview-list',
          breadcrumb : 'interview-list',
        }
      },
      {
        path : 'confirm-interview-list',
        component : ConfirmInterviewListComponent,
        data : {
          title : 'confirm-interview-list',
          breadcrumb : 'confirm-interview-list',
        }
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalentInterviewManagementRoutingModule { }
