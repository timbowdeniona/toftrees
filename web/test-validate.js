import { createClient } from "next-sanity";
import { parsePreviewUrl } from "@sanity/preview-url-secret";

const client = createClient({
  projectId: "pu2m4784",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

async function run() {
  const q = `*[_type == "sanity.previewUrlSecret"]{_id, secret, studioUrl}`;
  const res = await client.fetch(q);
  console.log("previewUrlSecrets:", res);
}
run().catch(console.error);
