"use client";

import { useReducedMotion } from "motion/react";
import GalleryTunnel from "@/components/originkit/ui/hero-03/gallery-tunnel";
import { useTunnelConfig } from "@/components/originkit/ui/hero-03/use-tunnel-size";

const TUNNEL_IMAGES = [
  { src: "/images/logistics_tunnel_01.png", alt: "Air Freight Jet" },
  { src: "/images/logistics_tunnel_02.png", alt: "Ocean Container Ship" },
  { src: "/images/logistics_tunnel_03.png", alt: "Autonomous Express Truck" },
  { src: "/images/logistics_tunnel_04.png", alt: "Automated Smart Warehouse" },
  { src: "/images/logistics_tunnel_05.png", alt: "Global Supply Chain Control Room" },
  { src: "/images/logistics_tunnel_06.png", alt: "Intermodal High-Speed Rail" },
  { src: "/images/logistics_tunnel_07.png", alt: "Cold Chain Pharma Facility" },
  { src: "/images/air_freight.png", alt: "Cargo Aircraft Flight" },
  { src: "/images/ocean_freight.png", alt: "Ocean Vessel Liner" },
  { src: "/images/road_transport.png", alt: "Fleet Transport Truck" },
  { src: "/images/about_logistics.png", alt: "Logistics Hub Infrastructure" }
];

export const PerspectiveBackground = () => {
  const reduceMotion = useReducedMotion();
  const { tunnelSize, fade, boost } = useTunnelConfig();

  return (
    <div aria-hidden="true" className="absolute inset-0 w-full h-full z-0 flex items-center justify-center overflow-hidden pointer-events-none">
      <GalleryTunnel
        background="#fffbe1"
        lineColor="#d6cfb3"
        lineOpacity={65}
        grid={5}
        tunnelSize={tunnelSize}
        speed={reduceMotion ? 0 : 3}
        boost={reduceMotion ? 0 : boost}
        fade={fade}
        label={false}
        images={TUNNEL_IMAGES}
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      {/* Soft cream veil halo from screenshot so tunnel images don't fight text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[340px] w-[400px] -translate-x-1/2 -translate-y-1/2 bg-[#fffbe1] blur-[42px] ipad:h-[500px] ipad:w-[600px] ipad:blur-[60px] desktop-sm:h-[420px] desktop-sm:w-[500px] desktop-sm:blur-[48px] z-1"
      />
    </div>
  );
};
