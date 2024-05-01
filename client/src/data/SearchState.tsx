export default interface SearchState {
  name: string;
  multibox: string[] | null;
  trusts: string[] | null;
  levelSync: string[] | null;
  maxLevel: number[];
  expansions: string[] | null;
}

export const SearchStateDefaults: SearchState = {
  name: '',
  multibox: null,
  trusts: null,
  levelSync: null,
  maxLevel: [1, 99],
  expansions: null,
};
