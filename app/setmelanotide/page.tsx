import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/setmelanotide.json';

export const metadata = { title: 'Setmelanotide' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
