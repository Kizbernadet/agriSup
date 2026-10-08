/**
 * Informations officielles d'AGRI'SUP, reformulées pour le site à partir des documents
 * fournis par l'établissement (docs/ : DEPLIANT AGRISUP, HISTORIQUE, FILIERES AGRISUP,
 * CONDITIONS D'INSCRIPTION & FRAIS, AVANTAGES, EXPERTISES, PARTENARIATS et COOPERATION,
 * MOTS CLES). Affirmations invérifiables reformulées avec prudence (choix de la
 * cliente, 2026-10-08) : pas de taux d'insertion ni de classement.
 * La typographie française (espaces insécables) est appliquée dans ce fichier.
 */

type Localized = { fr: string; en: string };

export const RECOGNITION: Localized = {
  fr: "Établissement d'enseignement supérieur privé reconnu par l'État malien : décision de création n° 2026-000976/MESRS-SG du 1er juillet 2026.",
  en: "A private higher education institution recognised by the Malian State: establishment decision no. 2026-000976/MESRS-SG of 1 July 2026.",
};

// Devise du dépliant et devise inscrite sur le sceau.
export const MOTTO: Localized = {
  fr: "Une formation agricole axée sur la pratique, pour un avenir certain.",
  en: "Practice-based agricultural training for a secure future.",
};

export const SEAL_MOTTO: Localized = {
  fr: "Travail – Intégrité – Réussite",
  en: "Work – Integrity – Success",
};

export const MOTIVATION: Localized = {
  fr: "Notre ambition : offrir à la jeunesse de Bamako des formations supérieures agricoles innovantes, qui mènent à des métiers d'avenir et à un plein épanouissement professionnel. Nos parcours sont centrés sur les maillons prioritaires des chaînes de valeur agropastorales, là où le manque de personnel qualifié est aujourd'hui le plus critique.",
  en: "Our ambition: to offer young people in Bamako innovative higher education in agriculture, leading to future-proof careers and full professional fulfilment. Our programs focus on the priority links of agropastoral value chains, where the shortage of qualified staff is most critical today.",
};

export const HISTORY_INTRO: Localized = {
  fr: "Depuis 2006, l'histoire d'AGRI'SUP s'écrit au service de la formation agricole et pastorale. Née à Ségou, notre institution a constamment adapté ses programmes aux défis du développement rural au Mali, en gravissant trois niveaux de formation : secondaire, professionnel puis supérieur.",
  en: "Since 2006, AGRI'SUP's story has been one of service to agricultural and pastoral education. Founded in Ségou, our institution has constantly adapted its programs to the challenges of rural development in Mali, rising through three levels of education: secondary, vocational and higher education.",
};

export const HISTORY: { label: string; title: Localized; text: Localized }[] = [
  {
    label: "2006",
    title: { fr: "Ségou : l'ESAP", en: "Ségou: ESAP" },
    text: {
      fr: "Ouverture de l'École secondaire agropastorale (ESAP), sous la tutelle du ministère de l'Éducation nationale, qui prépare au brevet de technicien (BT).",
      en: "Opening of the agropastoral secondary school (ESAP), under the Ministry of National Education, preparing students for the technician certificate (BT).",
    },
  },
  {
    label: "2012",
    title: { fr: "Ségou : l'ESAP FP", en: "Ségou: ESAP FP" },
    text: {
      fr: "Création d'un centre de formation professionnelle agricole, sous la tutelle du ministère de l'Emploi et de la Formation professionnelle, pour la qualification, le perfectionnement et l'apprentissage.",
      en: "Creation of an agricultural vocational training centre, under the Ministry of Employment and Vocational Training, for qualifications, further training and apprenticeships.",
    },
  },
  {
    label: "2019",
    title: {
      fr: "Ségou : l'ESPAE (AGRI'SUP Ségou)",
      en: "Ségou: ESPAE (AGRI'SUP Ségou)",
    },
    text: {
      fr: "Ouverture de l'École supérieure privée d'agriculture et d'élevage, sous la tutelle du ministère de l'Enseignement supérieur et de la Recherche scientifique, pour former des cadres moyens et supérieurs.",
      en: "Opening of the private higher school of agriculture and livestock, under the Ministry of Higher Education and Scientific Research, to train mid-level and senior professionals.",
    },
  },
  {
    label: "2025",
    title: { fr: "Bamako : AGRI'SUP", en: "Bamako: AGRI'SUP" },
    text: {
      fr: "Création de l'École supérieure privée des sciences et technologies agricoles, AGRI'SUP Bamako, à Sotuba ACI.",
      en: "Creation of the private higher school of agricultural sciences and technologies, AGRI'SUP Bamako, in Sotuba ACI.",
    },
  },
  {
    label: "2026",
    title: { fr: "Reconnaissance et partenariats", en: "Recognition and partnerships" },
    text: {
      fr: "Convention de partenariat avec l'IPR/IFRA de Katibougou (10 février) et décision de création de l'établissement par le ministère de l'Enseignement supérieur (1er juillet).",
      en: "Partnership agreement with IPR/IFRA Katibougou (10 February) and establishment decision issued by the Ministry of Higher Education (1 July).",
    },
  },
];

