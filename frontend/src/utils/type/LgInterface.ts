export interface LGDetail {
  amendmentAmount: number;
  amendmentLgValidityDate: number;
  amendmentTermCondition: string;
  applicantCif: string;
  applicantCr: string;
  applicantIban: string;
  applicantId: string;
  applicantName: string;
  bankFeeIban: string;
  beneficiaryIban: string;
  beneficiaryName: string;
  beneficiaryUid: string;
  existingLgAmount: number;
  existingLgvalidityDate: number;
  id: number;
  issueDate: number;
  lgReference: string;
  reasonFailure: string;
  requesterType: string;
  sadadId: string;
  specialAccountIban: string;
  validationStatus: string;
  validationTime: number;
}

export interface DataSearch {
  content: LGDetail[];
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
