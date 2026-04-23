import { useEffect, useRef } from 'react';
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';


export default function GlobeLoader({ size = 200, ink = '#1a1a1a', bg = '#ffffff' }) {
  const landRef = useRef<SVGPathElement | null>(null);
  const gratRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const R = size * 0.39;
    const projection = d3.geoOrthographic()
      .scale(R)
      .translate([size / 2, size / 2])
      .clipAngle(90)
      .rotate([0, -15, 0]);
    const path = d3.geoPath(projection);
    const graticule = d3.geoGraticule().step([20, 15])();

    let land: d3.GeoPermissibleObjects = { type: 'Sphere' } as d3.GeoPermissibleObjects;
    let raf: number;
    let lambda = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      lambda = (lambda + 60 * dt) % 360;
      projection.rotate([lambda, -15, 0]);
      if (gratRef.current) gratRef.current.setAttribute('d', path(graticule) || '');
      if (landRef.current) landRef.current.setAttribute('d', path(land) || '');
      raf = requestAnimationFrame(tick);
    };

    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-110m.json')
      .then(r => r.json())
      .then(topo => { land = topojson.feature(topo, topo.objects.land); })
      .catch(() => {});

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [size]);

  const R = size * 0.39;
  const c = size / 2;

  return (
    <div style={{ position: 'relative', width: size, height: size, background: bg }}>
      <style>{`
        @keyframes gl-cw  { to { transform: rotate(360deg); } }
        @keyframes gl-ccw { to { transform: rotate(-360deg); } }
        @keyframes gl-pulse {
          0%,100% { opacity:.35; transform: scale(1); }
          50%     { opacity:.8;  transform: scale(1.04); }
        }
        .gl-whirl-a,.gl-whirl-b,.gl-swoosh,.gl-pulse {
          transform-origin: ${c}px ${c}px;
        }
        .gl-whirl-a { animation: gl-cw  3.2s linear infinite; }
        .gl-whirl-b { animation: gl-ccw 4.8s linear infinite; }
        .gl-swoosh  { animation: gl-cw  1.6s cubic-bezier(.65,.02,.35,.98) infinite; }
        .gl-pulse   { animation: gl-pulse 2.4s ease-in-out infinite; }
      `}</style>


      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}
           style={{ position: 'absolute', inset: 0 }} aria-label="Loading">
        <path d={d3.geoPath(d3.geoOrthographic().scale(R).translate([c,c]).clipAngle(90))({type:'Sphere'}) ?? ''}
              fill="#ece8e1" stroke={ink} strokeWidth="1"/>
        <path ref={gratRef} fill="none" stroke={ink} strokeWidth="0.4" opacity="0.22"/>
        <path ref={landRef} fill={ink} stroke={ink} strokeWidth="0.3" strokeLinejoin="round"/>
        <circle cx={c} cy={c} r={R-1} fill="none" stroke={ink} strokeWidth="0.6" opacity="0.15"/>
      </svg>
    </div>
  );
}