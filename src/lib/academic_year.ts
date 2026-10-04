// Mois (0 = janvier) à partir duquel on propose l'année académique qui commence.
// Hypothèse : rentrée à l'automne, préinscriptions dès juillet. À confirmer avec AGRI'SUP.
const PREINSCRIPTION_OPENING_MONTH = 6;

// Années proposées à la préinscription : l'année en cours (ou qui commence) et la suivante.
// Ex. en octobre 2026 : « 2026-2027 » et « 2027-2028 ».
export function academicYearOptions(now: Date = new Date()): string[] {
  const start =
    now.getMonth() >= PREINSCRIPTION_OPENING_MONTH
      ? now.getFullYear()
      : now.getFullYear() - 1;
  return [start, start + 1].map((year) => `${year}-${year + 1}`);
}
