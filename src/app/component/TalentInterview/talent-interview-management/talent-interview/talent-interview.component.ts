import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/sortable.directive';
import { supportDB } from 'src/app/shared/interface/support';
import { Credentials } from 'src/app/shared/model/authentication.model';
import { CredentialsService } from 'src/app/shared/services/API/credentials.service';
import { InterviewRoundDetailsService } from 'src/app/shared/services/API/interview-round-details.service';
import { TableService } from 'src/app/shared/services/table.service';
import { ChangeInterviewRequestComponent } from '../change-interview-request/change-interview-request.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-talent-interview',
  templateUrl: './talent-interview.component.html',
  styleUrl: './talent-interview.component.scss',

})
export class TalentInterviewComponent {
  public _credentials: Credentials | null = null;
  public interviewlist: any=[];
  confirmdata: any;
  colors = ['badge-light-success', 'badge-light-info', 'badge-light-info', 'badge-light-warning'];
  constructor(public service: TableService,  private credentialsService: CredentialsService,  
      private router : Router, private inerviewrounddetailService: InterviewRoundDetailsService,
      private modalService: NgbModal,
    ) {
    this._credentials = credentialsService.credentials; 
  }

  ngOnInit() {
    this.GetInterviewDetailForTalent();
  }

  GetInterviewDetailForTalent(){
    debugger
    let talentid: any = this._credentials?.GlobalUserId;
    this.inerviewrounddetailService.GetInterviewList(talentid).subscribe((resp) => {
      this.interviewlist = resp.Data;
    })
  }

  changerequest(interviewid: number){
    debugger
    if(this.interviewlist !== null){
      const modalRef = this.modalService.open(ChangeInterviewRequestComponent);
      modalRef.componentInstance.DataOf =  this.interviewlist.filter((x:any)=>x.InterviewID==interviewid);
      modalRef.componentInstance.dataUpdated.subscribe((result: boolean) => {
        if (result) {
          this.GetInterviewDetailForTalent();
        }
      });
      // modalRef.result.then((result) => {
      //   this.GetInterviewDetailForTalent();
      //   console.log(result);
      // }).catch((error) => {
      //   console.log(error);
      // });
    }
    else {
      this.GetInterviewDetailForTalent();
    }
  }
  Confirmation(item: any,Rel_Tal_Pro_Id:number,ProjectId:number,JobsId:number,TalentId:number,UserId:number,CreatedBy:any) {
    const DataforBackend = {
      InterviewID: item,
      Rel_Tal_Pro_Id: Rel_Tal_Pro_Id,
      ProjectId: ProjectId,
      JobsId : JobsId,
      TalentId: TalentId,
      UserId: UserId,
      CreatedBy: CreatedBy,
      IsTalentApproved: 1
    }
    let talentid: any = this._credentials?.GlobalUserId;
    this.inerviewrounddetailService.TalentConfirmation(DataforBackend).subscribe((result) => {
      this.confirmdata = result.Data;
    })
    this.router.navigate(['/interview/confirm-interview-list']);
  }

}
