import { TreatmentPage } from '@/components/treatment/template';
import { bpc157 } from '@/content/treatments/bpc-157';

export const metadata = { title: 'BPC-157' };

export default function Bpc157() {
  return <TreatmentPage data={bpc157} />;
}
