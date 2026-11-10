'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * SSR 安全的媒体查询 —— 服务端与首帧返回 `null`(未知),
 * 挂载后自动同步真实值并订阅 matchMedia 变化。返回 null
 * 期间由调用方决定渲染哪套布局(本项目由 splash 覆盖首帧)。
 */
export function useMediaQuery(query: string): boolean | null {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener('change', onChange);
      return () => mediaQueryList.removeEventListener('change', onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => null
  );
}
