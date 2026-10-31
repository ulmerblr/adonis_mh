# EDU PROMPT 17: the HHS peptide enforcement-discretion policy on each peptide page (routes, conditions, limits).
import json
FR = {"url": "https://www.govinfo.gov/content/pkg/FR-2026-10-30/pdf/2026-22192.pdf", "label": "HHS notice, Federal Register 2026-22192 (Docket HHS-OASH-2026-0496), signed by Secretary Kennedy, filed Oct 28, 2026", "date": "published Oct 30, 2026"}
BAKER = {"url": "https://www.bakerlaw.com/insights/hhs-issues-enforcement-discretion-policy-regarding-503a-compounding-using-certain-peptide-bulk-drug-substances/", "label": "BakerHostetler summary of the HHS policy (a law firm's summary, used because HHS's own policy appendix could not be opened)", "date": "published Oct 28, 2026"}
POLICY = {
  'tb-500':   ('TB-500 acetate', 'injection under the skin or into muscle'),
  'kpv':      ('KPV acetate', 'products applied to the skin or taken by mouth'),
  'mots-c':   ('MOTS-c acetate', 'injection under the skin or into muscle'),
  'epitalon': ('Epitalon acetate', 'injection under the skin or into muscle, dispensed in intermittent courses'),
  'semax':    ('Semax free base', 'use in the nose (intranasal)'),
}
CONDITIONS = ("a licensed pharmacist or physician compounds it; the bulk substance matches the listed peptide and route; it comes from an FDA-registered maker that follows good manufacturing practice, with a valid certificate of analysis; there is a valid patient-specific prescription; the product contains only one active ingredient from the list; serious adverse events and quality problems are reported to FDA's MedWatch and state authorities; the label says \"This is a compounded drug product. Not for resale.\"; oral forms have documented adequate bioavailability; the only device packaged with it is an FDA-cleared syringe; and all other section 503A requirements are met")
def items(form, routes, has_oral):
    return [
      {"lead": "HHS interim policy:", "text": f"HHS announced an enforcement discretion policy on October 28, 2026, published in the Federal Register on October 30, 2026 (Docket HHS-OASH-2026-0496). It names {form}, for {routes}. HHS says it does not intend to take enforcement action against state-licensed pharmacies, federal facilities or licensed physicians that compound it when every condition is met. As of October 31, 2026.", "src": [FR, BAKER]},
      {"lead": "The conditions:", "text": f"{CONDITIONS}.", "src": [BAKER]},
      {"lead": "What it does not do:", "text": "The policy does not make it FDA approved. It does not cover blends with other active ingredients, other routes or forms, outsourcing facilities (section 503B), or products sold as research chemicals or dietary supplements. It is interim and not binding: HHS may revise or withdraw it, in whole or in part, if safety signals or product-quality problems appear.", "src": [FR, BAKER]},
    ]
def update(slug):
    p = f'content/treatments/{slug}.json'; d = json.load(open(p))
    form, routes = POLICY[slug]
    name = d['name']
    us = d['sections']['us']
    # replace the old HHS item(s) in the US list
    done = False
    for b in us:
        if b.get('t') == 'list':
            new = []
            for it in b['items']:
                if 'HHS' in (it.get('lead') or '') or ('HHS' in it['text'] and ('appendix' in it['text'] or 'notice' in it['text'].lower()) and 'peptide' in it['text'].lower()):
                    if not done: new += items(form, routes, 'mouth' in routes); done = True
                else: new.append(it)
            b['items'] = new
    assert done, slug
    # lead
    lead = us[0]; assert lead['t'] == 'lead'
    lead['text'] = f"Not FDA-approved for any use. Since October 30, 2026, HHS has said it will not take enforcement action against licensed pharmacies and physicians that compound {form} for {routes}, under set conditions. That is enforcement discretion, not approval. As of October 31, 2026."
    # world: US card
    for c in d['sections']['world']['countries']:
        if c['country'].startswith('United States'):
            c['status'] = f"Not approved. Compounding under HHS enforcement discretion since Oct 30, 2026, for {form} by {routes} only."
            c['tone'] = 'discretion'
            c['sources'] = [s for s in c.get('sources', []) if 'federalregister' not in s['url']] + [FR, BAKER]
            c['checked'] = 'Oct 31, 2026'
    # track: the FDA approval step
    for t in d['track']:
        if 'FDA approval' in t['title']:
            t['line'] = 'Not approved; HHS compounding discretion, Oct 2026'
    d['index']['fda'] = 'Not approved; HHS discretion'
    d['unconfirmed'] = [u for u in d.get('unconfirmed', []) if 'HHS' not in u]
    json.dump(d, open(p, 'w'), ensure_ascii=False, indent=2)
    print(slug, 'updated')
for s in POLICY: update(s)
