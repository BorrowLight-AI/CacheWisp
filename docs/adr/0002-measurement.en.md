# ADR-0002: Separate logical size, disk use and reclaim estimates

**English** | [简体中文](0002-measurement.md)

Status: Accepted. Date: 2026-10-26.

Logical size is the sum of file lengths. Disk use is an estimate accounting for known shared identities. Reclaimable space for a cleanup selection must be labeled as an estimate. Adding project directory sizes does not establish that the same amount can be reclaimed.

Deduplicate hard links by volume and file identity. Links outside the scan scope, APFS shared blocks, snapshots and other applications' activity limit precise attribution of reclaimed space. Unknown values must not appear as zero. Record moves to Trash, the size of processed targets and changes in volume free space separately.

Implementation and tests: CW-010 and CW-024. References: [pnpm](https://pnpm.io/symlinked-node-modules-structure), [Apple](https://developer.apple.com/documentation/foundation/about-apple-file-system).
