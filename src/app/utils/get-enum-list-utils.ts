export const getEnumList = <T extends { [key: string]: string }>(enumObj: T) =>
  Object.keys(enumObj).map((el) => enumObj[el]);
