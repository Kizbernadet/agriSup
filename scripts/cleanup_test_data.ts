/**
 * Supprime les envois créés par les tests automatisés (préfixe « TEST-AUTO ») et
 * remet à zéro les compteurs de limitation de débit.
 * Usage : npm run test:cleanup (appelé automatiquement à la fin de `npm run test:e2e`).
 */
import { loadEnvConfig } from "@next/env";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

loadEnvConfig(process.cwd());

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  const messages = await db.contactMessage.deleteMany({
    where: { name: { startsWith: "TEST-AUTO" } },
  });
  const preinscriptions = await db.preinscription.deleteMany({
    where: { firstName: { startsWith: "TEST-AUTO" } },
  });
  const counters = await db.rateLimit.deleteMany({});
  console.log(
    `Nettoyage : ${messages.count} messages, ${preinscriptions.count} préinscriptions, ${counters.count} compteurs.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
