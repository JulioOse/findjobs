$(document).ready(function() {
	/* Search function   */
	$('.searchB').click(function() {
		$('.content').html('')
		$('.numJobs').html('')
		$('.footer').html('')
		var baseUrl = 'https://api.usa.gov/jobs/search.json?'
		if($('input[name="jobT"]').val() != '') {
			var $title = $('input[name="jobT"]').val().split(' ');
			var arrayT = [];
			for(x in $title) {
				arrayT.push($title[x] + '+')
			}
			var stringT = arrayT.join('');
			stringT = stringT.slice(0, -1);
			baseUrl = baseUrl + 'query=' + stringT + '&size=100';
		}
		
		/* API get request and add data to html document    */
		$.ajax({
		type: 'GET',
		url: baseUrl,
		crossDomain: true,
	    dataType: 'jsonp',
		success: function(data) { 
			var counter = 0;
			 for(var currentObj in data) {
				 counter++
				var htmlRe = '<strong>Job Title: </strong> <em style="text-decoration: underline">' + data[currentObj]["position_title"] + '</em><br>';
				htmlRe = htmlRe + '<strong>Organization Name: ' + data[currentObj]["organization_name"] + '</strong><br>';
				if(data[currentObj]["end_date"] !== null) {
					htmlRe = htmlRe + '<strong>Apply By: ' + data[currentObj]["end_date"] + '</strong><br>';
				}
				else {
					htmlRe = htmlRe + '<strong>Apply By: Not available</strong><br>'
				}
				htmlRe = htmlRe + '<strong>Locations: ' + data[currentObj]["locations"] + '</strong><br>';
				htmlRe = htmlRe + '<div class="link-bt"><a href=' + data[currentObj]["url"] + ' target="_blank">Learn More</a></div>'
				$('.content').append('<div class="contentObj">' + htmlRe + '</div>')
			} 
			$('.numJobs').append('<h3>Total Jobs: ' + counter + '</h3>')
			if(counter > 0) {
				$('.footer').append('<a href="#top" style="text-align: center"><h3>Back To Top</h3></a>')
			}
		  }  
		})
	})
})
