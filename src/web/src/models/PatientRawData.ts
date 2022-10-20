export type PatientRawData = {
  id: String;
  fields: {
    [key: string]: {
      item1: string;
      item2: number;
    };
  };
};
