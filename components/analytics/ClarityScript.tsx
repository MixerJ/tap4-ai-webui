'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

/**
 * Clarity 分析脚本组件
 *
 * 注意：Clarity 可能会尝试访问页面上的所有元素，包括 AdSense iframe。
 * 浏览器的同源策略会阻止访问跨域 iframe，这是正常且安全的行为。
 * 控制台中的 "Blocked a frame" 警告可以安全忽略，不会影响功能。
 */
export default function ClarityScript({ projectId }: { projectId: string }) {
  useEffect(() => {
    // 添加全局错误处理器，过滤已知的 AdSense iframe 跨域警告
    // 这些警告是正常的浏览器安全行为，不影响功能
    const handleError = (event: ErrorEvent) => {
      const errorMessage = event.message || '';
      const isAdSenseCrossOriginError =
        errorMessage.includes('Blocked a frame') &&
        (errorMessage.includes('doubleclick.net') || errorMessage.includes('googleads'));

      if (isAdSenseCrossOriginError) {
        // 阻止默认的错误处理（不显示在控制台）
        event.preventDefault();
        // 可以在这里添加日志记录，但不显示给用户
      }
      // 其他错误正常处理（不阻止默认行为）
    };

    try {
      // 初始化 Clarity
      Clarity.init(projectId);
    } catch (error) {
      // 静默处理 Clarity 初始化错误
      if (process.env.NODE_ENV === 'development') {
        console.warn('Clarity 初始化失败:', error);
      }
    }

    // 添加错误监听器（无论初始化是否成功）
    window.addEventListener('error', handleError, true);

    // 清理函数
    return () => {
      window.removeEventListener('error', handleError, true);
    };
  }, [projectId]);

  return null;
}
