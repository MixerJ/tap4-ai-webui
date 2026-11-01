export default function isAdConfigured(adSlot: string): boolean {
  return (
    process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true' &&
    Boolean(process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim()) &&
    Boolean(adSlot.trim())
  );
}