export const VALUES: { title: Localized; text: Localized }[] = [
  {
    title: {
      fr: "Un pont entre tradition et avenir",
      en: "A bridge between tradition and the future",
    },
    text: {
      fr: "Ancrée dans son histoire et résolument tournée vers le futur, AGRI'SUP accompagne chaque étudiante et chaque étudiant vers la réussite dans les multiples filières du secteur agricole.",
      en: "Rooted in its history and firmly focused on the future, AGRI'SUP supports every student towards success across the many branches of the agricultural sector.",
    },
  },
  {
    title: { fr: "Excellence et leadership", en: "Excellence and leadership" },
    text: {
      fr: "Le leadership est au cœur de notre projet pédagogique, porté par le système LMD, un modèle d'enseignement supérieur de standard international.",
      en: "Leadership lies at the heart of our teaching project, supported by the LMD system, an internationally recognised higher education model.",
    },
  },
  {
    title: {
      fr: "Un cadre d'apprentissage stimulant",
      en: "An inspiring learning environment",
    },
    text: {
      fr: "Un environnement d'études stable, confortable et moderne, connecté et ouvert sur le monde.",
      en: "A stable, comfortable and modern study environment, connected and open to the world.",
    },
  },
  {
    title: {
      fr: "Une formation intégrale et citoyenne",
      en: "Well-rounded, civic-minded education",
    },
    text: {
      fr: "Au-delà des savoirs scientifiques et de l'initiation à la recherche, nous cultivons la culture générale, l'ouverture d'esprit, la fibre entrepreneuriale et l'engagement civique.",
      en: "Beyond scientific knowledge and an introduction to research, we foster general culture, open-mindedness, an entrepreneurial spirit and civic engagement.",
    },
  },
  {
    title: { fr: "Éthique, rigueur, intégrité", en: "Ethics, rigour, integrity" },
    text: {
      fr: "L'éthique, la rigueur et l'intégrité scientifique guident chacune de nos actions.",
      en: "Ethics, rigour and scientific integrity guide everything we do.",
    },
  },
];

// Parcours LMD proposés (dépliant et fiche des filières).
export const LMD_PATHS: { level: Localized; duration: Localized; goal: Localized }[] = [
  {
    level: { fr: "DUT", en: "Technology diploma (DUT)" },
    duration: { fr: "Bac + 2 ans", en: "Baccalaureate + 2 years" },
    goal: { fr: "Former des techniciens supérieurs", en: "Training senior technicians" },
  },
  {
    level: { fr: "Licence professionnelle", en: "Professional bachelor's degree" },
    duration: {
      fr: "Bac + 3 ans, ou DUT + 1 an",
      en: "Baccalaureate + 3 years, or DUT + 1 year",
    },
    goal: {
      fr: "Former des cadres de niveau licence",
      en: "Training bachelor-level professionals",
    },
  },
  {
    level: { fr: "Master professionnel", en: "Professional master's degree" },
    duration: {
      fr: "Bac + 5 ans, ou licence + 2 ans",
      en: "Baccalaureate + 5 years, or bachelor's + 2 years",
    },
    goal: {
      fr: "Former des ingénieurs de niveau master",
      en: "Training master-level engineers",
    },
  },
];

