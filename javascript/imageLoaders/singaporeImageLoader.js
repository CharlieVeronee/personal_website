window.onload = function () {
  //image gallery loader
  const photoContainer = document.getElementById("small");
  for (let i = 1; i <= 126; i++) {
    const img = document.createElement("img");
    img.classList.add("thumbnail", "lazyload");
    img.setAttribute(
      "data-src",
      `/personal_website/images/singapore_images/${i}.jpeg`
    );
    img.onclick = function () {
      showDivFix(i);
    };
    img.setAttribute("alt", `Image ${i}`);

    photoContainer.appendChild(img);
  }

  // image carousel loader
  const carouselContainer = document.getElementById("images");
  for (let i = 1; i <= 126; i++) {
    const divClass = document.createElement("div");
    divClass.classList.add("card", "slide", "fade");

    const img = document.createElement("img");
    img.classList.add("picture");
    img.setAttribute(
      "src",
      `/personal_website/images/singapore_images/${i}.jpeg`
    );
    img.setAttribute("alt", `Image ${i}`);

    divClass.appendChild(img);
    carouselContainer.appendChild(divClass);
  }

  allDivs(false);
};
