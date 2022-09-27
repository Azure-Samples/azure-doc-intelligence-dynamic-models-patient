export enum Gender {
  male = "Male",
  female = "Female",
  mtf = "MTF",
  ftm = "FTM",
  queer = "Queer",
  decline = "Decline",
}

export enum Pronouns {
  she = "She",
  he = "He",
  they = "They",
  other = "Other",
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
