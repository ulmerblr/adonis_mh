import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/5-amino-1mq.json';

export const metadata = { title: '5-amino-1MQ' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
