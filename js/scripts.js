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
		var nowPlayingHTML = imageHTML(nowPlayingData);
		$('#movie-grid').html(nowPlayingHTML);
		$('.movie-poster').click(function(){
			var thisMovieId = $(this).attr('movie-id');
			// console.log(thisMovieId);
			var thisMovieUrl = `${apiBaseUrl}/movie/${thisMovieId}?api_key=${apiKey}`;
			$.getJSON(thisMovieUrl, (thisMovieData)=>{
				$('#myModalLabel').html(thisMovieData.title);
				$('.modal-body').html(modalBodyInfo(thisMovieData));
				$('.modal-footer').html(thisMovieData.runtime + " minutes");
				$('#myModal').modal();
				console.log(thisMovieData)

			var castURL = `${apiBaseUrl}/movie/${thisMovieId}/credits?api_key=${apiKey}`;
			$.getJSON(castURL, (thisCastData)=>{
				console.log(thisCastData)
				// console.log(thisMovieId)
				$('.mod-body').html(castData(thisCastData));
				// console.log(thisCastData.cast[0].name)

			});

			});
				

			
		});

		$grid = $('#movie-grid').isotope({
			itemSelector: '.movie-poster'
		});
		$grid.imagesLoaded().progress(function(){
			$grid.isotope('layout')
		})
		$('#adventure').click(function(){
			$grid.isotope({ filter: 'Adventure'});
			
		});
		$('#action').click(function(){
			$grid.isotope({ filter: 'Action'});
			
		});
		$('#all-genres').click(function(){
			$grid.isotope({ filter: ''});
			
		});

		
		
	});

	$('#movie-form').submit((event)=>{
		event.preventDefault();
		var userInput = encodeURI($('#search-input').val());
		$('#search-input').val('');
		var searchUrl = apiBaseUrl + '/search/movie?query='+ userInput + '&api_key=' + apiKey;
		// var actorUrl = `${apiBaseUrl}/person/${person_id}?api_key=${apiKey}`;
		// console.log(searchUrl);
		$.getJSON(searchUrl, (searchMovieData)=>{
			var searchMovieHTML = imageHTML(searchMovieData);
			$('#movie-grid').html(searchMovieHTML);
			$('.movie-poster').click(function(){
				var thisMovieId = $(this).attr('movie-id');
				var searchedMovieUrl = `${apiBaseUrl}/movie/${thisMovieId}?api_key=${apiKey}`;
				// console.log(thisMovieId);
				// console.log(searchMovieData);

				$.getJSON(searchedMovieUrl, (oldMovieData)=>{
					$('#myModalLabel').html(oldMovieData.title);
					$('.modal-body').html(modalBodyInfo(oldMovieData));
					$('.modal-footer').html(oldMovieData.runtime + " minutes");
					$('#myModal').modal();
					console.log(oldMovieData)


				var castURL = `${apiBaseUrl}/movie/${thisMovieId}/credits?api_key=${apiKey}`;
				$.getJSON(castURL, (thisCastData)=>{
					console.log(thisCastData)
				// console.log(thisMovieId)
				$('.mod-body').html(castData(thisCastData));
				// console.log(thisCastData.cast[0].name)

			});

			});


		});
			
		

		});

	});

	function imageHTML(data){
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

	function modalBodyInfo(thisMovie){
		var modHTML = '';

		for (let i = 0; i < thisMovie.genres.length; i++){
			modHTML += '<div class="genre">' + '<strong>' + thisMovie.genres[i].name + '</strong>' + '</div>';		
		}

		modHTML += '<div>' + thisMovie.overview + '</div>';
		modHTML += '<div>' + thisMovie.release_date + '</div>';
		modHTML += '<div class="rating">' + 'Rating out of 10:' + " " + '<strong>' + thisMovie.vote_average + '</strong>' + '</div>';
		// modHTML += '<div class="cast">' + thisMovie.cast[0].name + thisMovie.cast[1].name + thisMovie.cast[2].name + '</div';

		
		return modHTML;

	}

	function castData(theCast){
		castHTML = '';
		for (let i = 0; i < 4; i++){
			castHTML += '<div>' + theCast.cast[i].name + '</div>';
		}
		return castHTML;

	}

	


});

