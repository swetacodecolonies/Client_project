import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalentInterviewManagementRoutingModule } from './talent-interview-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmInterviewListComponent } from './confirm-interview-list/confirm-interview-list.component';
import { TalentInterviewComponent } from './talent-interview/talent-interview.component';
import { NgbdSortableHeader } from 'src/app/shared/directives/sortable.directive';
import { ChangeInterviewRequestComponent } from './change-interview-request/change-interview-request.component';
import { DataTableModule } from '../../table/data-table/data-table.module';


@NgModule({
  declarations: [TalentInterviewComponent,ConfirmInterviewListComponent,ChangeInterviewRequestComponent
  ],
  imports: [
    CommonModule,
    TalentInterviewManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
  ]
})
export class TalentInterviewManagementModule { }