export const EXPERTISE: Localized[] = [
  {
    fr: "En 2015, l'équipe fondatrice a été lauréate de la bourse d'excellence du programme Borlaug du ministère de l'Agriculture des États-Unis, avec un stage professionnel en enseignement agricole supérieur à Purdue University (Indiana), une référence mondiale de la formation agricole.",
    en: "In 2015, the founding team won an excellence fellowship from the Borlaug program of the United States Department of Agriculture, with a professional placement in agricultural higher education at Purdue University (Indiana), a world leader in agricultural training.",
  },
  {
    fr: "Ce stage a permis de refondre nos programmes selon le système LMD, avec des curricula modernes conçus sous le mentorat du professeur Jerry Peters, de Purdue University. AGRI'SUP prolonge directement ce travail.",
    en: "This placement led us to redesign our curricula within the LMD system, with modern programs developed under the mentorship of Professor Jerry Peters of Purdue University. AGRI'SUP is a direct continuation of this work.",
  },
];

export const CAMPUS_FACTS: Localized[] = [
  {
    fr: "Une bibliothèque de 600 ouvrages scientifiques de référence, complétée par un accès numérique à plus de 15 000 documents.",
    en: "A library of 600 reference scientific books, complemented by digital access to more than 15,000 documents.",
  },
  {
    fr: "Électricité et Wi-Fi disponibles 24 h/24.",
    en: "Electricity and Wi-Fi available around the clock.",
  },
];

// Mots-clés du document « Mots clés à afficher », reformulés en arguments.
export const STRENGTHS: { title: Localized; text: Localized }[] = [
  {
    title: {
      fr: "Une formation pratique et entrepreneuriale",
      en: "Practical, entrepreneurial training",
    },
    text: {
      fr: "Des enseignements pensés pour les besoins réels de l'emploi et pour la création d'entreprise.",
      en: "Teaching designed around real job market needs and business creation.",
    },
  },
  {
    title: { fr: "Le système LMD", en: "The LMD system" },
    text: {
      fr: "Un modèle de standard international : semestres, crédits et diplômes reconnus.",
      en: "An international standard: semesters, credits and recognised degrees.",
    },
  },
  {
    title: { fr: "Des enseignants confirmés", en: "Experienced teachers" },
    text: {
      fr: "Une équipe pédagogique qualifiée, proche du terrain et des entreprises.",
      en: "A qualified teaching team, close to the field and to businesses.",
    },
  },
  {
    title: { fr: "Un campus moderne et connecté", en: "A modern, connected campus" },
    text: {
      fr: "Laboratoire, salle informatique, bibliothèque et Wi-Fi permanent.",
      en: "Laboratory, computer room, library and permanent Wi-Fi.",
    },
  },
];

// ---------- Admission ----------

export const ADMISSION_PROFILES: { title: Localized; text: Localized }[] = [
  {
    title: { fr: "Bachelier ou titulaire du BT", en: "Baccalaureate or BT holder" },
    text: {
      fr: "Avec le baccalauréat ou un diplôme équivalent, vous accédez au DUT (2 ans) ou à la licence professionnelle (3 ans). Les titulaires du brevet de technicien (BT, DEF + 4) sont admis au même titre que les bacheliers.",
      en: "With the baccalaureate or an equivalent qualification, you can enrol in a DUT (2 years) or a professional bachelor's degree (3 years). Holders of the technician certificate (BT, DEF + 4) are admitted on the same basis as baccalaureate holders.",
    },
  },
  {
    title: { fr: "Titulaire d'un DUT", en: "DUT holder" },
    text: {
      fr: "Avec un DUT (Bac + 2) ou un diplôme équivalent, vous pouvez obtenir la licence professionnelle en un an.",
      en: "With a DUT (baccalaureate + 2) or an equivalent qualification, you can complete the professional bachelor's degree in one year.",
    },
  },
  {
    title: { fr: "Titulaire d'une licence", en: "Bachelor's degree holder" },
    text: {
      fr: "Avec une licence professionnelle, vous pouvez poursuivre en master professionnel (2 ans), en agronomie ou en zootechnie.",
      en: "With a professional bachelor's degree, you can continue to a professional master's degree (2 years) in agronomy or animal science.",
    },
  },
];

