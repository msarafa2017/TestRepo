
export interface CustomerSm{
    nameSm: string;
    mobileSm: string;
    emailSm: string;
    isActiveSm: boolean|null;

}
export interface CustomerListVm{
    id: number;
    nameAr: string;
    nameEn: string;
    mobile: string;
    email: string;
    address: string;
    isMale: boolean;
    isActive: boolean;
    isActiveName: string;
    rowVersion:any;
    createdDate: string;
}

export interface CustomerListVmResponse{
    isSuccess:boolean;
    message:string;
    responseData:CustomerListVm[];
}
export interface CustomerVmResponse{
    isSuccess:boolean;
    message:string;
    responseData:CustomerListVm;
}
export interface CustomerCreateUpdateVm{
    id: number;
    nameAr: string;
    nameEn: string;
    mobile: string;
    email: string;
    address: string;
    isActive: boolean;
    rowVersion:any;
}
