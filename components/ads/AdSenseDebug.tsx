'use client';

import { useEffect, useState } from 'react';

/**
 * AdSense 调试信息显示
 * 仅在开发环境显示，帮助调试环境变量和脚本加载
 */
export default function AdSenseDebug() {
  const [mounted, setMounted] = useState(false);
  const [scriptStatus, setScriptStatus] = useState('checking...');

  useEffect(() => {
    setMounted(true);

    // 检查脚本加载状态
    const checkScript = setInterval(() => {
      if ((window as any).adsbygoogle) {
        setScriptStatus('✅ 已加载');
        clearInterval(checkScript);
      }
    }, 500);

    // 30秒后停止检查
    setTimeout(() => {
      clearInterval(checkScript);
      if (!(window as any).adsbygoogle) {
        setScriptStatus('❌ 未加载');
      }
    }, 30000);

    return () => clearInterval(checkScript);
  }, []);

  if (!mounted || process.env.NODE_ENV !== 'development') {
    return null;
  }

  const enabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED;
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <div className='fixed left-4 top-20 z-[10000] max-w-sm rounded-lg border border-green-500/50 bg-slate-900/95 p-4 text-xs text-white shadow-xl backdrop-blur-lg'>
      <div className='mb-2 font-bold text-green-500'>🐛 AdSense 调试</div>

      <div className='space-y-1'>
        <div>
          <strong>ADSENSE_ENABLED:</strong>
          <br />
          <code className='text-yellow-300'>{enabled || '未设置'}</code>
        </div>

        <div>
          <strong>ADSENSE_CLIENT_ID:</strong>
          <br />
          <code className='text-yellow-300'>{clientId ? `${clientId.substring(0, 20)}...` : '未设置'}</code>
        </div>

        <div className='border-t border-white/10 pt-2'>
          <strong>脚本状态:</strong> {scriptStatus}
        </div>

        <div>
          <strong>广告元素:</strong> {document.querySelectorAll('ins.adsbygoogle').length} 个
        </div>
      </div>

      <div className='mt-2 border-t border-white/10 pt-2 text-[10px] text-white/60'>
        环境变量必须以 NEXT_PUBLIC_ 开头
      </div>
    </div>
  );
}
