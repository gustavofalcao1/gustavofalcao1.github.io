/* Language */
var lang = navigator.language;  
if (lang === 'pt-BR' || lang === 'pt-PT'){
  var timer = setTimeout(function() {
    window.location='/pt'
  }, 1);
} else {
  var timer = setTimeout(function() {
    window.location='/en'
  }, 1);
}