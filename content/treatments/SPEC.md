# Treatment page data: format and rules

Each treatment page is one JSON file, content/treatments/<slug>.json, rendered by components/treatment/from-spec.tsx into the
same template, tabs, track, map and per-tab Sources as /bpc-157. Today's date is Oct 31, 2026.

## Rules (EDU PROMPT 16, every page)
1. Regulator first. Start from the regulator's own record: FDA (Drugs@FDA, the label on DailyMed, the 503A/503B bulk
   substance lists and categories, FDA briefing documents, FDA warning letters), then EMA, MHRA, Health Canada, TGA and any
   other agency on the map. Secondary trackers (drugs.com, Wikipedia, GoodRx, news, fda.report and other mirrors) may only
   point you to primary records; never cite them. Peer-reviewed papers (PubMed/PMC/journal pages) are primary for studies.
2. Published facts only. Every claim is cited; every source is dated: "published <Mon YYYY>" if the record shows a date,
   else "accessed Oct 31, 2026". Only cite URLs you actually opened and read. If you could not open a record, say so in
   the `unconfirmed` list rather than citing it.
3. Report each study as it was run: design (randomized/open-label/animal/cell), how many people, who, how long, what was
   measured, what was found. Say plainly when evidence is in animals or cells only.
4. Approved vs compounded. If a brand is FDA approved, give the brand, the approved use and the year. Then say plainly, as a
   general fact citing FDA, that compounded versions are not FDA approved. Never call a compounded product FDA approved.
   This is a research site (EDU PROMPT 21): never mention what Adonis or any pharmacy sells, carries or compounds, and never
   tie a treatment to a product.
5. Off-label use is labelled "off-label" (e.g. sertraline for premature ejaculation, oral minoxidil for hair loss,
   metformin for longevity, spironolactone for acne).
6. Side effects from the label and the trials, serious ones included. Say plainly where they apply: finasteride (lower
   libido or ED in some men); spironolactone (breast growth and lower libido in men); estriol (it is an estrogen, and what
   that can mean for men); testosterone and hCG (fertility effects); GLP-1s (the boxed warning).
7. No promises, no results language, no before/after, no prices, no dosing instructions; never say how much to take.
8. Sport: say what the current WADA Prohibited List (2026; note the 2027 list where it changes something) says about the
   substance, with its class, and cite it. If it is not listed, say so and cite the list.
9. Ingredients mostly seen in compounded combinations (glycine, methionine, inositol, choline, biotin, topical melatonin,
   niacinamide, latanoprost, ketoconazole, fluocinolone): describe them as regulators and published research do. If there
   is little or no research on a use, say so in one plain sentence. A short page is fine. Do not pad.
10. HHS peptides (TB-500, KPV, MOTS-c, Epitalon, Semax): use the same records as /bpc-157 (FDA briefing
    https://www.fda.gov/media/193343/download, the HHS policy https://public-inspection.federalregister.gov/2026-22192.pdf,
    the HHS appendix https://www.hhs.gov/sites/default/files/hhs-503a-peptide-enforcement-discretion-policy-appendix-b.pdf,
    FDA's Category 2 page, WADA) plus each one's own records. Semax: report its Russian status from a record you can find,
    and say plainly if you can't confirm it.
11. Never say or imply that Adonis recommends, offers, sells or prescribes the treatment.
Write in plain, short sentences, like /bpc-157 (read app/bpc-157 via content/treatments/bpc-157.tsx for tone and depth).
Use the same six sections every time. Never invent a number, a date or a study.

## JSON shape
{
  "slug": "finasteride",
  "name": "Finasteride",                       // the page title (plain h1)
  "peptide": false,
  "lanes": ["hair-loss"],                      // every lane the treatment's row(s) sit in; the first is the page's lane
  "index": { "evidence": "≤ 26 chars, e.g. 'Approved; many RCTs' or '3 small studies'",
             "fda": "≤ 22 chars, e.g. 'Approved (Propecia)' or 'Not approved'",
             "sport": "≤ 14 chars, e.g. 'Not listed' or 'Banned' or 'Banned in-comp.'" },
  "track": [ six steps, in order, using these titles unless a different path is more honest:
     {"title":"Lab & animal","line":"…","status":"done|started|not"}, {"title":"Pilot in people",…}, {"title":"Phase I",…},
     {"title":"Phase II",…}, {"title":"Phase III",…}, {"title":"FDA approval","line":"Propecia, 1997, hair loss","status":"done"} ],
     // mark exactly one step "here": true (where the treatment stands now). Lines ≤ 55 chars.
  "sections": {
    "what":     [ Block, … ],                  // 1. What it is: the molecule and how it acts
    "research": [ Block, … ],                  // 2. Research: human studies one by one (study blocks), then animal/lab
    "us":       [ Block, … ],                  // 3. US position: FDA approval(s), compounding status, controlled status
    "world":    { "lead": "bold one-paragraph summary",
                  "countries": [ Country, … ], // US, Canada, UK, EU, Australia at least; add others if checked
                  "after": [ Block, … ] },     // e.g. the Sport card
    "side":     [ Block, … ]                   // 5. Documented side effects
  },                                            // 6. Clinician is generated automatically
  "unconfirmed": [ "plain sentence per fact you could not confirm or record you could not reach" ],
  "surprises":   [ "plain sentence where the regulator record conflicts with common claims" ]
}

Source:  { "url": "https://…", "label": "short citation, e.g. 'Propecia label, DailyMed'", "date": "published Jan 2022" }
Block (pick one "t"):
  { "t": "lead",    "text": "bold lead paragraph (start sections 2–5 with one)" }
  { "t": "p",       "text": "…", "src": [Source] }
  { "t": "h3",      "text": "sub-heading, e.g. 'Human studies' or 'Animal and lab studies'" }
  { "t": "list",    "items": [ { "lead": "optional bold lead-in:", "text": "…", "src": [Source] } ] }
  { "t": "callout", "text": "short emphatic line, e.g. 'Compounded drugs are not FDA-approved…'" }
  { "t": "study",   "meta": "USA · 2021 · Randomized trial", "title": "Card title", "facts": [ {"k":"Design","v":"…"},
                    {"k":"People","v":"…"}, {"k":"Length","v":"…"}, {"k":"Measured","v":"…"} ], "found": "…",
                    "src": [Source], "badge": "optional, e.g. 'No results yet'" }
  { "t": "card",    "title": "e.g. Sport", "text": "…", "src": [Source] }
Country: { "country": "United States", "regulator": "FDA", "status": "Approved medicine (Propecia, hair loss). Prescription-only.",
           "checked": "Oct 31, 2026", "sources": [Source], "iso": ["840"],
           "tone": "approved | rx | discretion | not | pending | otc" }
  tone: approved = an approved medicine for some use there; rx = prescription-only but not approved; discretion = not
  approved, compounding under enforcement discretion; not = not approved; otc = sold without prescription / as a supplement
  or cosmetic; pending = status not confirmed (status text "Status being confirmed with the regulator's record.", no
  sources, checked "—"). ISO 3166-1 numeric codes: US 840, Canada 124, UK 826, Australia 036, Russia 643, China 156,
  India 356, EU = the 27 member codes (040 056 100 191 196 203 208 233 246 250 276 300 348 372 380 428 440 442 470 528 616
  620 642 703 705 724 752).
