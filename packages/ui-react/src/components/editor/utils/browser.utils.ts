export const supportsEyeDropper = 'EyeDropper' in window;

export const pickFromEyeDropper = async () => {
  if (!supportsEyeDropper) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eyeDropper = new (window as any).EyeDropper();
  const color = await eyeDropper.open();
  return color.sRGBHex;
};
