import { useLoaderData } from "react-router-dom";
import { Patient } from "../models/Patient";
import { PatientList } from "../components/PatientList";
import { useEffect, useState } from "react";

const SurgeryAdmin = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetch("/api/surgery/new-patients")
      .then((response) => response.json())
      .then((data) => setPatients(data));
  }, []);

  const refresh = async () => {
    const res = await fetch("/api/surgery/new-patients");
    const patients = (await res.json()) as Patient[];
    setPatients(patients);
  };

  const addPatient = async (patient: Patient) => {
    const res = await fetch(`/api/patient/${patient.id}/approve`, {
      method: "POST",
    });
    if (res.ok) {
      await refresh();
    }
  };

  const action = (patient: Patient) => {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          addPatient(patient);
        }}
      >
        Add patient
      </button>
    );
  };

  return (
    <>
      <PatientList patients={patients} action={action} />
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            refresh();
          }}
        >
          Refresh
        </button>
        <button>Add all new patients</button>
      </div>
    </>
  );
};

export default SurgeryAdmin;
