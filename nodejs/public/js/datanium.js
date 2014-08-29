$(document).ready(function() {
	var ieVersion = getIEVersion();
	if (ieVersion > 0 && ieVersion < 9)
		window.setTimeout(ieVersionPop, 1000);
	if (loginUsername != null && loginUsername != '')
		showUser(loginUsername, loginUserEmail);
});

var showUser = function(username, email) {
	$('#userLabel').text(' ' + username);
	$('#userLink').attr('onclick', 'space();');
	if (loginUserEmail == null || loginUserEmail == '')
		loginUserEmail = email;
	if (loginUsername == null || loginUsername == '')
		loginUsername = username;
}

var login = function() {
	if (!validateLogin())
		return false;
	var link = '/login';
	$.ajax({
		url : link,
		type : 'POST',
		dataType : 'json',
		data : {
			email : $('#inputEmail').val(),
			password : $('#inputPassword').val(),
		},
		success : function(map) {
			if (map.status == 'login_success') {
				showUser(map.username, map.user_email);
				$('#loginModal').modal('hide');
			} else {
				if (map.status == 'email_not_exist') {
					$('#emailLabel').text(map.message);
					$('#emailLabel').show();
				} else {
					$('#emailLabel').hide();
				}
				if (map.status == 'password_not_match') {
					$('#passwordLabel').text(map.message);
					$('#passwordLabel').show();
				} else {
					$('#passwordLabel').hide();
				}
			}
		},
		error : function() {
			console.log(error);
		}
	});
}

var createAccount = function() {
	if (!validateSignUp())
		return false;
	var link = '/signup';
	$.ajax({
		url : link,
		type : 'POST',
		dataType : 'json',
		data : {
			username : $('#inputUsername2').val(),
			password : $('#inputPassword2').val(),
			email : $('#inputEmail2').val()
		},
		success : function(map) {
			if (map.status == 'create_user_success') {
				showUser(map.username, map.user_email);
				$('#signupModal').modal('hide');
			} else {
				if (map.status == 'email_exists') {
					$('#emailLabel2').text(map.message);
					$('#emailLabel2').show();
				} else {
					$('#emailLabel2').hide();
				}
				if (map.status == 'username_exists') {
					$('#usernameLabel2').text(map.message);
					$('#usernameLabel2').show();
				} else {
					$('#usernameLabel2').hide();
				}
				if (map.status == 'create_user_fail') {
					console.log('Server Error');
				}
				$('#inputPassword2').val('');
				$('#inputConfirmPassword2').val('');
			}

		},
		error : function() {
			console.log(error);
		}
	});
}

var validateSignUp = function() {
	var email = $('#inputEmail2').val();
	var username = $('#inputUsername2').val();
	var password = $('#inputPassword2').val();
	var confirmPassword = $('#inputConfirmPassword2').val();
	var count = 0;
	if (email == null || email == '') {
		$('#emailLabel2').text("This field is required.");
		$('#emailLabel2').show();
		count++;
	} else {
		$('#emailLabel2').hide();
	}
	if (username == null || username == '') {
		$('#usernameLabel').text("This field is required.");
		$('#usernameLabel').show();
		count++;
	} else {
		$('#usernameLabel').hide();
	}
	if (password == null || password == '') {
		$('#passwordLabel2').text("This field is required.");
		$('#passwordLabel2').show();
		count++;
	} else {
		$('#passwordLabel2').hide();
	}
	if (confirmPassword == null || confirmPassword == '') {
		$('#confirmLabel').text("This field is required.");
		$('#confirmLabel').show();
		count++;
	} else {
		$('#confirmLabel').hide();
	}
	if (password != null && password.length < 6) {
		$('#passwordLabel2').text("Ensure this value has at least 6 characters (it has " + password.length + ").");
		$('#passwordLabel2').show();
		count++;
	}
	if (password != null && password != '' && confirmPassword != null && confirmPassword != ''
			&& password != confirmPassword) {
		$('#confirmLabel').text("The two password fields didn't match.");
		$('#confirmLabel').show();
		$('#inputPassword2').val('');
		$('#inputConfirmPassword2').val('');
		count++;
	}
	if (count > 0) {
		$('#inputPassword2').val('');
		$('#inputConfirmPassword2').val('');
		return false;
	}
	return true;
}

var validateLogin = function() {
	var email = $('#inputEmail').val();
	var password = $('#inputPassword').val();
	var count = 0;
	if (email == null || email == '') {
		$('#emailLabel').text("This field is required.");
		$('#emailLabel').show();
		count++;
	} else {
		$('#emailLabel').hide();
	}
	if (password == null || password == '') {
		$('#passwordLabel').text("This field is required.");
		$('#passwordLabel').show();
		count++;
	} else {
		$('#passwordLabel').hide();
	}
	if (count > 0) {
		return false;
	}
	return true;
}

var showModal = function() {
	showTxtModal('Search Indicator by Topic', 'Processing...');
	var link = '/rest/query/topicSearch';
	$.ajax({
		url : link,
		type : 'get',
		dataType : 'json',
		success : function(map) {
			var html = '';
			if (map.length > 0) {
				// alert(1);
				html = '<div class="panel-group" id="accordion">';
				$.each(map, function(index, item) {
					html += createCollapse(index, item);
					// html+='<p></p>';
				});
				html += '</div>';
			}
			updateTxtModal(null, '', html);
			$('#txtmodal').find('.modal-body #accordion').find('div[id^="collapse"]').collapse('hide');
		},
		error : function() {

		}
	});

}

