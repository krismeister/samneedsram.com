import { Firestore } from "@google-cloud/firestore";

// Lazy singleton. Auth uses Application Default Credentials: automatic on
// Cloud Run (runtime service account), `gcloud auth application-default
// login` for local dev.
let db = null;

export function getDb() {
  if (!db) {
    db = new Firestore({
      projectId: process.env.GCP_PROJECT_ID || undefined,
      ignoreUndefinedProperties: true,
    });
  }
  return db;
}
