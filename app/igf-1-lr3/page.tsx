import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/igf-1-lr3.json';

export const metadata = { title: 'IGF-1 LR3' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
