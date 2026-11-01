import { Suspense } from 'react';
import { AppBar } from '@/components/app/app-bar';
import { AppList } from '@/components/app/app-list';

export const metadata = { title: 'Treatments' };

export default function AppHome() {
  return (
    <>
      <div className="appTop">
        <AppBar title="Treatments" />
      </div>
      <Suspense fallback={null}>
        <AppList />
      </Suspense>
    </>
  );
}
