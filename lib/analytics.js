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