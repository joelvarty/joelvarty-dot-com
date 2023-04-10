import ReactGA from 'react-ga4'

export const GTAGID = "G-JLWKVSZFV2"
//const GA_TRACKING_ID = "UA-18470030-1"

export const initGA = () => {
	ReactGA.initialize(GTAGID)
}

export const logPageView = (url) => {

	ReactGA.set({ page: url })
	ReactGA.send({ hitType: "pageview", page: url });
}

export const logItemID = (id, item_type) => {
	console.log("Log item", id, item_type)
	ReactGA.event("item_view", {

		currency: "USD",
		value: 0,
		items: [
			{
				item_id: `${id}`,
				// item_name: "Stan and Friends Tee",
				// affiliation: "Google Merchandise Store",
				// coupon: "SUMMER_FUN",
				// discount: 2.22,
				// index: 0,
				item_brand: "Agility",
				item_category: item_type,
				// item_category2: "Adult",
				// item_category3: "Shirts",
				// item_category4: "Crew",
				// item_category5: "Short sleeve",
				// item_list_id: "related_products",
				// item_list_name: "Related Products",
				// item_variant: "green",
				// location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
				price: 0.0,
				quantity: 1
			}
		]
	}
	);
}

export const logEvent = (category = '', action = '') => {
	if (category && action) {
		ReactGA.event({ category, action })
	}
}

export const logException = (description = '', fatal = false) => {
	if (description) {
		ReactGA.exception({ description, fatal })
	}
}