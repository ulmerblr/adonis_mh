import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/ghk-cu.json';

export const metadata = { title: 'GHK-Cu (copper peptide)' };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
