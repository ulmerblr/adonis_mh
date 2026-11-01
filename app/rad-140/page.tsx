import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/rad-140.json';

export const metadata = { title: 'RAD-140 (testolone)' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
