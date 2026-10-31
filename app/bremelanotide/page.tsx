import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/bremelanotide.json';

export const metadata = { title: 'Bremelanotide (PT-141)' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
