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
          console.log('✅ AdSense 脚本加载成功');
          console.log('window.adsbygoogle:', (window as any).adsbygoogle);
        }}
        onError={(e) => {
          console.error('❌ AdSense 脚本加载失败:', e);
        }}
      />
    </>
  );
}
