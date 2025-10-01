export interface ICartridge {
  id: number;
  brand: string;
  model: string;
  analog: string[];
  compatiblePrinters: string[];
  ean13: string;
  status: string;
}

export interface ICartridgeStatuses {
  id: number;
  status: string;
}
