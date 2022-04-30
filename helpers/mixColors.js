export default function mixColors(hex1, hex2, percentage){
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);

    const final = {
        r: (rgb1.r * percentage)+( rgb2.r * (1 - percentage) ),
        g: (rgb1.g * percentage)+( rgb2.g * (1 - percentage) ),
        b: (rgb1.b * percentage)+( rgb2.b * (1 - percentage) )
    }

    return `rgb(${final.r},${final.g},${final.b})`;
};
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}