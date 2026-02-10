import { decodeVin } from '@/app/lib/vin/decoder'
import { isValidVin } from '@/app/lib/vin/validator'

export async function POST(req: Request) {
  const { vin } = await req.json()

  if (!vin || !isValidVin(vin)) {
    return Response.json({ error: 'Nieprawidłowy VIN' }, { status: 400 })
  }

  const result = decodeVin(vin.toUpperCase())
  return Response.json(result)
}
