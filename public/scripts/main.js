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

$(document).ready(function(){
    $('.informations_gallery .galeria .button-container .butn').click(function(){

        let filter = $(this).attr('data-filter');

        if(filter == 'all'){
            $('.galeria .image-container .meh').show('400');
        }
        else {
            $('.galeria .image-container .meh').not('.' + filter).hide('200');
            $('.galeria .image-container .meh').filter('.' + filter).show('400');
        }
    });
});

let options = {
    startAngle: -1.55,
    size:300,
    value: 0.978,
    fill: {gradient: [ 'rgba(0,42,94,1)', 'rgba(183,217,255,1)']}
}
$(".sekcja .wrapper .card .circle .bar").circleProgress(options).on('circle-animation-progress', function(event, progerss, stepValue){
    $(this).parent().find('span').text(String(stepValue.toFixed(2).substr(2)) + '%')
});

$(".sekcja .wrapper .card .circle .bar.dif").circleProgress(options).on('circle-animation-progress', function(event, progerss, stepValue){
    $(this).parent().find('span').text(String(stepValue.toFixed(2).substr(2)))
});
$(".js .bar").circleProgress({
    value: 0.78
});
$(".react .bar").circleProgress({
    value: 0.95
});

let more = document.querySelectorAll('.more');
for(let i = 0; i<more.length; i++){
    more[i].addEventListener('click', function(){
        more[i].parentNode.classList.toggle('active')
    })
}