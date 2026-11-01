import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/p21.json';

export const metadata = { title: 'P21 (P021)' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
