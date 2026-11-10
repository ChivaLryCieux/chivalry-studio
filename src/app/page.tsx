import { Suspense } from 'react';
import { DisplayPage } from '@/components/home/DisplayPage';

export const dynamic = 'force-static';

export default function Home() {
  return (
    <Suspense fallback={null}>
      <DisplayPage />
    </Suspense>
  );
}
