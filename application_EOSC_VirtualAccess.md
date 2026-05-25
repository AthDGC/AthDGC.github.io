# EOSC · Virtual Access (EGI Federated Cloud) — Application

Submit at:  https://marketplace.eosc-portal.eu  (filter for "Virtual Access" cloud-compute services)

EOSC Virtual Access is funded by the European Commission to give researchers access to federated cloud resources (EGI Fed Cloud) without per-PI charge. Particularly suited for hosting the **public-facing infrastructure side** of AthDGC (the gateway VM that exposes the annotated corpus to the wider research community), in contrast to ARIS / EuroHPC which is best for the heavy GPU compute.

---

**Researcher:**  Prof. Nikolaos Lavidas, EKPA Section of Linguistics
**Institutional email:**  nlavidas@enl.uoa.gr
**ORCID:**  (add if available)
**Project:**  AthDGC — Athens Diachronic Greek Corpus
**Discipline:**  Digital Humanities · Computational Linguistics · Indo-European Linguistics
**Open Science compliance:**  Full — all code on github.com/AthDGC, dataset under permissive per-source licenses, dashboard public.

---

## Resources requested

A medium-sized federated cloud VM, hosted at any EGI Fed Cloud provider:

- **8 vCPU**
- **32 GB RAM**
- **200 GB SSD storage**
- **Public IPv4 + static DNS** (preferred GRNET subdomain via EDET, otherwise EGI default)
- **Outbound HTTPS** to GRNET ARIS (already-whitelisted from EKPA network) for daily corpus-update push
- **Allocation duration:** 24 months renewable

This sizing supports the full Phase III/IV gateway stack: Qdrant (vector DB), Neo4j (graph DB with the PROIEL-style cross-lingual alignment schema), FastAPI receiver, NGINX TLS reverse proxy with Keycloak forward-auth, BlackLab corpus search engine, and INCEpTION semantic-alignment review GUI.

ARIS itself (GRNET national HPC) handles the GPU-heavy training and annotation. The EOSC VM is the **public-facing exposure layer** — researchers worldwide access the annotated corpus through it.

## Scientific case (≈350 words)

The Athens Diachronic Greek Corpus (AthDGC) is the first open, autonomous, end-to-end pipeline that ingests, OCRs, dependency-parses, and cross-lingually aligns the entire Greek diachronic record (Homeric through Modern) plus its Indo-European parallels (Latin, Gothic, Old Church Slavonic, Classical Armenian).

The project has two complementary infrastructure needs:

**(a) HPC compute** for transformer fine-tuning and dependency parsing — already provided by our active GRNET ARIS allocation (pa260305) and a complementary EuroHPC JU Development Access application currently in preparation.

**(b) Federated cloud exposure** for public access to the annotated corpus, alignment graph, and corpus-search interface. *This is what we request from EOSC.*

The gateway stack — Qdrant + Neo4j + FastAPI + NGINX + BlackLab + INCEpTION — provides:

1. **Cross-lingual graph queries** ("show me every Greek verb of giving with an accusative object, and how that exact syntactic construction was translated into Latin and Gothic")
2. **PROIEL-style corpus search** via Lucene + CQL ("aorist verbs in Byzantine documents with a feminine accusative complement")
3. **Manual alignment review** by external collaborators through the INCEpTION GUI
4. **Public dataset browser** at https://athdgc.github.io — already live in beta as a static page

We have already implemented the full architecture in our private development repository (github.com/AthDGC/Diachronic-Linguistics-Platform). The Docker Compose stack is cloud-agnostic: a single `migrate_gateway.sh` script tar's all persistent volumes and rsyncs to any host with Docker installed — Hetzner, EKPA bare-metal, or, ideally, an EOSC-funded EGI Fed Cloud VM.

By hosting on EOSC, the resource is:
- Free at the point of use (EOSC Virtual Access mechanism)
- Compliant with Open Science policies (which is our project's core ethos anyway)
- Geographically positioned within the European research network (low latency to ARIS / GRNET for the daily corpus-update push)
- Visible in the EOSC Marketplace as a discoverable open scholarly service

## Open Science commitments

- **Code:** Apache 2.0 / MIT, on GitHub at github.com/AthDGC
- **Data:** released under per-source licenses (PROIEL CC-BY-NC-SA, Modern Greek ODC-BY-1.0, etc.) with clear per-row license attribution in the JSONL partitions and PROIEL XML metadata
- **API:** public read-only endpoints (sentence-level, dep-tree, cross-lingual polyglot matrix), TLS-terminated through NGINX, no authentication required for GET
- **Metadata:** FAIR-compliant — every text carries its source URL, license, author, century, edition, dialect, region, and Stanza annotation provenance
- **Dashboard:** Public showcase at https://athdgc.github.io · Live status at https://huggingface.co/spaces/nlavidas/athdgc-dashboard-private (to be made public at grant release)

## Project milestones (24-month plan)

| Month | Milestone |
|---|---|
| M0  | EOSC VM provisioned, gateway stack deployed via the cloud-agnostic migration script |
| M2  | First public corpus query endpoint live; ATHDGC.github.io updated to point at it |
| M6  | All Greek diachronic periods at completion thresholds; pipeline advances to Latin |
| M12 | Cross-lingual alignment for grc/lat/got/chu/xcl in Neo4j; public polyglot matrix UI |
| M18 | Pipeline progresses through Sanskrit, Old English; new dataset releases on HuggingFace |
| M24 | Final dataset + paper releases; sustainability plan for hand-off to a permanent host (EKPA bare-metal as fallback) |

## Why EOSC

The EOSC Virtual Access mechanism exists precisely for projects like AthDGC: open scientific infrastructure that benefits a European-wide research community, hosted by Europe's federated cloud, accessible without commercial vendor lock-in. The full Docker Compose stack we ship is portable to any provider — but EOSC's federated mechanism aligns best with our Open Science commitments and our existing GRNET / EKPA / EuroHPC anchors.

## Contact

Prof. Nikolaos Lavidas — nikolaos.lavidas@gmail.com
GitHub:  github.com/AthDGC
Live showcase:  https://athdgc.github.io
