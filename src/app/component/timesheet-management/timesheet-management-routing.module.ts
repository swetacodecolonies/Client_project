import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditTimesheetComponent } from './add-edit-timesheet/add-edit-timesheet.component';
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';
import { TimesheetCalendarComponent } from './timesheet-calendar/timesheet-calendar.component';


const routes: Routes = [
  {
    path : '',
    children : [
      {
        path : 'add-edit-timesheet',
        component : TimesheetCalendarComponent,
        data : {
        //   title : 'Add-edit-timesheet',
        //   breadcrumb : 'Add-edit-timesheet',
        }
      },
      {
        path : 'timesheet-list',
        component : TimesheetListComponent,
        data : {
          title : 'Timesheet-list',
          breadcrumb : 'Timesheet-list',
        }
      },

    ]
  }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TimesheetManagementRoutingModule { }