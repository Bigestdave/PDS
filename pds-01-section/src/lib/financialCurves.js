/**
 * Generates realistic institutional market curves with subtle micro-fluctuations
 * matching high-frequency order book data, while anchored to exact keyframes.
 */

// Simple deterministic pseudo-random generator for reproducible jitter
function pseudoNoise(seed) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function generateMarketCurve(keyframes, stepCount = 60, noiseAmp = 0.6) {
  const points = [];
  
  for (let i = 0; i < keyframes.length - 1; i++) {
    const k1 = keyframes[i];
    const k2 = keyframes[i + 1];
    const steps = Math.max(4, Math.round(((k2.x - k1.x) / (keyframes[keyframes.length - 1].x - keyframes[0].x)) * stepCount));
    
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      // Smooth cubic interpolation
      const smoothT = t * t * (3 - 2 * t);
      const x = k1.x + (k2.x - k1.x) * t;
      const baseY = k1.y + (k2.y - k1.y) * smoothT;
      
      // Micro-jitter that fades near exact keyframe anchors (especially entry/target)
      const anchorDist = Math.min(t, 1 - t) * 2;
      const noise = (pseudoNoise(x * 1.37) - 0.5) * noiseAmp * anchorDist;
      
      points.push({ x: Number(x.toFixed(1)), y: Number((baseY + noise).toFixed(2)) });
    }
  }
  
  const lastKey = keyframes[keyframes.length - 1];
  points.push({ x: lastKey.x, y: lastKey.y });
  return points;
}

export function pointsToSvgPath(points) {
  if (!points || points.length === 0) return "";
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i].x},${points[i].y}`;
  }
  return d;
}

export function buildAreaPolygon(topPoints, bottomPoints) {
  if (!topPoints.length || !bottomPoints.length) return "";
  let d = `M ${topPoints[0].x},${topPoints[0].y}`;
  for (let i = 1; i < topPoints.length; i++) {
    d += ` L ${topPoints[i].x},${topPoints[i].y}`;
  }
  for (let i = bottomPoints.length - 1; i >= 0; i--) {
    d += ` L ${bottomPoints[i].x},${bottomPoints[i].y}`;
  }
  d += " Z";
  return d;
}
