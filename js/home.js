var banners = ["img/principal.jpg","img/destaque.jpg","img/hd-home 1.jpg"];
var bannerAtual = 0;

function trocaBanner() {
  bannerAtual = (bannerAtual + 1) % 2;
  document.querySelector('.destaque img').src = banners[bannerAtual];
}

setInterval(trocaBanner, 4000);

$('.mais-vendidos, .novidades').addClass('painel-compacto');

$('.mais-vendidos button').click(function() {
	$('.mais-vendidos').removeClass('painel-compacto');
});

$('.novidades button').click(function() {
	$('.novidades').removeClass('painel-compacto');
}); 




img = new Array('principal1','principal2','principal3','principal4');

indice = 0;

setInterval("mudaImg()", 3000);
	
function mudaImg(i) {

	if (i == 0 || i == 1 || i == 2 || i == 3) {
		
		indice = i;
		
	} else {
		
		if (indice == img.length - 1) {
			
			indice = 0;
			
		} else {
			
			indice++;
			
		}
		
	}
	
	document.getElementById("banner_img_principal1").setAttribute("class", "");
	document.getElementById("banner_img_principal2").setAttribute("class", "");
	document.getElementById("banner_img_principal3").setAttribute("class", "");
	document.getElementById("banner_img_principal4").setAttribute("class", "");
	document.getElementById("banner_img_" + img[indice]).setAttribute("class", "hover");
	
	document.getElementById("banner_img").innerHTML = "<img src='banner_img/"+ img[indice] +".jpg' width='700' height='480' border='0' alt='Banner'>";

}