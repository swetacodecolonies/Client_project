import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Credentials } from 'src/app/shared/model/authentication.model';
import { CredentialsService } from 'src/app/shared/services/API/credentials.service';
import { InterviewRoundDetailsService } from 'src/app/shared/services/API/interview-round-details.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-interview-request',
 
  templateUrl: './change-interview-request.component.html',
  styleUrl: './change-interview-request.component.scss'
})
export class ChangeInterviewRequestComponent {
  @Output() dataUpdated: EventEmitter<any> = new EventEmitter<any>();
  public _credentials: Credentials | null = null;
  DataOf :any
  isValid = false;
  maxDate:string='';
  maxTime: string;
  showTimeError: boolean = false;

requestmodal :any={ NewPreferDate: '',NewPreferTime: '',Remarks:'', JobsId: '',  ProjectId:'', Talentid: '',InterviewId:'',IsHRApproved:false,IsTalentApproved:false,Rel_Tal_Pro_Id:'',
 UserId: 0 as number| undefined, CreatedBy:'' }
  constructor(
    public router: Router,
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private inerviewrounddetailService: InterviewRoundDetailsService,
    private credentialsService : CredentialsService
  ) {
  this._credentials= credentialsService.credentials;
  const today = new Date();
  this.maxDate  = today.toISOString().split('T')[0];

  const currentHour = today.getHours().toString().padStart(2, '0');
  const currentMinute = today.getMinutes().toString().padStart(2, '0');
  this.maxTime = `${currentHour}:${currentMinute}`; 
  }
  closemodel(){
    this.activeModal.close();
  }
  ngOnInit() {
    if (this.DataOf !== 0 && this.DataOf !== undefined) {  
      console.log(this.DataOf);
    }
       }
  isPastTime(time: string): boolean {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    // Parse the selected time
    const parts = time.split(':');
    let selectedHour = parseInt(parts[0], 10);
    const selectedMinute = parseInt(parts[1], 10);

    // Adjust selected hour for PM
    if (time.includes('PM') && selectedHour !== 12) {
      selectedHour += 12;
    }
    
    // Compare the selected time with the current time
    return selectedHour < currentHour || (selectedHour === currentHour && selectedMinute < currentMinute);
  }
  //   return time < this.currentTime;
  // }
  onTimeChange(time: string): void {
    this.showTimeError = this.isPastTime(time);
  }
  Create(): any {
    this.requestmodal.InterviewId = this.DataOf[0].InterviewID;
    this.requestmodal.JobsId=this.DataOf[0].JobsId;
    this.requestmodal.ProjectId = this.DataOf[0].ProjectId;
    this.requestmodal.Rel_Tal_Pro_Id=this.DataOf[0].Rel_Tal_Pro_Id;
    this.requestmodal.IsTalentApproved = true;
    this.requestmodal.IsHRApproved = false;
    this.requestmodal.Talentid = this._credentials?.GlobalUserId;
     this.requestmodal.UserId = this._credentials?.UserId;
    this.requestmodal.IsTalentApproved=true ,
    this.requestmodal.CreatedBy = this._credentials?.Email;
    this.requestmodal.RoundName = this.DataOf[0].RoundName;
    this.requestmodal.Interview_Round_Id = this.DataOf[0].Interview_Round_Id;
    this.requestmodal.Interview_Description = this.DataOf[0].Interview_Description;
    this.requestmodal.Interview_Link=this.DataOf[0].Interview_Link;
    this.requestmodal.location = this.DataOf[0].InterviewLocation;
    this.requestmodal.InterviewLocation = this.DataOf[0].InterviewLocation;
    this.requestmodal.Interviewer_Name = this.DataOf[0].Interviewer_Name;
    this.requestmodal.Interviewer_Email=this.DataOf[0].Interviewer_Email;
   this.requestmodal.UserName = this.DataOf[0].UserName;;
this.requestmodal.Email=this.DataOf[0].Email;
    
   this.inerviewrounddetailService.AddUpdateInterviewDetail(this.requestmodal).subscribe({
      next: (res) => {
        if (res) { 
          if (res.Success) {
            Swal.fire({
              html: res.Message,
              icon: 'success',
              buttonsStyling: false,
              confirmButtonText: 'Ok, got it!',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
            }).then((result) => {
              this.dataUpdated.emit(true);
              this.activeModal.close();
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: res.Message,
              icon: 'error',
              confirmButtonText: 'Okay',
            });
          }
        }
        else {
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Okay',
          });
        }
      },
      error: (e) => {
       // log.debug(`schedule assessment: ${e}`);
      },
      complete: () => {
       // log.debug(`schedule assessment done:`);
      },
    });
    this.activeModal.close();
  }
}