export const ADMISSION_DOCUMENTS: Localized[] = [
  {
    fr: "Copie certifiée du baccalauréat ou du diplôme équivalent",
    en: "Certified copy of the baccalaureate or equivalent qualification",
  },
  {
    fr: "Copie du relevé de notes du baccalauréat ou du diplôme équivalent",
    en: "Copy of the baccalaureate or equivalent transcript",
  },
  { fr: "Copie de l'acte de naissance", en: "Copy of the birth certificate" },
  { fr: "Certificat de nationalité", en: "Certificate of nationality" },
  { fr: "Trois photos d'identité (format passeport)", en: "Three passport-size photos" },
  { fr: "Formulaire de demande d'inscription rempli", en: "Completed enrolment form" },
  {
    fr: "Copie du reçu de paiement des frais d'inscription",
    en: "Copy of the enrolment fee payment receipt",
  },
];

export type FeeRow = { label: Localized; amount: number; terms: Localized };

// Montants en FCFA par année académique (document « Conditions d'inscription & frais »).
export const FEES: { program: Localized; rows: FeeRow[] }[] = [
  {
    program: {
      fr: "DUT et licence professionnelle",
      en: "DUT and professional bachelor's degree",
    },
    rows: [
      {
        label: { fr: "Frais d'inscription", en: "Enrolment fee" },
        amount: 50_000,
        terms: { fr: "En une fois", en: "In full" },
      },
      {
        label: { fr: "Frais de dossier", en: "Application fee" },
        amount: 50_000,
        terms: { fr: "En une fois", en: "In full" },
      },
      {
        label: { fr: "Frais de formation", en: "Tuition fee" },
        amount: 450_000,
        terms: {
          fr: "En deux tranches : 250 000 à l'inscription, 200 000 à la fin du premier semestre",
          en: "In two instalments: 250,000 at enrolment, 200,000 at the end of the first semester",
        },
      },
    ],
  },
  {
    program: { fr: "Master professionnel", en: "Professional master's degree" },
    rows: [
      {
        label: { fr: "Frais d'inscription", en: "Enrolment fee" },
        amount: 50_000,
        terms: { fr: "En une fois", en: "In full" },
      },
      {
        label: { fr: "Frais de dossier", en: "Application fee" },
        amount: 50_000,
        terms: { fr: "En une fois", en: "In full" },
      },
      {
        label: { fr: "Frais de formation", en: "Tuition fee" },
        amount: 1_000_000,
        terms: {
          fr: "En deux tranches : 600 000 à l'inscription, 400 000 à la fin du premier semestre",
          en: "In two instalments: 600,000 at enrolment, 400,000 at the end of the first semester",
        },
      },
    ],
  },
];

export const FEES_NOTES: Localized[] = [
  {
    fr: "Les frais d'inscription sont remboursés en cas de non-admissibilité ; les frais de formation ne sont pas remboursables.",
    en: "Enrolment fees are refunded if you are not admitted; tuition fees are non-refundable.",
  },
  {
    fr: "Paiement par versement bancaire ou au comptant à l'économat d'AGRI'SUP Bamako.",
    en: "Payment by bank transfer or in cash at the AGRI'SUP Bamako bursar's office.",
  },
  {
    fr: "Montants indicatifs par année académique, susceptibles d'évoluer : confirmez-les auprès de l'établissement.",
    en: "Indicative amounts per academic year, subject to change: please confirm them with the school.",
  },
];

