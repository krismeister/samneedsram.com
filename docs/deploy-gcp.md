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
- Mailer content is committed under `public/static-mailers/`, so each
  redeploy picks up newly generated mailers. Redeploy after a
  generation session: re-run the `gcloud run deploy` command above.
- Custom domain (`samneedsram.com`): after the first deploy,
  `gcloud run domain-mappings create --service samneedsram --domain samneedsram.com --region <REGION>`
  and add the DNS records it prints.
