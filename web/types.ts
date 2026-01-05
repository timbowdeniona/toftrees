export interface Person {
  name: string;
  dateBurial: string;
  age: number;
  official?: string;
  notes?: string;
}

export type Grave = {
  _id: string;
  _type: "grave";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  graveNo?: number;
  familySurname?: string;
  locationDescription?: string;
  persons?: Array<{
    name?: string;
    year?: number;
    age?: number;
    page?: string;
    dateBurial?: string;
    dateOfBirth?: Date
    groReference?: string;
    baptism?: string;
    parents?: string;
    brcri?: string;
    official?: string;
    ref?: string;
    folio?: string;
    abode?: string;
    notes?: string;
    _key: string;
  }>;
  graveyardLocation?: Geopoint;
  headstoneImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  headstoneVideo?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.fileAsset";
    };
    media?: unknown;
    _type: "file";
  };
  inscription?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: null;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  headstoneCondition?: string;
  footstone?: boolean;
  footstoneInscription?: string;
  additionalInformation?: string;
  scenicGraveImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  graveImages?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
};

export interface Hotspot {
  _key: string;
  _type: 'hotspot';
  x: number;
  y: number;
  grave?: {
    _id: string;
    graveNo?: number;
    familySurname?: string;
    headstoneImage?: {
      asset?: {
        _ref: string;
        _type: 'reference';
      };
      _type: 'image';
    };
    persons?: Array<{
      name?: string;
      year?: number;
    }>;
  } | {
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

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export declare const internalGroqTypeReferenceTo: unique symbol;

export interface NavigationLink {
  label: string;
  url: string;
  _key?: string;
}

export interface FooterConfig {
  navigationLinks?: NavigationLink[];
  copyrightText?: string;
  privacyPolicyLabel?: string;
  privacyPolicyUrl?: string;
  termsLabel?: string;
  termsUrl?: string;
}

export interface NavigationBarConfig {
  logoImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    _type: 'image';
  };
  titleText?: string;
  navigationLinks?: Array<{
    linkText: string;
    linkUrl: string;
    _key?: string;
  }>;
}

export interface GraveSearchSection {
  _type: 'graveSearch';
  _key: string;
  titleText: string;
  bodyText?: Array<{
    _type: 'block';
    _key: string;
    children?: Array<{
      _type: 'span';
      _key: string;
      text?: string;
      marks?: string[];
    }>;
    style?: string;
    markDefs?: unknown[];
  }>;
  searchBarPlaceholder: string;
  hyperlinkLabel?: string;
  hyperlinkUrl?: string;
}