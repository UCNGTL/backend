import type { Request } from 'express';

import type {
  TPerson,
  TPersonAddress,
  TPersonPhoneNumber,
} from '../utils/types';

type TMember = TPerson &
  TPersonAddress &
  TPersonPhoneNumber & {
    campus: string;
    isProfessor: boolean;
  };

type TGetMembersPagination = {
  page?: string;
};

type TGetMembersRequest = Request<{}, {}, {}, TGetMembersPagination>;

type TMembersNormalized = {
  [ssn: string]: TMemberWithAddressesAndPhoneNumbers;
};

type TMemberWithAddressesAndPhoneNumbers = Omit<
  TMember,
  'address1' | 'address2' | 'address3' | 'city' | 'phoneNumber' | 'zipCode'
> & {
  addresses: TPersonAddress[];
  phoneNumbers: string[];
};

export type {
  TMember,
  TGetMembersPagination,
  TGetMembersRequest,
  TMembersNormalized,
  TMemberWithAddressesAndPhoneNumbers,
};
