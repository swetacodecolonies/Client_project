import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditTimesheetComponent } from './add-edit-timesheet/add-edit-timesheet.component';
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimesheetManagementRoutingModule } from './timesheet-management-routing.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TimesheetCalendarComponent } from './timesheet-calendar/timesheet-calendar.component';



@NgModule({
  declarations: [AddEditTimesheetComponent,TimesheetListComponent,TimesheetCalendarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    TimesheetManagementRoutingModule, CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ]
})
export class TimesheetManagementModule { }
