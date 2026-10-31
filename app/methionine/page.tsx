import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/methionine.json';

export const metadata = { title: 'Methionine' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
