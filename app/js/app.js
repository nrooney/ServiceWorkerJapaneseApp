var app = angular.module('Japanese', ['ngRoute']);

app.controller('TranslationController', function($scope, $http) {

	var appData = getStorage(); // LOCAL STORAGE: Go get our storage!

	$http.get('/app/data.json').success(function(data) {
		if (appData) {
			appData.push(data);
			console.log("GOT FROM STORAGE");
		}
		else{
			console.log("NOTHING FROM STORAGE");
		}

		$scope.translations = data;
	});
});

app.controller('findTermFormCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.submit = function() {
		var sourceText = escape(document.getElementById("searchterm").value);
		var source = 'https://www.googleapis.com/language/translate/v2?key=AIzaSyCcyaSoVijGjqtQRtsH52dzZA8FdD_fuNM&source=en&target=ja&q=' + sourceText;

		$http({
		    url: source,
		    method: "GET",
		    cache: false
		}).success(function(response) {
			if(response){
				var newterm = [{"english":sourceText, "japanese":response.data.translations[0].translatedText}];
				console.log("newterm" + JSON.stringify(newterm));
			}
			else{
				console.log('error');
				//document.getElementById('errorMessage').innerHTML='Cannot find "' + slug + '" anime';;
			}
		});
	}
}]);


/*
 * LOCAL STORAGE FUNCTIONS
 */
function getStorage(){
	//localStorage.clear();
	if (localStorage.getItem('appData')) { //try local storage
    	var appData = JSON.parse(localStorage.getItem('appData')); //// LOCAL STORAGE: getItem()
    	return appData;
	} 
	else{ 
		return null;
	}
}
function setStorage(appData){
	var dataToStore = JSON.stringify(appData);
	localStorage.setItem('appData', dataToStore); // LOCAL STORAGE: setItem()
}


/*
 * SERVICE WORKER FUNCTIONS
 */
(function() {
	if ('serviceWorker' in navigator) {
	  navigator.serviceWorker.register('/sw.js').then(function(registration) {
	    // Registration was successful
	    console.log('ServiceWorker registration successful with scope: ', registration.scope);
	  }).catch(function(err) {
	    // registration failed :(
	    console.log('ServiceWorker registration failed: ', err);
	  });
	}

}()); 
