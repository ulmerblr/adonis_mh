import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/afamelanotide.json';

export const metadata = { title: 'Afamelanotide' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
