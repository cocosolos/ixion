interface SearchStateTemplate<T> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
}

export default interface SearchState {
  name: SearchStateTemplate<string>;
  multibox: SearchStateTemplate<string[] | null>;
  trusts: SearchStateTemplate<string[] | null>;
  levelSync: SearchStateTemplate<string[] | null>;
  maxLevel: SearchStateTemplate<number[]>;
  expansions: SearchStateTemplate<string[] | null>;
}
