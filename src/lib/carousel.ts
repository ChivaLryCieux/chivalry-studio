/** 轮播纯函数 —— 无状态索引与进度计算 */

const PROGRESS_MIN_PERCENT = 5;
const PROGRESS_MAX_PERCENT = 95;

export function getLoopedIndex(index: number, total: number): number {
  if (total <= 0) {
    return 0;
  }

  return ((index % total) + total) % total;
}

/** 进度条位置(%),首尾各留 5% 边距 */
export function getCarouselProgress(
  activeIndex: number,
  total: number
): number {
  if (total <= 1) {
    return PROGRESS_MIN_PERCENT;
  }

  return (
    (activeIndex / (total - 1)) *
      (PROGRESS_MAX_PERCENT - PROGRESS_MIN_PERCENT) +
    PROGRESS_MIN_PERCENT
  );
}
