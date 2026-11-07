# Deploy to GCP (Cloud Run)

Target: Phase 1 public frontend (Next.js standalone server).
No secrets needed — model auth lives in Kris's local CLI login.

Live: https://samneedsram-859731070244.us-central1.run.app
(project `project-5f5da873-2152-4c60-9aa`, region `us-central1`, service `samneedsram`)

## One-time setup

```sh
gcloud auth login
gcloud config set project <PROJECT_ID>
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
```

## Deploy

Pushes to `main` auto-deploy via GitHub Actions ([deploy.yml](../.github/workflows/deploy.yml)).
For a manual deploy from the repo root (builds in Cloud Build — no local Docker needed):

```sh
gcloud run deploy samneedsram \
  --source . \
  --region <REGION> \
  --allow-unauthenticated
```

Useful flags: `--min-instances 0` (scale to zero, cheapest),
`--max-instances 2`, `--memory 512Mi`.

## Notes

- The container listens on `$PORT` (Cloud Run default 8080); see
  [Dockerfile](../Dockerfile).
- Site content (pledge themes, art) is committed under `public/`, so each
  redeploy picks up newly built themes. Redeploy after adding content:
  re-run the `gcloud run deploy` command above.
- Custom domain: `samneedsram.com` + `www.samneedsram.com` are mapped to
  the service (Cloud DNS zone `samneedsram-com`: apex A/AAAA + www CNAME
  to `ghs.googlehosted.com`). Google-managed TLS auto-renews.

## Firestore

Database: Firestore Native in `us-central1` (same region as the service).
The app connects via `lib/db.js` with Application Default Credentials — no
keys. The Cloud Run runtime account needs `roles/datastore.user`:

```sh
gcloud projects add-iam-policy-binding project-5f5da873-2152-4c60-9aa --member=serviceAccount:859731070244-compute@developer.gserviceaccount.com --role=roles/datastore.user --condition=None
```

Local dev needs `gcloud auth application-default login`.
Connectivity probe: `GET /api/health`.

## Secrets

Runtime secrets live in Secret Manager, injected via `--set-secrets` in
`deploy.yml` (never baked into the image or committed):

- `PLEDGE_JWT_SECRET` — 32-char token for signing pledge JWTs, stored in
  Secret Manager and injected via `--set-secrets`. The secret must exist
  before a deploy referencing it, or the deploy fails.
