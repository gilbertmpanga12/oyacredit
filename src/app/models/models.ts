export interface Menu {
    name: string;
    icon: string;
    url: string;
  }

export enum Login {
  EmailRequired = "Please fill in email",
  EmailInvalid = "Please enter a valid email e.g johndoe@example.com",
  PasswordRequired = "Please fill in password",
  PasswordInvalid = "Password should be at least 6 characters"
}

export enum MobileMoney{
  SinglePayments = "Single Payments",
  BulkPayments = "Bulk Payments",
  Approvals = "Approvals",
  ManualTransaction = "ManualTransaction"
}

export enum HistoryReport{
  Today = "Today",
  Month = "Month"
}

export enum Report {
  Monthly = 'monthly',
  Range = 'range'
}

export enum ReportCollections{
  Disbursements = 'transactions',
  Collections = 'loancollection_logs'
}

export interface SingleTransaction{
  StatusCode: number;
}

export interface SinglePayment{
  phoneNumber: string;
  amount: string;
  reason: string;
}

export interface CSV{Amount:string,MSISND:string,Name:string,Reason:string,Index?:number};

export interface History {
  transactionRef: string;
  amount: number;
  transactionInitiationDate: number;
  transactionType: string;
  charge: string;
  phoneNumbers: string;
  status?:string;
}

export interface LoanCollectionHistory{
AMOUNT: number;
COMPANYNAME: string;
CUSTOMERREFERENCEID: string;
ISSUED_AT: number;
MSISD: string;
TXNID: string;
TYPE: string;
}
