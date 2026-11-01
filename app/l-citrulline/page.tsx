import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/l-citrulline.json';

export const metadata = { title: 'L-citrulline' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
