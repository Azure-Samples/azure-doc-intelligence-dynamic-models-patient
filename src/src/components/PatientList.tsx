import { Patient } from "../models/Patient";

type Props = {
  patients: Patient[];
  action: (patient: Patient) => JSX.Element;
};

export const PatientList = ({ patients, action }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Action</th>
          <th>Patient</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.id}>
            <td>{action(patient)}</td>
            <td>
              {patient.givenNames} {patient.familyName}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
