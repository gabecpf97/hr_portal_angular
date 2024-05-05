export interface visa {
  appId: {
    firstName: string;
    lastName: string;
    middleName?: string;
  };
  step: string;
  OPTReceipt: {
    status: string;
    document: string;
    feedback: string;
  };
  OPTEAD: {
    status: string;
    document: string;
    feedback: string;
  };
  I983: {
    status: string;
    document: string;
    feedback: string;
  };
  I20: {
    status: string;
    document: string;
    feedback: string;
  };
  _id: string;
}
