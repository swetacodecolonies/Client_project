import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { finalize } from 'rxjs';
import { M_TalentModel } from 'src/app/shared/model/Talent.model';
import { Credentials } from 'src/app/shared/model/authentication.model';
import { M_CountryModel, M_StateModel, M_CityModel, PaymentTypeModel } from 'src/app/shared/model/role.model';
import { SkillModel } from 'src/app/shared/model/skill.model';
import { CommonService } from 'src/app/shared/services/API/common.service';
import { CredentialsService } from 'src/app/shared/services/API/credentials.service';
import { SkillService } from 'src/app/shared/services/API/skill.service';
import { TalentService } from 'src/app/shared/services/API/talent.service';
import { environment } from 'src/environment/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {
  public _credentials: Credentials | null = null;
  serverFilePath = environment.serverFilePath;
  TabName: string;
  DisplayImage_ProfilePicPath: any;
  maxDate?: string;
  displayDocs :boolean=false;
  public countryList: M_CountryModel[] = [];
  public stateList: M_StateModel[] = [];
  public cityList: M_CityModel[] = [];
  public skillList: SkillModel[] = [];
  public paymentList: PaymentTypeModel[] = [];
  public totalExperienceYearList: Array<any> = [];
  public totalExperienceMonthList: Array<any> = [];
  public totalStartEndYearList: Array<any> = [];
  public PaymentOptionList: Array<any> = [];
  public AccountTypeList: Array<any> = [];
  public AddresproofList: Array<any> = [];
  public PhotoIdentityList: Array<any> = [];
  public PanCardList: Array<any> = [];
  talentModel = new M_TalentModel();
  isallowDocument = false;
  fileEmptyError_aadhar = false;
  fileEmptyError_pan = false;
  fileEmptyError_IDproof = false;
  Achievement: File | File[] = [];
  _Achievements: File[] = [];
  DocumentNames: string[] = [];
  DocumentPaths: string[] = [];
  ddSettings_Common: IDropdownSettings = {};
  ddSettings_Skill: IDropdownSettings = {};
  selectedExpertise: any = [];
  selectedSkill: any = [];
  constructor(
   // private updateService: UpdateProfileService,
    private route: ActivatedRoute,
    public router: Router,
    private talentService: TalentService,
    private commonService: CommonService,
    private skillService: SkillService,
    private credentialsService: CredentialsService,
  ) {
    this._credentials = this.credentialsService.credentials;
    this.talentModel = new M_TalentModel();
    this.route.params.subscribe((params) => {
      this.TabName = params['TabName'] || 'Settings';
    });

    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];

  }
  ngOnInit(): void {
    this.getSkillList();
    this.getTotalExperienceYearList();
    this.getTotalExperienceMonthList();
    this.GetCountryList();
     this.dropdownSetting();
    this.getStartEndYearList();
    this.getPaymentOptionList();
    this.getAccountTypeonList();
    this.GetTalentById();
    this.route.params.subscribe(params => {
      // Check if TabName is provided in the route parameters
      this.TabName = params['TabName'] || 'Settings';

    });

  }
  dropdownSetting() {
    this.ddSettings_Skill = {
      singleSelection: false,
      idField: 'SkillId',
      textField: 'SkillName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
    };

    this.ddSettings_Common = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      enableCheckAll: false,
    };
  
  }
  TabsActive(value: any) {
    this.TabName = value;
  }
  nextTab(){
    this.displayDocs=!this.displayDocs;
  }
  GetCountryList() {
    this.commonService.GetCountryList().subscribe((result) => {
      this.countryList = result.Data;
    });
  }
  GetStateList(countryId: number) {
    this.commonService.GetStateList(countryId).subscribe((result) => {
      this.stateList = result.Data;
    });
  }
  GetCityList(stateId: number) {
    this.commonService.GetCityList(stateId).subscribe((result) => {
      this.cityList = result.Data;
    });
  }
  getSkillList() {
    this.skillService.GetAllSkill().subscribe((result) => {
      this.skillList = result.Data;
    });
  }
  getTotalExperienceYearList() {
    this.totalExperienceYearList = [
      { item_id: 1, item_text: '1' },
      { item_id: 2, item_text: '2' },
      { item_id: 3, item_text: '3' },
      { item_id: 4, item_text: '4' },
      { item_id: 5, item_text: '5' },
      { item_id: 6, item_text: '6' },
      { item_id: 7, item_text: '7' },
      { item_id: 8, item_text: '8' },
      { item_id: 9, item_text: '9' },
      { item_id: 10, item_text: '10' },
      { item_id: 11, item_text: '11' },
      { item_id: 12, item_text: '12' },
      { item_id: 13, item_text: '13' },
      { item_id: 14, item_text: '14' },
      { item_id: 15, item_text: '15' },
    ];
  }
  getTotalExperienceMonthList() {
    this.totalExperienceMonthList = [
      { item_id: 1, item_text: '1' },
      { item_id: 2, item_text: '2' },
      { item_id: 3, item_text: '3' },
      { item_id: 4, item_text: '4' },
      { item_id: 5, item_text: '5' },
      { item_id: 6, item_text: '6' },
      { item_id: 7, item_text: '7' },
      { item_id: 8, item_text: '8' },
      { item_id: 9, item_text: '9' },
      { item_id: 10, item_text: '10' },
      { item_id: 11, item_text: '11' },
      { item_id: 12, item_text: '12' },
    ];
  }
  getStartEndYearList() {
    this.totalStartEndYearList = [
      { item_id: 1, item_text: '1990' },
      { item_id: 2, item_text: '1991' },
      { item_id: 3, item_text: '1992' },
      { item_id: 4, item_text: '1993' },
      { item_id: 5, item_text: '1994' },
      { item_id: 6, item_text: '1995' },
      { item_id: 7, item_text: '1996' },
      { item_id: 8, item_text: '1997' },
      { item_id: 9, item_text: '1998' },
      { item_id: 10, item_text: '1997' },
      { item_id: 11, item_text: '1998' },
      { item_id: 12, item_text: '1999' },
      { item_id: 13, item_text: '2000' },
      { item_id: 14, item_text: '2001' },
      { item_id: 15, item_text: '2002' },
      { item_id: 16, item_text: '2003' },
      { item_id: 17, item_text: '2004' },
      { item_id: 18, item_text: '2005' },
      { item_id: 19, item_text: '2006' },
      { item_id: 20, item_text: '2007' },
      { item_id: 21, item_text: '2008' },
      { item_id: 22, item_text: '2009' },
      { item_id: 23, item_text: '2010' },
      { item_id: 24, item_text: '2011' },
      { item_id: 25, item_text: '2012' },
      { item_id: 26, item_text: '2013' },
      { item_id: 27, item_text: '2014' },
      { item_id: 28, item_text: '2015' },
      { item_id: 29, item_text: '2016' },
      { item_id: 30, item_text: '2017' },
      { item_id: 31, item_text: '2018' },
      { item_id: 32, item_text: '2019' },
      { item_id: 33, item_text: '2020' },
      { item_id: 34, item_text: '2021' },
      { item_id: 35, item_text: '2022' },
      { item_id: 36, item_text: '2023' },
    ];
  }

  getPaymentOptionList() {
    this.PaymentOptionList = [
      { item_id: 1, item_text: 'Wire trasnfer' },
      { item_id: 2, item_text: 'NEFT' },
      { item_id: 3, item_text: 'Deel' },
    ];
  }
  getAccountTypeonList() {
    this.AccountTypeList = [
      { item_id: 1, item_text: 'Current' },
      { item_id: 2, item_text: 'Savings' },
    ];
  }

  onChanageCountry(item: any) {
    debugger
    this.GetStateList(item);
  }
  onChnageState(item: any) {
    this.GetCityList(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onSelectProfilePicFile(event: any) {
    debugger;

    if (event.target.files && event.target.files[0]) {
      const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
      const selectedFile = event.target.files[0];

      if (allowedFileTypes.includes(selectedFile.type)) {
        this.talentModel.ProfilePicPath = selectedFile;

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);

        reader.onload = (event: any) => {
          this.DisplayImage_ProfilePicPath = event.target.result;
        };
      } else {
        console.error("Invalid file type. Please select a PNG, JPG, or JPEG file.");
        event.target.value = null;
      }
    }
  }

  onRemoveCompanyLogoFile() {
    this.DisplayImage_ProfilePicPath = 'assets/media/svg/avatars/blank.svg';
  }
  
  onSelect(event: any) {
    this.talentModel.TalentCV = [];
    this.talentModel.TalentCV.push(...event.addedFiles);
  }
  onRemove(event: any) {
    this.talentModel.TalentCV.splice(this.talentModel.TalentCV.indexOf(event), 1);
  }
  Removecv() {
    this.talentModel.CVURL = "";
  }
  RemoveAddress() {
    this.talentModel.AddressProof = "";
  }
  RemoveIDProof() {

    this.talentModel.PhotoIdentity = "";
  }
  RemovePanCard() {

    this.talentModel.PanCard = "";
  }
  onSelectAdharCard(event: any) {

    this.talentModel.TalentAddressProof = [];

    this.talentModel.TalentAddressProof.push(...event.addedFiles);
  }
  onRemoveAdharCard(event: any) {
    this.talentModel.TalentAddressProof.splice(this.talentModel.TalentAddressProof.indexOf(event), 2);
  }
  onSelectIdProof(event: any) {
    this.talentModel.TalentPhotoIdentity = [];

    this.talentModel.TalentPhotoIdentity.push(...event.addedFiles);
  }
  onRemoveIdProof(event: any) {
    this.talentModel.TalentPhotoIdentity.splice(this.talentModel.TalentPhotoIdentity.indexOf(event), 3);
  }
  onSelectPanCard(event: any) {
    this.talentModel.TalentPanCard = [];
    this.talentModel.TalentPanCard.push(...event.addedFiles);
  }
  onRemovePancard(event: any) {
    this.talentModel.TalentPanCard.splice(this.talentModel.TalentPanCard.indexOf(event), 4);
  }
  onSelectt(event: any) {
    if (!this.talentModel._Achievements) {
      this.talentModel._Achievements = [];
    }
    if (event && event.addedFiles && Array.isArray(event.addedFiles)) {
      this.talentModel._Achievements.push(...event.addedFiles);
    }
  }
  onRemovee(event: any) {
    this.talentModel._Achievements.splice(this.talentModel._Achievements.indexOf(event), 1);
  }
    
  RemoveDocument(value: any) {
    const index = this.talentModel.DocumentPaths.indexOf(value);  
    if (index !== -1) {
      if (Array.isArray(this.talentModel.DocumentNames)) {
        this.talentModel.DocumentNames.splice(index, 1);
      }
      if (Array.isArray(this.talentModel.DocumentPaths)) {
        this.talentModel.DocumentPaths.splice(index, 1);
      }
      if (typeof this.talentModel.Achievement === 'string') {
        const achievementsArray = this.talentModel.Achievement.split(',');
        achievementsArray.splice(index, 1);
        this.talentModel.Achievement = achievementsArray.join(',');
      }
    }
  }
  
  GetTalentById() {
    debugger
    this.talentService.GetTalentById(this._credentials?.GlobalUserId).subscribe((resp) => {
      this.talentModel = resp.Data;
      if(this.talentModel.AccountType == null && this.talentModel.AccountType == undefined){
        if(this.talentModel.PaymentOption == null && this.talentModel.PaymentOption == undefined){
          this.talentModel.AccountType = 0;
          this.talentModel.PaymentOption = 0; 
        }
       }   
      this.DisplayImage_ProfilePicPath = this.serverFilePath + (this.talentModel.ProfilePicPath || '');
      this.GetCountryList();
      this.GetStateList(this.talentModel.CountryId);
      this.GetCityList(this.talentModel.StateId);
      var selectedSkillList: any = [];
      var selectedExpertiseList: any = [];
      setTimeout(() => {
        this.countryList = this.countryList.filter((x) => x.CountryId == this.talentModel.CountryId);
        this.stateList = this.stateList.filter((x) => x.StateId == this.talentModel.StateId);
        this.cityList = this.cityList.filter((x) => x.CityId == this.talentModel.CityId);
        this.AccountTypeList = this.AccountTypeList.filter((x: any) => x.item_text == this.talentModel.AccountType);
        this.PaymentOptionList = this.PaymentOptionList.filter((x: any) => x.item_text == this.talentModel.PaymentOption);
        if (this.talentModel.TechSkill != '' && this.talentModel.TechSkill != null) {
          var splitValueArray = this.talentModel.TechSkill.split(',');
          splitValueArray.forEach((split) => {
            var filterData = this.skillList.filter((x) => x.SkillId == parseInt(split.toString()));
            filterData.forEach((element) => {
              selectedSkillList.push({ SkillId: element.SkillId, SkillName: element.SkillName });
            });
          });
          this.selectedSkill = selectedSkillList;
        }
        if (this.talentModel.Expertise != '' && this.talentModel.Expertise != null) {
          var splitValueArray = this.talentModel.Expertise.split(',');
          splitValueArray.forEach((split) => {
            var filterData = this.skillList.filter((x) => x.SkillId == parseInt(split.toString()));
            filterData.forEach((element) => {
              selectedExpertiseList.push({ SkillId: element.SkillId, SkillName: element.SkillName });
            });
          });
          this.selectedExpertise = selectedExpertiseList;
        }
      }, 2000);
    });
  }

  submit(IsFormValid:any) {
    debugger
    if (IsFormValid.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill all required field',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    } else {
     // this.isLoading = true;
    this.talentModel.TalentId = this._credentials?.GlobalUserId;
    this.talentModel.UserId = this._credentials?.UserId ? this._credentials?.UserId : 0;
    this.talentModel.CreatedBy = this._credentials?.Email;
    this.talentModel.Achievement = this.talentModel.Achievement ;
    this.talentModel._Achievements = this.talentModel._Achievements || [];
    this.talentModel.AddressProof = this.talentModel.AddressProof;
    this.talentModel.PanCard = this.talentModel.PanCard;
    this.talentModel.PhotoIdentity = this.talentModel.PhotoIdentity;
    this.talentModel.PhoneNumber = this.talentModel.PhoneNumber;
    if (this.talentModel.IFSCCode == null  ) {
      this.talentModel.ProfileCompletedField = 50;
    } else {
      this.talentModel.ProfileCompletedField = 100;
    }
    let createFormData = this.commonService.createFormData(this.talentModel);
    createFormData.append('_TalentProfilePicPath', this.talentModel.ProfilePicPath);

    if (this.talentModel.TalentCV != undefined && this.talentModel.TalentCV != null) {
      if (this.talentModel.TalentCV.length > 0) {
        createFormData.append('_TalentCV', this.talentModel.TalentCV[0]);
      }
    }
    if (this.talentModel.TalentPanCard != undefined && this.talentModel.TalentPanCard != null) {
      if (this.talentModel.TalentPanCard.length > 0) {
        createFormData.append('_TalentPanCard', this.talentModel.TalentPanCard[0]);
      }
    }

    if (this.talentModel.TalentAddressProof != undefined && this.talentModel.TalentAddressProof != null) {
      if (this.talentModel.TalentAddressProof.length > 0) {
        createFormData.append('_TalentAddressProof', this.talentModel.TalentAddressProof[0]);
      }
    }

    if (this.talentModel.TalentPhotoIdentity != undefined && this.talentModel.TalentPhotoIdentity != null) {
      if (this.talentModel.TalentPhotoIdentity.length > 0) {
        createFormData.append('_TalentPhotoIdentity', this.talentModel.TalentPhotoIdentity[0]);
      }
    }
    this.talentModel._Achievements && this.talentModel._Achievements.forEach((item: any) => {
      createFormData.append("Achievements", item);
    });
    if (Array.isArray(this.talentModel.DocumentPaths)) {
      this.talentModel.DocumentPaths.forEach((item: any) => {
        this.talentModel._Achievements.push(item);
      });
    } else {
  
      console.error("DocumentPaths is not an array:", this.talentModel.DocumentPaths);
    }
    const RegisterUser$ = this.talentService.AddUpdateTalent(createFormData);

    RegisterUser$.pipe(
      finalize(() => {
       // this.isLoading = false;
      })
    ).subscribe(
      (res: any | undefined) => {
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
              if (result.isConfirmed) {
                this.TabsActive('Overview');
                this.GetTalentById();
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
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Okay',
          });
        }
      },
      (error) => {
        // log.debug(`talent profile error: ${error}`);
        // this.error = error;
      }
    );
  }
  }
  Banksubmit(IsFormValid: any) {
    debugger
    // const errorMessages = [];

    // Check if the selected country is empty
    // if (!this.selectedAccountType || this.selectedAccountType.length === 0) {
    //   errorMessages.push('Please select a AccountType');
    // }

    // Check if the selected state is empty
    // if (!this.selectedPayentOption || this.selectedPayentOption.length === 0) {
    //   errorMessages.push('Please select a PaymentOption');
    // }
    // if (errorMessages.length > 0) {
    //   Swal.fire({
    //     title: 'Error!',
    //     html: errorMessages.map(message => `<div>${message}</div>`).join(''),
    //     icon: 'error',
    //     confirmButtonText: 'Okay',
    //   });
    //   return; // Stop further execution
    // }

    if (IsFormValid.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill all required field',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    } else {
     // this.isLoading = true;
      //this.talentModel.TalentId = this._credentials?.GlobalUserId;
      //  this.talentModel.AccountType = this.selectedAccountType[0].item_text;
      //  this.talentModel.PaymentOption = this.selectedPayentOption[0].item_text;
      this.talentModel.CreatedBy = this._credentials?.Email;
      this.talentModel.PhoneNumber = this.talentModel.PhoneNumber && this.talentModel.PhoneNumber;

      this.talentModel.BranchName = this.talentModel.BranchName;
      this.talentModel.BankAcName = this.talentModel.BankAcName;
      this.talentModel.BankName = this.talentModel.BankName;
      this.talentModel.BankEmailId = this.talentModel.BankEmailId;
      this.talentModel.AccountNumber = this.talentModel.AccountNumber;
      this.talentModel.IFSCCode = this.talentModel.IFSCCode;
      //this.talentModel.UserId = this._credentials?.UserId ? this._credentials?.UserId : 0;
      this.talentModel.ProfileCompletedField = 100;
      let createFormData = this.commonService.createFormData(this.talentModel);
      const RegisterUser$ = this.talentService.AddUpdateTalent(createFormData);
      RegisterUser$.pipe(
        finalize(() => {
         // this.isLoading = false;
        })
      ).subscribe(
        (res: any | undefined) => {
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
                if (result.isConfirmed) {
                  this.TabsActive('Bank')
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
              text: 'Something went wrong',
              icon: 'error',
              confirmButtonText: 'Okay',
            });
          }
        },
        (error) => {
          //log.debug(`agency profile error: ${error}`);
          // this.error = error;
        }
      );
    }
  }
  calculateProgress(project: M_TalentModel): any {

    if (project.ProfileCompletedField === null || undefined) {
      return 0;
    }

    const elapsedDays = project.ProfileCompletedField;
    let progress = (elapsedDays / 100) * 100;
    progress = Math.min(progress, 100);
    return progress;
  }
  getProgressLabelStyles(progress: number): any {
    return {
      'float': 'right',
      'text-decoration': 'solid',
      'color': progress === 100 ? 'green' : 'blue', // Change colors as needed
    };
  }

}
