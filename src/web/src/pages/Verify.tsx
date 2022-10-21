import { useNavigate, useParams } from "react-router-dom";
import { usePatientData } from "../hooks/usePatientData";
import {
  fieldContainer,
  formGroup,
  formField,
  formControl,
  allergiesGroup,
  buttonGroup,
  formContainer,
  checkboxGroup,
  checkboxItem,
  checkbox,
} from "./Verify.css";
import { useState } from "react";
import { FullPageSpinner } from "../components/FullPageSpinner";
import { Button, ButtonPrimary } from "../components/Button";

type Params = {
  id: string;
};

const Verify = () => {
  const { id } = useParams<Params>();

  const { patient, updatePatientField, reset, updateAllergy } =
    usePatientData();
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const saveUpdates = () => {
    setSaving(true);

    const saveUpdates = async () => {
      const res = await fetch(`/api/new-patient/${id}`, {
        method: "post",
        body: JSON.stringify(patient),
      });

      if (res.status === 200) {
        navigate("/record-saved");
      }
    };

    saveUpdates();
  };

  return (
    <div style={{ opacity: saving ? "50%" : "100%" }}>
      {saving && <FullPageSpinner />}
      <p>
        The following information was detected from the form. Please ensure it's
        correct before submitting it to the surgery.
      </p>
      <form onSubmit={(e) => e.preventDefault()} className={formContainer}>
        <fieldset className={fieldContainer}>
          <legend>
            <h2>Personal Details</h2>
          </legend>
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
          <legend>
            <h2>Contact details</h2>
          </legend>
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
            <p className={formField}>Preferred contact method:</p>
            <div className={checkboxGroup}>
              <label htmlFor="preferEmail" className={checkboxItem}>
                <input
                  type="checkbox"
                  id="preferEmail"
                  name="contactMethod"
                  value="Email"
                  checked={patient.preferEmail}
                  onChange={updatePatientField}
                  className={checkbox}
                />
                Email
              </label>
              <label htmlFor="preferPhone" className={checkboxItem}>
                <input
                  type="checkbox"
                  id="preferPhone"
                  name="contactMethod"
                  value="Phone"
                  checked={patient.preferPhone}
                  onChange={updatePatientField}
                  className={checkbox}
                />
                Phone
              </label>
              <label htmlFor="preferText" className={checkboxItem}>
                <input
                  type="checkbox"
                  id="preferText"
                  name="contactMethod"
                  value="Text"
                  checked={patient.preferText}
                  onChange={updatePatientField}
                  className={checkbox}
                />
                Text
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className={fieldContainer}>
          <legend>
            <h2>Patient Identity</h2>
          </legend>
          <div className={formGroup}>
            <label htmlFor="genderMale" className={formField}>
              My gender identity is:
            </label>
            <input
              className={formControl}
              type="text"
              id="gender"
              name="gender"
              onChange={updatePatientField}
              value={patient.gender}
            />
          </div>
          <div className={formGroup}>
            <label htmlFor="pronouns" className={formField}>
              My pronouns are:
            </label>
            <input
              className={formControl}
              type="text"
              id="pronouns"
              name="pronouns"
              onChange={updatePatientField}
              value={patient.pronouns}
            />
          </div>
        </fieldset>
        <fieldset className={allergiesGroup}>
          <legend>
            <h2>Allergies and medicines</h2>
          </legend>
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
                  <td style={{ display: "flex" }}>
                    <input
                      type="text"
                      value={allergy.medication}
                      name={`medication_${index}`}
                      onChange={updateAllergy}
                      style={{ flex: 1 }}
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
          <ButtonPrimary onClick={saveUpdates} disabled={saving}>
            Submit form
          </ButtonPrimary>
          <Button onClick={reset} disabled={saving}>
            Reset
          </Button>
          <button onClick={() => navigate("/")} disabled={saving}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Verify;
