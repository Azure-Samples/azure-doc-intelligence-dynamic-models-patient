import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Patient } from "../models/Patient";
import { PatientRawData } from "../models/PatientRawData";
import { Pronouns } from "../models/Pronouns";
import { Gender } from "../models/Gender";

const selected = ":selected:";

const setGender = (patient: PatientRawData) => {
  const genders = [];
  if (patient.fields.female.item1 === selected) {
    genders.push(Gender.female);
  }
  if (patient.fields.male.item1 === selected) {
    genders.push(Gender.male);
  }
  if (patient.fields.mtf.item1 === selected) {
    genders.push(Gender.mtf);
  }
  if (patient.fields.ftm.item1 === selected) {
    genders.push(Gender.ftm);
  }
  if (patient.fields.queer.item1 === selected) {
    genders.push(Gender.queer);
  }
  if (patient.fields.decline.item1 === selected) {
    genders.push(Gender.decline);
  }

  return genders;
};

const setPronouns = (patient: PatientRawData) => {
  const pronouns = [];
  if (patient.fields.she.item1 === selected) {
    pronouns.push(Pronouns.she);
  }
  if (patient.fields.he.item1 === selected) {
    pronouns.push(Pronouns.he);
  }
  if (patient.fields.they.item1 === selected) {
    pronouns.push(Pronouns.they);
  }
  if (patient.fields.other.item1 === selected) {
    pronouns.push(Pronouns.other);
  }
  return pronouns;
};

export const usePatientData = () => {
  const patientRaw = useLoaderData() as PatientRawData;

  const [patient, setPatient] = useState<Patient>(parseRawData(patientRaw));

  const updatePatientField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: keyof Patient; value: string } =
      event.target as any;
    setPatient((prevPatient) => {
      const prev = prevPatient[name];
      if (Array.isArray(prev)) {
        if (name === "gender") {
          const narrowedPrev = prev as typeof prevPatient[typeof name];
          const narrowedValue = value as typeof narrowedPrev[number];
          return {
            ...prevPatient,
            [name]: narrowedPrev.includes(narrowedValue)
              ? narrowedPrev.filter((item) => item !== value)
              : [...narrowedPrev, narrowedValue],
          };
        } else if (name === "pronouns") {
          const narrowedPrev = prev as typeof prevPatient[typeof name];
          const narrowedValue = value as typeof narrowedPrev[number];
          return {
            ...prevPatient,
            [name]: narrowedPrev.includes(narrowedValue)
              ? narrowedPrev.filter((item) => item !== value)
              : [...narrowedPrev, narrowedValue],
          };
        } else {
          return prevPatient;
        }
      }
      return {
        ...prevPatient,
        [name]: value,
      };
    });
  };

  const updateAllergy = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const allergyIndex = parseInt(name.split("_")[1]);
    const allergyField = name.split("_")[0];

    setPatient((prevPatient) => {
      const allergies = prevPatient.allergies[allergyIndex];
      return {
        ...prevPatient,
        allergies: prevPatient.allergies.slice(0, allergyIndex).concat(
          {
            ...allergies,
            [allergyField]: value,
          },
          ...prevPatient.allergies.slice(allergyIndex + 1)
        ),
      };
    });
  };

  const reset = () => setPatient(parseRawData(patientRaw));

  return { patient, updatePatientField, reset, updateAllergy };
};

const parseRawData = (patientRaw: PatientRawData): Patient => {
  const pronouns = setPronouns(patientRaw);

  return {
    addressUnit: patientRaw.fields["address_unit"].item1,
    addressNumber: patientRaw.fields["address_street"].item1,
    addressStreet: patientRaw.fields["address_street"].item1,
    addressPostcode: patientRaw.fields["address_code"].item1,
    addressState: patientRaw.fields["address_state"].item1,
    addressCity: patientRaw.fields["address_city"].item1,
    familyName: patientRaw.fields["family_name"].item1,
    givenNames: patientRaw.fields["given_names"].item1,
    dateOfBirth: patientRaw.fields["date_of_birth"].item1,
    phone: patientRaw.fields["phone"].item1,
    email: patientRaw.fields["email"].item1,
    iso: patientRaw.fields["iso"].item1,
    emergencyName: patientRaw.fields["emergency_name"].item1,
    emergencyPhone: patientRaw.fields["emergency_phone"].item1,
    emergencyRelationship: patientRaw.fields["emergency_relationship"].item1,
    emergencyEmail: patientRaw.fields["emergency_email"].item1,
    gender: setGender(patientRaw),
    pronouns,
    pronounsOther: pronouns.includes(Pronouns.other)
      ? patientRaw.fields["other_description"].item1
      : undefined,
    allergies: [
      {
        medication: patientRaw.fields["allergy_1"].item1,
        reaction: patientRaw.fields["reaction_1"].item1,
      },
      {
        medication: patientRaw.fields["allergy_2"].item1,
        reaction: patientRaw.fields["reaction_2"].item1,
      },
      {
        medication: patientRaw.fields["allergy_3"].item1,
        reaction: patientRaw.fields["reaction_3"].item1,
      },
    ],
    date: patientRaw.fields["date"].item1,
  };
};
