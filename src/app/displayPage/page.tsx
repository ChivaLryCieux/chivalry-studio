import { redirect } from 'next/navigation';

interface DisplayPageRouteProps {
  searchParams: Promise<{
    project?: string;
  }>;
}

export default async function DisplayPageRoute({ searchParams }: DisplayPageRouteProps) {
  const resolvedSearchParams = await searchParams;
  const projectParam = resolvedSearchParams.project ? `?project=${resolvedSearchParams.project}` : '';
  redirect(`/${projectParam}`);
}
