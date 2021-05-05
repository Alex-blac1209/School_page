// let menu      = document.querySelector("nav");
// let menuClose = document.querySelector("nav .close");
// let menuOpen  = document.querySelector(".menuButton");

// function toggleClass(object, className) {
// 	if(object.classList.contains(className)) {
// 		object.classList.remove(className);
// 	} else {
// 		object.classList.add(className);
// 	}
// 	return;
// }

// menuClose.onclick = () => {
// 	toggleClass(menu, "hidden");
// 	toggleClass(menuOpen, "hidden");
// };

// menuOpen.onclick = () => {
// 	toggleClass(menu, "hidden");
// 	toggleClass(menuOpen, "hidden");
// };

document.body.onload = () => {
	document.body.classList.remove("preload");
};

const showMenu = (headerToggle, navbarId) =>{
    const toggleBtn = document.getElementById(headerToggle),
    nav = document.getElementById(navbarId)
    

    if(headerToggle && navbarId){
        toggleBtn.addEventListener('click', ()=>{
            nav.classList.toggle('show-menu')
            toggleBtn.classList.toggle('fa-times')
        })
    }
}
showMenu('banner_toggle','nawigacja')

const linkColor = document.querySelectorAll('.naw_link')

function colorLink(){
    linkColor.forEach(l => l.classList.remove('active'))
    this.classList.add('active')
}

linkColor.forEach(l => l.addEventListener('click', colorLink))