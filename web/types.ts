export interface Person {
  name: string;
  dateBurial: string;
  age: number;
  official?: string;
  notes?: string;
}

export interface Grave {
  _id: string;
  graveNo: string;
  familySurname: string;
  headstoneImage?: {
    asset: {
      _ref: string;
    };
  };
  persons: Person[];
  locationDescription?: string;
}
