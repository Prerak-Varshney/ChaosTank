const getLevelColor = (currentWaterLevel: number) => {
        // Hue: 0 = red, 120 = green
    const hue = (currentWaterLevel * 120) / 100;
    return `hsl(${hue}, 80%, 50%)`;
};


// Gradient stops per theme
const themeGradients: Record<string, string[]> = {
Ocean: ["#1e3a8a", "#2563eb", "#60a5fa"],     // deep → medium → blue
  Sky: ["#0c4a6e", "#0284c7", "#38bdf8"],    // dark → medium → light sky
  Aqua: ["#023e8a", "#0077b6", "#48d2df"],    // dark → medium → aqua
  Purple: ["#3b0764", "#6d28d9", "#a78bfa"],  // deep → medium → purple
  default: ["#023e8a", "#0077b6", "#48d2df"], // fallback
};

const getWaterColor = (level: number, theme: string) => {
  const colors = themeGradients[theme] || themeGradients.default;

  if (level <= 50) {
    const ratio = level / 50;
    return blendColors(colors[0], colors[1], ratio);
  } else {
    const ratio = (level - 50) / 50;
    return blendColors(colors[1], colors[2], ratio);
  }
};

const blendColors = (c1: string, c2: string, ratio: number) => {
  const hex = (c: string) => parseInt(c, 16);
  const r = Math.round(hex(c1.slice(1, 3)) * (1 - ratio) + hex(c2.slice(1, 3)) * ratio);
  const g = Math.round(hex(c1.slice(3, 5)) * (1 - ratio) + hex(c2.slice(3, 5)) * ratio);
  const b = Math.round(hex(c1.slice(5, 7)) * (1 - ratio) + hex(c2.slice(5, 7)) * ratio);
  return `rgb(${r}, ${g}, ${b})`;
};

export { getLevelColor, getWaterColor };