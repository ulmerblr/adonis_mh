import Link from 'next/link';
import { LANES, TREATMENTS, type LaneKey } from '@/lib/library';
import { Label, Pill } from './ext';

/** The treatment index: grouped by lane in lane order, a sand subhead row per lane (left out on a single lane's page). */
export function IndexTable({ lanes = LANES.map((l) => l.key), subheads = true }: { lanes?: LaneKey[]; subheads?: boolean }) {
  return (
    <div className="tableBox" role="region" aria-label="Treatment index" tabIndex={0}>
      <table className="index">
        <thead>
          <tr><th scope="col">Treatment</th><th scope="col">Lane</th><th scope="col">Human evidence</th><th scope="col">FDA</th><th scope="col">Sport (WADA)</th></tr>
        </thead>
        {lanes.map((key) => {
          const lane = LANES.find((l) => l.key === key)!;
          return (
            <tbody key={key}>
              {subheads ? <tr className="laneRow"><th colSpan={5} scope="rowgroup"><Link href={`/lanes/${key}`}>{lane.name}</Link></th></tr> : null}
              {TREATMENTS[key].map((t) => (
                <tr key={t.name}>
                  <th scope="row" className="txName">
                    {t.page ? <Link href={t.page.href}>{t.name}</Link> : t.name}
                    {t.peptide ? <Label className="labelTag">Peptide</Label> : null}
                  </th>
                  <td>{lane.name}</td>
                  {t.page ? (
                    <>
                      <td>{t.page.evidence}</td>
                      <td><Pill kind="rust">{t.page.fda}</Pill></td>
                      <td><Pill kind="ink">{t.page.sport}</Pill></td>
                    </>
                  ) : (
                    <>
                      <td><Pill kind="sand">Page coming</Pill></td>
                      <td><Pill kind="sand">Page coming</Pill></td>
                      <td><Pill kind="sand">Page coming</Pill></td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
