export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || `https://${process.env.VERCEL_URL}`;

export const { GOOGLE_ADSENSE_URL, CONTACT_US_EMAIL } = process.env as Record<string, string>;

// GA 在客户端运行，必须使用 NEXT_PUBLIC_ 前缀才能在浏览器中可用
export const GOOGLE_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
