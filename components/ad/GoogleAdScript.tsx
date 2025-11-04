import Script from 'next/script';

interface GoogleAdScriptProps {
  googleAdScriptUrl: string;
}

export default function GoogleAdScript({ googleAdScriptUrl }: GoogleAdScriptProps) {
  return (
    <>
      {/* Google AdSense Script */}
      <Script
        async
        src={googleAdScriptUrl}
        crossOrigin='anonymous'
        strategy='lazyOnload'
        onLoad={() => {
          // AdSense script loaded successfully
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log('✅ AdSense 脚本加载成功');
            // eslint-disable-next-line no-console
            console.log('window.adsbygoogle:', (window as any).adsbygoogle);
          }
        }}
        onError={(e) => {
          // Log error only in development
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.error('❌ AdSense 脚本加载失败:', e);
          }
        }}
      />
    </>
  );
}
