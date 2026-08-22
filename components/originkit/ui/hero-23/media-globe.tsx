// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

"use client";

import { useEffect, useState, type ComponentProps } from "react";
import Globe from "@/components/originkit/ui/hero-23/globe";
import Stardust from "@/components/originkit/ui/hero-23/stardust";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
};

export const MediaGlobe = ({ query }: { query?: string }) => {
  return (
    <Globe
      scale={9.7}
      initialLatitude={18}
      initialLongitude={45}
      speed={6}
      stopOnHover={false}
      oceanColor="#090D16"
      dots={{ color: "#FF5722", size: 6, density: 8, allDots: false }}
      fillColor="#1C1917"
      outlineColor="#FF5722"
      showOutline={true}
      graticuleColor="rgba(255, 87, 34, 0.15)"
      markerConfig={{
        markers: [
          { lat: 40.7128, lng: -74.006 }, // New York
          { lat: 51.5074, lng: -0.1278 }, // London
          { lat: 35.6762, lng: 139.6503 }, // Tokyo
          { lat: 25.2048, lng: 55.2708 }, // Dubai
          { lat: 1.3521, lng: 103.8198 }, // Singapore
          { lat: 19.076, lng: 72.8777 }, // Mumbai
        ],
        color: "#FF5722",
        size: 35,
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export const MediaStardust = ({
  query,
  ...props
}: { query?: string } & ComponentProps<typeof Stardust>) => {
  return <Stardust {...props} style={{ width: "100%", height: "100%" }} />;
};
