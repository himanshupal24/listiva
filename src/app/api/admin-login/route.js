export async function POST(req) {
  const body = await req.json();

  const { ADMIN_EMAIL, ADMIN_PASS } = process.env;

  if (
    body.email === ADMIN_EMAIL &&
    body.password === ADMIN_PASS
  ) {
    return Response.json({ success: true });
  }

  return Response.json({ success: false });
}
