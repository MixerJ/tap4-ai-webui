import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Container from '@/components/common/Container';
import PageHero from '@/components/common/PageHero';

export default function Page() {
  const t = useTranslations('FooterNavigation.termsConditions');

  return (
    <div className='w-full'>
      <PageHero title={t('1-h1')} description={t('1-p')} variant='compact' />
      <Container className='py-10 lg:py-16'>
        <div className='prose prose-invert mx-auto max-w-4xl prose-headings:text-white prose-p:text-white/80 prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-li:text-white/80'>
          <h2>{t('2-h2')}</h2>
          <ul>
            <li>{t('2-p')}</li>
          </ul>

          <h2>{t('3-h2')}</h2>
          <ul>
            <li>{t('3-p')}</li>
          </ul>

          <h2>{t('4-h2')}</h2>
          <ul>
            <li>
              {t('4-p')}{' '}
              <Link href='/terms-of-service' className='font-bold text-white hover:text-white'>
                {t('terms-of-service')}
              </Link>
            </li>
          </ul>

          <h2>{t('5-h2')}</h2>
          <ul>
            <li>{t('5-p')}</li>
          </ul>

          <h2>{t('6-h2')}</h2>
          <ul>
            <li>{t('6-p')}</li>
          </ul>

          <h2>{t('7-h2')}</h2>
          <ul>
            <li>{t('7-p')}</li>
          </ul>

          <p>{t('last-p')}</p>
        </div>
      </Container>
    </div>
  );
}
