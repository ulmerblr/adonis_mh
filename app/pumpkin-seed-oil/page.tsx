import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/pumpkin-seed-oil.json';

export const metadata = { title: 'Pumpkin seed oil' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
