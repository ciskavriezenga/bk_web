// In-memory storage for demo purposes
let count = 0;

export async function GET() {
  return Response.json({ count });
}

export async function POST() {
  count += 1;
  console.log("Incremented count, current count is: ", count);
  return Response.json({ count });
}
