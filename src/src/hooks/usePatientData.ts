import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Patient } from "../models/Patient";
import { PatientRawData } from "../models/PatientRawData";

const selected = ":selected:";

export const usePatientData = () => {
  const patientRaw = useLoaderData() as PatientRawData;

  const [patient, setPatient] = useState<Patient>(parseRawData(patientRaw));

  const updatePatientField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPatient((prevPatient) => {
      if (name === "contactMethod") {
        return {
          ...prevPatient,
          [`prefer${value}`]: event.target.checked,
        };
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
  return {
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
    gender: patientRaw.fields["gender_identity"].item1,
    pronouns: patientRaw.fields["my_pronouns"].item1,
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
    preferEmail: patientRaw.fields["prefer_email"].item1 === selected,
    preferPhone: patientRaw.fields["prefer_phone"].item1 === selected,
    preferText: patientRaw.fields["prefer_text"].item1 === selected,
  };
};
