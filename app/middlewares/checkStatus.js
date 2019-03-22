module.exports = function checkStatus(unsplashRes) {
	if (unsplashRes.ok) {
		return unsplashRes.json()
	} else {
		throw new Error(`There was an error getting the photos: ${unsplashRes.statusText}`)
	}
}
