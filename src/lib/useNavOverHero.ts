import { useEffect, useState } from "react";

/** True while the fixed navbar sits over the dark hero (before scroll). */
export function useNavOverHero() {
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const header = document.getElementById("site-header");

    const update = () => {
      setOverHero(header?.dataset.state !== "solid");
    };

    update();
    window.addEventListener("scroll", update, { passive: true });

    const observer = new MutationObserver(update);
    if (header) {
      observer.observe(header, { attributes: true, attributeFilter: ["data-state"] });
    }

    return () => {
      window.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  return overHero;
}
