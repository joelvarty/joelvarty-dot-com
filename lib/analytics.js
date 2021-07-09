import ReactGA from 'react-ga'

const GA_TRACKING_ID = "UA-18470030-1"

export const initGA = () => {
	ReactGA.initialize(GA_TRACKING_ID)
}

export const logPageView = (url) => {
console.log("PAGE VIEW", url)
	ReactGA.set({ page: url })
	ReactGA.pageview(url)

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