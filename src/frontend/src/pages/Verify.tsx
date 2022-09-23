import { useParams } from "react-router-dom";
import { usePatientData } from "../hooks/usePatientData";
import { Gender, Pronouns } from "./Verify.types";
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
          <label htmlFor="dob" className={formField}>
            Date of Birth
          </label>
          <input
            type="text"
            className={formControl}
            id="dob"
            name="dob"
            value={patient.dob}
            onChange={updatePatientField}
          />
        </div>
      </fieldset>
      <fieldset className={fieldContainer}>
        <legend>Contact details</legend>
        <div className={formGroup}>
          <label htmlFor="address-unit" className={formField}>
            Unit
          </label>
          <input
            type="text"
            className={formControl}
            id="address-unit"
            name="addressUnit"
            value={patient.addressUnit}
            onChange={updatePatientField}
          />
        </div>
        <div className={formGroup}>
          <label htmlFor="address-street-number" className={formField}>
            Street Number
          </label>
          <input
            type="text"
            className={formControl}
            id="address-street-number"
            name="addressNumber"
            value={patient.addressNumber}
            onChange={updatePatientField}
          />
        </div>
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
      </fieldset>
      <fieldset className={genderGroup}>
        <legend>
          What is your current gender identity? (Check ALL that apply)
        </legend>
        <label htmlFor="gender-male">
          Male{" "}
          <input
            type="checkbox"
            id="gender-male"
            name="gender"
            checked={patient.gender.includes(Gender.male)}
            onChange={updatePatientField}
            value={Gender.male}
          />{" "}
        </label>
        <label htmlFor="gender-female">
          Female{" "}
          <input
            type="checkbox"
            id="gender-female"
            name="gender"
            checked={patient.gender.includes(Gender.female)}
            onChange={updatePatientField}
            value={Gender.female}
          />{" "}
        </label>
        <label htmlFor="gender-ftm">
          Transgender Male/Transman/FTM{" "}
          <input
            type="checkbox"
            id="gender-ftm"
            name="gender"
            checked={patient.gender.includes(Gender.ftm)}
            onChange={updatePatientField}
            value={Gender.ftm}
          />{" "}
        </label>
        <label htmlFor="gender-queer">
          Gender Queer{" "}
          <input
            type="checkbox"
            id="gender-queer"
            name="gender"
            checked={patient.gender.includes(Gender.queer)}
            onChange={updatePatientField}
            value={Gender.queer}
          />{" "}
        </label>
        <label htmlFor="gender-decline">
          Decline{" "}
          <input
            type="checkbox"
            id="gender-decline"
            name="gender"
            checked={patient.gender.includes(Gender.decline)}
            onChange={updatePatientField}
            value={Gender.decline}
          />{" "}
        </label>
        <label htmlFor="gender-mtf">
          Transgender Female/Transwoman/MTF{" "}
          <input
            type="checkbox"
            id="gender-mtf"
            name="gender"
            checked={patient.gender.includes(Gender.mtf)}
            onChange={updatePatientField}
            value={Gender.mtf}
          />{" "}
        </label>
      </fieldset>
      <fieldset className={pronounsGroup}>
        <legend>
          What pronouns do you prefer that we use when talking about you? (Check
          ALL that apply)
        </legend>
        <label htmlFor="pronouns-he">
          He/Him/His{" "}
          <input
            type="checkbox"
            id="pronouns-he"
            name="pronouns"
            checked={patient.pronouns.includes(Pronouns.he)}
            onChange={updatePatientField}
            value={Pronouns.he}
          />{" "}
        </label>
        <label htmlFor="pronouns-she">
          She/Her/Hers{" "}
          <input
            type="checkbox"
            id="pronouns-she"
            name="pronouns"
            checked={patient.pronouns.includes(Pronouns.she)}
            onChange={updatePatientField}
            value={Pronouns.she}
          />{" "}
        </label>
        <label htmlFor="pronouns-they">
          They/Them/Theirs{" "}
          <input
            type="checkbox"
            id="pronouns-they"
            name="pronouns"
            checked={patient.pronouns.includes(Pronouns.they)}
            onChange={updatePatientField}
            value={Pronouns.they}
          />{" "}
        </label>
        <label htmlFor="pronouns-other">
          Other{" "}
          <input
            type="checkbox"
            id="pronouns-other"
            name="pronouns"
            checked={patient.pronouns.includes(Pronouns.other)}
            onChange={updatePatientField}
            value={Pronouns.other}
          />
          <input
            type="text"
            id="pronouns-other-text"
            name="pronounsOther"
            value={patient.pronounsOther}
            onChange={updatePatientField}
          />{" "}
        </label>
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
