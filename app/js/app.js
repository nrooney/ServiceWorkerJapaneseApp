var Dictionary = require('japaneasy');
var dict = new Dictionary();

dict('辞書').then(function(result){
  console.log(result);
});
