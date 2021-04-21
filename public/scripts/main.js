let menu      = document.querySelector("nav");
let menuClose = document.querySelector("nav .close");
let menuOpen  = document.querySelector(".menuButton");

function toggleClass(object, className) {
	if(object.classList.contains(className)) {
		object.classList.remove(className);
	} else {
		object.classList.add(className);
	}
	return;
}

menuClose.onclick = () => {
	toggleClass(menu, "hidden");
	toggleClass(menuOpen, "hidden");
};

menuOpen.onclick = () => {
	toggleClass(menu, "hidden");
	toggleClass(menuOpen, "hidden");
};

document.body.onload = () => {
	document.body.classList.remove("preload");
};