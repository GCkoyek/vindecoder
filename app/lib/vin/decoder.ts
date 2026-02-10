import { parseVin } from './parser'
import { decodeVolvo } from './brands'
import { DecodeResult } from '@/app/types/vin'

export function decodeVin(vin: string): DecodeResult {
  const parsed = parseVin(vin)

  switch (parsed.wmi) {
    case 'YV1':
    case 'YV4':
    case '4V1':
    case '4V3':
      return decodeVolvo(parsed)

    default:
      return {
        brand: 'Unknown',
        vin,
        model: null,
        year: null,
        engine: null,
        plant: null,
        warning: 'Nieobsługiwana marka',
      }
  }
}
