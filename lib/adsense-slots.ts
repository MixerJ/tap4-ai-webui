/**
 * Google AdSense 广告单元 ID 配置
 *
 * 在 Google AdSense 控制台中创建广告单元后，
 * 将对应的 ad-slot ID 填写在这里
 *
 * 创建广告单元步骤：
 * 1. 登录 Google AdSense (https://www.google.com/adsense/)
 * 2. 进入"广告" → "按广告单元"
 * 3. 点击"新建广告单元"
 * 4. 选择广告类型（展示广告/信息流广告/文章内广告）
 * 5. 复制广告单元代码中的 data-ad-slot 值
 */

export const AD_SLOTS = {
  // 博客相关广告
  blog: {
    // 博客文章中间广告（推荐：展示广告 - 自适应）
    articleMiddle: '',

    // 博客文章结尾广告（推荐：展示广告 - 自适应）
    articleEnd: '',

    // 博客侧边栏广告（推荐：展示广告 - 竖版）
    sidebar: '',

    // 博客列表信息流广告（推荐：信息流广告）
    inFeed: '',
  },

  // 首页相关广告
  home: {
    // 首页底部广告（推荐：展示广告 - 横版）
    bottom: '',
  },

  // 探索页相关广告
  explore: {
    // 探索页底部广告（推荐：展示广告 - 自适应）
    bottom: '',
  },

  // 通用广告
  common: {
    // 通用响应式广告
    responsive: '',
  },
} as const;

// 广告配置类型
export type AdSlotConfig = typeof AD_SLOTS;

// 验证广告单元 ID 是否已配置
export function isAdSlotConfigured(adSlot: string): boolean {
  return adSlot !== '' && adSlot !== undefined && adSlot !== null;
}

// 获取所有未配置的广告位
export function getUnconfiguredSlots(): string[] {
  const unconfigured: string[] = [];

  const checkSlots = (obj: Record<string, any>, prefix = ''): void => {
    Object.entries(obj).forEach(([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null) {
        checkSlots(value, path);
      } else if (value === '') {
        unconfigured.push(path);
      }
    });
  };

  checkSlots(AD_SLOTS);
  return unconfigured;
}
