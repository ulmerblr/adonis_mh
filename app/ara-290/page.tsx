import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/ara-290.json';

export const metadata = { title: 'ARA-290' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
