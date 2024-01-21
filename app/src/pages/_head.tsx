import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

type MyHeadProps = {
  id: string;
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
};

const MyHead = ({ id, title, description, image, keywords }: MyHeadProps): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const { query } = router;

  const getDefaultMeta = (prop: string): string => (id ? t(`META.${id}.${prop}`) : t('META.DEFAULT'));

  const getTitleMeta = (): string => {
    if (query.title && typeof query.title === 'string') return query.title;
    if (title) return title;
    return getDefaultMeta('TITLE');
  };

  const getDescriptionMeta = (): string => {
    if (query.description && typeof query.description === 'string') return query.description;
    if (description) return description;
    return getDefaultMeta('DESCRIPTION');
  };

  const _title = getTitleMeta();
  const _description = getDescriptionMeta();

  return (
    <Head>
      <title>{_title}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <meta name="twitter:card" content="summary" />
      <meta name="Keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={_description} />
      <meta property="description" content={_description} />
      <meta name="image" property="og:image" content={image} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default MyHead;
