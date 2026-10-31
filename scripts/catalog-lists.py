# EDU PROMPT 18: each ingredient page lists every Adonis catalog product it appears in ("Adonis's catalog lists...").
import json
S7B = "Minoxidil 7% / tretinoin 0.025% / fluocinolone 0.025% hair spray with biotin and melatonin (60 mL)"
S7F = "Minoxidil 7% / tretinoin 0.025% / fluocinolone 0.025% hair spray with finasteride 0.2% (60 mL)"
S5T = "Minoxidil 5% / finasteride 0.3% / tretinoin 0.015% hair spray (30 mL)"
S5L = "Minoxidil 5% / finasteride 0.3% / latanoprost 0.03% / ketoconazole 2% hair spray (30 mL)"
SFM = "Finasteride 0.25% / minoxidil 5% hair spray (60 mL)"
STR = "Minoxidil 2.5 mg / finasteride 1 mg / biotin 2.5 mg oral strips, dissolved on the tongue"
EST = "Estriol 0.03% / tretinoin 0.1% face cream (30 g)"
ENG = "Estriol 0.3% / niacinamide 3% / GHK-Cu 0.2% face cream (15 to 45 g)"
LISTS = {
  'tretinoin': ("tretinoin in these products:", ["Tretinoin creams 0.015%, 0.024% and 0.1%, and tretinoin gel 0.1% (30 mL tubes), applied to the skin", S5T, S7B, S7F, EST], "Using tretinoin for hair loss is off-label."),
  'niacinamide': ("niacinamide in these products. Adonis does not carry niacinamide on its own:", ["Azelaic acid 15% / niacinamide 4% cream, applied to the skin", ENG], None),
  'ghk-cu': ("GHK-Cu in these products:", ["GHK-Cu 1% cream, applied to the skin (30-day or 90-day supply)", ENG], None),
  'minoxidil': ("minoxidil in these products:", ["Minoxidil 2.5 mg tablet, taken by mouth", SFM, S5T, S5L, STR, S7B, S7F], "Taking minoxidil by mouth for hair loss is off-label."),
  'biotin': ("biotin in these products. Adonis does not carry biotin on its own:", [STR, S7B], None),
  'finasteride': ("finasteride in these products:", ["Finasteride 1 mg tablet, listed in the catalog as \"Propecia (Finasteride)\"", SFM, S5T, S5L, STR, S7F], None),
}
for slug, (intro, prods, note) in LISTS.items():
    p = f'content/treatments/{slug}.json'; d = json.load(open(p)); w = d['sections']['what']
    name = d['name'].split(' (')[0]
    new = [{"t": "p", "text": f"Adonis's catalog lists {intro}"}, {"t": "list", "items": [{"text": x} for x in prods]}]
    if note: new.append({"t": "p", "text": note})
    # find the old product block(s): an h3 "What Adonis carries" + following list, or a paragraph naming Adonis
    idx = [i for i, b in enumerate(w) if (b['t'] == 'h3' and 'Adonis' in b['text'])]
    if idx:
        i = idx[0]; j = i + 1
        while j < len(w) and w[j]['t'] == 'list': j += 1
        w[i+1:j] = new
    else:
        i = [k for k, b in enumerate(w) if b['t'] == 'p' and ('Adonis' in b['text'])][0]
        w[i:i+1] = [{"t": "h3", "text": "What Adonis carries (form only)"}] + new
    for b in w:
        if b['t'] == 'callout' and slug == 'tretinoin':
            b['text'] = "Tretinoin is not FDA approved for hair loss, and there is little research on that use. The minoxidil 5% / finasteride 0.3% / tretinoin 0.015% hair spray is compounded and is not FDA approved."
        if b['t'] == 'callout' and slug == 'minoxidil':
            b['text'] = "The sprays and strips that combine minoxidil with finasteride are compounded and are not FDA approved; no FDA-approved product combines minoxidil with finasteride. Oral minoxidil is not approved for hair loss."
    json.dump(d, open(p, 'w'), ensure_ascii=False, indent=2)
    print(slug, 'listed', len(prods))
