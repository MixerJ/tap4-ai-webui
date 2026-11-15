import byviewer from './tool-content/byviewer-com';
import img2 from './tool-content/img2-ai';
import searcherries from './tool-content/searcherries-com-keyword-clustering-tool';
import type { ToolTranslations } from './tool-localization';

export const TOOL_CONTENT_UPDATED_AT = '2026-11-15';

export const TOOL_CONTENT: Record<string, ToolTranslations> = {
  'img2-ai': img2,
  'searcherries-com-keyword-clustering-tool': searcherries,
  'byviewer-com': byviewer,
};
