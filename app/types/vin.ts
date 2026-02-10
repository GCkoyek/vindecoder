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
  model: string | null
  year: number | null
  engine: string | null
  plant: string | null
  vin: string
  warning?: string
}
