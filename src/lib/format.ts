/** 序号格式化:`3` -> `'03'` */
export function formatOrdinal(index: number): string {
  return String(index).padStart(2, '0');
}
