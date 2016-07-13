window.onload = function () {
	setInterval(refreshData, 5000);
}
function refreshData() {
	InOrNot = false;
	chrome.cookies.getAll({"domain":".facebook.com"}, function(cookies) {
		// run through all available cookies that got from facebook
		for (var i = 0; i < cookies.length; i++) {
			// determine if the current cookies is one that tell us either user is logged in or not
			if (cookies[i].name == "c_user" ) {
				InOrNot = true;
				console.log(localStorage.getItem("c_user"));
			}
		}
	})
}