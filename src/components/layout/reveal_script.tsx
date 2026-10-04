// Apparition douce des éléments marqués data-reveal quand ils entrent dans l'écran.
// Script en ligne (≈ 1 Ko) plutôt que composant React : il agit dès que le HTML est lu,
// sans attendre le chargement de React (important sur connexion lente).
// - Sans JavaScript : l'attribut data-js n'est jamais posé, tout reste visible.
// - Mouvement réduit demandé : le CSS n'applique aucun masquage (voir base.css).
// - Navigation côté client : un MutationObserver prend en charge les nouveaux éléments.
const script = `(function () {
  var root = document.documentElement;
  if (!("IntersectionObserver" in window)) return;
  root.setAttribute("data-js", "");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.setAttribute("data-revealed", "");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  function scan(node) {
    if (node.nodeType !== 1) return;
    if (node.matches("[data-reveal]:not([data-revealed])")) io.observe(node);
    node.querySelectorAll("[data-reveal]:not([data-revealed])").forEach(function (el) {
      io.observe(el);
    });
  }
  function start() {
    scan(document.body);
    new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(scan);
      });
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();`;

export function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
