export function typedEntries<T extends object>(obj: T) {
  return Object.entries(obj) as [keyof T & string, T[keyof T]][];
}

export function typedValues<T extends object>(obj: T) {
  return Object.values(obj) as T[keyof T][];
}
