# AthDGC: An Open Diachronic Greek Treebank with Indo-European Parallels

## A formal short data paper for journal submission

**Target venue (recommended):** *Journal of Open Humanities Data* (Ubiquity Press, open-access; data-paper format, ~1500–2500 words).
**Alternatives:** *Research Data Journal for the Humanities and Social Sciences* (Brill); *Data in Brief* (Elsevier); *Journal of Greek Linguistics* (Brill, short report); *Digital Scholarship in the Humanities* (Oxford UP).

---

**Title.** AthDGC: an open PROIEL-style diachronic Greek treebank with Indo-European retranslation parallels and explicit argument-structure annotation.

**Short title.** AthDGC (Athens-PROIEL).

**Author.** Nikolaos Lavidas, Associate Professor of Linguistics, National and Kapodistrian University of Athens (EKPA), Department of English Language and Literature, Section of Linguistics. ORCID: 0000-0000-0000-0000. Email: nlavidas@enl.uoa.gr.

**Keywords.** diachronic linguistics; ancient Greek; Byzantine Greek; Modern Greek; Indo-European; dependency treebank; PROIEL; cross-lingual alignment; argument structure; retranslation; retelling.

**Dataset DOI.** 10.5281/zenodo.XXXXXXX (concept DOI).
**Code DOI.** 10.5281/zenodo.YYYYYYY (concept DOI).
**Repository.** https://github.com/AthDGC/Diachronic-Linguistics-Platform · https://athdgc.github.io
**Licence.** Source code Apache-2.0; corpus metadata + alignments CC-BY-4.0; per-source raw text under its original licence (PROIEL CC-BY-NC-SA, Modern Greek ODC-BY-1.0, Perseus CC-BY-SA-4.0, etc.) recorded per row.

---

## Abstract (≈150 words)

AthDGC ("Athens-PROIEL") is an open, end-to-end pipeline and dataset that provides the first continuously updated, dependency-parsed treebank of the entire Greek language — from Homeric and Archaic texts to Modern Greek — with cross-lingual alignment to Latin (Vulgate), Gothic (Wulfila), Old Church Slavonic (Marianus), and Classical Armenian via the New Testament's verse-level anchor system. Sanskrit, Old English, Avestan, and Old Persian are queued. AthDGC follows the PROIEL XML 2.0 schema, uses the Stanford Stanza PROIEL-trained pipeline for annotation, and applies LaBSE sentence embeddings and multilingual-BERT attention for word-level alignment. Its scholarly contribution is to extend the original PROIEL line forward in time and to focus annotation on *retranslations*, *retellings*, and explicit *argument-structure* tagging of influential Indo-European texts. As of the v0.1 release, the corpus contains 89.9 M total rows, 4.08 M annotated Greek rows, and 6,861 NT-anchored Greek verses cross-aligned to four sister IE witnesses.

---

## 1 · Overview

### 1.1 Context and motivation

Greek is the longest continuously attested member of the Indo-European family. The PROIEL Treebank (Haug & Jøhndal 2008; Eckhoff *et al.* 2018) established the gold standard for syntactically annotated parallel Indo-European Bible corpora, but its scope is restricted to the New Testament and to a small number of language witnesses. No openly licensed, end-to-end pipeline currently covers the full diachronic record of Greek — from Homer to Modern Greek — at the same level of syntactic and morphological annotation, with explicit argument-structure tagging, and with reproducible cross-lingual alignment to its sister IE languages. AthDGC closes that gap.

The project's specific scholarly focus is *retranslation*: the same canonical text — the Iliad, the New Testament, the Septuagint Psalms, classical historiography — is re-rendered into Greek across periods (Homeric → Koine → Byzantine → Modern) and into sister languages (Latin, Gothic, OCS, Armenian) across the Indo-European family. By aligning these retranslation chains under a uniform PROIEL-style dependency annotation and recording the verb-by-verb argument structure of each rendering, AthDGC enables the systematic study of how *argument-structure encoding* shifts under retranslation, both across time within Greek and across the IE family.

