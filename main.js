var displayFeed = function(response) {
  
	var allEntries = response.feed.entry;

	var container = document.querySelector('.related_posts_container');
  var numbers = [];
	

	for (var i = 0; i < allEntries.length; i++) {

    if (typeof maxNoPosts !== 'undefined') {
			if (i >= maxNoPosts) {
				break;
			}	
		}
    
        var number;

		while(true){
			number = Math.floor(Math.random() * allEntries.length);
			if (numbers.indexOf(number) !== -1) {
				console.log("Number is already present: " + number);
			}else{
				numbers.push(number);
				break;
			}		
		}
    
		var singleRowDiv = document.createElement('div');
		var thumbnailImg = document.createElement('img');
		var postHeadingDiv = document.createElement('div');
        var postPublishedDiv = document.createElement('div');
		var postDetailDiv = document.createElement('div');
		var readMoreDiv = document.createElement('div');
		var readMoreAnchor = document.createElement('a');

		var thumbnailUrl = "http://2.bp.blogspot.com/-ex3V86fj4dQ/UrCQQa4cLsI/AAAAAAAAFdA/j2FCTmGOrog/s1600/no-thumbnail.png";
		var readMoreUrl = "";
		var publishedAt = "";
		var postHeading = "";
		var content = "";
		
		for(var x in allEntries[number]){
			var singleEntry = allEntries[number][x];

			console.log(x);
			if (x === "media$thumbnail") {
				//Thumbnail url
				thumbnailUrl = singleEntry.url;
			}
			if (x === "link") {
				var links = singleEntry;

				for (var j = 0; j < links.length; j++) {
					for(var y in links[j]){
						if (y === "rel" && links[j][y] === "alternate" ) {
							//Post's url
							readMoreUrl = links[j]["href"];
						}
					}
				}
			}
			if (x === "title") {
				if(singleEntry.$t){
					//Post's Title
					postHeading = singleEntry.$t;
				}
			}
			if (x === "published") {
				if(singleEntry.$t){
					//Post's Published Date
					publishedAt = singleEntry.$t.slice(0,singleEntry.$t.indexOf('T'));
					
				}	
			}
			if (x === "summary") {
				//console.log(singleEntry["$t"]);
				var html = singleEntry["$t"];
				var div = document.createElement("div");
				div.innerHTML = html;
				content = div.textContent || div.innerText || "";
				
			}
		}

		thumbnailImg.src = thumbnailUrl;

		readMoreAnchor.href = readMoreUrl;
		readMoreAnchor.textContent = "Read More";
		readMoreAnchor.setAttribute("target","_blank");
		
		postHeadingDiv.textContent = postHeading;
        postPublishedDiv.textContent = publishedAt;
		postDetailDiv.textContent = content;

		singleRowDiv.classList.add('post_single_row');
		thumbnailImg.classList.add('thumbnail');
		readMoreDiv.classList.add('read_more');
		postHeadingDiv.classList.add('post_heading');
        postPublishedDiv.classList.add('post_published');
		postDetailDiv.classList.add('details');

		readMoreDiv.appendChild(readMoreAnchor);

		singleRowDiv.appendChild(thumbnailImg);
		singleRowDiv.appendChild(postHeadingDiv);
        singleRowDiv.appendChild(postPublishedDiv);
		singleRowDiv.appendChild(postDetailDiv);
		singleRowDiv.appendChild(readMoreDiv);
		container.appendChild(singleRowDiv);
	}
}