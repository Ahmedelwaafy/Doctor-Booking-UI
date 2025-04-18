import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

type HelmetTagsProps = {
  title: string;
  description: string;
  keywords?: string;
  index?: boolean;
  children?: React.ReactNode;
  canonical?: string;
};

export default function HelmetTags({
  title,
  description = "InVitro Health",
  keywords,
  index = true,
  children,
  canonical,
}: HelmetTagsProps) {
  const { i18n } = useTranslation();
  const lng = i18n.language?.startsWith("ar") ? "ar" : "en";
  const baseURL = window.location.origin + "/" + lng;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {index && <link rel="canonical" href={`${baseURL}/${canonical}`} />}
      {index && <meta name="keywords" content={keywords} />}
      {!index && <meta name="robots" content="noindex, nofollow" />}
      
      {index && <meta property="og:title" content={title} />}
      {index && <meta property="og:description" content={description} />}
      {index && <meta property="og:type" content="website" />}
      
      {index && <meta name="twitter:title" content={title} />}
      {index && <meta name="twitter:description" content={description} />}
      {index && <meta name="twitter:card" content="summary_large_image" />}
      
      {children}
    </Helmet>
  );
}