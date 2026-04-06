import { NextResponse } from "next/server";

// Auto-updated expiry: 1 year from build
const expiry = new Date();
expiry.setFullYear(expiry.getFullYear() + 1);

export function GET() {
  const content = `Contact: hello@lenvx.dev
Expires: ${expiry.toISOString()}
Preferred-Languages: en
Canonical: https://lenvx.dev/.well-known/security.txt
Policy: https://lenvx.dev/security-policy
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
