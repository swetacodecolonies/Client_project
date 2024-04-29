import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Credentials } from 'src/app/shared/model/authentication.model';
import { CredentialsService } from 'src/app/shared/services/API/credentials.service';
import { TimesheetService } from 'src/app/shared/services/API/timesheet.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrl: './timesheet-list.component.scss'
})
export class TimesheetListComponent {
 
  filterlist: { Timesheet_Filter_Id: number; Timesheet_Filter_Name: string; }[];
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
    TimeSheetDate: null,
    Timesheet_datas: [{ TaskName: '', TaskDescription: '', TaskStatus: 0, TaskHours: '' }]
  }
  timesheetdata: any[] = [];
  public _credentials: Credentials | null = null;
  pagedData:any[]=[];
  pageSize:number=5;
  currentPage: number = 1; 
  page=1;

  ngOnInit(): void {
     this.GetAllTimeSheetList();
  }
  constructor(
    private timesheetService: TimesheetService,
    private router: Router,
    private credentialsService: CredentialsService,
    private modalService: NgbModal
  ) {
    this._credentials = credentialsService.credentials;
  }

  FilterList() {
    debugger
    this.timesheetService.GetTimeSheetFilterList().subscribe((resp) => {
      if (resp.Data !== null && resp.Data !== undefined) {
      this.filterlist = resp.Data;
      
      }
    })
  }
  GetAllTimeSheetList() {
    debugger
    let id: any = this._credentials?.UserId;
    this.timesheetService.GetTimeSheetById(id).subscribe((resp) => {
      if (resp.Data !== null && resp.Data !== undefined) {
        this.timesheetdata = resp.Data;
        this.updatePage();
      }
    });
  }
  GetFilterData(value: any) {
    let id: any = this._credentials?.UserId;
    this.timesheetService.GetTimeSheetById(id).subscribe((resp) => {
      if (resp.Data !== null && resp.Data !== undefined) {
        this.timesheetmodel = resp.Data;
        if (value === "1") {

          const today = new Date();
          const dd = String(today.getDate()).padStart(2, '0');
          const mm = String(today.getMonth() + 1).padStart(2, '0');
          const yyyy = today.getFullYear();
          const todayString = dd + '-' + mm + '-' + yyyy;

          const todayData = this.timesheetmodel.filter((item: any) => {
            const itemDate = new Date(item.TimeSheetDate);
            const itemDateString = itemDate.getDate().toString().padStart(2, '0') + '-' +
              (itemDate.getMonth() + 1).toString().padStart(2, '0') + '-' +
              itemDate.getFullYear();
            return itemDateString === todayString;
          });
          return this.timesheetmodel = todayData;
        }

        // Get yesterday's date
        if (value === "2") {
          
          var today = new Date();
          var yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);
          const yesterdayData = this.timesheetmodel.filter((item:any) => {
            const itemDate = new Date(item.TimeSheetDate);
            return itemDate.getDate() === yesterday.getDate() &&
              itemDate.getMonth() === yesterday.getMonth() &&
              itemDate.getFullYear() === yesterday.getFullYear();
          });

          return this.timesheetmodel = yesterdayData;
        }
        if (value === "3") {
          var today = new Date();
          var week = new Date(today);
          week.setDate(today.getDate() - 6);
    
          const weekData = this.timesheetmodel.filter((item:any) => {
              const itemDate = new Date(item.TimeSheetDate);
              return itemDate >= week && itemDate <= today;
          });
          return this.timesheetmodel = weekData;
        }
      
        // Get Last month date
        if (value == "4") {
          var today = new Date();
          var month = new Date(today);
          month.setDate(today.getDate() - 30);
          // var monthString = month.toISOString().split('T')[0]; 
          const monthData = this.timesheetmodel.filter((item:any) => {
              const itemDate = new Date(item.TimeSheetDate);
              return itemDate >= month && itemDate <= today;
          });
          return this.timesheetmodel = monthData;
        }
      }
    });
  }
  exportToExcel(): void {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const fileName = `TimeSheet-${formattedDate}.xlsx`;
    const dataToExport = this.timesheetdata.map((item:any) => ({
      'Date': item.TimeSheetDate,
      'Project Name': item.ProjectName,
      'Task Name': item.TaskName,
      'Task Description': item.TaskDescription,
      'Task Status': item.TaskStatus,
      'Total Hours': item.TotalHours
    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  }
  updatePage(){
    const startIndex = (this.currentPage -1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.timesheetdata.slice(startIndex, endIndex); //(0,5)...(5,10)..(10,20)
  }
  changePageSize(pagesize:any){
   this.pageSize =parseInt(pagesize.value)
  }
  pageChanged(page: number){
    this.currentPage = page;
    this.updatePage();
  }
  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  getTotalPages(): number {
    if(this.timesheetdata && this.timesheetdata.length !==0){
      return Math.ceil(this.timesheetdata.length / this.pageSize);
    }
    else{
      return 0;
    }
  }
}
