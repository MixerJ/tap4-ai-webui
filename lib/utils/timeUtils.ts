import { getLanguageTagByLocale } from '@/i18n';

import dayjs from 'dayjs';

export function formatTime(time: number, format: string = 'HH:mm') {
  return dayjs(time).format(format);
}

/** 根据 locale 格式化当前月份（用于 Footer.subTitle 等） */
export function formatCurrentMonth(locale: string): string {
  const languageTag = getLanguageTagByLocale(locale);
  return new Intl.DateTimeFormat(languageTag, { month: 'long' }).format(new Date());
}
