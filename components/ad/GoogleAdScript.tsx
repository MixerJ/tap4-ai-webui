import Script from 'next/script';

interface GoogleAdScriptProps {
  googleAdScriptUrl: string;
}

export default function GoogleAdScript({ googleAdScriptUrl }: GoogleAdScriptProps) {
  return <Script async src={googleAdScriptUrl} crossOrigin='anonymous' strategy='afterInteractive' />;
}
