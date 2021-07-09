import React, { useState, useEffect } from 'react'

import { initGA, logPageView } from "../../lib/analytics"

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


	const [isGaLoaded, setIsGaLoaded] = useState(false)

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

	useEffect(() => {
		if (typeof (window) === undefined) return

		const handleRouteChange = (url) => {
			logPageView(url)
		};

		if (!window.GA_INITIALIZED) {
			initGA()
			handleRouteChange(location.pathname)
			window.GA_INITIALIZED = true
		}

		router.events.on("routeChangeComplete", handleRouteChange);

		return () => {
			if (typeof (window) === undefined) return
			router.events.off("routeChangeComplete", handleRouteChange);
		};

	}, [router.events]);

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
						{(isDevelopment || isPreview) &&
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
