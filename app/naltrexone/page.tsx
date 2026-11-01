import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/naltrexone.json';

export const metadata = { title: 'Naltrexone' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
