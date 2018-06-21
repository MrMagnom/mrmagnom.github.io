var $ps_container =$('#ps_container'),
	$ps_image_wrapper =$ps_container.find('.ps_image_wrapper'),
	$ps_next =$ps_container.find('.ps_next'),
	$ps_prev =$ps_container.find('.ps_prev'),
	$ps_nav =$ps_container.find('.ps_nav'),
	$tooltip =$ps_container.find('.ps_preview'),
	$ps_preview_wrapper=$tooltip.find('.ps_preview_wrapper'),
	$links=$ps_nav.children('li').not($tooltip),
	total_images =$links.length,
	currentHovered =-1,
	corrente =0,
	$loader =$('#loader');
    
    
    
    var ie =false;
if ($ .browser.msie) {
	ie = true; // oh não doce Jesus
}
if(!ie) // existe um deus
	$tooltip.css({
		opacidade: 0
	}).exposição();
    
    
    
    / * pré-
 carrega imagens (thumbs e imagens grandes) * / 
 
 var loaded =0;
$ links.each(função(i) {
	 var $ link =$(this);
	$ link.find('a').preload({
		onComplete : function() {
			++ loader;
			if (loaded == total_images) {
				 // todas as imagens pré-carregadas, 
				// show ps_container e inicializar eventos
				$ loader.hide ();
				$ ps_container.show ();
				// quando o mouse inserir os pontos, 
				// mostrar a dica de ferramenta, 
				// quando o mouse deixar ocultar a dica de ferramenta, 
				// clicar em uma mostrará a respectiva imagem 
				$ links.bind ( 'mouseenter' , showTooltip)
					  .bind ( 'mouseleave' , hideTooltip)
					  .bind ( 'clique' , showImage);
				// navegar pelas imagens 
				$ ps_next.bind ( 'click' , nextImage);
				$ ps_prev.bind ( 'clique' , prevImage);
			}
		}
	});
});




função  showTooltip () {
	 var $ link = $ (this),
		idx = $ link.index (),
		linkOuterWidth = $ link.outerWidth (),
		// isto contém o valor da esquerda para a próxima posição 
		// da dica de ferramenta 
		esquerda = parseFloat (idx * linkOuterWidth) - $ tooltip.width () / 2 + linkOuterWidth / 2 ,
		 // a fonte da imagem 
		thumb $ thumb = $ link. find ( 'a' ) .attr ( 'rel' ),
		imageLeft;

	// se não estivermos pairando o atual 
	if (currentHovered! = idx) {
		 // verifique se vamos animar left-> right ou right-> left 
		if (currentHovered! = -1 ) {
			 if (currentHovered <idx) {
				imageLeft = 75 ;
			}
			mais {
				imageLeft = -75 ;
			}
		}
		currentHovered = idx;

		// a próxima imagem do polegar a ser mostrada na dica de ferramenta 
		var $ newImage = $ ( ' ' ) .css ( 'left' , '0px' )
								   .attr ( 'src' , $ thumb);

		// se houver mais de uma imagem 
		// (se movermos o mouse muito rápido, provavelmente aconteceria) 
		// então remover o mais antigo (: last) 
		if ($ ps_preview_wrapper.children (). length> 1 )
			$ ps_preview_wrapper.children ( ': last' ) .remove ();

		// prefixar a nova imagem
		$ ps_preview_wrapper.prepend ($ newImage);

		var $ tooltip_imgs = $ ps_preview_wrapper.children (),
			tooltip_imgs_count = $ tooltip_imgs.length;

		// se houver 2 imagens na dica de ferramenta 
		// animar a atual, e a nova em 
		if (tooltip_imgs_count> 1 ) {
			$ tooltip_imgs.eq (tooltip_imgs_count -1 )
						 .Pare()
						 .animar({
							left: -imageLeft + 'px' 
						  }, 150 , function () {
								 // remove o antigo
								$ (this) .remove ();
						  });
			$ tooltip_imgs.eq ( 0 )
						 .css ( 'left' , imageLeft + 'px' )
						 .Pare()
						 .animar({
							esquerda: '0px' 
						  }, 150 );
		}
	}
	// se não estivermos usando um "navegador", apenas mostramos a dica de ferramenta, 
	// caso contrário, nós a desvaneceremos 
	// 
	if (ie)
		$ tooltip.css ( 'left' , left + 'px' ) .show ();
	outro
	$ tooltip.stop ()
			.animar({
				esquerda: esquerda + 'px' ,
				opacidade: 1 
			}, 150 );
}


function  hideTooltip () {
	 // esconde / 
	desmata a dica de ferramenta if (ie)
		$ tooltip.hide ();
	outro
	$ tooltip.stop ()
			.animar({
				opacidade: 0 
			}, 150 );
}



função  showImage (e) {
	 var $ link = $ (this),
		idx = $ link.index (),
		$ image = $ link.find ( 'a' ) .attr ( 'href' ),
		$ currentImage = $ ps_image_wrapper.find ( 'img' ),
		currentImageWidth = $ currentImage.width ();

	// se clicarmos no atual retorno 
	if (atual == idx) return  false ;

	// adiciona a classe selecionada à página / ponto 
	atual $ links.eq (atual) .removeClass ( 'selected' );
	$ link.addClass ( 'selecionado' );

	// o novo elemento de imagem 
	var $ newImage = $ ( ' ' ) .css ( 'left' , currentImageWidth + 'px' )
							   .attr ( 'src' , $ image);

	// se o wrapper tiver mais de uma imagem, remova o mais antigo 
	if ($ ps_image_wrapper.children (). length> 1 )
		$ ps_image_wrapper.children ( ': last' ) .remove ();

	// prefixar a nova imagem
	$ ps_image_wrapper.prepend ($ newImage);

	// a nova largura da imagem 
	// esta será a nova largura do ps_image_wrapper 
	var newImageWidth = $ newImage.width ();

	// verifica a direção da animação 
	se (atual> idx) {
		$ newImage.css ( 'left' , -newImageWidth + 'px' );
		currentImageWidth = -newImageWidth;
	}
	current = idx;
	// animar a nova largura do ps_image_wrapper 
	// (igual à nova largura da imagem)
	$ ps_image_wrapper.stop (). animate ({
		width: newImageWidth + 'px' 
	}, 350 );
	// animar a nova imagem em
	$ newImage.stop (). animate ({
		esquerda: '0px' 
	}, 350 );
	// anima a imagem antiga
	$ currentImage.stop (). animate ({
		left: -currentImageWidth + 'px' 
	}, 350 );

	e.preventDefault ();
}



function  nextImage () {
	 if (atual <total_images) {$ links.eq (atual + 1 ) .trigger ( 'clique' ); }} função  prevImage () { 	 if (atual> 0 ) {
		$ links.eq (current -1 ) .trigger ( 'clique' );
	}
}