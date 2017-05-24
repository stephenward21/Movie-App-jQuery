$(document).ready(function(){
	// console.log("test");
	//All api calls to this link
	const apiBaseUrl = 'http://api.themoviedb.org/3';
	//Link for all images
	const imageBaseUrl = 'http://image.tmdb.org/t/p/';

	const nowPlayingUrl = apiBaseUrl + '/movie/now_playing?api_key=' + apiKey;
	// console.log(nowPlayingUrl)

	//Make AJAX request to nowPlayingUrl
	$.getJSON(nowPlayingUrl, (nowPlayingData)=>{
		// console.log(nowPlayingData);
		var nowPlayingHTML = getHTML(nowPlayingData);
		$('#movie-grid').html(nowPlayingHTML);
		$('.movie-poster').click(function(){
			var thisMovieId = $(this).attr('movie-id');
			console.log(thisMovieId);
			var thisMovieUrl = `${apiBaseUrl}/movie/${thisMovieId}?api_key=${apiKey}`;
			$.getJSON(thisMovieUrl, (thisMovieData)=>{
				$('#myModalLabel').html(thisMovieData.title);
				$('#myModal').modal();

			});
			
		});

		
		
	});

	$('#movie-form').submit((event)=>{
		event.preventDefault();
		var userInput = encodeURI($('#search-input').val());
		$('#search-input').val('');
		var searchUrl = apiBaseUrl + '/search/movie?query='+ userInput + '&api_key=' + apiKey;
		// console.log(searchUrl);
		$.getJSON(searchUrl, (searchMovieData)=>{
			var searchMovieHTML = getHTML(searchMovieData);
			$('#movie-grid').html(searchMovieHTML);

		});
	});

	function getHTML(data){
		var newHTML = '';
		for(let i = 0; i < data.results.length; i++){
			// console.log(nowPlayingData.results[i].poster_path);
			var posterUrl = imageBaseUrl + 'w300' + data.results[i].poster_path;
			newHTML += '<div class="col-sm-6 col-md-3 movie-poster" movie-id=' + data.results[i].id + '>';
				newHTML += `<img src="${posterUrl}">`;
			newHTML += `</div>`;
		}
		return newHTML;
		
	}

});

