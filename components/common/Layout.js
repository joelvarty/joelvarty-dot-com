import { getPageTemplate } from "components/agility-pageTemplates";
import { handlePreview } from "@agility/nextjs";
import { useRouter } from "next/router";
import Error from "next/error";
import PreviewBar from "./PreviewBar";
import SEO from "./SEO";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import LoadingWidget from "./LoadingWidget";

// set up handle preview
const handlingPreview = handlePreview();

function Layout(props) {
  const {
    page,
    sitemapNode,
    dynamicPageItem,
    notFound,
    pageTemplateName,
	isPreview,
	isDevelopment
  } = props;


  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  const router = useRouter();
  if (router.isFallback) {
    return <LoadingWidget message="Loading Page" />;
  }

  // if page not found, throw 404
  if (notFound === true) {
    return <Error statusCode={404} />;
  }

  const AgilityPageTemplate = getPageTemplate(pageTemplateName);

  if (dynamicPageItem?.seo?.metaDescription) {
    page.seo.metaDescription = dynamicPageItem.seo.metaDescription;
  }

  return (
    <>
      <SEO
        title={sitemapNode?.title}
        description={page.seo.metaDescription}
        keywords={page.seo.metaKeywords}
        metaHTML={page.seo.metaHTML}
      />
      <div id="site-wrapper">
        {handlingPreview && <LoadingWidget message="Loading Preview Mode" />}
        {!handlingPreview && (
          <div id="site">
			{ (isDevelopment || isPreview) &&
            <PreviewBar {...props} />
			}
            <div className="flex flex-col min-h-screen">
              <SiteHeader {...props} />
              <main className="flex-grow">
                <AgilityPageTemplate {...props} />
              </main>

            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Layout;
