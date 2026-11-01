import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/tongkat-ali.json';

export const metadata = { title: 'Tongkat ali (Eurycoma longifolia)' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
