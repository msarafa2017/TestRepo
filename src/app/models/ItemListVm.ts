
export interface ItemSm{
    nameSm: string;
    itemTypeIdSm: number;
    isActiveSm: boolean|null;
}
export interface ItemListVm{
    id: number;
    nameAr: string;
    nameEn: string;
    itemTypeId: number;
    itemTypeName: string;
    isActive: boolean;
    isActiveName: string;
    rowVersion:any;
}

export interface ItemListVmResponse{
    isSuccess:boolean;
    message:string;
    responseData:ItemListVm[];
}
export interface ItemVmResponse{
    isSuccess:boolean;
    message:string;
    responseData:ItemListVm;
}
export interface ItemCreateUpdateVm{
    id: number;
    nameAr: string;
    nameEn: string;
    itemTypeId: number;
    isActive: boolean;
    rowVersion:any;
}