import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/vitamin-b6.json';

export const metadata = { title: 'Vitamin B6 (pyridoxine)' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
