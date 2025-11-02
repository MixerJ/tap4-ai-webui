import { useTranslations } from 'next-intl';

import Container from '@/components/common/Container';
import PageHero from '@/components/common/PageHero';

export default function Page() {
  const t = useTranslations('FooterNavigation.privacyPolicy');

  return (
    <div className='w-full'>
      <PageHero title={t('1-h1')} description={t('1-p')} variant='compact' />
      <Container className='py-10 lg:py-16'>
        <div className='prose prose-invert mx-auto max-w-4xl prose-headings:text-white prose-p:text-white/80 prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-li:text-white/80'>
          <h1>{t('1-h1')}</h1>
          <p>{t('1-p')}</p>

          <h2>{t('2-h2')}</h2>
          <p>{t('2-p')}</p>

          <h2>{t('3-h2')}</h2>
          <p>{t('3-p')}</p>

          <h2>{t('4-h2')}</h2>
          <p>{t('4-p')}</p>

          <h2>{t('5-h2')}</h2>
          <p>{t('5-p-1')}</p>
          <ul>
            <li>{t('5-li-1')}</li>
            <li>{t('5-li-2')}</li>
            <li>{t('5-li-3')}</li>
            <li>{t('5-li-4')}</li>
          </ul>
          <p>{t('5-p-2')}</p>

          <h2>{t('6-h2')}</h2>
          <p>{t('6-p')}</p>

          <h2>{t('7-h2')}</h2>
          <p>{t('7-p')}</p>

          <h2>{t('8-h2')}</h2>
          <p>{t('8-p')}</p>
        </div>
      </Container>
    </div>
  );
}
