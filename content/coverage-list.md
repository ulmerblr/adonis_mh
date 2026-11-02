# Coverage list (EDU PROMPT 22, updated EDU PROMPTS 23 and 25)

## Standing rules (hold from now on)
A. Medicine only. The site covers drugs, peptides, hormones and supplements: things a man takes. No devices, no
   procedures, no stem cell or exosome products.
B. Clinical lanes are fixed. The original 37 rows (the rows on the site before EDU PROMPT 15, taken from Adonis
   Clinical's lanes) never leave their lane. They may get a second row in another lane, but they are never moved out of
   their original one. Only treatments outside that original 37 may change lanes. The original 37, by lane:
   - TRT: Testosterone; Enclomiphene; Anastrozole; Human chorionic gonadotropin (hCG)
   - Weight: Semaglutide; Tirzepatide
   - Recovery: BPC-157
   - Vitality: Sildenafil; Tadalafil; Vardenafil; Oxytocin; Bremelanotide (PT-141)
   - Energy: Vitamin B12; Vitamin B6 (pyridoxine); Methionine; Inositol; Choline; L-carnitine
   - Sleep: Sermorelin; Glycine
   - Hair loss: Finasteride; Minoxidil; Latanoprost; Ketoconazole; Tretinoin; Biotin
   - Skin: Tretinoin; Azelaic acid; Niacinamide; Doxycycline; GHK-Cu (copper peptide)
   - Longevity: NAD+; Nicotinamide riboside; Glutathione; Metformin; GHK-Cu (copper peptide)
   (EDU PROMPT 25: the Sermorelin row was removed from Longevity under rule C, since Adonis Clinical carries sermorelin
   only in Sleep. Its Sleep row and its page stay.)
C. Every compound Adonis Clinical carries sits in the same lane on both sites. The source of truth is Adonis Clinical's
   content/cart/products.json in ulmerblr/adonis (read-only; never edit that repo). Each product's 'group' is its lane:
   trt, vitality, hair (= hair-loss here), skin, longevity, sleep, energy, weight, recovery. A Clinical compound may
   appear in a second research-site lane only if Clinical also carries it in that lane. Treatments Clinical does not
   carry may sit in any lane. The order of the lanes does not need to match.
   Check: node scripts/check-clinical-lanes.mjs (run it whenever a row is added or a lane changes; it must report
   0 mismatches).

Article rule (EDU PROMPT 31). Each lane story is a news feature, not a category summary. It has one news peg: a specific,
   recent development about one drug, company or regulator action (a trial result, an FDA action, an approval, a filing, a
   warning, a funding round, a retraction). It tells that story: what happened; who is behind it; what the evidence shows,
   reported as each study was run; why it matters to men; what is still unknown; what comes next and when. The lane's other
   treatments appear only where they help the story; never a run-through of the whole lane. Format unchanged: 900 to 1,000
   words, inline quotes with footnote numbers, a numbered Notes list, At a glance and pull quote only where they help, each
   treatment named links once to its page. Content rules unchanged: published facts only, word-for-word quotes from sources
   actually opened; never call an unapproved or compounded product FDA approved; no promises, no dosing, no prices, no
   sellers, no Adonis/Beluga products. Company press releases and SEC filings may be cited for what a company says, plans or
   reports, always attributed ("the company says"); a company's claims are never presented as independent fact. Before a
   story is replaced, the old one is saved to content/archive/<lane>/ with the date.

Lanes (EDU PROMPT 23): TRT, Weight, Recovery, Vitality, Energy, Brain, Sleep, Hair loss, Skin, Longevity.

Every treatment a man is likely to run into for men's health in the nine lanes, whatever its status: FDA approved (for any
use), compounded, approved only outside the US, in clinical trials, sold "for research use only", or sold as a dietary
supplement. One row per active ingredient; brands go on the page. A treatment that fits two lanes gets one page and a row
in each lane. Devices and procedures are not covered (rule A). Everything already on the site is skipped (the 47 existing rows).

