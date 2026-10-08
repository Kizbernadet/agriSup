/**
 * Contenu des fiches formations (seed).
 *
 * Intitulés et niveaux : fiche « Filières AGRI'SUP » (docs/FILIERES AGRISUP.docx, 2026-10),
 * qui remplace le kakémono. Durées : cadre LMD (licence professionnelle : 6 semestres,
 * 180 crédits ; master : 4 semestres, 120 crédits ; DUT : 4 semestres, 120 crédits). Présentations, objectifs, compétences, programmes indicatifs et
 * débouchés : textes RÉDIGÉS pour le site (non fournis par AGRI'SUP), validés pour la
 * démonstration par la cliente le 2026-10-07 ; à relire par l'équipe pédagogique.
 * La typographie française (espaces insécables) est appliquée au moment du seed.
 */

export type FormationText = {
  summary: string;
  description: string;
  objectives: string[];
  skills: string[];
  program: string;
  careers: string[];
};

export const FORMATION_CONTENT: Record<string, { fr: FormationText; en: FormationText }> =
  {
    "licence-pro-agronomie": {
      fr: {
        summary:
          "Une licence professionnelle pour maîtriser la production végétale, de la gestion des sols à la protection des cultures.",
        description:
          "La licence professionnelle en agronomie forme des techniciens supérieurs capables de conduire et d'améliorer la production végétale. Les étudiants étudient le fonctionnement des sols, la physiologie des plantes, les itinéraires techniques des grandes cultures et la protection des cultures.\n\nLa formation alterne cours, travaux pratiques en laboratoire et activités au champ d'expérimentation, afin de préparer les diplômés aux réalités des exploitations agricoles maliennes.",
        objectives: [
          "Comprendre le fonctionnement des sols, des plantes et des agroécosystèmes.",
          "Concevoir et conduire des itinéraires techniques adaptés aux cultures et au climat.",
          "Protéger les cultures contre les ravageurs et les maladies de manière raisonnée.",
          "Accompagner les producteurs dans l'amélioration de leurs rendements.",
        ],
        skills: [
          "Diagnostiquer la fertilité d'un sol et proposer une fertilisation adaptée.",
          "Planifier un calendrier cultural et gérer l'irrigation.",
          "Identifier les principaux ravageurs et maladies des cultures.",
          "Réaliser des essais au champ et en analyser les résultats.",
          "Conseiller et former des producteurs.",
        ],
        program:
          "Première année (S1-S2) : biologie végétale, chimie, sciences du sol, mathématiques et statistiques appliquées, informatique, techniques d'expression.\n\nDeuxième année (S3-S4) : agronomie générale, physiologie végétale, fertilisation, irrigation, phytopathologie et entomologie, machinisme agricole.\n\nTroisième année (S5-S6) : systèmes de culture, amélioration des plantes, agroécologie, vulgarisation agricole, gestion de projet, stage professionnel et mémoire de fin d'études.",
        careers: [
          "Technicien supérieur en production végétale",
          "Conseiller agricole",
          "Chef de culture ou responsable d'exploitation",
          "Technicien d'expérimentation agronomique",
          "Agent de projets de développement rural",
        ],
      },
      en: {
        summary:
          "A professional bachelor's degree to master crop production, from soil management to crop protection.",
        description:
          "The professional bachelor's degree in agronomy trains senior technicians who can run and improve crop production. Students learn how soils work, plant physiology, crop management practices for major crops and crop protection.\n\nThe program combines lectures, laboratory work and activities in the experimental field, preparing graduates for the realities of Malian farms.",
        objectives: [
          "Understand how soils, plants and agroecosystems work.",
          "Design and implement crop management practices suited to each crop and climate.",
          "Protect crops against pests and diseases in a sustainable way.",
          "Support farmers in improving their yields.",
        ],
        skills: [
          "Assess soil fertility and recommend suitable fertilisation.",
          "Plan a cropping calendar and manage irrigation.",
          "Identify the main crop pests and diseases.",
          "Run field trials and analyse their results.",
          "Advise and train farmers.",
        ],
        program:
          "First year (S1-S2): plant biology, chemistry, soil science, applied mathematics and statistics, computing, communication skills.\n\nSecond year (S3-S4): general agronomy, plant physiology, fertilisation, irrigation, plant pathology and entomology, farm machinery.\n\nThird year (S5-S6): cropping systems, plant breeding, agroecology, agricultural extension, project management, professional internship and final dissertation.",
        careers: [
          "Senior crop production technician",
          "Agricultural advisor",
          "Crop manager or farm manager",
          "Agronomic trials technician",
          "Rural development project officer",
        ],
      },
    },

    "licence-pro-agribusiness": {
      fr: {
        summary:
          "Une licence professionnelle pour gérer, financer et commercialiser les produits des filières agricoles.",
        description:
          "La licence professionnelle en agribusiness prépare aux métiers de la gestion et du commerce dans les filières agricoles. Elle associe une solide culture agricole à des compétences en économie, en marketing, en comptabilité et en entrepreneuriat.\n\nLes étudiants apprennent à analyser une chaîne de valeur, à monter un plan d'affaires et à piloter une activité de collecte, de transformation ou de distribution de produits agricoles.",
        objectives: [
          "Comprendre l'organisation et le fonctionnement des filières agricoles.",
          "Gérer une entreprise ou une coopérative agricole.",
          "Commercialiser des produits agricoles et agroalimentaires.",
          "Monter et financer un projet agricole.",
        ],
        skills: [
          "Élaborer un plan d'affaires et un budget prévisionnel.",
          "Tenir une comptabilité et analyser la rentabilité d'une activité.",
          "Réaliser une étude de marché et définir une stratégie commerciale.",
          "Gérer les achats, les stocks et la logistique.",
          "Négocier avec les fournisseurs, les clients et les partenaires financiers.",
        ],
        program:
          "Première année (S1-S2) : économie générale, introduction aux productions agricoles, mathématiques financières, comptabilité, informatique, techniques d'expression.\n\nDeuxième année (S3-S4) : économie des filières, marketing agricole, gestion de la production, droit des affaires, statistiques, transformation agroalimentaire.\n\nTroisième année (S5-S6) : entrepreneuriat, montage et financement de projets, gestion des coopératives, commerce et logistique, stage professionnel et mémoire de fin d'études.",
        careers: [
          "Gestionnaire d'entreprise ou de coopérative agricole",
          "Chargé de commercialisation de produits agricoles",
          "Agent de crédit agricole",
          "Entrepreneur dans la transformation ou la distribution",
          "Chargé de projets de filière",
        ],
      },
      en: {
        summary:
          "A professional bachelor's degree to manage, finance and market products from agricultural value chains.",
        description:
          "The professional bachelor's degree in agribusiness prepares students for management and trade careers in agricultural value chains. It combines a solid grounding in agriculture with skills in economics, marketing, accounting and entrepreneurship.\n\nStudents learn to analyse a value chain, build a business plan and run a business that collects, processes or distributes agricultural products.",
        objectives: [
          "Understand how agricultural value chains are organised.",
          "Manage an agricultural business or cooperative.",
          "Market agricultural and food products.",
          "Design and finance an agricultural project.",
        ],
        skills: [
          "Draw up a business plan and a forecast budget.",
          "Keep accounts and analyse the profitability of an activity.",
          "Carry out market research and define a sales strategy.",
          "Manage purchasing, stock and logistics.",
          "Negotiate with suppliers, customers and financial partners.",
        ],
        program:
          "First year (S1-S2): general economics, introduction to agricultural production, financial mathematics, accounting, computing, communication skills.\n\nSecond year (S3-S4): value chain economics, agricultural marketing, production management, business law, statistics, food processing.\n\nThird year (S5-S6): entrepreneurship, project design and financing, cooperative management, trade and logistics, professional internship and final dissertation.",
        careers: [
          "Agricultural business or cooperative manager",
          "Agricultural product sales officer",
          "Agricultural loan officer",
          "Entrepreneur in processing or distribution",
          "Value chain project officer",
        ],
      },
    },

    "licence-pro-zootechnie": {
      fr: {
        summary:
          "Une licence professionnelle pour conduire des élevages performants : alimentation, reproduction et santé des animaux.",
        description:
          "La licence professionnelle en zootechnie forme des spécialistes des productions animales. Les étudiants étudient l'anatomie et la physiologie des animaux d'élevage, leur alimentation, leur reproduction et l'amélioration génétique des troupeaux.\n\nLes enseignements s'appuient sur des travaux pratiques et des visites d'élevages bovins, ovins, caprins et avicoles, pour relier les connaissances scientifiques à la conduite quotidienne d'une exploitation.",
        objectives: [
          "Maîtriser les bases biologiques des productions animales.",
          "Concevoir des rations alimentaires adaptées aux espèces et aux objectifs de production.",
          "Organiser la reproduction et l'amélioration génétique d'un troupeau.",
          "Gérer techniquement et économiquement une exploitation d'élevage.",
        ],
        skills: [
          "Formuler une ration à partir des ressources disponibles.",
          "Suivre les performances de croissance, de production laitière ou de ponte.",
          "Mettre en place un plan de prophylaxie avec les services vétérinaires.",
          "Concevoir des bâtiments et des équipements d'élevage adaptés.",
          "Conseiller les éleveurs.",
        ],
        program:
          "Première année (S1-S2) : biologie animale, anatomie et physiologie, chimie, biochimie, statistiques, informatique, techniques d'expression.\n\nDeuxième année (S3-S4) : alimentation et nutrition animales, reproduction, génétique, hygiène et santé animale, cultures fourragères.\n\nTroisième année (S5-S6) : productions bovine, ovine, caprine et avicole, gestion d'exploitation, vulgarisation, stage professionnel et mémoire de fin d'études.",
        careers: [
          "Technicien supérieur d'élevage",
          "Responsable d'élevage ou de ferme avicole",
          "Conseiller en productions animales",
          "Technicien en alimentation animale",
          "Agent de projets d'élevage",
        ],
      },
      en: {
        summary:
          "A professional bachelor's degree to run high-performing livestock farms: animal feeding, breeding and health.",
        description:
          "The professional bachelor's degree in animal science trains specialists in animal production. Students study the anatomy and physiology of farm animals, their nutrition, their reproduction and herd genetic improvement.\n\nTeaching is built on practical work and visits to cattle, sheep, goat and poultry farms, linking scientific knowledge to the day-to-day running of a farm.",
        objectives: [
          "Master the biological foundations of animal production.",
          "Design feed rations suited to each species and production goal.",
          "Organise herd reproduction and genetic improvement.",
          "Manage a livestock farm technically and financially.",
        ],
        skills: [
          "Formulate a ration from locally available resources.",
          "Monitor growth, milk or egg production performance.",
          "Set up a disease prevention plan with veterinary services.",
          "Design suitable livestock buildings and equipment.",
          "Advise livestock farmers.",
        ],
        program:
          "First year (S1-S2): animal biology, anatomy and physiology, chemistry, biochemistry, statistics, computing, communication skills.\n\nSecond year (S3-S4): animal feeding and nutrition, reproduction, genetics, animal hygiene and health, forage crops.\n\nThird year (S5-S6): cattle, sheep, goat and poultry production, farm management, extension, professional internship and final dissertation.",
        careers: [
          "Senior livestock technician",
          "Livestock or poultry farm manager",
          "Animal production advisor",
          "Animal feed technician",
          "Livestock project officer",
        ],
      },
    },

    "licence-pro-medecine-veterinaire": {
      fr: {
        summary:
          "Une licence professionnelle centrée sur la santé animale : prévention, diagnostic de laboratoire et appui aux soins des animaux d'élevage.",
        description:
          "Cette licence professionnelle prépare aux métiers techniques de la santé animale. Les étudiants acquièrent des bases solides en anatomie, physiologie, microbiologie, parasitologie et pharmacologie, ainsi que dans la prévention des maladies des animaux d'élevage.\n\nLes travaux pratiques en laboratoire et les stages auprès de structures vétérinaires leur apprennent à participer au diagnostic, aux campagnes de vaccination et au suivi sanitaire des troupeaux, sous l'autorité d'un vétérinaire.",
        objectives: [
          "Connaître l'organisme animal sain et les principales pathologies des animaux d'élevage.",
          "Participer à la prévention et au contrôle des maladies animales.",
          "Réaliser des examens de laboratoire courants.",
          "Contribuer à l'hygiène et à la sécurité sanitaire des denrées d'origine animale.",
        ],
        skills: [
          "Examiner un animal et repérer les signes de maladie.",
          "Réaliser des prélèvements et des analyses de laboratoire simples.",
          "Organiser une campagne de vaccination ou de déparasitage.",
          "Appliquer les règles d'hygiène et de biosécurité en élevage.",
          "Utiliser les médicaments vétérinaires de manière responsable.",
        ],
        program:
          "Première année (S1-S2) : biologie, anatomie et physiologie animales, chimie, biochimie, statistiques, informatique.\n\nDeuxième année (S3-S4) : microbiologie, parasitologie, immunologie, pharmacologie, sémiologie, alimentation animale.\n\nTroisième année (S5-S6) : pathologies des animaux d'élevage, épidémiologie, hygiène des denrées alimentaires, santé publique vétérinaire, législation, stage professionnel et mémoire de fin d'études.",
        careers: [
          "Technicien supérieur en santé animale",
          "Agent de laboratoire d'analyses vétérinaires",
          "Agent de campagnes de vaccination",
          "Agent d'hygiène des denrées alimentaires d'origine animale",
          "Délégué en produits vétérinaires",
        ],
      },
      en: {
        summary:
          "A professional bachelor's degree focused on animal health: prevention, laboratory diagnosis and support for the care of farm animals.",
        description:
          "This professional bachelor's degree prepares students for technical careers in animal health. They build solid foundations in anatomy, physiology, microbiology, parasitology and pharmacology, as well as in preventing diseases in farm animals.\n\nLaboratory work and internships with veterinary services teach them to take part in diagnosis, vaccination campaigns and herd health monitoring, under the authority of a veterinarian.",
        objectives: [
          "Understand the healthy animal body and the main diseases of farm animals.",
          "Take part in preventing and controlling animal diseases.",
          "Carry out routine laboratory tests.",
          "Contribute to the hygiene and safety of food of animal origin.",
        ],
        skills: [
          "Examine an animal and recognise signs of disease.",
          "Take samples and carry out simple laboratory analyses.",
          "Organise a vaccination or deworming campaign.",
          "Apply hygiene and biosecurity rules on farms.",
          "Use veterinary medicines responsibly.",
        ],
        program:
          "First year (S1-S2): biology, animal anatomy and physiology, chemistry, biochemistry, statistics, computing.\n\nSecond year (S3-S4): microbiology, parasitology, immunology, pharmacology, clinical signs, animal nutrition.\n\nThird year (S5-S6): farm animal diseases, epidemiology, food hygiene, veterinary public health, legislation, professional internship and final dissertation.",
        careers: [
          "Senior animal health technician",
          "Veterinary laboratory technician",
          "Vaccination campaign officer",
          "Food hygiene officer for products of animal origin",
          "Veterinary products representative",
        ],
      },
    },

    "licence-pro-aquaculture": {
      fr: {
        summary:
          "Une licence professionnelle pour produire du poisson de façon durable, de l'écloserie à la commercialisation.",
        description:
          "La licence professionnelle en aquaculture forme des spécialistes de l'élevage de poissons et de la gestion des milieux aquatiques. Les étudiants étudient la biologie des espèces élevées, la qualité de l'eau, l'alimentation, la reproduction et la santé des poissons.\n\nLa formation prépare à concevoir et à gérer une ferme piscicole, en bassins, en étangs ou en cages, alors que la pisciculture représente un enjeu croissant pour la sécurité alimentaire.",
        objectives: [
          "Comprendre la biologie des poissons et le fonctionnement des milieux aquatiques.",
          "Concevoir et gérer des infrastructures piscicoles.",
          "Maîtriser la reproduction, l'alimentation et la santé des poissons.",
          "Valoriser et commercialiser les produits aquacoles.",
        ],
        skills: [
          "Contrôler et corriger la qualité de l'eau.",
          "Conduire une reproduction artificielle et gérer une écloserie.",
          "Calculer et distribuer les rations alimentaires.",
          "Prévenir et traiter les principales maladies des poissons.",
          "Établir le compte d'exploitation d'une ferme piscicole.",
        ],
        program:
          "Première année (S1-S2) : biologie animale, hydrobiologie, chimie de l'eau, mathématiques et statistiques, informatique, techniques d'expression.\n\nDeuxième année (S3-S4) : biologie des poissons, qualité de l'eau, alimentation et nutrition, reproduction artificielle, aménagements piscicoles.\n\nTroisième année (S5-S6) : pathologie des poissons, gestion d'écloserie, transformation et commercialisation, gestion d'exploitation, stage professionnel et mémoire de fin d'études.",
        careers: [
          "Pisciculteur ou gestionnaire de ferme aquacole",
          "Technicien d'écloserie",
          "Conseiller en aquaculture",
          "Agent de projets de pêche et de pisciculture",
          "Technicien en transformation des produits halieutiques",
        ],
      },
      en: {
        summary:
          "A professional bachelor's degree to farm fish sustainably, from hatchery to market.",
        description:
          "The professional bachelor's degree in aquaculture trains specialists in fish farming and aquatic environment management. Students study the biology of farmed species, water quality, fish feeding, reproduction and health.\n\nThe program prepares students to design and manage a fish farm in tanks, ponds or cages, as fish farming becomes an increasingly important issue for food security.",
        objectives: [
          "Understand fish biology and how aquatic environments work.",
          "Design and manage fish farming facilities.",
          "Master fish reproduction, feeding and health.",
          "Add value to and market aquaculture products.",
        ],
        skills: [
          "Monitor and correct water quality.",
          "Carry out artificial reproduction and manage a hatchery.",
          "Calculate and distribute feed rations.",
          "Prevent and treat the main fish diseases.",
          "Draw up the operating accounts of a fish farm.",
        ],
        program:
          "First year (S1-S2): animal biology, hydrobiology, water chemistry, mathematics and statistics, computing, communication skills.\n\nSecond year (S3-S4): fish biology, water quality, feeding and nutrition, artificial reproduction, fish farm design.\n\nThird year (S5-S6): fish diseases, hatchery management, processing and marketing, farm management, professional internship and final dissertation.",
        careers: [
          "Fish farmer or aquaculture farm manager",
          "Hatchery technician",
          "Aquaculture advisor",
          "Fisheries and fish farming project officer",
          "Fish processing technician",
        ],
      },
    },

    "licence-pro-foresterie": {
      fr: {
        summary:
          "Une licence professionnelle pour gérer durablement les forêts, les plantations et les ressources naturelles.",
        description:
          "La licence professionnelle en foresterie forme des cadres capables d'inventorier, d'aménager et de valoriser les espaces boisés. Les étudiants étudient la botanique, l'écologie forestière, la sylviculture, la production de plants et la gestion des ressources naturelles.\n\nFace à la déforestation et à la désertification, la formation prépare à conduire des projets de reboisement, de gestion communautaire des forêts et d'agroforesterie, en lien avec les populations rurales.",
        objectives: [
          "Comprendre le fonctionnement des écosystèmes forestiers et des savanes arborées.",
          "Inventorier et aménager durablement un espace boisé.",
          "Conduire des projets de reboisement et de restauration des terres.",
          "Valoriser les produits forestiers ligneux et non ligneux.",
        ],
        skills: [
          "Réaliser un inventaire forestier et en exploiter les données.",
          "Produire des plants en pépinière et planifier une plantation.",
          "Élaborer un plan simple d'aménagement forestier.",
          "Mettre en œuvre des techniques de lutte contre l'érosion et la désertification.",
          "Animer des comités de gestion des ressources naturelles.",
        ],
        program:
          "Première année (S1-S2) : biologie végétale, botanique, écologie, sciences du sol, statistiques, informatique.\n\nDeuxième année (S3-S4) : dendrologie, sylviculture, techniques de pépinière, inventaire forestier, cartographie et SIG.\n\nTroisième année (S5-S6) : aménagement forestier, agroforesterie, produits forestiers non ligneux, changement climatique, gestion de projet, stage professionnel et mémoire de fin d'études.",
        careers: [
          "Technicien supérieur des eaux et forêts",
          "Gestionnaire de pépinière ou de plantation",
          "Chargé de projets de reboisement",
          "Agent de gestion des ressources naturelles",
          "Conseiller en agroforesterie",
        ],
      },
      en: {
        summary:
          "A professional bachelor's degree to sustainably manage forests, plantations and natural resources.",
        description:
          "The professional bachelor's degree in forestry trains managers who can survey, develop and add value to wooded areas. Students study botany, forest ecology, silviculture, seedling production and natural resource management.\n\nIn the face of deforestation and desertification, the program prepares students to lead reforestation, community forest management and agroforestry projects alongside rural communities.",
        objectives: [
          "Understand how forest and wooded savannah ecosystems work.",
          "Survey and sustainably manage a wooded area.",
          "Lead reforestation and land restoration projects.",
          "Add value to timber and non-timber forest products.",
        ],
        skills: [
          "Carry out a forest inventory and use its data.",
          "Raise seedlings in a nursery and plan a plantation.",
          "Draw up a simple forest management plan.",
          "Apply techniques against erosion and desertification.",
          "Lead natural resource management committees.",
        ],
        program:
          "First year (S1-S2): plant biology, botany, ecology, soil science, statistics, computing.\n\nSecond year (S3-S4): dendrology, silviculture, nursery techniques, forest inventory, mapping and GIS.\n\nThird year (S5-S6): forest management, agroforestry, non-timber forest products, climate change, project management, professional internship and final dissertation.",
        careers: [
          "Senior water and forestry technician",
          "Nursery or plantation manager",
          "Reforestation project officer",
          "Natural resource management officer",
          "Agroforestry advisor",
        ],
      },
    },

    "master-agronomie": {
      fr: {
        summary:
          "Un master professionnel pour concevoir et piloter des systèmes de production végétale innovants et durables.",
        description:
          "Le master professionnel en agronomie s'adresse aux titulaires d'une licence qui souhaitent devenir ingénieurs en production végétale. Il approfondit l'agronomie des systèmes de culture, l'amélioration des plantes, la gestion intégrée de la fertilité et des ravageurs, ainsi que l'expérimentation.\n\nLa formation développe la capacité à concevoir des solutions adaptées aux exploitations, à conduire des essais et à piloter des projets de développement agricole.",
        objectives: [
          "Concevoir des systèmes de culture productifs et durables.",
          "Maîtriser les méthodes d'expérimentation et d'analyse des données agronomiques.",
          "Piloter des projets de développement et d'innovation agricoles.",
          "Encadrer des équipes techniques et accompagner les producteurs.",
        ],
        skills: [
          "Diagnostiquer une exploitation et proposer un plan d'amélioration.",
          "Concevoir, conduire et analyser un dispositif expérimental.",
          "Mettre en place une gestion intégrée de la fertilité et des ravageurs.",
          "Monter, suivre et évaluer un projet agricole.",
          "Rédiger des rapports techniques et scientifiques.",
        ],
        program:
          "Première année (S1-S2) : systèmes de culture, amélioration des plantes, gestion intégrée des ravageurs, fertilité des sols, biostatistique et expérimentation, économie agricole.\n\nDeuxième année (S3-S4) : agroécologie, irrigation et gestion de l'eau, semences et biotechnologies, ingénierie de projet, management d'équipe, stage long et mémoire de master.",
        careers: [
          "Ingénieur agronome",
          "Responsable de production ou d'exploitation",
          "Chargé d'expérimentation et de recherche appliquée",
          "Chef de projet de développement agricole",
          "Consultant en production végétale",
        ],
      },
      en: {
        summary:
          "A professional master's degree to design and manage innovative, sustainable crop production systems.",
        description:
          "The professional master's degree in agronomy is for bachelor's graduates who want to become crop production engineers. It deepens cropping systems agronomy, plant breeding, integrated fertility and pest management, and experimentation.\n\nThe program builds the ability to design solutions suited to farms, run trials and lead agricultural development projects.",
        objectives: [
          "Design productive and sustainable cropping systems.",
          "Master experimental methods and agronomic data analysis.",
          "Lead agricultural development and innovation projects.",
          "Manage technical teams and support farmers.",
        ],
        skills: [
          "Assess a farm and propose an improvement plan.",
          "Design, run and analyse an experimental set-up.",
          "Implement integrated fertility and pest management.",
          "Design, monitor and evaluate an agricultural project.",
          "Write technical and scientific reports.",
        ],
        program:
          "First year (S1-S2): cropping systems, plant breeding, integrated pest management, soil fertility, biostatistics and experimentation, agricultural economics.\n\nSecond year (S3-S4): agroecology, irrigation and water management, seeds and biotechnology, project engineering, team management, long internship and master's dissertation.",
        careers: [
          "Agronomist engineer",
          "Production or farm manager",
          "Applied research and trials officer",
          "Agricultural development project manager",
          "Crop production consultant",
        ],
      },
    },

    "master-zootechnie": {
      fr: {
        summary:
          "Un master professionnel pour piloter des élevages performants et des filières animales compétitives.",
        description:
          "Le master professionnel en zootechnie forme des ingénieurs des productions animales. Il approfondit la nutrition et l'alimentation, la génétique et l'amélioration des races, la reproduction, la santé des troupeaux et l'économie des filières lait, viande et volaille.\n\nLa formation prépare à concevoir et à diriger des unités d'élevage modernes, à conduire des programmes d'amélioration génétique et à accompagner le développement des filières animales.",
        objectives: [
          "Optimiser les performances techniques et économiques des élevages.",
          "Concevoir des programmes d'alimentation et d'amélioration génétique.",
          "Diriger une unité de production animale ou un projet de filière.",
          "Contribuer à la sécurité sanitaire et à la qualité des produits animaux.",
        ],
        skills: [
          "Formuler des aliments et des rations à moindre coût.",
          "Concevoir et suivre un programme de sélection ou de croisement.",
          "Organiser la conduite sanitaire et reproductive d'un troupeau.",
          "Analyser la rentabilité d'un atelier d'élevage.",
          "Encadrer des équipes et conseiller les éleveurs.",
        ],
        program:
          "Première année (S1-S2) : nutrition et alimentation animales avancées, génétique quantitative, physiologie de la reproduction, santé des troupeaux, biostatistique, économie des filières.\n\nDeuxième année (S3-S4) : systèmes d'élevage, aviculture et production laitière intensives, qualité des produits animaux, ingénierie de projet, management, stage long et mémoire de master.",
        careers: [
          "Ingénieur zootechnicien",
          "Directeur d'unité d'élevage ou de ferme avicole",
          "Responsable technique en fabrication d'aliments",
          "Chef de projet de développement de l'élevage",
          "Consultant en productions animales",
        ],
      },
      en: {
        summary:
          "A professional master's degree to run high-performing livestock farms and competitive animal value chains.",
        description:
          "The professional master's degree in animal science trains animal production engineers. It deepens nutrition and feeding, genetics and breed improvement, reproduction, herd health and the economics of the milk, meat and poultry value chains.\n\nThe program prepares students to design and run modern livestock units, lead genetic improvement programs and support the development of animal value chains.",
        objectives: [
          "Optimise the technical and economic performance of livestock farms.",
          "Design feeding and genetic improvement programs.",
          "Run an animal production unit or a value chain project.",
          "Contribute to the safety and quality of animal products.",
        ],
        skills: [
          "Formulate cost-effective feeds and rations.",
          "Design and monitor a selection or crossbreeding program.",
          "Organise herd health and breeding management.",
          "Analyse the profitability of a livestock unit.",
          "Manage teams and advise livestock farmers.",
        ],
        program:
          "First year (S1-S2): advanced animal nutrition and feeding, quantitative genetics, reproductive physiology, herd health, biostatistics, value chain economics.\n\nSecond year (S3-S4): livestock systems, intensive poultry and dairy production, animal product quality, project engineering, management, long internship and master's dissertation.",
        careers: [
          "Animal science engineer",
          "Livestock or poultry farm director",
          "Technical manager in animal feed production",
          "Livestock development project manager",
          "Animal production consultant",
        ],
      },
    },

    "dut-production-fumure-organique": {
      fr: {
        summary:
          "Un DUT en deux ans pour produire et valoriser compost, fumier et engrais organiques de qualité.",
        description:
          "Le DUT en production de fumure organique forme des techniciens capables de transformer les résidus de récolte, les déjections animales et les déchets organiques en fertilisants de qualité. Les étudiants apprennent le compostage, la gestion du fumier, le lombricompostage et la production de biofertilisants.\n\nCes techniques restaurent la fertilité des sols à moindre coût, réduisent la dépendance aux engrais chimiques et ouvrent des débouchés dans l'entrepreneuriat agricole.",
        objectives: [
          "Comprendre le rôle de la matière organique dans la fertilité des sols.",
          "Produire du compost et des fertilisants organiques de qualité.",
          "Conseiller les producteurs sur l'usage de la fumure organique.",
          "Créer et gérer une unité de production de fertilisants organiques.",
        ],
        skills: [
          "Conduire une plateforme de compostage et en contrôler la maturité.",
          "Pratiquer le lombricompostage et produire des biofertilisants.",
          "Calculer les doses d'apport selon les cultures et les sols.",
          "Conditionner, stocker et commercialiser des fertilisants organiques.",
          "Tenir la gestion technique et économique d'une unité de production.",
        ],
        program:
          "Première année (S1-S2) : biologie des sols, chimie agricole, bases de l'agronomie, microbiologie, techniques de compostage, mathématiques appliquées, informatique.\n\nDeuxième année (S3-S4) : fertilisation organique des cultures, lombricompostage, biofertilisants, contrôle de qualité, entrepreneuriat et commercialisation, stage en exploitation ou en entreprise.",
        careers: [
          "Technicien en fertilisation organique",
          "Responsable d'unité de compostage",
          "Entrepreneur en fertilisants organiques",
          "Conseiller en gestion de la fertilité des sols",
        ],
      },
      en: {
        summary:
          "A two-year technology diploma to produce and market quality compost, manure and organic fertilisers.",
        description:
          "The technology diploma (DUT) in organic fertiliser production trains technicians who can turn crop residues, animal manure and organic waste into quality fertilisers. Students learn composting, manure management, vermicomposting and biofertiliser production.\n\nThese techniques restore soil fertility at low cost, reduce dependence on chemical fertilisers and open up opportunities in agricultural entrepreneurship.",
        objectives: [
          "Understand the role of organic matter in soil fertility.",
          "Produce quality compost and organic fertilisers.",
          "Advise farmers on using organic fertilisers.",
          "Set up and run an organic fertiliser production unit.",
        ],
        skills: [
          "Run a composting site and check compost maturity.",
          "Practise vermicomposting and produce biofertilisers.",
          "Calculate application rates for each crop and soil.",
          "Package, store and sell organic fertilisers.",
          "Manage the technical and financial side of a production unit.",
        ],
        program:
          "First year (S1-S2): soil biology, agricultural chemistry, basic agronomy, microbiology, composting techniques, applied mathematics, computing.\n\nSecond year (S3-S4): organic crop fertilisation, vermicomposting, biofertilisers, quality control, entrepreneurship and marketing, farm or company internship.",
        careers: [
          "Organic fertilisation technician",
          "Composting unit manager",
          "Organic fertiliser entrepreneur",
          "Soil fertility advisor",
        ],
      },
    },

    "dut-production-aviaire": {
      fr: {
        summary:
          "Un DUT en deux ans pour conduire des élevages de poulets de chair et de poules pondeuses performants.",
        description:
          "Le DUT en production aviaire forme des techniciens spécialisés dans l'élevage des volailles. Les étudiants apprennent à installer un poulailler, à conduire des bandes de poulets de chair et de pondeuses, à maîtriser l'alimentation, l'incubation, la prophylaxie et la biosécurité.\n\nFilière à cycle court et à forte demande, l'aviculture offre de réelles possibilités d'emploi et de création d'entreprise.",
        objectives: [
          "Concevoir et équiper un bâtiment d'élevage avicole.",
          "Conduire des bandes de poulets de chair et de poules pondeuses.",
          "Prévenir les maladies grâce à la biosécurité et à la prophylaxie.",
          "Gérer et commercialiser la production d'une ferme avicole.",
        ],
        skills: [
          "Préparer le poulailler et réussir le démarrage des poussins.",
          "Distribuer une alimentation adaptée à chaque stade.",
          "Appliquer un programme de vaccination et des mesures de biosécurité.",
          "Conduire l'incubation et suivre la ponte.",
          "Calculer les coûts de production et les marges.",
        ],
        program:
          "Première année (S1-S2) : biologie et anatomie des volailles, bases de l'élevage, alimentation animale, bâtiments et équipements avicoles, mathématiques appliquées, informatique.\n\nDeuxième année (S3-S4) : production de poulets de chair, production d'œufs, incubation, pathologies aviaires et biosécurité, gestion et commercialisation, stage en ferme avicole.",
        careers: [
          "Technicien avicole",
          "Responsable de ferme avicole",
          "Aviculteur entrepreneur",
          "Technico-commercial en aliments et produits avicoles",
        ],
      },
      en: {
        summary:
          "A two-year technology diploma to run high-performing broiler and laying hen farms.",
        description:
          "The technology diploma (DUT) in poultry production trains technicians specialising in poultry farming. Students learn to set up a poultry house, raise broilers and laying hens, and master feeding, incubation, disease prevention and biosecurity.\n\nWith short cycles and strong demand, poultry farming offers real job and business creation opportunities.",
        objectives: [
          "Design and equip a poultry house.",
          "Raise broilers and laying hens.",
          "Prevent diseases through biosecurity and vaccination.",
          "Manage and market a poultry farm's output.",
        ],
        skills: [
          "Prepare the poultry house and successfully start chicks.",
          "Provide feed suited to each growth stage.",
          "Apply a vaccination program and biosecurity measures.",
          "Run incubation and monitor egg laying.",
          "Calculate production costs and margins.",
        ],
        program:
          "First year (S1-S2): poultry biology and anatomy, livestock basics, animal feeding, poultry housing and equipment, applied mathematics, computing.\n\nSecond year (S3-S4): broiler production, egg production, incubation, poultry diseases and biosecurity, management and marketing, poultry farm internship.",
        careers: [
          "Poultry technician",
          "Poultry farm manager",
          "Poultry entrepreneur",
          "Sales technician for poultry feed and products",
        ],
      },
    },

    "dut-technico-commercial-agricole": {
      fr: {
        summary:
          "Un DUT en deux ans qui associe connaissances agricoles et techniques de vente des intrants et des produits agricoles.",
        description:
          "Le DUT technico-commercial agricole forme des professionnels capables de conseiller et de vendre semences, engrais, produits phytosanitaires, aliments du bétail, produits vétérinaires et matériel agricole. Les étudiants acquièrent une solide base technique en production végétale et animale, ainsi que des compétences en vente, en négociation et en gestion commerciale.\n\nLa formation prépare à travailler au plus près des producteurs, dans les entreprises de distribution, les coopératives et les industries agroalimentaires.",
        objectives: [
          "Connaître les principaux intrants et produits agricoles et leur usage.",
          "Conseiller les producteurs dans leurs choix techniques.",
          "Vendre et promouvoir une gamme de produits agricoles.",
          "Gérer un point de vente ou un portefeuille de clients.",
        ],
        skills: [
          "Présenter un produit et ses conditions d'emploi en toute sécurité.",
          "Conduire un entretien de vente et négocier.",
          "Réaliser une étude de marché simple.",
          "Gérer les stocks, les commandes et la logistique.",
          "Assurer le suivi commercial d'une clientèle de producteurs.",
        ],
        program:
          "Première année (S1-S2) : bases de la production végétale et animale, intrants agricoles, économie générale, mathématiques commerciales, comptabilité, informatique.\n\nDeuxième année (S3-S4) : techniques de vente et de négociation, marketing agricole, réglementation des intrants, gestion commerciale et logistique, entrepreneuriat, stage en entreprise.",
        careers: [
          "Technico-commercial en intrants agricoles",
          "Délégué commercial en produits vétérinaires ou phytosanitaires",
          "Gérant de point de vente agricole",
          "Agent commercial en coopérative ou en industrie agroalimentaire",
        ],
      },
      en: {
        summary:
          "A two-year technology diploma combining agricultural knowledge with sales techniques for farm inputs and products.",
        description:
          "The agricultural sales technician diploma (DUT) trains professionals who can advise on and sell seeds, fertilisers, crop protection products, animal feed, veterinary products and farm equipment. Students gain a solid technical grounding in crop and livestock production, along with sales, negotiation and business management skills.\n\nThe program prepares students to work closely with farmers, in distribution companies, cooperatives and the food industry.",
        objectives: [
          "Know the main farm inputs and products and how they are used.",
          "Advise farmers on their technical choices.",
          "Sell and promote a range of agricultural products.",
          "Manage a sales outlet or a customer portfolio.",
        ],
        skills: [
          "Present a product and its safe conditions of use.",
          "Conduct a sales meeting and negotiate.",
          "Carry out simple market research.",
          "Manage stock, orders and logistics.",
          "Follow up a portfolio of farmer customers.",
        ],
        program:
          "First year (S1-S2): basics of crop and livestock production, farm inputs, general economics, business mathematics, accounting, computing.\n\nSecond year (S3-S4): sales and negotiation techniques, agricultural marketing, input regulations, sales and logistics management, entrepreneurship, company internship.",
        careers: [
          "Farm inputs sales technician",
          "Sales representative for veterinary or crop protection products",
          "Agricultural store manager",
          "Sales agent in a cooperative or the food industry",
        ],
      },
    },

    "dut-production-maraichere": {
      fr: {
        summary:
          "Un DUT en deux ans pour produire des légumes de qualité tout au long de l'année, de la pépinière à la vente.",
        description:
          "Le DUT en production maraîchère forme des techniciens opérationnels pour la culture des légumes. Les étudiants apprennent à préparer les sols, à conduire les pépinières, à irriguer, à fertiliser et à protéger les cultures maraîchères comme la tomate, l'oignon, le chou ou le piment.\n\nTrès pratique, la formation met l'accent sur les travaux au champ, la gestion de l'eau et la commercialisation des récoltes.",
        objectives: [
          "Maîtriser les techniques de production des principales espèces maraîchères.",
          "Gérer l'eau et la fertilité des parcelles.",
          "Protéger les cultures contre les ravageurs et les maladies.",
          "Conserver et commercialiser les récoltes.",
        ],
        skills: [
          "Installer et conduire une pépinière.",
          "Mettre en place un système d'irrigation goutte-à-goutte ou gravitaire.",
          "Planifier les cycles de production selon les saisons.",
          "Appliquer les traitements phytosanitaires en toute sécurité.",
          "Tenir le suivi technique et économique d'une parcelle.",
        ],
        program:
          "Première année (S1-S2) : botanique, sciences du sol, bases de l'agronomie, techniques de pépinière, irrigation, mathématiques appliquées, informatique.\n\nDeuxième année (S3-S4) : cultures maraîchères, protection des cultures, fertilisation, conservation après récolte, commercialisation, gestion d'exploitation et stage en exploitation.",
        careers: [
          "Producteur maraîcher",
          "Technicien en production maraîchère",
          "Chef de parcelle",
          "Conseiller maraîcher",
          "Gérant de périmètre irrigué",
        ],
      },
      en: {
        summary:
          "A two-year technology diploma to grow quality vegetables all year round, from nursery to market.",
        description:
          "The technology diploma (DUT) in market gardening trains hands-on technicians for vegetable production. Students learn to prepare soils, run nurseries, irrigate, fertilise and protect vegetable crops such as tomatoes, onions, cabbages and chillies.\n\nThis very practical program focuses on fieldwork, water management and selling the harvest.",
        objectives: [
          "Master production techniques for the main vegetable crops.",
          "Manage water and soil fertility on the plots.",
          "Protect crops against pests and diseases.",
          "Store and market the harvest.",
        ],
        skills: [
          "Set up and run a nursery.",
          "Install drip or gravity irrigation.",
          "Plan production cycles according to the seasons.",
          "Apply crop protection treatments safely.",
          "Keep technical and financial records for a plot.",
        ],
        program:
          "First year (S1-S2): botany, soil science, basic agronomy, nursery techniques, irrigation, applied mathematics, computing.\n\nSecond year (S3-S4): vegetable crops, crop protection, fertilisation, post-harvest storage, marketing, farm management and on-farm internship.",
        careers: [
          "Market gardener",
          "Vegetable production technician",
          "Plot supervisor",
          "Market gardening advisor",
          "Irrigated scheme manager",
        ],
      },
    },

    "dut-production-lait-viande": {
      fr: {
        summary:
          "Un DUT en deux ans pour améliorer la production de lait et de viande dans les élevages.",
        description:
          "Le DUT en production de lait et de viande forme des techniciens spécialisés dans l'élevage des animaux de production. Les étudiants apprennent à alimenter, suivre et soigner les animaux, ainsi qu'à organiser la traite, l'embouche et la vente.\n\nLes enseignements incluent l'hygiène du lait et des viandes, afin de garantir des produits sains aux consommateurs.",
        objectives: [
          "Conduire un élevage laitier ou d'embouche.",
          "Optimiser l'alimentation pour la production de lait et de viande.",
          "Garantir l'hygiène et la qualité des produits.",
          "Gérer une unité de production animale.",
        ],
        skills: [
          "Composer des rations d'embouche et de production laitière.",
          "Organiser la traite et la collecte du lait dans de bonnes conditions d'hygiène.",
          "Suivre la croissance et l'état sanitaire des animaux.",
          "Réaliser une transformation simple du lait.",
          "Calculer les coûts et les marges d'un atelier d'élevage.",
        ],
        program:
          "Première année (S1-S2) : biologie et anatomie animales, bases de l'élevage, alimentation animale, cultures fourragères, mathématiques appliquées, informatique.\n\nDeuxième année (S3-S4) : production laitière, embouche bovine et ovine, aviculture, hygiène du lait et des viandes, transformation, gestion d'élevage et stage en exploitation.",
        careers: [
          "Technicien d'élevage laitier",
          "Responsable d'atelier d'embouche",
          "Agent de collecte et de transformation du lait",
          "Éleveur entrepreneur",
          "Conseiller en productions animales",
        ],
      },
      en: {
        summary:
          "A two-year technology diploma to improve milk and meat production on livestock farms.",
        description:
          "The technology diploma (DUT) in milk and meat production trains technicians specialising in production livestock. Students learn to feed, monitor and care for animals, and to organise milking, fattening and sales.\n\nTeaching includes milk and meat hygiene, to ensure safe products for consumers.",
        objectives: [
          "Run a dairy or fattening unit.",
          "Optimise feeding for milk and meat production.",
          "Ensure product hygiene and quality.",
          "Manage an animal production unit.",
        ],
        skills: [
          "Formulate fattening and dairy rations.",
          "Organise hygienic milking and milk collection.",
          "Monitor animal growth and health.",
          "Carry out simple milk processing.",
          "Calculate the costs and margins of a livestock unit.",
        ],
        program:
          "First year (S1-S2): animal biology and anatomy, livestock basics, animal feeding, forage crops, applied mathematics, computing.\n\nSecond year (S3-S4): dairy production, cattle and sheep fattening, poultry farming, milk and meat hygiene, processing, livestock management and on-farm internship.",
        careers: [
          "Dairy technician",
          "Fattening unit manager",
          "Milk collection and processing officer",
          "Livestock entrepreneur",
          "Animal production advisor",
        ],
      },
    },

    "dut-production-semence-agricole": {
      fr: {
        summary:
          "Un DUT en deux ans pour produire, contrôler et conditionner des semences de qualité.",
        description:
          "Le DUT en production de semence agricole forme des techniciens de la filière semencière. Les étudiants apprennent à multiplier des variétés améliorées, à conduire des parcelles semencières, à contrôler la pureté et la germination des lots, puis à trier, traiter, conditionner et stocker les semences.\n\nUne semence de qualité étant la première condition d'une bonne récolte, ces techniciens jouent un rôle clé dans l'amélioration des rendements.",
        objectives: [
          "Comprendre les bases de la génétique et de l'amélioration des plantes.",
          "Conduire des parcelles de multiplication de semences.",
          "Contrôler la qualité des semences.",
          "Conditionner, stocker et distribuer les semences.",
        ],
        skills: [
          "Respecter les règles d'isolement et d'épuration des parcelles semencières.",
          "Réaliser des tests de germination et de pureté.",
          "Organiser le séchage, le tri et le traitement des semences.",
          "Appliquer la réglementation semencière.",
          "Assurer la traçabilité des lots.",
        ],
        program:
          "Première année (S1-S2) : botanique, génétique, sciences du sol, bases de l'agronomie, mathématiques appliquées, informatique.\n\nDeuxième année (S3-S4) : amélioration des plantes, technologie des semences, contrôle de qualité, protection des cultures, réglementation et commercialisation des semences, stage en entreprise semencière.",
        careers: [
          "Technicien semencier",
          "Producteur de semences",
          "Agent de contrôle de la qualité des semences",
          "Responsable de conditionnement et de stockage",
          "Conseiller en intrants agricoles",
        ],
      },
      en: {
        summary:
          "A two-year technology diploma to produce, test and package quality seed.",
        description:
          "The technology diploma (DUT) in agricultural seed production trains technicians for the seed sector. Students learn to multiply improved varieties, manage seed plots, test seed lots for purity and germination, then clean, treat, package and store seed.\n\nSince quality seed is the first condition for a good harvest, these technicians play a key role in improving yields.",
        objectives: [
          "Understand the basics of genetics and plant breeding.",
          "Manage seed multiplication plots.",
          "Test seed quality.",
          "Package, store and distribute seed.",
        ],
        skills: [
          "Apply isolation and rogueing rules on seed plots.",
          "Carry out germination and purity tests.",
          "Organise seed drying, cleaning and treatment.",
          "Apply seed regulations.",
          "Ensure seed lot traceability.",
        ],
        program:
          "First year (S1-S2): botany, genetics, soil science, basic agronomy, applied mathematics, computing.\n\nSecond year (S3-S4): plant breeding, seed technology, quality control, crop protection, seed regulations and marketing, internship in a seed company.",
        careers: [
          "Seed technician",
          "Seed producer",
          "Seed quality control officer",
          "Seed packaging and storage supervisor",
          "Agricultural inputs advisor",
        ],
      },
    },

    "dut-insemination-artificielle": {
      fr: {
        summary:
          "Un DUT en deux ans pour maîtriser l'insémination artificielle et contribuer à l'amélioration génétique des troupeaux.",
        description:
          "Le DUT en insémination artificielle forme des techniciens spécialisés dans la reproduction des animaux d'élevage. Les étudiants apprennent l'anatomie et la physiologie de la reproduction, la détection des chaleurs, la synchronisation des cycles, la manipulation de la semence et la technique d'insémination.\n\nCette spécialité contribue directement à l'amélioration génétique des troupeaux et à l'augmentation de la production de lait et de viande.",
        objectives: [
          "Comprendre la physiologie de la reproduction animale.",
          "Réaliser l'insémination artificielle dans le respect des règles d'hygiène.",
          "Participer à l'amélioration génétique des troupeaux.",
          "Suivre les résultats de reproduction d'un élevage.",
        ],
        skills: [
          "Détecter les chaleurs et choisir le bon moment pour inséminer.",
          "Conserver et manipuler la semence congelée en azote liquide.",
          "Réaliser l'acte d'insémination.",
          "Diagnostiquer une gestation et tenir les registres de reproduction.",
          "Conseiller les éleveurs sur le choix des géniteurs.",
        ],
        program:
          "Première année (S1-S2) : biologie et anatomie animales, physiologie, bases de l'élevage, génétique, alimentation animale, informatique.\n\nDeuxième année (S3-S4) : physiologie de la reproduction, techniques d'insémination, biotechnologies de la reproduction, amélioration génétique, hygiène et santé de la reproduction, stage en élevage.",
        careers: [
          "Inséminateur",
          "Technicien en reproduction animale",
          "Agent de programmes d'amélioration génétique",
          "Conseiller en élevage",
        ],
      },
      en: {
        summary:
          "A two-year technology diploma to master artificial insemination and contribute to herd genetic improvement.",
        description:
          "The technology diploma (DUT) in artificial insemination trains technicians specialising in farm animal reproduction. Students learn reproductive anatomy and physiology, heat detection, cycle synchronisation, semen handling and insemination technique.\n\nThis specialism contributes directly to herd genetic improvement and higher milk and meat production.",
        objectives: [
          "Understand the physiology of animal reproduction.",
          "Carry out artificial insemination in line with hygiene rules.",
          "Take part in herd genetic improvement.",
          "Monitor a farm's reproduction results.",
        ],
        skills: [
          "Detect heat and choose the right time to inseminate.",
          "Store and handle frozen semen in liquid nitrogen.",
          "Perform insemination.",
          "Diagnose pregnancy and keep breeding records.",
          "Advise farmers on choosing breeding animals.",
        ],
        program:
          "First year (S1-S2): animal biology and anatomy, physiology, livestock basics, genetics, animal feeding, computing.\n\nSecond year (S3-S4): reproductive physiology, insemination techniques, reproductive biotechnology, genetic improvement, reproductive hygiene and health, on-farm internship.",
        careers: [
          "Artificial insemination technician",
          "Animal reproduction technician",
          "Genetic improvement program officer",
          "Livestock advisor",
        ],
      },
    },

    "dut-agroforesterie": {
      fr: {
        summary:
          "Un DUT en deux ans pour produire des plants, planter et entretenir les arbres au service des cultures et des sols.",
        description:
          "Le DUT en agroforesterie forme des techniciens de terrain capables de mettre en œuvre des pratiques agroforestières. Les étudiants apprennent à produire des plants en pépinière, à installer des haies vives, des brise-vent et des parcs arborés, et à appliquer les techniques de conservation des eaux et des sols.\n\nLa formation intègre la synécoculture : une méthode qui associe de nombreuses espèces végétales en culture dense, sans labour ni intrants chimiques, pour reconstituer des écosystèmes productifs. Très orientée vers la pratique, elle prépare à intervenir auprès des producteurs et dans les projets de reboisement.",
        objectives: [
          "Produire des plants forestiers et fruitiers.",
          "Installer et entretenir des aménagements agroforestiers.",
          "Lutter contre l'érosion et la dégradation des terres.",
          "Sensibiliser les producteurs aux pratiques agroforestières.",
        ],
        skills: [
          "Gérer une pépinière, de la semence au plant.",
          "Réaliser des greffes et des boutures.",
          "Aménager des cordons pierreux, des demi-lunes et des zaï.",
          "Entretenir des plantations.",
          "Animer des démonstrations auprès des producteurs.",
        ],
        program:
          "Première année (S1-S2) : botanique, écologie, sciences du sol, bases de l'agronomie, techniques de pépinière, informatique.\n\nDeuxième année (S3-S4) : sylviculture, arboriculture fruitière, systèmes agroforestiers et synécoculture, conservation des eaux et des sols, vulgarisation, stage sur le terrain.",
        careers: [
          "Technicien agroforestier",
          "Pépiniériste",
          "Agent de reboisement",
          "Animateur de projets de conservation des sols",
        ],
      },
      en: {
        summary:
          "A two-year technology diploma to raise seedlings, plant and look after trees that benefit crops and soils.",
        description:
          "The technology diploma (DUT) in agroforestry trains field technicians who can put agroforestry practices into action. Students learn to raise seedlings in a nursery, establish live hedges, windbreaks and parkland trees, and apply soil and water conservation techniques.\n\nThe program includes synecoculture: a method that grows many plant species together at high density, without tillage or chemical inputs, to rebuild productive ecosystems. Very practical, it prepares students to work with farmers and on reforestation projects.",
        objectives: [
          "Raise forest and fruit tree seedlings.",
          "Establish and maintain agroforestry features.",
          "Combat erosion and land degradation.",
          "Raise farmers' awareness of agroforestry practices.",
        ],
        skills: [
          "Run a nursery, from seed to seedling.",
          "Carry out grafting and cuttings.",
          "Build stone bunds, half-moons and zaï pits.",
          "Maintain plantations.",
          "Run demonstrations for farmers.",
        ],
        program:
          "First year (S1-S2): botany, ecology, soil science, basic agronomy, nursery techniques, computing.\n\nSecond year (S3-S4): silviculture, fruit tree growing, agroforestry systems and synecoculture, soil and water conservation, extension, field internship.",
        careers: [
          "Agroforestry technician",
          "Nursery worker",
          "Reforestation officer",
          "Soil conservation project facilitator",
        ],
      },
    },
  };
