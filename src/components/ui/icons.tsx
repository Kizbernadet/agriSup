import type { SVGProps } from "react";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons/faWhatsapp";
import { faChartLine } from "@fortawesome/free-solid-svg-icons/faChartLine";
import { faCow } from "@fortawesome/free-solid-svg-icons/faCow";
import { faFish } from "@fortawesome/free-solid-svg-icons/faFish";
import { faSeedling } from "@fortawesome/free-solid-svg-icons/faSeedling";
import { faTractor } from "@fortawesome/free-solid-svg-icons/faTractor";
import { faTree } from "@fortawesome/free-solid-svg-icons/faTree";
import { faWheatAwn } from "@fortawesome/free-solid-svg-icons/faWheatAwn";

/*
 * Icônes du site, regroupées ici pour garder des noms stables dans les composants.
 * - Interface : Heroicons (MIT), contour 24 px.
 * - Métiers agricoles et marques (logo officiel WhatsApp) : Font Awesome Free
 *   (CC BY 4.0, attribution dans les mentions légales). On dessine directement le tracé
 *   SVG fourni par Font Awesome : pas de feuille de style ni de code JavaScript ajouté.
 * Toutes les icônes sont décoratives (aria-hidden) : le sens est porté par le texte.
 */
export {
  AcademicCapIcon as GraduationIcon,
  ArrowRightIcon,
  Bars3Icon as MenuIcon,
  BeakerIcon as FlaskIcon,
  BookOpenIcon as BookIcon,
  BuildingLibraryIcon as InstitutionIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon as ChatIcon,
  CheckCircleIcon as CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardDocumentCheckIcon as ClipboardIcon,
  EnvelopeIcon as MailIcon,
  GlobeAltIcon as GlobeIcon,
  HomeIcon,
  MagnifyingGlassIcon as SearchIcon,
  NewspaperIcon as NewsIcon,
  MapPinIcon,
  MoonIcon,
  PaperAirplaneIcon as SendIcon,
  PauseIcon,
  PhoneIcon,
  PlayIcon,
  QuestionMarkCircleIcon as HelpIcon,
  SparklesIcon,
  SunIcon,
  UserGroupIcon as UsersIcon,
  XMarkIcon as CloseIcon,
} from "@heroicons/react/24/outline";

type IconProps = SVGProps<SVGSVGElement>;

function fontAwesome(definition: IconDefinition) {
  const [width, height, , , path] = definition.icon;
  function FontAwesomeSvg(props: IconProps) {
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        <path d={Array.isArray(path) ? path.join(" ") : path} />
      </svg>
    );
  }
  return FontAwesomeSvg;
}

// Marques
export const WhatsappIcon = fontAwesome(faWhatsapp);
export const FacebookIcon = fontAwesome(faFacebook);

// Domaines et métiers agricoles
export const SproutIcon = fontAwesome(faSeedling);
export const PawIcon = fontAwesome(faCow);
export const FishIcon = fontAwesome(faFish);
export const ChartIcon = fontAwesome(faChartLine);
export const TreeIcon = fontAwesome(faTree);
export const FieldIcon = fontAwesome(faTractor);
export const WheatIcon = fontAwesome(faWheatAwn);
