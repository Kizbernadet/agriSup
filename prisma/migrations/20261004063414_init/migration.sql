-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('fr', 'en');

-- CreateEnum
CREATE TYPE "FormationLevel" AS ENUM ('DUT', 'LICENCE_PRO');

-- CreateEnum
CREATE TYPE "FormationDomain" AS ENUM ('PRODUCTION_VEGETALE', 'ELEVAGE_SANTE_ANIMALE', 'AQUACULTURE', 'AGRIBUSINESS', 'AGROFORESTERIE');

-- CreateEnum
CREATE TYPE "ActualiteCategory" AS ENUM ('RENTREE', 'ADMISSIONS', 'EVENEMENT', 'CONFERENCE', 'ACTIVITE_PRATIQUE', 'CEREMONIE', 'PARTENARIAT', 'RESULTATS', 'ANNONCE');

-- CreateEnum
CREATE TYPE "PreinscriptionStatus" AS ENUM ('NEW', 'CONTACTED', 'PROCESSING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ContactMessageStatus" AS ENUM ('UNREAD', 'READ', 'ANSWERED');

-- CreateTable
CREATE TABLE "formations" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "level" "FormationLevel" NOT NULL,
    "domain" "FormationDomain" NOT NULL,
    "duration_semesters" INTEGER,
    "credits" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "formations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "formation_translations" (
    "id" TEXT NOT NULL,
    "formation_id" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT,
    "program" TEXT,
    "objectives" TEXT[],
    "skills" TEXT[],
    "career_opportunities" TEXT[],
    "admission_requirements" TEXT[],
    "required_documents" TEXT[],

    CONSTRAINT "formation_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actualites" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "ActualiteCategory" NOT NULL,
    "image_path" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "published_at" TIMESTAMP(3),
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "actualites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actualite_translations" (
    "id" TEXT NOT NULL,
    "actualite_id" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "actualite_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preinscriptions" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "city" TEXT NOT NULL,
    "education_level" TEXT NOT NULL,
    "formation_id" TEXT NOT NULL,
    "academic_year" TEXT NOT NULL,
    "message" TEXT,
    "locale" "Locale" NOT NULL,
    "status" "PreinscriptionStatus" NOT NULL DEFAULT 'NEW',
    "consent_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "preinscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_messages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "status" "ContactMessageStatus" NOT NULL DEFAULT 'UNREAD',
    "consent_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rate_limits" (
    "key" TEXT NOT NULL,
    "window_start" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "rate_limits_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "formations_slug_key" ON "formations"("slug");

-- CreateIndex
CREATE INDEX "formations_published_sort_order_idx" ON "formations"("published", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "formation_translations_formation_id_locale_key" ON "formation_translations"("formation_id", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "actualites_slug_key" ON "actualites"("slug");

-- CreateIndex
CREATE INDEX "actualites_published_published_at_idx" ON "actualites"("published", "published_at");

-- CreateIndex
CREATE UNIQUE INDEX "actualite_translations_actualite_id_locale_key" ON "actualite_translations"("actualite_id", "locale");

-- CreateIndex
CREATE INDEX "preinscriptions_status_created_at_idx" ON "preinscriptions"("status", "created_at");

-- CreateIndex
CREATE INDEX "contact_messages_status_created_at_idx" ON "contact_messages"("status", "created_at");

-- AddForeignKey
ALTER TABLE "formation_translations" ADD CONSTRAINT "formation_translations_formation_id_fkey" FOREIGN KEY ("formation_id") REFERENCES "formations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actualite_translations" ADD CONSTRAINT "actualite_translations_actualite_id_fkey" FOREIGN KEY ("actualite_id") REFERENCES "actualites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preinscriptions" ADD CONSTRAINT "preinscriptions_formation_id_fkey" FOREIGN KEY ("formation_id") REFERENCES "formations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
