import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/minoxidil.json';

export const metadata = { title: 'Minoxidil' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
