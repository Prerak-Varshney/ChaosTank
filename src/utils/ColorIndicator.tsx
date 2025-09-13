const getLevelColor = (currentWaterLevel: number) => {
        // Hue: 0 = red, 120 = green
    const hue = (currentWaterLevel * 120) / 100;
    return `hsl(${hue}, 80%, 50%)`;
};

const getWaterColor = (level: number) => {
    // Define stops: low (0%), mid (50%), high (100%)
    const colors = ["#023e8a", "#0077b6", "#48d2df"];
    if (level <= 50) {
    // Between low and mid
    const ratio = level / 50;
    return blendColors(colors[0], colors[1], ratio);
    } else {
    // Between mid and full
    const ratio = (level - 50) / 50;
    return blendColors(colors[1], colors[2], ratio);
    }
}
const blendColors = (c1: string, c2: string, ratio: number) => {
    const hex = (c: string) => parseInt(c, 16);
    const r = Math.round(hex(c1.slice(1, 3)) * (1 - ratio) + hex(c2.slice(1, 3)) * ratio);
    const g = Math.round(hex(c1.slice(3, 5)) * (1 - ratio) + hex(c2.slice(3, 5)) * ratio);
    const b = Math.round(hex(c1.slice(5, 7)) * (1 - ratio) + hex(c2.slice(5, 7)) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
    };

export { getLevelColor, getWaterColor };