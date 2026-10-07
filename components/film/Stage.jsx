'use client';

import dynamic from 'next/dynamic';
import { useCapability } from '@/components/film/hooks';
import Stage2D from '@/components/film/Stage2D';

// three.js is its own chunk, requested only when a device can run it well. Phones, weak devices and reduced-motion
// users get the lighter 2D projection of the same film. The whole layer is decoration (aria-hidden).
const StageGL = dynamic(() => import('@/components/film/StageGL'), { ssr: false });

export default function Stage() {
  const cap = useCapability();
  return (
    <div className="fm-stage" aria-hidden="true">
      {cap.ready && (cap.tier3d ? <StageGL n={cap.low ? 1300 : 2000} /> : <Stage2D n={cap.narrow ? 520 : 800} still={cap.reduced} />)}
    </div>
  );
}
