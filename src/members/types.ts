type IPerson = {
  fname: string;
  lname: string;
  ssn: string;
};

type IPersonAddress = {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  zipCode: string;
};

type IMember = IPerson &
  IPersonAddress & {
    campus: string;
    isProfessor: boolean;
    phoneNumber: string;
  };

export type { IPerson, IMember };
