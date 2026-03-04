'use client';

/* eslint-disable no-console */

import { useEffect, useState } from 'react';

/**
 * AdSense 诊断工具
 * 帮助排查广告无法显示的问题
 */
export default function AdSenseDiagnostic() {
  const [diagnostics, setDiagnostics] = useState<Record<string, any>>({});

  useEffect(() => {
    const runDiagnostics = () => {
      const results: Record<string, any> = {};

      // 1. 检查环境变量
      results.adsenseEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED;
      results.adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
      results.envConfigured = !!(results.adsenseEnabled && results.adsenseClientId);

      // 2. 检查 AdSense 脚本是否加载
      const scripts = Array.from(document.scripts);
      const adSenseScript = scripts.find((s) => s.src.includes('adsbygoogle.js'));
      results.scriptLoaded = !!adSenseScript;
      results.scriptSrc = adSenseScript?.src || 'Not found';

      // 3. 检查 adsbygoogle 对象
      results.adsbyGoogleExists = !!(window as any).adsbygoogle;
      results.adsbyGoogleLength = (window as any).adsbygoogle?.length || 0;

      // 4. 检查广告元素
      const adElements = document.querySelectorAll('ins.adsbygoogle');
      results.adElementsCount = adElements.length;
      results.adElements = Array.from(adElements).map((el, idx) => ({
        index: idx,
        dataAdClient: el.getAttribute('data-ad-client'),
        dataAdSlot: el.getAttribute('data-ad-slot'),
        dataAdStatus: el.getAttribute('data-ad-status'),
        dataAdFormat: el.getAttribute('data-ad-format'),
      }));

      // 5. 检查同意状态
      const consentData = localStorage.getItem('user_consent_preferences');
      if (consentData) {
        try {
          const consent = JSON.parse(consentData);
          results.consentGiven = consent.preferences?.advertising || false;
          results.consentData = consent;
        } catch (e) {
          results.consentError = 'Failed to parse consent data';
        }
      } else {
        results.consentGiven = 'No consent data';
      }

      // 6. 检查广告拦截器
      results.adBlockerDetected = !(window as any).adsbygoogle || adElements.length === 0;

      setDiagnostics(results);

      // 输出到控制台
      console.group('🔍 AdSense 诊断结果');
      console.log('1️⃣ 环境变量配置:', results.envConfigured ? '✅' : '❌');
      console.log('   - ADSENSE_ENABLED:', results.adsenseEnabled);
      console.log('   - ADSENSE_CLIENT_ID:', results.adsenseClientId);
      console.log('');
      console.log('2️⃣ AdSense 脚本加载:', results.scriptLoaded ? '✅' : '❌');
      console.log('   - Script URL:', results.scriptSrc);
      console.log('');
      console.log('3️⃣ adsbygoogle 对象:', results.adsbyGoogleExists ? '✅' : '❌');
      console.log('   - 广告队列长度:', results.adsbyGoogleLength);
      console.log('');
      console.log('4️⃣ 广告元素:', results.adElementsCount > 0 ? '✅' : '❌');
      console.log('   - 找到', results.adElementsCount, '个广告位');
      results.adElements.forEach((ad: any) => {
        console.log(`   - 广告 #${ad.index + 1}:`, {
          client: ad.dataAdClient,
          slot: ad.dataAdSlot,
          status: ad.dataAdStatus || 'pending',
          format: ad.dataAdFormat,
        });
      });
      console.log('');
      console.log('5️⃣ 用户同意状态:', results.consentGiven === true ? '✅' : '⚠️');
      console.log('   - 广告Cookie同意:', results.consentGiven);
      console.log('');
      console.log('6️⃣ 广告拦截检测:', results.adBlockerDetected ? '⚠️ 可能被拦截' : '✅');
      console.groupEnd();
    };

    // 延迟执行，等待广告加载
    setTimeout(runDiagnostics, 3000);
  }, []);

  // 开发环境显示诊断面板
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className='fixed bottom-4 right-4 z-[10000] max-w-md rounded-lg border border-yellow-500/50 bg-slate-900/95 p-4 text-xs text-white shadow-xl backdrop-blur-lg'>
      <div className='mb-2 flex items-center gap-2'>
        <span className='text-yellow-500'>🔍</span>
        <strong className='text-yellow-500'>AdSense 诊断</strong>
        <button
          type='button'
          onClick={() => window.location.reload()}
          className='ml-auto rounded bg-white/10 px-2 py-1 hover:bg-white/20'
        >
          刷新
        </button>
      </div>

      <div className='space-y-1'>
        <div>
          环境变量: {diagnostics.envConfigured ? '✅' : '❌'}
          {!diagnostics.envConfigured && <span className='text-red-400'> - 请检查 .env.local</span>}
        </div>
        <div>
          脚本加载: {diagnostics.scriptLoaded ? '✅' : '❌'}
          {!diagnostics.scriptLoaded && <span className='text-red-400'> - AdSense 脚本未加载</span>}
        </div>
        <div>
          广告对象: {diagnostics.adsbyGoogleExists ? '✅' : '❌'}
          {!diagnostics.adsbyGoogleExists && <span className='text-red-400'> - 可能被广告拦截器屏蔽</span>}
        </div>
        <div>
          广告元素: {diagnostics.adElementsCount || 0} 个
          {diagnostics.adElementsCount === 0 && <span className='text-red-400'> - 未找到广告位</span>}
        </div>
        <div>
          用户同意: {diagnostics.consentGiven === true ? '✅' : '⚠️'}
          {diagnostics.consentGiven !== true && <span className='text-yellow-400'> - 需要同意广告Cookie</span>}
        </div>
      </div>

      <div className='mt-2 border-t border-white/10 pt-2 text-[10px] text-white/60'>打开控制台查看详细信息</div>
    </div>
  );
}