### 1.2 Repository location

The complete source code, pipeline scripts, and showcase site are available at:

- Source code: https://github.com/AthDGC/Diachronic-Linguistics-Platform
- Public showcase: https://athdgc.github.io
- Hugging Face dataset (forthcoming v0.1): `athdgc/diachronic-greek-corpus`
- Zenodo deposition: https://doi.org/10.5281/zenodo.XXXXXXX

### 1.3 Institutional context

AthDGC is developed at the **National and Kapodistrian University of Athens (EKPA)**, Section of Linguistics (Department of English Language and Literature), under the direction of Prof. Nikolaos Lavidas. Compute is supplied by the Greek national HPC cluster GRNET ARIS (allocation pa260305).

---

## 2 · Method

The pipeline runs as an autonomous daily job on GRNET ARIS and is structured as a six-stage state machine.

### 2.1 Discovery

Each day, the discovery stage probes open-access repositories — archive.org, Perseus Digital Library, First1K Greek, Wikisource, the Diorisis Corpus, OpenGreekAndLatin/PerseusDL — for new or updated Greek and parallel-language source material. The discovery state machine routes priority to *influential texts and their retranslation chains*: canonical works that appear in multiple editions, periods, and translations.

### 2.2 Filtering

Candidate texts are filtered by (a) Greek-script ratio (≥ 75% of alphabetic characters in the Greek Unicode blocks), (b) a Path-B line filter that removes bilingual editorial apparatus (Latin marginalia, page references, *scribit* / *addidit* / *codex* markers), and (c) content-hash deduplication against the existing corpus.

### 2.3 Conversion

Surviving text is converted into the **PROIEL XML 2.0** schema with sentence-level structure. The schema records `<sentence>` and `<token>` elements with `id`, `form`, `lemma`, `part-of-speech`, `morphology`, `head-id`, and `relation` attributes, mirroring the Oslo PROIEL convention exactly so AthDGC output can be merged or compared with existing PROIEL trees without conversion overhead.

### 2.4 Annotation

Annotation is performed sentence by sentence with the Stanford **Stanza** pipeline (Qi *et al.* 2020) using the PROIEL-trained model for Ancient Greek (`grc_proiel`). For each token, Stanza emits the canonical four-tuple: lemma, Universal POS tag, language-specific tag, and a morphological feature bundle (case, gender, number, tense, aspect, voice, mood, person). Dependencies follow the Universal Dependencies relation set with PROIEL-compatible re-labelling where the two conventions diverge. Analogous PROIEL-trained Stanza models are used for Latin (`la_proiel`), Old Church Slavonic (`cu_proiel`), Gothic (`got_proiel`), and Classical Armenian.

### 2.5 Argument-structure capture

Beyond standard dependency annotation, AthDGC extracts an explicit argument-structure frame for every verb token: the subject (`nsubj` / `nsubj:pass`), direct object (`obj`), indirect / oblique arguments (`iobj`, `obl:arg`), voice (active / middle / passive, captured from the `Voice` feature), and aspect (perfective / imperfective). These frames are stored in a separate column for retrieval queries such as "show every Greek aorist transitive verb with an accusative object whose Latin Vulgate counterpart is a passive periphrastic." This is, to our knowledge, the first systematic argument-structure projection across an IE diachronic parallel corpus.

### 2.6 Cross-lingual alignment

The cross-lingual alignment stage anchors on the New Testament's verse-level structure: a Greek verse is mapped onto its Latin, Gothic, OCS, and Armenian translations by canonical citation (book, chapter, verse). Sentence-level alignment uses LaBSE embeddings (Feng *et al.* 2022); word-level alignment uses multilingual-BERT attention via the AwesomeAlign procedure (Dou & Neubig 2021). Phonetic cognate scoring uses ASJP sound-class encoding and LingPy edit distance (List 2014), supplemented by LaBSE semantic similarity to disambiguate true cognates from chance phonetic matches.

