/* Theme */
function dark() {
  localStorage.setItem("dark", true)
  document.getElementById('theme').href='../../components/dark/css/theme.css'
  document.getElementById('projects').href='../../components/dark/css/projects.css'
  document.getElementById('tools').href='../../components/dark/css/tools.css'
  document.getElementById('grid').href='../../components/dark/css/grid.css'
}
function light() {
  localStorage.setItem("dark", false)
  document.getElementById('theme').href='../../components/light/css/theme.css'
  document.getElementById('projects').href='../../components/light/css/projects.css'
  document.getElementById('tools').href='../../components/light/css/tools.css'
  document.getElementById('grid').href='../../components/light/css/grid.css'
}
window.onload = function() {
  const dark = localStorage.getItem("dark")
  if (dark === "false") {
    light()
  } 
  if (dark === "true") {
    dark()
  }
}

/* Button */
const navButtonContainer = document.querySelector(".nav-btn-container");
const navOverlay = document.querySelector(".overlay");

navButtonContainer.addEventListener("click", () => {
  navButtonContainer.classList.toggle("nav-btn-clicked");
  navOverlay.classList.toggle("show");
});

/* Code */
$.fn.typewriter = function() {
  this.each(function() {
      var $ele = $(this), str = $ele.html(), progress = 0, offset = 0;
      $ele.html('');
      var typewriting = function() {
        
        if(str.substring(progress, progress + 1) == "<"){
          var re = new RegExp(/<span class="codeBoot"/);
          var cl = new RegExp(/<span class="codeClear"/);
          if (str.substring(progress,str.length).match(re)) {
            progress += str.substring(progress,str.length).indexOf('</span>')+7;
          }else if(str.substring(progress,str.length).match(cl)){
            offset = progress;
            progress += str.substring(progress,str.length).indexOf('</span>')+7;
            
            
          }else{
          while(str.substring(progress, progress + 1) != ">"){
            progress++;
          }
          }
        }
          
          $ele.html(str.substring(offset, progress++) + (progress & 1 ? '_' : ''));
        if (progress >= str.length){
          return;
        }
        else{
          setTimeout(typewriting, 10 + Math.random()*100);
        }
      }
      typewriting();
  });
  return this;
};
$('#code').typewriter();


