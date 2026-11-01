import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/foxo4-dri.json';

export const metadata = { title: 'FOXO4-DRI' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
