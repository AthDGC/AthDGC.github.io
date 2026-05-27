# EuroHPC JU · Development Access Call - Application

**Project title:**  AthDGC - Athens Diachronic Greek Corpus: a self-feeding annotation and cross-lingual alignment pipeline for the entire Greek language and its Indo-European parallels

**Principal Investigator:**  Prof. Nikolaos Lavidas
**Affiliation:**  National and Kapodistrian University of Athens (EKPA), Department of English Language and Literature, Section of Linguistics
**Email:**  nikolaos.lavidas@gmail.com  ·  EKPA institutional address available on request
**Discipline:**  Computational Linguistics / Digital Humanities / Indo-European Linguistics

**Current allocation:**  GRNET ARIS (Greek national HPC), project **pa260305** - active, 173+ GPU-hours used in the last 30 days; A100 nodes for fine-tuning and dependency parsing.

**Resource requested:**  Development Access to EuroHPC pre-exascale or petascale system - preferences in order: **LUMI** (gpu partition, MI250X), **MeluXina** (gpu partition, A100), **Discoverer** (h100). Approximately **20,000 GPU-node-hours** for a 12-month period.

---

## 1. Scientific case (≈300 words)

Greek is the longest continuously attested member of the Indo-European family - from Homeric and Archaic inscriptions of the 8th century BC to Modern Greek of the 21st century AD. Despite this depth, no operational, openly licensed, end-to-end pipeline exists today that ingests, OCRs, dependency-parses, and cross-lingually aligns the entire diachronic record in a reproducible way.

AthDGC closes that gap. We have built an autonomous daily-harvest pipeline that:

1. **Discovers** new Greek (and parallel-language) source material from open-access repositories (archive.org, Perseus Digital Library, First1K Greek, Wikisource, Diorisis Corpus, OpenGreekAndLatin/PerseusDL).
2. **Filters** candidates via a Greek-script ratio check and content-hash deduplication against the existing corpus.
3. **Converts** raw text into the **PROIEL XML 2.0** treebank schema with sentence-level structure.
4. **Annotates** every sentence with Stanford **Stanza** (PROIEL-trained pipeline for Ancient Greek; analogous models for Latin / Gothic / OCS / Armenian).
5. **Aligns** cross-lingually against the New Testament's verse-level anchor system - Greek ↔ Latin ↔ Gothic ↔ Old Church Slavonic ↔ Classical Armenian - using LaBSE sentence embeddings and multilingual-BERT attention for word-level alignment, plus LingPy ASJP-coded phonetic distance for cognate detection.
6. **Stores** the result in a graph database (Neo4j) with a PROIEL-style schema (Manuscript → Folio → Sentence → Word with DEPENDS_ON, TRANSLATED_AS, IS_COGNATE edges).

The pipeline is currently fully operational on GRNET ARIS, with **89.9 M corpus rows total**, **4.08 M annotated Greek rows**, **6,861 NT-anchored Greek verses** cross-aligned to four sister IE languages, and an automatically advancing state machine that proceeds through Greek → Latin → Gothic → OCS → Armenian → Sanskrit → Old English → Avestan → Old Persian.

## 2. Computational need (≈250 words)

The bottleneck is GPU throughput for two compute-intensive stages:

**(a) Dependency parsing** with Stanza's PROIEL pipeline. On a single A100, one annotation pass over the ~4 M Greek rows takes ≈ 24 hours of wall-time; the daily harvest currently saturates the 24 h SLURM limit. As the corpus expands (next-language progressions add 2-10 M further rows for Latin, Sanskrit, and Modern Greek), we need parallel parsing across multiple GPU nodes.

**(b) Cross-lingual alignment** uses LaBSE embeddings for ~6,800 NT-anchored Greek verses against four target languages, then multilingual-BERT attention for word-level alignment. Each language-pair pass takes 6-10 GPU-hours; the full diachronic + interlingual scaling (all eight target IE languages × all canonical works × all retranslation chains) requires roughly an order of magnitude more capacity than ARIS alone can supply.

**Estimated requirement (12 months):**
- Stanza dep-parsing across full corpus expansions: ~6,000 GPU-node-hours
- LaBSE / mBERT alignment for 8 language pairs × incremental corpus growth: ~5,000 GPU-node-hours
- Transformer fine-tuning experiments (diachronic Greek language model, building on the current Phase IV baseline at eval_loss 1.61): ~6,000 GPU-node-hours
- Headroom / restarts: ~3,000 GPU-node-hours

**Total:** ~20,000 GPU-node-hours.

## 3. Methodology summary

All code is openly published at https://github.com/AthDGC (organizational GitHub). The harvest, annotation, and alignment scripts are reproducible and idempotent. The PROIEL XML output is schema-validated. No proprietary models or closed datasets are involved.

## 4. Expected outputs (12-month horizon)

- **Open dataset release** (HuggingFace Datasets) of the fully annotated Greek diachronic corpus under appropriate per-source licenses
- **Open model release** of a fine-tuned diachronic Greek transformer + the PROIEL-trained Stanza pipeline weights
- **Open-access publication** in *Journal of Greek Linguistics* or *Digital Scholarship in the Humanities* describing the cross-lingual alignment method
- **Public showcase** at https://athdgc.github.io (already live in beta) with browsable annotations
- **Continued autonomous corpus growth** through the daily harvest pipeline

## 5. Team & infrastructure

- **PI:** Prof. Nikolaos Lavidas (EKPA, Section of Linguistics) - diachronic Greek syntax, language contact, corpus linguistics
- **Compute partner:** GRNET ARIS (currently active), seeking EuroHPC complement for scale
- **Code repository:** github.com/AthDGC/Diachronic-Linguistics-Platform (private during development, open at release)
- **Live dashboard:** HuggingFace Spaces (private during development, public at release)

## 6. Why EuroHPC

EuroHPC's MI250X (LUMI) and A100 (MeluXina) partitions provide the parallel multi-node capacity that single-node ARIS cannot. The cross-lingual alignment workload parallelises naturally across language pairs. AthDGC is a textbook European Open Science Cloud / EuroHPC use case: open data, open models, cross-language, cross-period, with measurable progress milestones already shipped.

**Signature & date:**  ____________________________  ·  ____________