### 2.7 Storage

The merged corpus is stored as PROIEL XML 2.0 plus JSONL partitions per `(language, period)`. A Qdrant vector store holds the LaBSE embeddings for semantic search; a Neo4j graph holds the alignment edges (`TRANSLATED_AS`, `IS_COGNATE`, `DEPENDS_ON`) for graph queries across the diachronic + interlingual matrix.

---

## 3 · Dataset description

| Field | Value |
|---|---|
| **Object name** | AthDGC corpus, v0.1 release |
| **Format** | PROIEL XML 2.0 (primary); CoNLL-U; JSONL partitions |
| **Creation dates** | Continuous daily ingestion since 2025-09; first DOI-minted release 2026-05-25 |
| **Dataset creator** | Lavidas, N. and collaborators, EKPA Section of Linguistics |
| **Language** | Ancient Greek (`grc`), Byzantine Greek (`grc`/`gkm`), Modern Greek (`ell`); parallels in Latin (`lat`), Gothic (`got`), Old Church Slavonic (`chu`), Classical Armenian (`xcl`) |
| **Licence** | Code Apache-2.0; metadata + alignments CC-BY-4.0; per-source raw text under its original licence, recorded per row |
| **Repository** | Zenodo (DOI 10.5281/zenodo.XXXXXXX); GitHub `AthDGC/Diachronic-Linguistics-Platform`; Hugging Face `athdgc/diachronic-greek-corpus` |
| **Publication date** | 2026-05-25 (v0.1) |

### 3.1 Coverage by period

| Period | Years (AD/BC) | Annotated Greek rows |
|---|---|---|
| Archaic | 8th–6th c. BC | XXX |
| Classical | 5th–4th c. BC | XXX |
| Koine | 3rd c. BC – 4th c. AD | XXX |
| Late Antique | 4th–7th c. AD | XXX |
| Byzantine | 7th–12th c. AD | XXX |
| Late Byzantine | 13th–15th c. AD | XXX |
| Early Modern | 16th–18th c. AD | XXX |
| Modern | 19th c. AD – present | XXX |
| **Total annotated Greek** | | **4.08 M rows** |

(Row counts to be refreshed from the latest build before submission.)

### 3.2 Cross-lingual NT alignment

| Greek verses anchored | 6,861 |
|---|---|
| Latin (Vulgate) parallels | XXX |
| Gothic (Wulfila) parallels | XXX |
| Old Church Slavonic (Marianus) parallels | XXX |
| Classical Armenian parallels | XXX |

### 3.3 Quality control

