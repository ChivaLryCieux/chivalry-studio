import { permanentRedirect } from 'next/navigation';

interface DisplayPageRouteProps {
  searchParams: Promise<{
    project?: string;
  }>;
}

/** 兼容旧链接:展厅已合并至 / */
export default async function DisplayPageRoute({
  searchParams,
}: DisplayPageRouteProps) {
  const resolvedSearchParams = await searchParams;
  const projectParam = resolvedSearchParams.project
    ? `?project=${resolvedSearchParams.project}`
    : '';
  permanentRedirect(`/${projectParam}`);
}
