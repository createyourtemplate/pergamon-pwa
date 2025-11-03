export type MultilingualKeysState = {
  key: string;
  translations: { [locale: string]: string };
};

export type CompiledMessage = {
  type?: number;
  loc?: {
    source: string;
    start: { line: number; column: number; offset: number };
    end: { line: number; column: number; offset: number };
  };
  start?: number;
  end?: number;
  body?: unknown;
  items?: unknown[];
};