export const ADVANTAGES: { title: Localized; text: Localized }[] = [
  {
    title: { fr: "Un kit offert à l'inscription", en: "A starter kit at enrolment" },
    text: {
      fr: "Pour l'année d'inscription : une blouse de travail, une clé USB, un cahier grand format et des stylos.",
      en: "For the year of enrolment: a work coat, a USB stick, a large notebook and pens.",
    },
  },
  {
    title: { fr: "Des bourses de stage", en: "Internship grants" },
    text: {
      fr: "Dans certaines filières, des stages de fin de cycle peuvent déboucher sur un contrat de travail.",
      en: "In some programs, final internships can lead to an employment contract.",
    },
  },
  {
    title: { fr: "Des bourses d'excellence", en: "Excellence scholarships" },
    text: {
      fr: "Grâce à nos coopérations internationales, les meilleurs étudiants peuvent prétendre à des bourses pour poursuivre leurs études à l'étranger.",
      en: "Through our international partnerships, top students can apply for scholarships to continue their studies abroad.",
    },
  },
  {
    title: { fr: "Une forte employabilité", en: "Strong employability" },
    text: {
      fr: "Nos diplômés sont recherchés par les entreprises agricoles, et beaucoup choisissent de créer leur propre activité.",
      en: "Our graduates are sought after by agricultural businesses, and many choose to start their own venture.",
    },
  },
  {
    title: { fr: "Un appui au démarrage d'activité", en: "Support to start a business" },
    text: {
      fr: "Nos partenariats avec des ONG ouvrent l'accès à des financements de kits de démarrage, comme le projet IDDA (Insertion durable des diplômés du secteur agropastoral), financé par le Canada.",
      en: "Our partnerships with NGOs open access to start-up kit funding, such as the IDDA project (sustainable integration of agropastoral graduates), funded by Canada.",
    },
  },
];

// ---------- Partenariats ----------

export const PARTNERSHIPS: {
  national: { name: string; description: Localized }[];
  international: { name: string; description: Localized }[];
} = {
  national: [
    {
      name: "IPR/IFRA de Katibougou",
      description: {
        fr: "Institut polytechnique rural de formation et de recherche appliquée, référence nationale et sous-régionale de l'enseignement supérieur agricole. Convention signée le 10 février 2026.",
        en: "Rural polytechnic institute for training and applied research, a national and regional reference in agricultural higher education. Agreement signed on 10 February 2026.",
      },
    },
    {
      name: "IER — Institut d'économie rurale",
      description: {
        fr: "Référence malienne et sous-régionale de la recherche agricole.",
        en: "A Malian and regional reference in agricultural research.",
      },
    },
    {
      name: "CNIA",
      description: {
        fr: "Centre national d'insémination artificielle : coopération technique.",
        en: "National artificial insemination centre: technical cooperation.",
      },
    },
    {
      name: "Sahel Veto",
      description: {
        fr: "Établissement vétérinaire pharmaceutique d'import-export.",
        en: "Veterinary pharmaceutical import-export company.",
      },
    },
    {
      name: "Tambaroua Business Farming",
      description: {
        fr: "Ferme de Samaya (Bamako) : partenariat technique.",
        en: "Farm in Samaya (Bamako): technical partnership.",
      },
    },
    {
      name: "Ferme Sidibé",
      description: {
        fr: "Référence de la production maraîchère sous serre.",
        en: "A reference in greenhouse vegetable production.",
      },
    },
    {
      name: "Fermes Boya Sylla et Tierno Sidibé",
      description: {
        fr: "Exploitations partenaires pour les stages et les visites de terrain.",
        en: "Partner farms for internships and field visits.",
      },
    },
  ],
  international: [
    {
      name: "Purdue University (États-Unis)",
      description: {
        fr: "Université de référence mondiale en formation agricole (Indiana) : coopération.",
        en: "A world-leading agricultural university (Indiana): cooperation.",
      },
    },
    {
      name: "CARFS (Burkina Faso)",
      description: {
        fr: "Centre africain de recherche et de formation en synécoculture.",
        en: "African centre for research and training in synecoculture.",
      },
    },
    {
      name: "KISAMEN (Pays-Bas)",
      description: {
        fr: "Laboratoire de production de semences bovines.",
        en: "Bovine semen production laboratory.",
      },
    },
    {
      name: "KEPRO (Pays-Bas)",
      description: {
        fr: "Laboratoire pharmaceutique vétérinaire.",
        en: "Veterinary pharmaceutical laboratory.",
      },
    },
    {
      name: "LIHUA (Chine)",
      description: {
        fr: "Laboratoire pharmaceutique vétérinaire.",
        en: "Veterinary pharmaceutical laboratory.",
      },
    },
  ],
};
