import { notFound } from 'next/navigation';
import { AppBar } from '@/components/app/app-bar';
import { BackLink } from '@/components/app/back-link';
import { TreatmentPage } from '@/components/treatment/template';
import { APP_SLUGS, appData, treatmentData } from '@/lib/app-treatments';

export const dynamicParams = false;
export function generateStaticParams() { return APP_SLUGS.map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: treatmentData(slug)?.name ?? 'Treatment' };
}

/** One treatment in the app view: the same data and template as the magazine page, laid out for a phone. */
export default async function AppTreatment({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = treatmentData(slug);
  if (!data) notFound();
  return (
    <div className="appDetail">
      <div className="appTop">
        <AppBar title={data.name} back={<BackLink />} />
      </div>
      <TreatmentPage data={appData(data)} />
    </div>
  );
}
