export const getPagedData = <T>(
  data: T[],
  pageIndex: number,
  pageSize: number
): T[] => {
  const start = pageIndex * pageSize;
  return data.slice(start, start + pageSize);
};
