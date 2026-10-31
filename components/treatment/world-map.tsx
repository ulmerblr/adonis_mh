import { geoEqualEarth, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import type { GeometryCollection, Topology } from 'topojson-specification';
import world from 'world-atlas/countries-110m.json';
import { WorldMapView, type MapRegion, type Shape } from './world-map-view';

export type { MapRegion, Tone } from './world-map-view';

const W = 960, H = 470;

/** Every country's outline as an SVG path, drawn once at build time (Antarctica left out). */
function shapes(): Shape[] {
  const topo = world as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;
  const fc = feature(topo, topo.objects.countries) as FeatureCollection<Geometry, { name: string }>;
  const features = fc.features.filter((f) => f.id !== '010');
  const projection = geoEqualEarth().fitSize([W, H], { type: 'FeatureCollection', features } as FeatureCollection);
  const path = geoPath(projection);
  return features
    .map((f: Feature<Geometry, { name: string }>) => ({ id: String(f.id ?? f.properties.name), name: f.properties.name, d: (path(f) ?? '').replace(/(\d+\.\d)\d+/g, '$1') }))
    .filter((s) => s.d);
}

/** The colored world map for a treatment's "Around the world" section: each regulator's countries in its status color. */
export function WorldMap({ regions }: { regions: MapRegion[] }) {
  return <WorldMapView shapes={shapes()} regions={regions} width={W} height={H} />;
}