Every annotated row is checked for (i) Stanza model identifier and version, (ii) per-token confidence, (iii) sentence-level Greek-script ratio, (iv) absence of apparatus-criticus markers, and (v) PROIEL XML schema validity. The showcase site (https://athdgc.github.io) displays representative samples per period under the same quality-control filter; a separate `validate_proiel.py` script in the GitHub repository confirms schema-level conformance of every released XML file.

---

## 4 · Reuse potential

AthDGC is designed for four classes of reuse:

**1.** *Historical syntactic research* — diachronic syntactic change in Greek (e.g., word-order drift; loss of the dative; emergence of the modern Greek subjunctive periphrasis) can be queried directly from the dependency arcs and morphological features.

**2.** *Indo-European comparative syntax* — the NT-anchored alignment graph allows verb-by-verb argument-structure comparison across Greek, Latin, Gothic, OCS, and Armenian for the same source text. Researchers can isolate, for instance, every instance of a Greek aorist passive verb and inspect how each daughter language renders the voice + aspect combination.

**3.** *Computational diachronic NLP* — the per-period JSONL partitions provide ready-made training data for diachronic language models, period classifiers, and translation-pair extraction. We have already used the partitions to fine-tune a diachronic Greek transformer (Phase IV, eval_loss 1.61; 8.5% improvement over the prior baseline).

**4.** *Digital editions and pedagogy* — the public showcase site provides a browsable, period-tabbed interface with PROIEL XML, CoNLL-U, and visual dependency-arc output for every sample sentence. Teachers and editors can pull individual sentences with full provenance metadata directly from the JSONL or query the public alignment graph endpoint.

We commit to (a) keeping AthDGC openly available under the licences stated above, (b) tagging new versions on Zenodo as the corpus grows, and (c) treating reproducibility as a first-order priority: every annotation pipeline step is scriptable, idempotent, and version-controlled in the public repository.

---

## Acknowledgements

The project gratefully acknowledges the Greek national HPC infrastructure GRNET / ARIS (allocation pa260305) for compute, the National and Kapodistrian University of Athens (EKPA) Section of Linguistics for institutional support, and the open scholarly community whose source texts AthDGC builds on — most importantly the PROIEL Treebank team at the University of Oslo (Haug, Jøhndal, Eckhoff and collaborators), the Perseus Digital Library, the First1K Greek and OpenGreekAndLatin projects, and the Diorisis Corpus.

## References

- Dou, Z.-Y. and Neubig, G. (2021). Word Alignment by Fine-tuning Embeddings on Parallel Corpora. In *Proceedings of EACL 2021*.
- Eckhoff, H. M., Bech, K., Bouma, G., Eide, K., Haug, D. T. T., Haugen, O. E., and Jøhndal, M. (2018). The PROIEL Treebank Family: A Standard for Early Attestations of Indo-European Languages. *Language Resources and Evaluation* 52(1), 29–65.
- Feng, F., Yang, Y., Cer, D., Arivazhagan, N., and Wang, W. (2022). Language-agnostic BERT Sentence Embedding. In *Proceedings of ACL 2022*.
- Haug, D. T. T. and Jøhndal, M. (2008). Creating a Parallel Treebank of the Old Indo-European Bible Translations. In *Proceedings of the Second Workshop on Language Technology for Cultural Heritage Data (LaTeCH 2008)*.
- List, J.-M. (2014). *Sequence Comparison in Historical Linguistics*. Düsseldorf University Press.
- Qi, P., Zhang, Y., Zhang, Y., Bolton, J., and Manning, C. D. (2020). Stanza: A Python Natural Language Processing Toolkit for Many Human Languages. In *Proceedings of ACL 2020*.

---

## Submission notes for the author

**Length.** Current draft ≈1800 words including front matter. JOHD limit is roughly 2500 words; you can expand the per-period coverage table or the Reuse-potential section if asked.

**Required attachments at submission.** (1) The Zenodo DOI (mint first — see `athdgc_zenodo_pack.md`). (2) Author ORCID. (3) A signed JOHD submission form (downloadable from the journal). (4) One or two figures: the period-tabbed showcase screenshot and the cross-lingual NT alignment diagram both work well as Figure 1 and Figure 2.

**Likely peer-review timeline at JOHD.** ~10–14 weeks from submission to decision. *Research Data Journal for the Humanities and Social Sciences* is slightly faster on average but more selective. *Data in Brief* accepts as fast as 4–6 weeks but is less prestigious in DH/linguistics.

**Pre-submission checklist.**

- [ ] Zenodo DOI minted (Path A in the Zenodo pack)
- [ ] ORCID present in the manuscript and on the dataset
- [ ] CITATION.cff and .zenodo.json committed to the GitHub repo
- [ ] Per-period row counts refreshed from the latest ARIS build
- [ ] Two figures (period tab screenshot + alignment graph diagram) prepared at 300 dpi
- [ ] Co-author affiliations and emails confirmed if any are added beyond the lead author
- [ ] A short cover letter to the JOHD editor explaining what is novel about AthDGC (PROIEL-style annotation + diachronic forward extension + retranslation focus + argument-structure capture)
