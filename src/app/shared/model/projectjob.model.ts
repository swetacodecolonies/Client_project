export class ProjectJobModel {
    JobsId: number;
    Interviewer_Name: string;
    InterviewID: number;
    Interviewer_Contact_Number: string;
    IndustryTypeTitle: string;
    Interview_Description: string;
    Interview_Time: '';
    NewPreferTime: '';
    NewPreferDate: string;
    Interviewer_Email: string;
    Interview_Date: string;
    JobTitle: string;
    JobDescription: string;
    ProjectId: number = 0;
    ProjectDurationId: number = 0;
    PrimaryRoleId: number = 0;
    ExperienceId: number = 0;
    TeamSizeId: number = 0;
    SkillId: string;
    SkillName: string;
    JobTypeId: string = '';
    JobType: string = '';
    LocationId: string = '';
    LocationName: any[]=[];
    ContractTypeId: number = 0;
    DurationInMonth: number;
    Permanent_BaseSalary: string= '';
    Freelancer_HourlyRate: number;
    ProjectName: string;
    ProjectLogo: string;
    ProjectDescription: string;
    ProjectDurationType: string;
    PrimaryRoleTitle: string = '';
    ExperienceName: string;
    TeamSizeType: string = '';
    ContractTypeTitle: string;
    CreatedDate: string;
    CreatedDateStr: string;
    JobsRate: number;
    TotalApplied: number;
    IsAlreadyApplied: boolean;
    ClientName: string;
    LinkedinURL: string;
    IsAdminApproved?: boolean;
    PrimarySkillId: 0;
    PrimarySkillName: string;
    SecondarySkillId: string;
    SecondarySkillName: string;
    Budget: String;
    CurrencyType: string = '';
    UserId: number;
    CreatedBy?  : string;
    CommunicationSkill: string = '';
    IndustryTypeId: number = 0;
    UserName: any;
    RoundName: any;
    UploadFiles: any;
    JobDocument: File[] = [];
    Cancel_It  : string = '';
    Not_Decide : string = '';
    IsSelected : string = '';
    IsRejected : string = '';
    TeamSizeName : string = '';
    IsApplied : boolean;
    IsApproved: boolean;
    Rel_Tal_Pro_Id: number;
    cloanings: any []=[];
    IsActive: boolean;
    Total_Rate:string;
    ribbion: any;
    rating: number;
}