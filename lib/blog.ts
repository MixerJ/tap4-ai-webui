import BLOG_POSTS_HOT_DEVELOPER from './blog/posts/hotDeveloper';
import BLOG_POSTS_HOT_GENERAL from './blog/posts/hotGeneral';
import BLOG_POSTS_HOT_PRODUCT_OPS from './blog/posts/hotProductOps';
import BLOG_POSTS_LEGACY from './blog/posts/legacy';
import { BlogPost } from './blog/types';

export type { BlogPost } from './blog/types';

export const BLOG_POSTS: BlogPost[] = [
  ...BLOG_POSTS_LEGACY,
  ...BLOG_POSTS_HOT_DEVELOPER,
  ...BLOG_POSTS_HOT_GENERAL,
  ...BLOG_POSTS_HOT_PRODUCT_OPS,
];
