# Find source records already cited on treatment pages: python3 scripts/src-lookup.py <slug|*> <text in url or label> ...
import json, sys, glob
def all_sources(slug):
    files = glob.glob('content/treatments/*.json') if slug == '*' else [f'content/treatments/{slug}.json']
    seen = {}
    def walk(o):
        if isinstance(o, dict):
            if set(o) >= {'url', 'label', 'date'}: seen.setdefault((o['url'], o['label']), o)
            for v in o.values(): walk(v)
        elif isinstance(o, list):
            for v in o: walk(v)
    for f in files: walk(json.load(open(f)))
    return list(seen.values())
def find(slug, needle):
    n = needle.lower()
    return [s for s in all_sources(slug) if n in s['url'].lower() or n in s['label'].lower()]
if __name__ == '__main__':
    slug = sys.argv[1]
    for needle in sys.argv[2:]:
        for s in find(slug, needle): print(f"[{needle}] {s['label']} | {s['date']} | {s['url']}")
