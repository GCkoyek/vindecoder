import { NextRequest, NextResponse } from 'next/server'
import { decodeVin } from '@/app/lib/vin/decoder'

export async function POST(req: NextRequest) {
  try {
    const { vin } = await req.json()
    const result = decodeVin(vin)
    return NextResponse.json(result)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
