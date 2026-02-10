import { ParsedVin, DecodeResult } from "@/app/types/vin"

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
}

export function decodeVolkswagen(vin: ParsedVin): DecodeResult {
  const year = YEAR_MAP[vin.yearCode] ?? null
  const model = decodeVWModel(vin.vds)
  const engine = decodeVWEngine(vin.vds, year)

  return {
    brand: 'Volkswagen',
    vin: vin.vin,
    year,
    model,
    engine: engine?.type ?? null,
    engineCode: engine?.code ?? null,
    engineCapacity: engine?.capacity ?? null,
    plant: decodeVWPlant(vin.plant),
    warning:
      'Silnik określony heurystycznie na podstawie VIN – 100% pewności daje tylko PR-code lub etykieta',
  }
}

/* ================= MODEL ================= */

function decodeVWModel(vds: string): string | null {
  if (vds.startsWith('ZZZ1K')) return 'Golf V'
  if (vds.startsWith('ZZZ5K')) return 'Golf VI'
  if (vds.startsWith('ZZZAU')) return 'Golf VII'
  return null
}

/* ================= SILNIK ================= */

function decodeVWEngine(
  vds: string,
  year: number | null
): { type: string; capacity: string; code: string } | null {

  /* ================= GOLF V ================= */
  if (vds.startsWith('ZZZ1K')) {

    // 1.4 TSI (2006–2009)
    if (year && year >= 2006) {
      return {
        type: 'Benzyna TSI',
        capacity: '1.4L',
        code: 'CAXA / CAVD',
      }
    }

    // 1.6 FSI (2004–2008)
    if (year && year <= 2008) {
      return {
        type: 'Benzyna FSI',
        capacity: '1.6L',
        code: 'BLF / BLP',
      }
    }

    // GTI – tylko jako fallback
    return {
      type: 'Benzyna FSI (GTI)',
      capacity: '2.0L',
      code: 'AXX / BPY',
    }
  }

  /* ================= GOLF VI ================= */
  if (vds.startsWith('ZZZ5K')) {

    if (year && year >= 2009) {
      return {
        type: 'Benzyna TSI',
        capacity: '1.4L',
        code: 'CAXA / CTHD',
      }
    }

    return {
      type: 'Diesel TDI',
      capacity: '2.0L',
      code: 'CBAA / CBAB',
    }
  }

  return null
}


/* ================= FABRYKA ================= */

function decodeVWPlant(code: string): string | null {
  const plants: Record<string, string> = {
    W: 'Wolfsburg',
    E: 'Emden',
    M: 'Puebla (Mexico)',
    P: 'Mosel',
    K: 'Osnabrück',
  }

  return plants[code] ?? null
}
