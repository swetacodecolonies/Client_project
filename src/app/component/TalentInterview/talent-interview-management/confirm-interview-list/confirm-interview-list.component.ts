import { Component , QueryList, ViewChildren} from '@angular/core';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../../../../shared/directives/sortable.directive';
import { supportDB } from 'src/app/shared/interface/support';
import { TableService } from 'src/app/shared/services/table.service';
import { CredentialsService } from 'src/app/shared/services/API/credentials.service';
import { InterviewRoundDetailsService } from 'src/app/shared/services/API/interview-round-details.service';
import { Credentials } from 'src/app/shared/model/authentication.model';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-confirm-interview-list',
  templateUrl: './confirm-interview-list.component.html',
  styleUrl: './confirm-interview-list.component.scss'
})
export class ConfirmInterviewListComponent {
  public  tableData$: Observable<supportDB[]>;
  public  total$: Observable<number>;
  public _credentials: Credentials | null = null;
  confirminterviewlist: any=[];
  searchTerm: string = '';
  filteredData: any[] = [];
  pagedData: any[] = [];
  pageSize: number = 5; 
  currentPage: number = 1; 
  page=1;
  nameSearch: string = '';
 jobSearch: string = '';
 skillSearch: string = '';
 roundSearch: string = '';
 projectSearch: string = '';

  //@ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  //totalpages:number
  constructor(public service: TableService,   private inerviewrounddetailService: InterviewRoundDetailsService,
    private credentialsService: CredentialsService,  ) { this._credentials = credentialsService.credentials;
          this.tableData$ = service.supportdata$;
      this.total$ = service.total$;}


  ngOnInit() {
    this.GetTalentConfirmInterviewList()
  }

  GetTalentConfirmInterviewList() {
    debugger
    let talentid: any = this._credentials?.GlobalUserId;
    this.inerviewrounddetailService.GetTalentConfirmInterviewList(talentid).subscribe((resp) => {
      this.confirminterviewlist = resp.Data;
      this.updatePage();
    })
  }
  search() {
    this.currentPage = 1; // Reset to the first page when performing a search
    this.updatePage();
  }
  changePageSize(pageSize: any) {
    this.pageSize = parseInt(pageSize.value);
    this.currentPage = 1
    this.updatePage();
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.updatePage();
  }
  onSkillSearchChange(){
    this.pagedData = this.confirminterviewlist.filter((item :any)=>
    item.PrimarySkillName.toLowerCase().includes(this.skillSearch.toLowerCase())
  );
  }
  onNameSearchChange(){
    this.pagedData = this.confirminterviewlist.filter((item :any)=>
    item.UserName.toLowerCase().includes(this.nameSearch.toLowerCase())
  );
  }
  onJobSearchChange(){
    debugger
    this.pagedData = this.confirminterviewlist.filter((item :any)=>
    item.JobTitle.toLowerCase().includes(this.jobSearch.toLowerCase())
  );
  }
  onProjectSearchChange(){
    
    this.pagedData = this.confirminterviewlist.filter((item :any)=>
    item.ProjectName.toLowerCase().includes(this.projectSearch.toLowerCase())
  );
  }
  onInterviewSearchChange(){
    this.pagedData = this.confirminterviewlist.filter((item :any)=>
    item.RoundName.toLowerCase().includes(this.roundSearch.toLowerCase())
  );
  }

  updatePage() {
  
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.confirminterviewlist.slice(startIndex, endIndex);
  }

getPageNumbers(): number[] {
  const totalPages = this.getTotalPages();
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}
getTotalPages(): number {
  return Math.ceil(this.confirminterviewlist.length / this.pageSize);
}
}
