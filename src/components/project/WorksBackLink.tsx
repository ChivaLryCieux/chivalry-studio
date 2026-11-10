'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface WorksBackLinkProps {
  className?: string;
  fallbackProjectId: number;
  label: string;
}

function BackLink({ className, fallbackProjectId, label }: WorksBackLinkProps) {
  const searchParams = useSearchParams();
  const fromProject = Number(searchParams.get('fromProject'));
  const returnProjectId =
    Number.isFinite(fromProject) && fromProject > 0
      ? fromProject
      : fallbackProjectId;

  return (
    <Link href={`/?project=${returnProjectId}`} className={className}>
      {label}
    </Link>
  );
}

/**
 * 返回轮播的来源定位链接。
 * `fromProject` 由客户端读取,详情页因此可保持全静态生成。
 */
export function WorksBackLink(props: WorksBackLinkProps) {
  return (
    <Suspense
      fallback={
        <Link
          href={`/?project=${props.fallbackProjectId}`}
          className={props.className}
        >
          {props.label}
        </Link>
      }
    >
      <BackLink {...props} />
    </Suspense>
  );
}
