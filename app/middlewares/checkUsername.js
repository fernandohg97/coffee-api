module.exports = function checkUsername (req, res) {

	// Get the username
	let { username } = req.body

	if (username) {
		req.params.username = username
		return res.redirect(`/unsplash/users/${req.params.username}/photos`)
	} else { return res.status(400).send({ message: 'Please enter a username'}) }
}
