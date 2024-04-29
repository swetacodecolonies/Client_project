import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { Credentials } from 'src/app/shared/model/authentication.model';
import { ProjectModel } from 'src/app/shared/model/project.model';
import { CredentialsService } from 'src/app/shared/services/API/credentials.service';
import { TimesheetService } from 'src/app/shared/services/API/timesheet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-timesheet',
  templateUrl: './add-edit-timesheet.component.html',
  styleUrl: './add-edit-timesheet.component.scss'
})
export class AddEditTimesheetComponent implements OnInit{
  DataOf :any;
  error: string | undefined;
  isLoading = false;
  maxDate?: string;
  public _credentials: Credentials | null = null;
  timesheetmodel: any = {
    timesheetId: 0,
    UserId: 0,
    ProjectId: 0,
    BaseSalary: 0,
    StartingDate: '',
    EstimatedEarning: 0,
    IsActive: '',
    CreatedBy: '',
    CreatedDate: Date,
    FullName: '',
    ProjectName: '',
    TimeSheetDate: '',
    Timesheet_datas: [{ TaskName: '', TaskDescription: '', TaskStatus: 0, TotalHours: '' }]
  }
  public projectList: ProjectModel[] = [];

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private timesheetService: TimesheetService,
    public activeModal: NgbActiveModal,
    private credentialsService: CredentialsService,

  ) {
    this._credentials = credentialsService.credentials;
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }
  ngOnInit(): void {
    debugger
    this.timesheetmodel.TimeSheetDate=this.DataOf;
  
  }
  selectProject(): void {

    if (this.timesheetmodel.ProjectId == '0') {
      this.timesheetmodel.BaseSalary = 0;
    } else {
      const data: any = this.projectList.find((i: any) => i.ProjectId == this.timesheetmodel.ProjectId);

      this.timesheetmodel.BaseSalary = data.BaseSalary;
    }
    // this.totalHours();
  }
  taskDescriptionInvalid(index: number): boolean {
    const task = this.timesheetmodel.Timesheet_datas[index];
    return task.TaskDescription && task.TaskDescription.length < 80;
  }
  addNewRoleRow() {
    debugger
    const newRolerow = { TaskName: '', TaskDescription: '', TaskStatus: 0, TotalHours:''};
    this.timesheetmodel.Timesheet_datas.push({ ...newRolerow });
  }

  deleteRoleRow(index: number) {
    if (this.timesheetmodel.Timesheet_datas.length > 1) {
      this.timesheetmodel.Timesheet_datas.splice(index, 1);
    }
  }

  submit() {
    debugger
    const errorMessages = [];
    if (!this.timesheetmodel.ProjectId || this.timesheetmodel.ProjectId.length === 0) {
      errorMessages.push('Please select a Project Name');
    }
    if (this.timesheetmodel.Timesheet_datas.every((x:any)=>x.TaskStatus =='')) {
      errorMessages.push('Please select a Task Status');
    }
    if (errorMessages.length > 0) {
      Swal.fire({
        title: 'Error!',
        html: errorMessages.map(message => `<div>${message}</div>`).join(''),
        icon: 'error',
        confirmButtonText: 'Okay',
      });
      return;
    }
    this.isLoading = true;
    this.timesheetmodel.CreatedBy = this._credentials?.Email;
    this.timesheetmodel.UserId = this._credentials?.UserId;
    this.timesheetmodel.Timesheet_datas && 
    this.timesheetmodel.Timesheet_datas.length > 0 &&
    this.timesheetmodel.Timesheet_datas.every((task: any) => task.TaskName !== '' && task.TaskDescription !== '' && task.TaskDescription.length >= 80 && task.TaskStatus !== '' && task.TotalHours !== '');
    this.timesheetmodel.EstimatedEarning = parseInt(this.timesheetmodel.EstimatedEarning);
    const timesheet$ = this.timesheetService.AddUpdateTimeSheet(this.timesheetmodel);
    timesheet$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any | undefined) => {
          if (res.Success) {
            //log.debug(`${res?.Email} successfully register timesheet`);

            if (res.Success) {
              Swal.fire({
                text: res.Message,
                icon: 'success',
                buttonsStyling: false,
                confirmButtonText: 'Ok, got it!',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
              }).then((result) => {
                if (result.isConfirmed) {

                  // this.router.navigate(['/talent/timesheet-list']);
                  if (this._credentials?.UserTypeCode == "Agency") {
                    this.router.navigate(['/agency/timesheet-list']);
                  }
                  else if (this._credentials?.UserTypeCode == "Recruiter") {
                    this.router.navigate(['/recruiter/timesheet-list']);
                  }
                  else {
                    this.router.navigate(['/talent/timesheet-list']);
                  }
                }
              });
            } else {
              Swal.fire({
                title: 'Error!',
                text: res.Message,
                icon: 'error',
                confirmButtonText: 'Okay',
              });
            }
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Womething went wrong',
              icon: 'error',
              confirmButtonText: 'Okay',
            });
          }
        },
        (error: any) => {
        //  log.debug(`register error: ${error}`);
          this.error = error;
        }
      );
  }
}
