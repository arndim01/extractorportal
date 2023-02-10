export class ContractUpload {
    Name: string;
    Path: string;
    Size: number;
    Carrier: string;
    ContractId: string;
    AmendmentId: string;
    EffectiveDate: string;
    ExpirationDate: string;
    AmendmentType: string;
    AmendmentCompareId: string;
}
export class ContractAssign{
    Carrier: string;
    EffectiveDate: string;
    ExpirationDate: string;
    ContractId: string;
    AmendmentId: string;
    AmendmentType: string;
    FileName: string;
  }
  

  export class ContractTable{
  
    amendmentId : string;
    carrierLogo : string;
    carrierName : string;
    contractId : string;
    contractType: string;
    createdBy : any;
    createdOn : Date;
    startedId: number;
    started : boolean;
  }
 