How the list was built (checked Nov 1, 2026):
- The seeds in EDU PROMPT 22.
- FDA's Category 2 page (bulk drug substances that may present significant safety risks):
  https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks
  Peptides placed in Category 2 on September 29, 2023 and still listed: GHRP-2 (injectable and nasal), GHRP-6, ipamorelin
  acetate, kisspeptin-10 (with ibutamoren mesylate and tranilast, which are not peptides). Listed as "nominated but
  withdrawn" (formerly Category 2): AOD-9604, BPC-157, cathelicidin LL-37, CJC-1295, dihexa acetate, emideltide (DSIP),
  epitalon, GHK-Cu (injectable), ipamorelin acetate, KPV, PEG-MGF, melanotan II, MOTS-c, selank acetate, semax, thymosin
  alpha-1, TB-500. Every one is either already on the site or on this list. Tranilast does not fit a lane (see the end).
- FDA's July 23-24, 2026 PCAC meeting: BPC-157, KPV, TB-500, MOTS-c (July 23); emideltide, epitalon, semax (July 24).
  No later PCAC meeting was announced in the Federal Register as of Nov 1, 2026.
- WADA 2026 Prohibited List classes S0, S2 and S4 (SARMs, growth hormone secretagogues, GHRH analogues, aromatase
  inhibitors, SERMs, metabolic modulators).

Peptide flag: on for chains of amino acids marketed and studied as peptides (up to about 100 amino acids, including
modified and mixed peptide preparations). Off for proteins (follistatin, Klotho, somatropin), small molecules, steroids,
plant extracts and supplements.

## TRT
- Testosterone undecanoate — peptide: no — FDA-approved oral capsules (Jatenzo, Tlando, Kyzatrex) and injection (Aveed) for hypogonadism.
- Testosterone enanthate — peptide: no — FDA-approved injection, including the autoinjector Xyosted, for hypogonadism.
- Clomiphene — peptide: no — approved for women's infertility; widely used off-label in men to raise testosterone.
- Tamoxifen — peptide: no — approved for breast cancer; used off-label in men for breast growth and to raise testosterone.
- Letrozole — peptide: no — aromatase inhibitor approved for breast cancer; used off-label in men like anastrozole.
- DHEA (prasterone) — peptide: no — sold as a dietary supplement for testosterone and "vitality"; banned in sport.
- Kisspeptin — peptide: yes — research peptide marketed to men; kisspeptin-10 placed in FDA Category 2 (Sept 2023). Also Vitality.
- Gonadorelin — peptide: yes — compounded GnRH peptide marketed in TRT clinics as an hCG alternative.
- Enobosarm (ostarine, MK-2866) — peptide: no — SARM in clinical trials, widely sold "for research use only"; banned in sport.
- RAD-140 (testolone) — peptide: no — SARM sold "for research use only"; banned in sport.
- LGD-4033 (ligandrol) — peptide: no — SARM sold "for research use only"; banned in sport.
- Nandrolone — peptide: no — anabolic steroid with an FDA approval history; Schedule III; offered in some TRT clinics.
- Tongkat ali (Eurycoma longifolia) — peptide: no — dietary supplement marketed for testosterone.
- Fadogia agrestis — peptide: no — dietary supplement marketed for testosterone.
- Tribulus terrestris — peptide: no — dietary supplement marketed for testosterone and libido.
- Also added as a brand to the existing Testosterone page: Natesto (nasal testosterone).

## Weight
- Liraglutide — peptide: yes — FDA-approved GLP-1 (Saxenda for weight, Victoza for diabetes).
- Retatrutide — peptide: yes — triple agonist in Phase 3 trials; also sold "for research use only".
- Cagrilintide — peptide: yes — amylin analogue in trials (with semaglutide as CagriSema).
- Mazdutide — peptide: yes — GLP-1/glucagon agonist approved in China; in trials elsewhere.
- Survodutide — peptide: yes — GLP-1/glucagon agonist in Phase 3 trials.
- Orforglipron — peptide: no — oral non-peptide GLP-1 pill; FDA approved it as Foundayo (April 2026) for weight.
- Setmelanotide — peptide: yes — FDA-approved (Imcivree) for rare genetic obesity.
- Phentermine — peptide: no — FDA-approved appetite suppressant; Schedule IV.
- Topiramate — peptide: no — anti-seizure drug; with phentermine in Qsymia for weight.
- Naltrexone — peptide: no — with bupropion in Contrave for weight.
- Bupropion — peptide: no — with naltrexone in Contrave for weight.
- Orlistat — peptide: no — FDA-approved weight drug (Xenical; Alli over the counter).
- AOD-9604 — peptide: yes — growth hormone fragment sold for fat loss; formerly FDA Category 2.
- 5-amino-1MQ — peptide: no — small molecule sold "for research use only" for fat loss.
- Tesofensine — peptide: no — weight-loss drug candidate tested in trials; marketed online for fat loss.

