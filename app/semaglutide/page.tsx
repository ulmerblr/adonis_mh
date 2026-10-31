import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/semaglutide.json';

export const metadata = { title: 'Semaglutide' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
