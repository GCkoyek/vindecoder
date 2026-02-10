import { ParsedVin } from "@/app/types/vin"

export function parseVin(vin: string): ParsedVin {
  const uVin = vin.toUpperCase() // 🔹 ważne!

  return {
    vin: uVin,
    wmi: uVin.slice(0, 3),       // pierwsze 3 znaki → WMI
    vds: uVin.slice(3, 9),       // 4–9 znak → VDS
    vis: uVin.slice(9, 17),      // 10–17 znak → VIS
    yearCode: uVin[9],           // 10 znak → rok
    plant: uVin[10],             // 11 znak → fabryka
  }
}
