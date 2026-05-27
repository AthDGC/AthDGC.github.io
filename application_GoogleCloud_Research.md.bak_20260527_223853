# Google Cloud Research Credits - Application

Apply at:  https://edu.google.com/programs/credits/research/

---

**Researcher name:**  Prof. Nikolaos Lavidas
**Title:**  Associate Professor of Linguistics
**Institution:**  National and Kapodistrian University of Athens (EKPA)
**Department:**  Department of English Language and Literature, Section of Linguistics
**Country:**  Greece
**Academic email (required):**  nlavidas@enl.uoa.gr  (institutional address)
**Researcher / project URL:**  https://github.com/AthDGC

**Project title:**  AthDGC - Athens Diachronic Greek Corpus and Indo-European Cross-Lingual Alignment Pipeline

**Funding amount requested:**  USD 5,000 in Google Cloud credits (12-month consumption window)

---

## Project description (≈400 words, paste into the application's "Research summary" field)

AthDGC is an open, end-to-end pipeline that builds the first fully self-feeding annotated diachronic corpus of the Greek language - from Homeric and Archaic texts (8th century BC) through Classical, Koine, Late Antique, Byzantine, Late Byzantine, Early Modern, and Modern Greek. Each text is dependency-parsed (Stanza with the PROIEL Treebank model), and every New-Testament-anchored verse is cross-lingually aligned to its parallel in Latin (Vulgate), Gothic (Wulfila Bible), Old Church Slavonic, and Classical Armenian - providing a rare end-to-end diachronic + interlingual annotation graph across the Indo-European family.

The pipeline is already operational on Greece's national HPC cluster (GRNET ARIS), running an autonomous daily harvest that discovers, filters, OCRs, converts to PROIEL XML 2.0, annotates with Stanza on GPU, and merges the result into the master corpus. Current state: **89.9 M corpus rows**, **4.08 M annotated Greek rows**, **6,861 NT-anchored Greek verses** with parallels across four IE languages, a Phase-IV fine-tuned transformer at **eval_loss 1.61** (8.5% improvement over the prior baseline).

We are requesting Google Cloud Research Credits to complement our existing ARIS allocation in three specific ways:

1. **Burst capacity for Stanza dependency parsing.** A100 instances on Google Cloud will let us run the parsing pass in parallel batches whenever the ARIS-side allocation is saturated. Estimated need: 3 GPU-weeks across the next 12 months.

2. **Distributed cross-lingual alignment.** LaBSE sentence embedding and multilingual-BERT word-level alignment scale naturally across language pairs. Running these on GCP T4/A100 instances lets us complete the full diachronic-and-interlingual matrix faster than serial single-node execution.

3. **Public-facing hosting of the alignment graph.** We plan to release the annotated corpus + the cross-lingual alignment graph (Neo4j) as a public read-only research dataset. GCP's Cloud Run / Compute Engine + Cloud Storage are well-suited to host the read-only graph endpoint with predictable cost.

**Research output is fully open.** All code is on GitHub (github.com/AthDGC). The annotated corpus will be released under the respective per-source licenses (PROIEL CC-BY-NC-SA, Modern Greek ODC-BY, Wikisource CC-BY-SA, etc.). The Stanza-and-mBERT-derived annotation layer is licensed as the corresponding upstream tools require, and our scripts emit standard PROIEL XML 2.0 and CoNLL-U for downstream interoperability.

**Why this matters for Google.** Diachronic and cross-lingual NLP is a long-standing weak spot for large language models, and a high-quality openly released benchmark with verifiable provenance is a real contribution to the field. The AthDGC pipeline + datasets are immediately citable as a foundation for future multilingual-and-diachronic transformer research.

---

## Anticipated services & credits breakdown

| Service | Use | Estimated credits |
|---|---|---|
| Compute Engine (A100 / T4) | Stanza parsing bursts + LaBSE/mBERT alignment | $3,000 |
| Cloud Storage | Corpus snapshot mirror (read-mostly, ~50 GB initially) | $300 |
| Cloud Run / GKE Autopilot | Public alignment-graph read endpoint | $1,000 |
| Cloud Build / Artifact Registry | CI for pipeline scripts | $200 |
| Headroom / restarts | | $500 |
| **Total** | | **$5,000** |

## Outputs (12-month window)

- **Open dataset release** on HuggingFace Datasets: `athdgc/diachronic-greek-corpus` (PROIEL XML + CoNLL-U + JSONL)
- **Open model release** on HuggingFace: PROIEL-trained Stanza checkpoint for grc; fine-tuned diachronic Greek transformer
- **Open-access publication** in a digital-humanities or computational-linguistics journal
- **Public showcase** at https://athdgc.github.io (live now; will be expanded with the GCP-hosted graph endpoint)
- **Conference talks** at LREC-COLING and the Greek Linguistics Conference

## Existing infrastructure

- **HPC:** GRNET ARIS allocation pa260305 (Greek national cluster, active)
- **Code:** github.com/AthDGC organization (public + private repos)
- **Pipeline architecture:** documented in github.com/AthDGC/Diachronic-Linguistics-Platform
- **Showcase:** athdgc.github.io (live)

## Contact for follow-up

Prof. Nikolaos Lavidas - nikolaos.lavidas@gmail.com (or EKPA address)
GitHub: github.com/AthDGC
