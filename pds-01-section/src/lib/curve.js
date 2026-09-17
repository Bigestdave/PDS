/**
 * Catmull-Rom spline to cubic Bezier path converter for SVG.
 * Produces institutional-grade smooth continuous curves.
 */
export function catmullRom2bezier(points, tension = 0.5) {
  if (!points || points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x},${points[0].y}`;

  let d = `M ${points[0].x.toFixed(2)},${points[0].y.toFixed(2)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i !== points.length - 2 ? points[i + 2] : p2;

    const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension;

    const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension;

    d += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }

  return d;
}

/**
 * Builds the SVG closed path polygon area between two point series.
 */
export function buildAreaPath(topPoints, bottomPoints) {
  if (!topPoints.length || !bottomPoints.length) return "";
  const topPath = catmullRom2bezier(topPoints);
  const revBottom = [...bottomPoints].reverse();
  const bottomSegments = [];

  for (let i = 0; i < revBottom.length - 1; i++) {
    const p0 = i > 0 ? revBottom[i - 1] : revBottom[i];
    const p1 = revBottom[i];
    const p2 = revBottom[i + 1];
    const p3 = i !== revBottom.length - 2 ? revBottom[i + 2] : p2;

    const cp1x = p1.x + ((p2.x - p0.x) / 6) * 0.5;
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * 0.5;

    const cp2x = p2.x - ((p3.x - p1.x) / 6) * 0.5;
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * 0.5;

    bottomSegments.push(
      `C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`
    );
  }

  return `${topPath} L ${revBottom[0].x.toFixed(2)},${revBottom[0].y.toFixed(2)} ${bottomSegments.join(" ")} Z`;
}
