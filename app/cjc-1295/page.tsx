import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/cjc-1295.json';

export const metadata = { title: 'CJC-1295' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
