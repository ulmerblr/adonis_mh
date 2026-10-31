# Replace a page's "could not open WADA" sport note with what the 2026 and 2027 lists say (read from WADA's own PDFs).
import json, sys
W26 = {"url": "https://www.wada-ama.org/sites/default/files/2025-09/2026list_en_final_clean_september_2025.pdf", "label": "WADA 2026 Prohibited List", "date": "published Sep 2025"}
W27 = {"url": "https://www.wada-ama.org/sites/default/files/2026-09/2027list_en_final_tracked_changes_26_august_2026.pdf", "label": "WADA 2027 Prohibited List (tracked changes)", "date": "published Aug 2026"}
def set_sport(slug, text, index_sport):
    p = f'content/treatments/{slug}.json'; d = json.load(open(p))
    after = d['sections']['world'].setdefault('after', [])
    hit = [i for i, b in enumerate(after) if 'WADA' in (b.get('text') or '') or (b.get('title') or '').lower() == 'sport']
    card = {"t": "card", "title": "Sport", "text": text, "src": [W26, W27]}
    if hit:
        after[hit[0]] = card
        for i in reversed(hit[1:]): del after[i]
    else:
        after.append(card)
    d['index']['sport'] = index_sport
    d['unconfirmed'] = [u for u in d.get('unconfirmed', []) if 'WADA' not in u]
    json.dump(d, open(p, 'w'), ensure_ascii=False, indent=2)
    print(slug, 'sport set:', index_sport)
if __name__ == '__main__':
    set_sport(sys.argv[1], sys.argv[2], sys.argv[3])
