import fs from "node:fs";
import path from "node:path";

describe("static asset cache headers", () => {
  it("covers versioned media assets with immutable caching", () => {
    const headersPath = path.resolve(process.cwd(), "public/_headers");
    const headers = fs.readFileSync(headersPath, "utf8");

    expect(headers).toContain("/images/*-v*.*");
    expect(headers).toContain("/media/*-v*.*");
    expect(headers).toContain("/audio/*-v*.*");
    expect(headers).toContain("Cache-Control: public,max-age=31536000,immutable");
  });

  it("keeps non-versioned media on a shorter cache policy", () => {
    const headersPath = path.resolve(process.cwd(), "public/_headers");
    const headers = fs.readFileSync(headersPath, "utf8");

    expect(headers).toContain("/images/*");
    expect(headers).toContain("/media/*");
    expect(headers).toContain("/audio/*");
    expect(headers).toContain("Cache-Control: public,max-age=86400,stale-while-revalidate=604800");
  });
});
