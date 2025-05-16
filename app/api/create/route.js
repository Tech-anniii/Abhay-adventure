// app/api/create/route.js

export async function POST(req) {
  const body = await req.json();

  // handle booking logic...

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
