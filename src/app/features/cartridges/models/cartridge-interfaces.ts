export interface ICartridge {
  id: string;
  brand: string;
  model: string;
  analog: string[];
  compatiblePrinters: string[];
  ean13: string;
  status: string;
}

export interface ICartridgeStatuses {
  id: string;
  status:
    | 'заправлений'
    | 'на заправці'
    | 'в принтері'
    | 'закінчився'
    | 'в ремонті'
    | 'неробочий';
}

export interface ICartridgeStatusCount {
  id: string;
  status: string;
  count: number;
}

export interface ICartridgeData {
  brand: string;
  model: string;
  analog: string[];
  compatiblePrinters: string[];
  ean13: string;
  status: string;
}
