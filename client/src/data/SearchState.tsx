export type SearchState = {
  name: string;
  maxLevel: number[];
  expansionsEnabled: string[] | null;
  multibox: string | null;
  trusts: string | null;
  levelSync: string | null;
  homePoint: string | null;
  survivalGuide: string | null;
  fov: string | null;
  gov: string | null;
  roe: string | null;
};

export const SearchStateDefaults: SearchState = {
  name: '',
  maxLevel: [1, 99],
  expansionsEnabled: null,
  multibox: null,
  trusts: null,
  levelSync: null,
  homePoint: null,
  survivalGuide: null,
  fov: null,
  gov: null,
  roe: null,
};
