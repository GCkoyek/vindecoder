export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vin = searchParams.get("vin");

  if (!vin) {
    return Response.json({ error: "VIN is required" }, { status: 400 });
  }

  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinExtended/${vin}?format=json`;

  const res = await fetch(url);
  const data = await res.json();

  return Response.json(data);
}
