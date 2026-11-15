export const TOOL_LOCALES = ['en', 'cn', 'tw', 'de', 'es', 'fr', 'jp', 'pt', 'ru'] as const;
export type ToolLocale = (typeof TOOL_LOCALES)[number];
export type ToolCopy = { title: string; description: string; detail: string };
export type ToolTranslations = Partial<Record<ToolLocale, ToolCopy>>;

export function getAvailableToolLocales(translations?: ToolTranslations): ToolLocale[] {
  return TOOL_LOCALES.filter((locale) => {
    const copy = translations?.[locale];
    if (!copy?.title.trim() || !copy.description.trim() || !copy.detail.trim()) return false;
    // A translated heading above a copied English body is not a localized edition.
    return locale === 'en' || copy.detail.trim() !== translations?.en?.detail.trim();
  });
}

export function resolveToolContent(original: ToolCopy, translations: ToolTranslations | undefined, locale: string) {
  const available = getAvailableToolLocales(translations);
  const requested = available.find((candidate) => candidate === locale);
  const contentLocale = requested || available.find((candidate) => candidate === 'en');
  const copy = contentLocale ? translations?.[contentLocale] : undefined;
  return {
    ...(copy || original),
    contentLocale,
    canonicalLocale: requested || 'en',
    isFallback: !requested,
    availableLocales: available,
  };
}
