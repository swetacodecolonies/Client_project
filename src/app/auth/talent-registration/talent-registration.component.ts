import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { M_TalentModel } from 'src/app/shared/model/Talent.model';
import { Credentials } from 'src/app/shared/model/authentication.model';
import { Authloginservice } from 'src/app/shared/services/API/authlogin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-talent-registration',
  // standalone: true,
  // imports: [],
  templateUrl: './talent-registration.component.html',
  styleUrl: './talent-registration.component.scss'
})
export class TalentRegistrationComponent {
  public _credentials: Credentials | null = null;
  public talentModal = new M_TalentModel();
  public validate = false;
  public tooltipValidation = false;
  isLoading = false;
  error: string | undefined;
  DisplayImage_ProfilePicPath: any;
  show = false;
  showconfirmPassword = false;
  password: string = '';
  registrationForm: any;
  constructor(
    private router :Router,   
    private route: ActivatedRoute,
    private authenticationService: Authloginservice,
  
  ) {
    
  }
  showPassword() {
    this.show = !this.show;
  }
  public tooltipSubmit() {
    this.tooltipValidation = !this.tooltipValidation;
  }
  // togglePasswordVisibility() {
  //   this.showPassword = !this.showPassword;
  // }
  toggleConfirmPasswordVisibility() {
    this.showconfirmPassword = !this.showconfirmPassword;
  }
  submit() {
    debugger
    this.isLoading = true;
    this.talentModal.UserTypeCode = 'Talent';
    const RegisterUser$ = this.authenticationService.RegisterUser(this.talentModal);
    RegisterUser$.pipe(
      finalize(() => {
        this.isLoading = false;
      })
      //untilDestroyed(this)
    ).subscribe(
      (res: any | undefined) => {
        
        if (res) {
         // log.debug(`${res?.Email} - talent register successfully `);
          if (res.Success) {

            Swal.fire({
              html: res.Message ,
              confirmButtonText: 'Ok, got it!',
              icon: 'success',
              confirmButtonColor: 'var(--theme-deafult)',
            //})
            // Swal.fire({
            //   html: res.Message ,
            //   icon: 'success',
            //   buttonsStyling: false,
            //   confirmButtonText: 'Ok, got it!',
            //   customClass: {
            //     confirmButton: 'btn btn-primary',
            //   },
            }).then((result) => {
                  this.router.navigate(['/auth/login']);
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
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Okay',
          });
        }
      },
      // (error) => {
      //   log.debug(`register error: ${error}`);
      //   this.error = error;
      // }
    );
  }

}
