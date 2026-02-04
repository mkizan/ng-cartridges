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
  location: string;
  responsible: string;
  notes: string;
}
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

// export interface ICartridgeStatuses {
//   id: string;
// status:
//   | 'заправлений'
//   | 'на заправці'
//   | 'в принтері'
//   | 'закінчився'
//   | 'в ремонті'
//   | 'неробочий';
// }

// export interface ICartridgeUser {
//   id: string;
//   name: 'Микола' | 'Дмитро';
// }

// export interface ICartridgeLocations {
//   id: string;
//   name:
//     | 'Цех 1'
//     | 'Цех 2'
//     | 'Цех 3'
//     | 'Цех 5'
//     | 'Цех 7'
//     | 'Цех 9'
//     | 'Офіс'
//     | 'Склад 1'
//     | 'Склад 2'
//     | 'Склад 3'
//     | 'Склад 5'
//     | 'Склад 6'
//     | 'Склад 7'
//     | 'Склад 9';
// }
