export interface ParsedVin {
  vin: string
  wmi: string
  vds: string
  vis: string
  yearCode: string
  plant: string
}

export interface DecodeResult {
  brand: string
  vin: string
  year: number | null
  model: string | null
  engine: string | null
  plant: string | null
  warning?: string

  // nowo dodane
  engineCode?: string | null
  engineCapacity?: string | null
}
