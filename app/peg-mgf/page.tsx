import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/peg-mgf.json';

export const metadata = { title: 'PEG-MGF' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
