
export interface ItemTypeSm{
    nameSm: string;
    isActiveSm: boolean|null;
}

export interface ItemTypeListVmResponse{
    isSuccess:boolean;
    message:string;
    responseData:ItemTypeListVm[];
}
export interface ItemTypeVmResponse{
    isSuccess:boolean;
    message:string;
    responseData:ItemTypeListVm;
}
export interface ItemTypeCreateUpdateVm{
    id: number;
    nameAr: string;
    nameEn: string;
    isActive: boolean;
    rowVersion:any;
}


export interface ItemTypeListVm{
    id: number;
    nameAr: string;
    nameEn: string;
    isActive: boolean;
    isActiveName: string;
    rowVersion:any;
}