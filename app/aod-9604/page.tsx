import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/aod-9604.json';

export const metadata = { title: 'AOD-9604' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
