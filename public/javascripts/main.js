$(function() {
    //alert("Hello World");
	var api_key = '056315a59749a59d691a6476f262a589:3:74337495';

	//movie search page functions
	$('#movie_search_frm').submit(function(event) {
		event.preventDefault();
		var keyword = $('#keyword_box').val();
		var err = $('#error_msg');
		var movie_container = $('#movie_results_box');

		if(!(keyword===null) && !(keyword===" ") && !(keyword==="")) {
			err.css('visibility','hidden');
			keyword = encodeURIComponent(keyword);
			//console.log(keyword);
			//keyword = keyword.replace(/%20/g,"+");
			//console.log(keyword);

			var rootURL = '//api.nytimes.com/svc/movies/v2/reviews/search';
			
			//ajax call to build list of movie titles
			$.ajax({
				method: "GET",
				url: rootURL,
				data: {"query": keyword, order:'by-title', "api-key": api_key}
				
			}).done(function(data){
				
				movie_container.empty();
				movie_container.append("<h2>Results: </h2>");
				for(i=0; i < data.results.length; i++) {
					movie_container.append("<div><a class='m_link' href='/movies/" + data.results[i].nyt_movie_id + "'>" + 
						data.results[i].display_title + "</a></div>");
				}
			});

		} else {
			console.log(keyword.val);
			err.text("Please enter a valid search criteria.");
			err.css('visibility','visible');
		}

		//new user registration cancel button
		$('#cancel_user_btn').click(function(evt){
			evt.preventDefault();
		});
	});

	//add focus/blur effect to email input login field
	$('#email').focus(inputEnter);
	$('#password').focus(inputEnter);
	$('#keyword_box').focus(inputEnter);
	$('#email_box').focus(inputEnter); //registration email
	$('#password_box').focus(inputEnter); //registration password

	$('#email').blur(inputExit);
	$('#password').blur(inputExit);
	$('#keyword_box').blur(inputExit);
	$('#email_box').blur(inputExit); 
	$('#password_box').blur(inputExit);
	
	function inputEnter() {
		$(this).css('border','2px solid red');
	}

	function inputExit() {
		$(this).css('border','2px solid white');
	}


});	
