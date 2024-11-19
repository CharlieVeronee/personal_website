var slideIndex = 1;
//show specific image
function showDivFix(e) {
  allDivs(), showDivs((slideIndex = e));
}
//move to next or previous image
function plusDivs(e) {
  showDivs((slideIndex += e));
}
function showDivs(e) {
  var s,
    t = document.getElementsByClassName("slide"),
    i = document.getElementsByClassName("picture"),
    l = document.getElementById("caption");
  for (
    e > t.length && (slideIndex = 1), e < 1 && (slideIndex = t.length), s = 0;
    s < t.length;
    s++
  )
    t[s].style.display = "none";
  (t[slideIndex - 1].style.display = "flex"),
    (t[slideIndex - 1].style.height = "100%"),
    (t[slideIndex - 1].style.display = "flex"),
    (t[slideIndex - 1].style.justifyContent = "center"),
    (t[slideIndex - 1].style.alignItems = "center"),
    (l.innerHTML = i[slideIndex - 1].alt);
}
//toggle show gallery or show carousel
function allDivs() {
  var e = document.getElementById("slideshow"),
    s = document.getElementById("gallery"),
    t = document.getElementById("caption"),
    i = document.getElementById("gallery-link"),
    l = document.getElementById("index-link");
  e.classList.toggle("is-discernable"),
    s.classList.toggle("is-visible"),
    t.classList.toggle("is-hidden"),
    "active" == i.classList
      ? (i.classList.remove("active"), l.classList.add("active"))
      : (l.classList.remove("active"), i.classList.add("active"));
}
document.addEventListener("DOMContentLoaded", function (e) {
  showDivs(slideIndex);
}),
  //keyboard navigation
  (document.onkeyup = function (e) {
    document.getElementById("slideshow");
    var s = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
    37 == s ? plusDivs(-1) : 39 == s && plusDivs(1);
  });
