function themify_create_pluploader(obj) {

	'use strict';

	var $this = obj,
		id1 = $this.attr("id"),
		imgId = id1.replace("plupload-upload-ui", ""),
		haspreset = false,
		haspreview = false,
		$j = jQuery;
	
	var pconfig = JSON.parse(JSON.stringify(global_plupload_init));
	pconfig["browse_button"] = imgId + pconfig["browse_button"];
	pconfig["container"] = imgId + pconfig["container"];
	pconfig["drop_element"] = imgId + pconfig["drop_element"];
	pconfig["file_data_name"] = imgId + pconfig["file_data_name"];
	pconfig["multipart_params"]["imgid"] = imgId;
	pconfig["multipart_params"]["_ajax_nonce"] = $this.find(".ajaxnonceplu").attr("id").replace("ajaxnonceplu", "");

	if($this.hasClass('add-preset')) {
		haspreset = true;
		pconfig["multipart_params"]['haspreset'] = 'haspreset'; 
	}
	if($this.hasClass('add-preview')) {
		haspreview = true;
		pconfig["multipart_params"]['haspreview'] = 'haspreview'; 
	}
	if($this.hasClass('add-to-media')){
		pconfig["multipart_params"]['tomedia'] = 'tomedia';
	}
	if($this.data('postid')) {
		pconfig["multipart_params"]['topost'] = $this.data('postid');
	}
	if($this.data('fields')) {
		pconfig["multipart_params"]['fields'] = $this.data('fields');
	}
	if($this.data('featured')) {
		pconfig["multipart_params"]['featured'] = $this.data('featured');
	}
	if($this.data('formats')) {
		pconfig['filters'][0]['extensions'] = $this.data('formats');
	}

	pconfig['multipart_params']['action'] = $this.data( 'action' );

	const uploader = new plupload.Uploader(pconfig);
	
	uploader.bind('Init', function(up) { });
	uploader.init();
	$this.data( 'init', 1 );
	
	uploader.bind('FilesAdded', function(up, files) {
		if($this.data('confirm')) {
			var reply = confirm($this.data('confirm'));
			if(!reply) return;
		}
		up.refresh();
		up.start();
		$j(".tb_alert").addClass("busy").fadeIn(800);
	});
	
	uploader.bind('Error', function(up, error){
		$j('.prompt-box .show-login').hide();
		$j('.prompt-box .show-error').show();
		
		if( -600 == error.code ){
			var errorMessage = themify_plupload_lang.filesize_error,
				errorMessageFix = themify_plupload_lang.filesize_error_fix;
		}
		
		if($j('.prompt-box .show-error').length > 0){
			$j('.prompt-box .show-error').html('<p class="prompt-error">' + errorMessage + '</p>');
			if(errorMessageFix)
				$j('.prompt-box .show-error').append('<p>' + errorMessageFix + '</p>');
		}
		$j(".overlay, .prompt-box").fadeIn(500);
		const overlay = document.getElementsByClassName('overlay');
		if ( overlay[0] ) {
			overlay[0].addEventListener('click',function (){
				$j(".overlay, .prompt-box").fadeOut(500);
			},{'once':true});
		}

	});
	
	uploader.bind('FileUploaded', function(up, file, response) {
		var json = JSON.parse(response['response']),
			status = '';
		if('200' == response['status'] && json.success) {
			status = 'done';
		} else {
			status = 'error';
		}
		
		$j(".tb_alert").removeClass("busy").addClass(status).delay(800).fadeOut(800, function() {
			$j(this).removeClass(status);
		});

		if ( ! json.success ) {
			$j('.prompt-box .show-login').hide();
			$j('.prompt-box .show-error').show();
			
			if($j('.prompt-box .show-error').length > 0){
				$j('.prompt-box .show-error').html('<p class="prompt-error">' + json.data + '</p>');
			}
			$j(".overlay, .prompt-box").fadeIn(500);
			const overlay = document.getElementsByClassName('overlay');
			if ( overlay[0] ) {
				overlay[0].addEventListener('click',function (){
					$j(".overlay, .prompt-box").fadeOut(500);
				},{'once':true, passive:true});
			}
			return;
		}
		
		$j('#' + file.id).fadeOut();
		
		if ( json.data?.reload ) {
			window.location = location.href.replace( location.hash, '' );
			return;
		}

		const response_file = json.data.file,
			response_url = json.data.url;

		$j('#' + imgId).val(response_url);

		if ( typeof json.data.thumb !== 'undefined' ) {
			themifyMediaLib.setPreviewIcon($this.closest( '.themify_field, .themify_field_row' ), json.data.thumb );
			$j( 'body' ).trigger( 'themify_plupload_selected', [ $this, json ] );
		}

		if(haspreset){
			$j('#' + imgId).closest('fieldset').children('.preset').find('img').removeClass('selected');
			
			const title = response_url.replace(/^.*[\\\/]/, ''),
			 new_preset = $j('<a href="#" title="' + title + '"><span title="' + response_file + '"></span><img src="' + response_url + '" alt="' + response_url + '" class="backgroundThumb selected" /></a>')
			.css('display', 'inline-block');
			$j('#' + imgId).closest('fieldset').children('.preset').append(new_preset);
		}
		
		if(haspreview){
			$j('#' + imgId + '-preview').attr('src', response_url);
		}
	});
}
(function ($, doc) {
	'use strict';
	const windowLoad=function(){
		const $pluploadUIC = $('.plupload-upload-uic');
		if ( $pluploadUIC.length > 0 ) {
			$pluploadUIC.each(function() {
				themify_create_pluploader($(this));
			});
		}

		if ( ! doc.getElementsByClassName( 'prompt-box' )[0] ) {
			const prompt = doc.createElement( 'div' ),
				error = doc.createElement( 'div' ),
				overlay = doc.createElement( 'div' );
			prompt.className = 'prompt-box';
			error.className = 'show-error';
			overlay.className = 'overlay';
			prompt.append( error );
			doc.body.append( prompt, overlay );
		}
	};
	if (document.readyState === 'complete') {
		windowLoad();
	} else {
		window.addEventListener('load', windowLoad, {once:true, passive:true});
	}
}(jQuery, document));
