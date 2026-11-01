import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/ghrp-2.json';

export const metadata = { title: 'GHRP-2 (pralmorelin)' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