## Recovery
- Cathelicidin LL-37 — peptide: yes — research peptide sold for healing and immunity; formerly FDA Category 2.
- ARA-290 (cibinetide) — peptide: yes — investigational peptide studied for nerve pain; sold for recovery.
- Follistatin — peptide: no (protein) — sold as a muscle and recovery "peptide"; banned in sport.
- PEG-MGF — peptide: yes — pegylated mechano growth factor sold for muscle repair; formerly FDA Category 2; banned in sport.
- IGF-1 LR3 — peptide: yes — modified insulin-like growth factor sold "for research use only"; banned in sport.
- Thymosin alpha-1 — peptide: yes — approved outside the US (Zadaxin); formerly FDA Category 2; sold for immunity and recovery.
- Creatine — peptide: no — dietary supplement sold for strength and recovery.

## Vitality
- Avanafil — peptide: no — FDA-approved ED drug (Stendra).
- Alprostadil — peptide: no — FDA-approved ED injection and urethral pellet (Caverject, Edex, Muse); in compounded Trimix.
- Papaverine — peptide: no — ingredient of compounded Bimix and Trimix ED injections; not approved for ED.
- Phentolamine — peptide: no — ingredient of compounded Bimix and Trimix ED injections; not approved for ED.
- Melanotan II — peptide: yes — tanning and libido peptide sold "for research use only"; formerly FDA Category 2.
- Apomorphine — peptide: no — approved for Parkinson's; approved for ED outside the US in the past; studied for ED.
- Dapoxetine — peptide: no — approved outside the US for premature ejaculation; not approved in the US.
- Yohimbine — peptide: no — sold as a supplement for ED and libido; once a US prescription drug.
- L-arginine — peptide: no — dietary supplement marketed for erections.
- L-citrulline — peptide: no — dietary supplement marketed for erections.
- Kisspeptin — second row (page under TRT).

## Energy
- Ashwagandha — peptide: no — dietary supplement marketed for stress, energy and testosterone.
(Selank, Dihexa, Cerebrolysin, Pinealon, Noopept, Piracetam, Modafinil, Armodafinil, Alpha-GPC and Methylene blue, built
under Energy in EDU PROMPT 22, moved to Brain in EDU PROMPT 23, with Semax.)

## Brain (EDU PROMPT 23)
- Semax — peptide: yes — moved from Energy; Russian-registered nasal peptide; HHS compounding discretion since Oct 2026.
- Selank — peptide: yes — Russian-registered peptide sold for anxiety and focus; formerly FDA Category 2.
- Dihexa — peptide: yes (peptide-derived) — sold for cognition; formerly FDA Category 2; no human data per FDA.
- Cerebrolysin — peptide: yes (pig-brain peptide mixture) — approved in some countries outside the US; sold for focus.
- Pinealon — peptide: yes — short peptide sold for brain health; Russian research.
- Noopept — peptide: yes (dipeptide derivative) — sold for focus; registered in Russia.
- Piracetam — peptide: no — approved in some countries outside the US; not approved in the US; sold for focus.
- Modafinil — peptide: no — FDA-approved wakefulness drug (Provigil), widely used off-label for focus; Schedule IV.
- Armodafinil — peptide: no — FDA-approved wakefulness drug (Nuvigil); Schedule IV.
- Alpha-GPC — peptide: no — dietary supplement marketed for focus and strength.
- Methylene blue — peptide: no — FDA-approved (ProvayBlue) for methemoglobinemia; marketed to men for energy and focus.
- P21 (P021) — peptide: yes — compound built from part of ciliary neurotrophic factor (CNTF); mouse studies only; sold for cognition.
- Ketamine — peptide: no — FDA-approved anesthetic; used off-label for depression; DEA Schedule III.
- Esketamine (Spravato) — peptide: no — FDA-approved nasal spray for treatment-resistant depression, under a REMS.
- Psilocybin — peptide: no — DEA Schedule I; in clinical trials for depression; state programs in Oregon and Colorado.
- Kratom — peptide: no — not FDA approved; FDA warnings and import alerts; sold for mood, energy and pain.