var createCollapse = function(index, item) {
	var topic = item.topic;
	if (topic === '')
		return '';
	var indicator = item.indicatorText;
	var indicatorKey = item.indicatorKey;
	var html = '';
	html = '<div class="panel panel-default">';
	html += '<div class="panel-heading">';
	html += '<h4 class="panel-title">';
	html += '<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + index + '">';
	html += topic;
	html += '</a>';
	html += '</h4>';
	html += '</div>';
	html += '<div id="collapse' + index + '" class="panel-collapse collapse in">';
	html += '<div class="panel-body">';
	if (indicator.length > 0) {
		$.each(indicator, function(indicatorTextIndex, indicatorTextStr) {
			var key = '';
			$.each(indicatorKey, function(indicatorKeyIndex, indicatorKeyStr) {
				if (indicatorTextIndex == indicatorKeyIndex) {
					key = indicatorKeyStr;
					return false;
				} else {
					return;
				}
			});
			html += '<p><a href="#" onclick="addIndicator(\'' + key + '\');">';
			html += indicatorTextStr;
			html += '</a></p>';
		});
	}
	html += '</div>';
	html += '</div>';
	html += '</div>';
	return html;
}

var comingSoon = function() {
	showTxtModal('&nbsp;', 'Coming Soon...', 'small');
}

var ieVersionPop = function() {
	$('#ieversion').modal('show');
}

var getIEVersion = function() {
	var ua = window.navigator.userAgent;
	var ie = ua.indexOf("MSIE ");
	return ((ie > 0) ? parseInt(ua.substring(ie + 5, ua.indexOf(".", ie))) : 0);
}

var saveSuccess = function() {
	showTxtModal('&nbsp;', 'Save Successful.', 'small');
}

var space = function() {
	if (loginUsername != null && loginUsername != '') {
		window.location.href = '/user/space/';
	} else {
		showTxtModal('&nbsp;', 'Please login first.', 'small');
	}
}

var about = function() {
	$('#aboutModal').modal('show');
}

var loginpop = function() {
	setTimeout(function() {
		$('#inputEmail').focus();
	}, 500);
	$('#signupModal').modal('hide');
	$('#loginModal').modal('show');
	$("#loginModal").keypress(function(e) {
		if (e.keyCode == 13) {
			login();
		}
	});
}

var signuppop = function() {
	setTimeout(function() {
		$('#inputEmail2').focus();
	}, 500);
	$('#loginModal').modal('hide');
	$('#signupModal').modal('show');
	$("#signupModal").keypress(function(e) {
		if (e.keyCode == 13) {
			createAccount();
		}
	});
	// clearValues();
	// clearLabels();
}

var clearValues = function() {
	$('#inputEmail2').val('');
	$('#inputUsername2').val('');
	$('#inputPassword2').val('');
	$('#inputConfirmPassword2').val('');
}

var clearLabels = function() {
	$('#emailLabel').hide();
	$('#usernameLabel').hide();
	$('#passwordLabel').hide();
	$('#confirmLabel').hide();
}

var showTxtModal = function(title, content, size, html) {
	$('#txtmodaltitle').html('');
	$('#txtmodalbody').html('');
	$('#txtmodalhtmlbody').html('');
	$('#txtmodaldialog').attr('class', 'modal-dialog');
	if (size === 'small')
		$('#txtmodaldialog').attr('class', 'modal-dialog modal-sm');
	else if (size === 'large')
		$('#txtmodaldialog').attr('class', 'modal-dialog modal-lg');
	$('#txtmodaltitle').html(title);
	$('#txtmodalbody').html(content);
	$('#txtmodalhtmlbody').html(html);
	$('#txtmodal').modal('show');
}

var updateTxtModal = function(title, content, html) {
	if (title !== null)
		$('#txtmodaltitle').html(title);
	if (content !== null)
		$('#txtmodalbody').html(content);
	if (html !== null)
		$('#txtmodalhtmlbody').html(html);
}

var save = function() {
	var url = '/rest/save';
	$.ajax({
		type : 'POST',
		url : url,
		data : {
			hashid : Datanium.GlobalData.hashid,
			queryParam : Datanium.GlobalData.queryParam,
			qubeInfo : Datanium.GlobalData.qubeInfo,
			rptMode : Datanium.GlobalData.rptMode,
			chartMode : Datanium.GlobalData.chartMode
		},
		success : function(data) {
			if (Datanium.GlobalData.hashid === null || Datanium.GlobalData.hashid === '')
				window.location.href = window.location.protocol + "//" + window.location.host + '/' + data.hashid;
			else
				saveSuccess();
		},
		error : function() {
		},
		dataType : 'json'
	});
}

var addIndicator = function(key) {
	Datanium.controller.Homepage.prototype.addIndicator(key);
	$('#txtmodal').modal('hide');
}

$('#gnsearch').bind("enterKey", function(e) {
	showTxtModal('Data Indicator Search', 'Processing...');
	var searchKey = $('#gnsearch').val();
	var url = '/rest/indicator/search';
	$.ajax({
		type : 'GET',
		url : url,
		data : {
			query : searchKey
		},
		success : function(data) {
			var html = '';
			var indicators = data.indicators;
			if (indicators != null) {
				indicators.forEach(function(rec) {
					html += '<p><a href="#" onclick="addIndicator(\'' + rec.uniqueName + '\');">';
					html += rec.text;
					html += '</a></p>';
				});
				updateTxtModal(null, '', html);
			}
		},
		error : function() {
		},
		dataType : 'json'
	});
});

$('#gnsearch').keyup(function(e) {
	if (e.keyCode == 13) {
		$(this).trigger("enterKey");
	}
});