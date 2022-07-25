export interface BillSm {
  billNumberSm: string;
  customerIdSm: number | null;
  dateFromSm: string | null;
  dateToSm: string | null;
}

export interface BillMainVmResponse {
  isSuccess: boolean;
  message: string;
  responseData: BillMainListVm;
}
export interface BillMainListVmResponse {
  isSuccess: boolean;
  message: string;
  responseData: BillMainListVm[];
}


export interface BillMainListVm {
  id: number;
  billNumber: string;
  customerId: number;
  customerName: string;
  totalPrice: number;
  isAdded: boolean;
  itemCount: number;
  discount: number;
}

export interface BillMainCreateUpdateVm {
  id: number;
  billNumber: string;
  customerId: number;
  totalPrice: number;
  discount: number;
}
export interface BillMainUpdateVm {
  id: number;
  discount: number;
  submitType: number;
}
export interface BillMainUpdateVmResponse {
  isSuccess: boolean;
  message: string;
  responseData: number;
}

export interface BillItemListVmResponse {
  isSuccess: boolean;
  message: string;
  responseData: BillItemListVm;
}
export interface BillItemListVm {
  id: number;
  billNumber: string;
  customerName: string;
  totalPrice: number;
  discount: number;
  createdDate: string;
  items: BillItemList[];
}

export interface BillItemListResponse {
  isSuccess: boolean;
  message: string;
  responseData: BillItemList[];
}
export interface BillItemList {
  id: number;
  itemName: string;
  amount: number;
  totalPrice: number;
}

export interface BillDetailVmResponse {
  isSuccess: boolean;
  message: string;
  responseData: BillDetailVm;
}
export interface BillDetailVm {
  id: number;
  billMainId: number;
  itemId: number;
  amount: number;
  totalPrice: number;
}