## Sleep
- Emideltide (DSIP) — peptide: yes — rejected by FDA's advisory committee in July 2026; sold for sleep.
- CJC-1295 — peptide: yes — GHRH analogue sold for sleep and growth hormone; formerly FDA Category 2.
- Ipamorelin — peptide: yes — growth hormone secretagogue; FDA Category 2 (503B).
- GHRP-2 — peptide: yes — growth hormone secretagogue; FDA Category 2 (503B).
- GHRP-6 — peptide: yes — growth hormone secretagogue; FDA Category 2 (503B).
- Hexarelin — peptide: yes — growth hormone secretagogue sold "for research use only"; banned in sport.
- Tesamorelin — peptide: yes — FDA-approved GHRH analogue (Egrifta) for HIV belly fat; marketed off-label.
- Ibutamoren (MK-677) — peptide: no — oral growth hormone secretagogue; FDA Category 2; sold for sleep and muscle.
- Magnesium — peptide: no — dietary supplement marketed for sleep.
- Melatonin — new Sleep row for the existing melatonin page (oral melatonin added to it).

## Hair loss
- Dutasteride — peptide: no — FDA-approved for enlarged prostate (Avodart); off-label for hair loss; approved for hair loss in South Korea and Japan.
- Clascoterone — peptide: no — FDA-approved acne cream (Winlevi); a scalp solution is in hair-loss trials. Also Skin.
- RU58841 — peptide: no — anti-androgen sold "for research use only" for hair loss.
- Pyrilutamide (KX-826) — peptide: no — topical anti-androgen in hair-loss trials.
- Baricitinib — peptide: no — FDA-approved JAK inhibitor (Olumiant) for alopecia areata.
- Ritlecitinib — peptide: no — FDA-approved JAK inhibitor (Litfulo) for alopecia areata.
- Deuruxolitinib — peptide: no — FDA-approved JAK inhibitor (Leqselvi) for alopecia areata.
- Saw palmetto — peptide: no — dietary supplement marketed for hair loss and the prostate.
- Pumpkin seed oil — peptide: no — dietary supplement marketed for hair loss.

## Skin
- Isotretinoin — peptide: no — FDA-approved for severe acne; under the iPLEDGE program.
- Adapalene — peptide: no — FDA-approved retinoid; over the counter (Differin).
- Benzoyl peroxide — peptide: no — over-the-counter acne medicine under FDA's monograph.
- Afamelanotide — peptide: yes — FDA-approved implant (Scenesse) for a rare light-sensitivity disease; related to melanotan.
- Clascoterone — second row (page under Hair loss).

## Longevity
- Klotho — peptide: no (protein) — anti-aging protein under research; marketed in longevity circles.
- KP1 (Klotho-derived peptide) — peptide: yes — research peptide derived from Klotho.
- Elamipretide (SS-31) — peptide: yes — FDA-approved 2025 (Forzinity) for Barth syndrome; sold for "mitochondrial" longevity.
- FOXO4-DRI — peptide: yes — research peptide studied as a senolytic in mice; sold "for research use only".
- Humanin — peptide: yes — mitochondrial peptide under research; sold "for research use only".
- Thymalin — peptide: yes (thymus peptide preparation) — Russian thymus extract sold for longevity.
- Rapamycin (sirolimus) — peptide: no — FDA-approved transplant drug (Rapamune); used off-label for longevity.
- Urolithin A — peptide: no — dietary supplement ingredient marketed for muscle and longevity.
- NMN (nicotinamide mononucleotide) — peptide: no — sold as a dietary supplement for NAD+ and longevity; its supplement status has been disputed with FDA.
- Resveratrol — peptide: no — dietary supplement marketed for longevity.
- Fisetin — peptide: no — dietary supplement marketed as a senolytic.
- Somatropin (growth hormone) — peptide: no (protein) — FDA-approved; illegal to distribute for anti-aging under federal law.

## Not built: no lane fits
- Tranilast (FDA Category 2): an anti-allergy drug approved in Japan; not a men's-health treatment.
