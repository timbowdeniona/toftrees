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

export interface Hotspot {
  _key: string;
  _type: 'hotspot';
  x: number;
  y: number;
  grave: {
    _ref: string;
    _type: 'reference';
  };
}

export interface ImageMap {
  _id: string;
  title: string;
  image: {
    asset: {
      _ref: string;
    };
  };
  hotspots: Hotspot[];
}
