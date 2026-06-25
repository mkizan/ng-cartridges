import { ILocation } from '../../locations/models/location-interfaces';

export const CARTRIDGE_STATUSES = {
  EMPTY: '',
  REFILLED: 'заправлений',
  REFILLING: 'на заправці',
  IN_PRINTER: 'в принтері',
  OUT: 'закінчився',
  REPAIR: 'в ремонті',
  BROKEN: 'неробочий',
} as const;

export type CartridgeStatus =
  (typeof CARTRIDGE_STATUSES)[keyof typeof CARTRIDGE_STATUSES];

export interface ICartridge {
  id: string;
  brand: string;
  model: string;
  alternativeCartridges: string | string[];
  compatiblePrinters: string | string[];
  barcode: string;
  status: CartridgeStatus;
  location: ILocation;
  responsible: string;
  refilledDate: string | null;
  inPrinterDate: string | null;
  onRefillDate: string | null;
  endDate: string | null;
  numberPrintedPagesOfPrinter: number;
  quantityPages: number;
  notes: string;
}

export type ICartridgePayload = Omit<ICartridge, 'id' | 'location'> & {
  location: string;
  id?: string;
};
export interface ICartridgeStatusCount {
  id: string;
  status: string;
  count: number;
}

export interface ICartridgeStatuses {
  id: string;
  status: CartridgeStatus;
}
export interface ICartridgeUser {
  id: string;
  name: string;
}

export interface ICartridgeLocations {
  id: string;
  name: string;
}

export interface ICartridgeLocation {
  id: string;
  name: string;
}
export interface IFilterCriteria {
  query: string;
  status: string | null;
}
