import { useParams } from "react-router-dom";
import { usePatientData } from "../hooks/usePatientData";
import {
  fieldContainer,
  formGroup,
  formField,
  genderGroup,
  pronounsGroup,
  formControl,
  allergiesGroup,
  buttonGroup,
  button,
  buttonPrimary,
} from "./Verify.css";
import { useState } from "react";

type Params = {
  id: string;
};

const Verify = () => {
  const { id } = useParams<Params>();

  const { patient, updatePatientField, reset, updateAllergy } =
    usePatientData();
  const [saving, setSaving] = useState(false);

  const saveUpdates = () => {
    setSaving(true);

    const saveUpdates = async () => {
      const res = await fetch(`/api/new-patient/${id}`, {
        method: "post",
        body: JSON.stringify(patient),
      });

      const data = await res.json();
      console.log(data);
    };

    saveUpdates();
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <fieldset className={fieldContainer}>
        <legend>Personal Details</legend>
        <div className={formGroup}>
          <label htmlFor="givenNames" className={formField}>
            Given Names
          </label>
          <input
            type="text"
            className={formControl}
            id="givenNames"
            name="givenNames"
            value={patient.givenNames}
            onChange={updatePatientField}
          />
        </div>
        <div className={formGroup}>
          <label htmlFor="familyName" className={formField}>
            Family Name
          </label>
          <input
            type="text"
            className={formControl}
            id="familyName"
            name="familyName"
            value={patient.familyName}
            onChange={updatePatientField}
          />
        </div>
        <div className={formGroup}>
          <label htmlFor="dateOfBirth" className={formField}>
            Date of Birth
          </label>
          <input
            type="text"
            className={formControl}
            id="dateOfBirth"
            name="dateOfBirth"
            value={patient.dateOfBirth}
            onChange={updatePatientField}
          />
        </div>
      </fieldset>
      <fieldset className={fieldContainer}>
        <legend>Contact details</legend>
        <div className={formGroup}>
          <label htmlFor="address-street" className={formField}>
            Street
          </label>
          <input
            type="text"
            className={formControl}
            id="address-street"
            name="addressStreet"
            value={patient.addressStreet}
            onChange={updatePatientField}
          />
        </div>
        <div className={formGroup}>
          <label htmlFor="address-postcode" className={formField}>
            Postcode
          </label>
          <input
            type="text"
            className={formControl}
            id="address-postcode"
            name="addressPostcode"
            value={patient.addressPostcode}
            onChange={updatePatientField}
          />
        </div>
        <div className={formGroup}>
          <label htmlFor="address-state" className={formField}>
            State
          </label>
          <input
            type="text"
            className={formControl}
            id="address-state"
            name="addressState"
            value={patient.addressState}
            onChange={updatePatientField}
          />
        </div>
        <div className={formGroup}>
          <label htmlFor="address-city" className={formField}>
            City
          </label>
          <input
            type="text"
            className={formControl}
            id="address-city"
            name="addressCity"
            value={patient.addressCity}
            onChange={updatePatientField}
          />
        </div>
        <div className={formGroup}>
          <label htmlFor="phone" className={formField}>
            Phone
          </label>
          <input
            type="text"
            className={formControl}
            id="phone"
            name="phone"
            value={patient.phone}
            onChange={updatePatientField}
          />
        </div>
        <div className={formGroup}>
          <label htmlFor="email" className={formField}>
            Email
          </label>
          <input
            type="text"
            className={formControl}
            id="email"
            name="email"
            value={patient.email}
            onChange={updatePatientField}
          />
        </div>
        <div className={formGroup}>
          <p>Preferred contact method:</p>
          <label htmlFor="preferEmail" className={formField}>
            Email
            <input
              type="checkbox"
              id="preferEmail"
              name="contactMethod"
              value="Email"
              checked={patient.preferEmail}
              onChange={updatePatientField}
            />
          </label>
          <label htmlFor="preferPhone" className={formField}>
            Phone
            <input
              type="checkbox"
              id="preferPhone"
              name="contactMethod"
              value="Phone"
              checked={patient.preferPhone}
              onChange={updatePatientField}
            />
          </label>
          <label htmlFor="preferText" className={formField}>
            Text
            <input
              type="checkbox"
              id="preferText"
              name="contactMethod"
              value="Text"
              checked={patient.preferText}
              onChange={updatePatientField}
            />
          </label>
        </div>
      </fieldset>
      <fieldset className={genderGroup}>
        <legend>My gender identity is:</legend>
        <input
          type="text"
          id="gender"
          name="gender"
          onChange={updatePatientField}
          value={patient.gender}
        />
      </fieldset>
      <fieldset className={pronounsGroup}>
        <legend>My pronouns are:</legend>
        <input
          type="text"
          id="pronouns"
          name="pronouns"
          onChange={updatePatientField}
          value={patient.pronouns}
        />
      </fieldset>
      <fieldset className={allergiesGroup}>
        <legend>Allergies and medicines</legend>
        <table>
          <thead>
            <tr>
              <th>List of allergies and intolerances to medications.</th>
              <th>Describe your reaction.</th>
            </tr>
          </thead>
          <tbody>
            {patient.allergies.map((allergy, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={allergy.medication}
                    name={`medication_${index}`}
                    onChange={updateAllergy}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name={`reaction_${index}`}
                    value={allergy.reaction}
                    onChange={updateAllergy}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>

      <div className={buttonGroup}>
        <button onClick={reset} className={button}>
          Reset
        </button>
        <button onClick={saveUpdates} className={buttonPrimary}>
          Save
        </button>
      </div>
    </form>
  );
};

export default Verify;
