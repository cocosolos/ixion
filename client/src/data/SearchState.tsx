export type SearchState = {
  name: string;
  multibox: string[] | null;
  trusts: string[] | null;
  levelSync: string[] | null;
  homePoint: string[] | null;
  survivalGuide: string[] | null;
  recordsOfEminence: string[] | null;
  fieldsOfValor: string[] | null;
  groundsOfValor: string[] | null;
  maxLevel: number[];
  expansions: string[] | null;
};

export const SearchStateDefaults: SearchState = {
  name: '',
  multibox: null,
  trusts: null,
  levelSync: null,
  homePoint: null,
  recordsOfEminence: null,
  fieldsOfValor: null,
  groundsOfValor: null,
  survivalGuide: null,
  maxLevel: [1, 99],
  expansions: null,
};
