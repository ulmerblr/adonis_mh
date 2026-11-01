import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/psilocybin.json';

export const metadata = { title: 'Psilocybin' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
