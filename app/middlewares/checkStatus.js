module.exports = function checkStatus(unsplashRes) {
	if (unsplashRes.ok) {
		return unsplashRes.json()
	} else if (unsplashRes.url.includes('users')) {
		return new Error('User not found!')
	}
	else {
		throw new Error(`There was an error getting the photos: ${unsplashRes.statusText}`)
	}
}
