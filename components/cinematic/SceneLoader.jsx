'use client';

import dynamic from 'next/dynamic';
import { useCapability } from '@/components/cinematic/hooks';
import Network2D from '@/components/cinematic/Network2D';

// Three.js is a separate chunk that is only requested when the device can run it well. Everyone else gets the light
// 2D network (or a still frame with reduced motion), so the page stays fast and complete without WebGL.
const HeroScene = dynamic(() => import('@/components/cinematic/HeroScene'), { ssr: false });

export default function SceneLoader() {
  const cap = useCapability();
  if (!cap.ready) return null;
  if (cap.tier3d) return <HeroScene low={cap.low} />;
  return <Network2D count={cap.narrow ? 34 : 56} still={cap.reduced} className="cx-net-hero" />;
}
