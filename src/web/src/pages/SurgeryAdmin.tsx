import { Patient } from "../models/Patient";
import { PatientList } from "../components/PatientList";
import { useEffect, useState } from "react";
import { Button, ButtonPrimary } from "../components/Button";

const SurgeryAdmin = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetch("/api/surgery/new-patients")
      .then((response) => response.json())
      .then((data) => setPatients(data));
  }, []);

  const [saving, setSaving] = useState(false);

  const refresh = async () => {
    const res = await fetch("/api/surgery/new-patients");
    const patients = (await res.json()) as Patient[];
    setPatients(patients);
    setSaving(false);
  };

  const addPatient = async (patient: Patient) => {
    setSaving(true);
    const res = await fetch(`/api/patient/${patient.id}/approve`, {
      method: "POST",
    });
    if (res.ok) {
      await refresh();
    }
  };

  const action = (patient: Patient) => (
    <ButtonPrimary onClick={() => addPatient(patient)}>
      Add patient
    </ButtonPrimary>
  );

  const addAll = async () => {
    setSaving(true);
    const all = patients.map((patient) =>
      fetch(`/api/patient/${patient.id}/approve`, {
        method: "POST",
      })
    );

    await Promise.all(all);
    await refresh();
  };

  if (patients.length === 0) {
    return <p>No new patients to add.</p>;
  }

  return (
    <>
      <PatientList patients={patients} action={action} />
      <div style={{ marginTop: 10 }}>
        <Button onClick={refresh}>Refresh</Button>
        &nbsp;
        <Button onClick={addAll}>Add all new patients</Button>
      </div>
    </>
  );
};

export default SurgeryAdmin;
