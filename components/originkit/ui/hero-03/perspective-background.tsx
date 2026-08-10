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
    <div aria-hidden="true" className="absolute top-0 left-0 w-full h-full z-0 flex items-center justify-center overflow-hidden pointer-events-none">
      <GalleryTunnel
        background="#060B16"
        lineColor="#2563EB"
        lineOpacity={55}
        grid={5}
        tunnelSize={tunnelSize}
        speed={reduceMotion ? 0 : 3}
        boost={reduceMotion ? 0 : boost}
        fade={fade}
        label={false}
        images={TUNNEL_IMAGES}
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
      />
      {/* Soft center veil overlay */}
      <div className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(circle_at_center,rgba(11,18,33,0.12)_0%,rgba(6,11,22,0.65)_100%)]" />
    </div>
  );
};
