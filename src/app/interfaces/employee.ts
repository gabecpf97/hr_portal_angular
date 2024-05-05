export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  SSN: string;
  DOB: string;
  gender: string;
  citizenship: string;
  email: string;
  cellPhone: string;
  workPhone?: string;
  address: {
    buildingAptNum: number;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  car: {
    make: string;
    model: string;
    color: string;
  };
  workAuthorization: {
    type: string;
    document: string;
    startDate: string;
    endDate: string;
  };
  driverLicense: {
    number: string;
    expirationDate: string;
    document: string;
  };
  reference: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    relationship: string;
  };
  emergency: Array<{
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    relationship: string;
    _id: string;
  }>;
  status: string;
  picture: string;
  feedback?: string;
}
