export class M_TalentModel {
    TalentId: number;
    UserId: number=0;
    FirstName :string = "";
    BeneficiaryName :string = "";
    LastName :string = "";
    Password : string = "";
ConfirmPassword: string = "";
    Email : string = "";
    PhoneNumber : any;
    Expertise: string;
    TechSkill: string;
    TotalExperienceYear: number;
    TotalExperienceMonth: number;
    ProjectCompleted: number;
    CountryId: number;
    StateId : number;
    CityId:number;
    BankAcName :string = "";
    BankName :string = "";
    BranchName :string = "";
    BankEmailId :string = "";
    AccountNumber :string = "";
    IFSCCode :string = "";
    SWIFTCode :string = "";
    //SkillId:string;
   // ExperienceId:string;
   PhoneCode:string;
    LinkedInURL: string="";
    GithubURL: string="";
    DegreeTitle: string;
    UniversityName: string;
    StartYear: number = 0;
    EndYear: number = 0;
    ExpectedPayout: number;
    CurrentPayout: number;
    CVURL: string;
    IsFullTime: boolean = false;
    IsInterested8hrsWork: boolean;
    IsImmidiateJoin: boolean = false;
    PreferredWorkLocation: string;
    CommunicationRate: string;
    IsCurrentlyWorking: boolean;
    _TalentProfilePicPath: File ;
    TalentProfilePicPath: File ;
    TalentCV: File[]=[] ;
    TalentAddressProof: File[]=[] ;
    TalentPhotoIdentity: File[]=[] ;
    TalentPanCard: File[]=[] ;
    AccountType: number=0; 
    PaymentOption : number=0; 

   // ExperienceName:string;
    CountryName: string;
    StateName: string;
    CityName: string;
    TechSkillStr:string;
    ExpertiseStr:string;
    UserTypeCode:string;
    IsActive: boolean;
    CreatedBy?: string;
    CreatedDate: string;
    ModifiedBy: string;
    ModifiedDate: string;
    CreatedDateStr: string;
    ProfilePicPath:string
    Address1 : string ="";
    Address2:string="";
    PostalCode:string="";
    UserName:string;
    IsAlreadyApplied?:boolean;
    IsAdminApproved?:boolean
    AddressProof:string;
    PhotoIdentity:string;
    PanCard:string;
    Gender :boolean;
    DateOfBirth:Date ;
    ProfileCompletedField:number;
    agree:any

    Achievement:string;
    _Achievements:File[]=[] ;
 
    DocumentNames:string;
    DocumentPaths:string;
}
