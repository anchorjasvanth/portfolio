import { createClient } from "@sanity/client";
const client = createClient({
  projectId: "yi97i9xu",
  dataset: "production",
  useCdn: false, // fast (good for frontend)
  apiVersion: "2026-03-19",
  perspective: "published",
});

export default client;
