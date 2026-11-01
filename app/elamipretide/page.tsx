import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/elamipretide.json';

export const metadata = { title: 'Elamipretide (SS-31)' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
