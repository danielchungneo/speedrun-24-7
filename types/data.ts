export type GenericObject = { [key: string]: any };

// https://stackoverflow.com/questions/46583883/typescript-pick-properties-with-a-defined-type
/**
 * Can be used to pick partial custom types (use the relevant PickByType or PickByOptionalType depending on if the key is required or not)
 */
export type PickByType<T, Value> = {
  [P in keyof T as T[P] extends Value ? P : never]: T[P];
};
export type PickByOptionalType<T, Value> = {
  [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P];
};

// Based on https://github.com/microsoft/TypeScript/issues/16350#issuecomment-397374468
/**
 * Can be used to get the keys of a custom type that have a specific value type
 */
export type KeysOfType<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];
export type KeysOfOptionalType<T, U> = {
  [P in keyof T]: T[P] extends U | undefined ? P : never;
}[keyof T];

/**
 * Can be used to get all keys of a custom type
 */
export type KeysOf<T> = {
  [P in keyof T]: P;
}[keyof T];
