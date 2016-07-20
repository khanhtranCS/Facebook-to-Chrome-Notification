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
				// make sure that the current user is match with the user from storage
				var user = localStorage.getItem("c_user");
				var user_alt = cookies[i].value.toString();
				if((a==b) && (localStorage.getItem("fbRssUrl") != "undefined")) {
					break;
				}
			} else {
				$.ajax ({
					url : 'http://facebook.com/notifications',
					success: function(data, status, xmlHttpRequest) {
						// store info about current user
						// console.log(data);
						localStorage.setItem("c_user", cookies[i].value);
						var first_rss= data.indexOf('rss20');
						var end_link = data.lastIndexOf("href='/feeds/notifications.php'", first_rss);
						localStorage.setItem('feedURL', 'http://facebook.com' + data.substring(end_link+6, first_rss+5).replace(/&amp;/g, '&')); 
					}
					error: function(xhr, ajaxOptions, thrownError) {
						console.log("thrownError");
					}
				})
			}
			break;
		}
		if (InorNot == false) {
			localStorage['feedURL'] = "undefined";
		}
		// check if the feed link is avaliable 
		if (InOrNot == true && localStorage.getItem('feedURL') != "undefined") {
			// fetch data using jquery's get
			$.ajax ({
				url: localStorage.getItem('feedURL');
				success: function(data, status, xmlHttpRequest) {
					var noti = [];
					var $xml = $(data);
					var count = 0;
					$xml.find('item').each(function() {
						var $info = $(this);

						// create info object
						var $info_obj = {
							guid: $this.find("guid").text().split('/')[2];
							title: $this.find("title").text(),
							link: $this.find("link").text(),
							description: $this.find("description").text(),
							pubDate: $this.find("pubDate").text(),
							author: $this.find("author").text(),
							seen: 0,
							notified: 0
						};
						notifs[count] = $info_obj;
						count++;
						});
					var seenHuh = localStorage.getItem("seenNotifsGuids");
					if (seenHuh == "" || seenHuh == undefined) {
						seenNotifsGuids = [];
					} else {
						seenNotifsGuids = JSON.parse(seenHuh);
						
					} 
				}
				error: function(xhr, ajaxOptions, thrownError) {
					console.log("thrownError");
				}
			});
		}
	})
}