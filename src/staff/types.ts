type TStaffPerson = {
  role: string;
  ssn: string;
  passwordHash: Buffer;
};

type TStaffPersonWithoutPasswordHash = Omit<TStaffPerson, 'passwordHash'>;

export type { TStaffPerson, TStaffPersonWithoutPasswordHash };
