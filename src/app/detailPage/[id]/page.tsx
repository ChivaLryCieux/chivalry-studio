import { permanentRedirect } from 'next/navigation';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

/** 兼容旧链接:canonical 已迁移至 /project/[id] */
export default async function DetailPageRedirect({ params }: PageProps) {
  const resolvedParams = await params;
  permanentRedirect(`/project/${resolvedParams.id}`);
}
