import { Gender } from "./Gender";
import { Pronouns } from "./Pronouns";

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
  id?: string;
};
