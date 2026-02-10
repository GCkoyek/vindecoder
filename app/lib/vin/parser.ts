import { ParsedVin } from '@/app/types/vin'

export function parseVin(vin: string): ParsedVin {
  return {
    vin,
    wmi: vin.slice(0, 3),
    vds: vin.slice(3, 9),
    vis: vin.slice(9, 17),
    yearCode: vin[9],
    plant: vin[10],
  }
}
