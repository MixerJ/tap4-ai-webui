/**
 * Google AdSense ad-slot 配置中心
 *
 * 在 AdSense 广告单元代码里复制 data-ad-slot 的值（纯数字），填到对应位置。
 * 例如：<ins ... data-ad-slot="1234567890" ...>
 */
const AD_SLOT_IDS = {
  blog: {
    articleMiddle: '',
    articleEnd: '',
    sidebar: '',
    inFeed: '5246701249',
  },
  home: {
    bottom: '1041337705',
  },
  startup: {
    bottom: '3366643360',
  },
  category: {
    bottom: '4679725038',
  },
  explore: {
    bottom: '',
  },
  common: {
    responsive: '',
  },
} as const;

export default AD_SLOT_IDS;
