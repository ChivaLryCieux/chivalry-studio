import { DisplayPage } from '@/components/home/DisplayPage';

interface HomePageProps {
  searchParams: Promise<{
    project?: string;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const initialProjectId = Number(resolvedSearchParams.project);
  const displayProjectId = Number.isFinite(initialProjectId) ? initialProjectId : undefined;

  return <DisplayPage key={displayProjectId ?? 'default'} initialProjectId={displayProjectId} />;
}
