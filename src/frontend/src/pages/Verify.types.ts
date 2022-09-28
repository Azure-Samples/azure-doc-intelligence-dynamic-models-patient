export enum Gender {
  male = 0,
  female = 1,
  queer = 2,
  decline = 3,
  mtf = 4,
  ftm = 5,
}

export enum Pronouns {
  he = 0,
  she = 1,
  they = 2,
  other = 3,
}

export type Patient = {
  addressUnit: string;
  addressNumber: string;
  addressStreet: string;
  addressPostcode: string;
  addressState: string;
  addressCity: string;
  familyName: string;
  givenNames: string;
  dob: string;
  phone: string;
  email: string;
  iso: string;
  gender: Gender[];
  pronouns: Pronouns[];
  pronounsOther?: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelationship: string;
  emergencyEmail: string;
  allergies: { medication: string; reaction: string }[];
  date: string;
};

export type PatientRawData = {
  id: String;
  fields: {
    [key: string]: {
      item1: string;
      item2: number;
    };
  };
};
