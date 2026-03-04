export interface BlogPost {
  id: string;
  slug: string;
  title: {
    en: string;
    cn: string;
    tw?: string;
    de?: string;
    es?: string;
    fr?: string;
    jp?: string;
    pt?: string;
    ru?: string;
  };
  excerpt: {
    en: string;
    cn: string;
    tw?: string;
    de?: string;
    es?: string;
    fr?: string;
    jp?: string;
    pt?: string;
    ru?: string;
  };
  content: {
    en: string;
    cn: string;
    tw?: string;
    de?: string;
    es?: string;
    fr?: string;
    jp?: string;
    pt?: string;
    ru?: string;
  };
  author: string;
  date: string;
  category: string;
  tags: string[];
  image?: string;
  downloadLinks?: {
    googlePlay?: string;
    appStore?: string;
  };
}
