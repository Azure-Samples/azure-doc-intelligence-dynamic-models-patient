import { Patient } from "../models/Patient";
import { container, group, item } from "./PatientList.css";

type Props = {
  patients: Patient[];
  action: (patient: Patient) => JSX.Element;
};

export const PatientList = ({ patients, action }: Props) => {
  return (
    <div className={container}>
      <div className={group}>
        <h2 className={item}>Action</h2>
        <h2 className={item}>Patient</h2>
      </div>
      {patients.map((patient) => (
        <div key={patient.id} className={group}>
          <>
            <div className={item}>{action(patient)}</div>
            <span className={item}>
              {patient.givenNames} {patient.familyName}
            </span>
          </>
        </div>
      ))}
    </div>
  );
};
