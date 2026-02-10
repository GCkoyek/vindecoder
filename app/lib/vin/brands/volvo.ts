import { DecodeResult, ParsedVin } from "@/app/types/vin"

const YEAR_MAP: Record<string, number> = {
  X: 1999,
  Y: 2000,
  1: 2001,
  2: 2002,
  3: 2003,
  4: 2004,
  5: 2005,
  6: 2006,
  7: 2007,
  8: 2008,
  9: 2009,
  A: 2010,
  B: 2011,
  C: 2012,
  D: 2013,
  E: 2014,
  F: 2015,
  G: 2016,
  H: 2017,
  J: 2018,
  K: 2019,
  L: 2020,
  M: 2021,
  N: 2022,
  P: 2023,
  R: 2024,
}

export function decodeVolvo(vin: ParsedVin): DecodeResult {
  const year = YEAR_MAP[vin.yearCode] ?? null

  return {
    brand: 'Volvo',
    vin: vin.vin,
    year,
    model: decodeModel(vin.vds, year),
    engine: decodeEngine(vin.vds),
    plant: decodePlant(vin.plant),
    warning: 'Dekodowanie Volvo bez VIDA – dane przybliżone',
  }
}

function decodeModel(vds: string, year: number | null): string | null {
  // SUV / kombi
  if (vds.startsWith('BZ')) return 'XC60'
  if (vds.startsWith('DZ')) return 'XC90'
  if (vds.startsWith('SZ')) return 'V60'

  // Sedany
  if (vds.startsWith('AZ')) return 'S60'

  // Volvo S80
  if (vds.startsWith('TS')) {
    if (year && year <= 2006) return 'S80 Mk1 (P2)'
    return 'S80'
  }

  return null
}

function decodeEngine(vds: string): string | null {
  if (vds.includes('D')) return 'Diesel'
  if (vds.includes('T')) return 'Benzyna'
  return null
}

function decodePlant(code: string): string | null {
  const plants: Record<string, string> = {
    '1': 'Torslanda (SE)',
    '2': 'Ghent (BE)',
    '3': 'Chengdu (CN)',
    '4': 'Daqing (CN)',
  }
  return plants[code] ?? null
}
