import { describe, expect, it } from "vitest";
import { academicYearOptions } from "@/lib/academic_year";
import { pickTranslation } from "@/lib/data/translations";
import { getClientIp } from "@/lib/client_ip";
import {
  actualitesQuerySchema,
  formationsQuerySchema,
  slugSchema,
} from "@/lib/validation/api_queries";
import { buildWhatsappLink } from "@/lib/whatsapp_link";

describe("années académiques proposées", () => {
  it("en octobre : année qui commence et suivante", () => {
    expect(academicYearOptions(new Date(2026, 9, 4))).toEqual(["2026-2027", "2027-2028"]);
  });

  it("en mars : année en cours et suivante", () => {
    expect(academicYearOptions(new Date(2027, 2, 1))).toEqual(["2026-2027", "2027-2028"]);
  });

  it("bascule en juillet", () => {
    expect(academicYearOptions(new Date(2027, 5, 30))[0]).toBe("2026-2027");
    expect(academicYearOptions(new Date(2027, 6, 1))[0]).toBe("2027-2028");
  });
});

describe("lien WhatsApp", () => {
  it("ne garde que les chiffres du numéro et encode le message", () => {
    expect(buildWhatsappLink("+223 66 72 43 89", "Bonjour AGRI'SUP & co")).toBe(
      "https://wa.me/22366724389?text=Bonjour+AGRI%27SUP+%26+co",
    );
  });

  it("fonctionne sans message", () => {
    expect(buildWhatsappLink("34613521722")).toBe("https://wa.me/34613521722");
  });
});

describe("traductions de secours", () => {
  const translations = [
    { locale: "fr" as const, name: "Agronomie" },
    { locale: "en" as const, name: "Agronomy" },
  ];

  it("renvoie la langue demandée", () => {
    expect(pickTranslation(translations, "en")?.name).toBe("Agronomy");
  });

  it("se replie sur le français si la traduction manque", () => {
    expect(pickTranslation([translations[0]], "en")?.name).toBe("Agronomie");
  });
});

describe("paramètres des API publiques", () => {
  it("applique les valeurs par défaut", () => {
    expect(formationsQuerySchema.parse({})).toEqual({ locale: "fr" });
    expect(actualitesQuerySchema.parse({})).toEqual({ locale: "fr", page: 1 });
  });

  it("refuse les valeurs inconnues", () => {
    expect(formationsQuerySchema.safeParse({ level: "MASTER" }).success).toBe(false);
    expect(actualitesQuerySchema.safeParse({ page: "0" }).success).toBe(false);
  });

  it.each(["licence-pro-agronomie", "dut-agroforesterie"])("slug valide : %s", (slug) => {
    expect(slugSchema.safeParse(slug).success).toBe(true);
  });

  it.each(["Licence-Pro", "../etc", "a--b", "-debut", "fin-", ""])(
    "slug refusé : %s",
    (slug) => {
      expect(slugSchema.safeParse(slug).success).toBe(false);
    },
  );
});

describe("adresse IP du visiteur", () => {
  it("prend la première IP de x-forwarded-for", () => {
    const headers = new Headers({ "x-forwarded-for": "41.73.1.2, 10.0.0.1" });
    expect(getClientIp(headers)).toBe("41.73.1.2");
  });

  it("utilise une valeur de repli sans en-tête", () => {
    expect(getClientIp(new Headers())).toBe("unknown");
  });
});
