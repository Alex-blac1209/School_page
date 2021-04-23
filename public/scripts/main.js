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

// document.body.onload = () => {
// 	document.body.classList.remove("preload");
// };

const show_menu = (toggleId, navId, bodyId)=>{
	const toggle = document.getElementById(toggleId),
	navbar = document.getElementById(navId),
	bodypadding = document.getElementById(bodyId)

	if(toggle && navbar){
		toggle.addEventListener('click',()=>{
			navbar.classList.toggle('expander')

			bodypadding.classList.toggle('body-pd')
		})
	}
}

show_menu('naw-toggle','nawigacja','body-pd');

const linkColor = document.querySelectorAll('.naw_link')
function colorLink(){
  linkColor.forEach(l=> l.classList.remove('active'))
  this.classList.add('active')
}
linkColor.forEach(l=> l.addEventListener('click', colorLink))

const linkC = document.getElementsByClassName('c_link')
var i;

for(i=0;i<linkC.length;i++){
  linkC[i].addEventListener('click', function(){
    const cMenu = this.nextElementSibling
    cMenu.classList.toggle('showC')

	const rotate = cMenu.previousElementSibling
    rotate.classList.toggle('rotate')
  })
}