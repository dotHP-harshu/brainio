import { Helmet } from "react-helmet-async";

interface HelmetSeoProps {
  title: string;
  description: string;
  keywords?: string;
}
function HelmetSeo({ title, description, keywords }: HelmetSeoProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
    </Helmet>
  );
}

export default HelmetSeo;
