#!/usr/bin/env node
const https = require("https");

const apiKey = "555571158744853";
const apiSecret = "16BtxkrMXEQNsPq9-VUyewdoqYE";
const cloudName = "sabo5fny";

const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
const body = "name=casawood_products&unsigned=true&folder=casawood%2Fproducts";

const options = {
  hostname: "api.cloudinary.com",
  path: `/v1_1/${cloudName}/upload_presets`,
  method: "POST",
  headers: {
    Authorization: `Basic ${credentials}`,
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": Buffer.byteLength(body),
  },
};

const req = https.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => { data += chunk; });
  res.on("end", () => {
    const parsed = JSON.parse(data);
    if (res.statusCode === 200 || res.statusCode === 201) {
      console.log("✅ Upload preset created: " + parsed.name);
      console.log("   Mode: " + (parsed.unsigned ? "Unsigned" : "Signed"));
    } else if (parsed.error && parsed.error.message && parsed.error.message.includes("already exists")) {
      console.log("✅ Preset 'casawood_products' already exists — nothing to do.");
    } else {
      console.error("❌ Failed (" + res.statusCode + "):", JSON.stringify(parsed, null, 2));
    }
  });
});

req.on("error", (e) => console.error("Request error:", e.message));
req.write(body);
req.end();
