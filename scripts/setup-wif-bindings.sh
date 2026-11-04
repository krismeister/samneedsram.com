#!/usr/bin/env bash
# One-time GCP setup for the GitHub Actions source-deploy pipeline.
# Pool + provider already exist; this only (re)applies IAM bindings.
# Safe to re-run. Usage: bash scripts/setup-wif-bindings.sh
set -euo pipefail

P=project-5f5da873-2152-4c60-9aa
SA=github-deployer@$P.iam.gserviceaccount.com

for R in roles/run.admin roles/iam.serviceAccountUser roles/artifactregistry.writer roles/cloudbuild.builds.editor roles/storage.admin; do
  gcloud projects add-iam-policy-binding "$P" --member="serviceAccount:$SA" --role="$R" --condition=None
done

MEMBER="principalSet://iam.googleapis.com/projects/859731070244/locations/global/workloadIdentityPools/github-pool/attribute.repository/krismeister/samneedsram.com"
gcloud iam service-accounts add-iam-policy-binding "$SA" --role=roles/iam.workloadIdentityUser --member="$MEMBER"

echo "WIF bindings OK"
