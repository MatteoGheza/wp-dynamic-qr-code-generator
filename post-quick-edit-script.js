/*
 * Populate the quick edit custom fields
 */
jQuery(document).ready(function($){

    //Prepopulating our quick-edit post info
    var $inline_editor = inlineEditPost.edit;
    inlineEditPost.edit = function(id){

        //call old copy 
        $inline_editor.apply( this, arguments);

        //our custom functionality below
        var post_id = 0;
        if( typeof(id) == 'object'){
            post_id = parseInt(this.getId(id));
        }

        //if we have our post
        if(post_id != 0){

            //find our row
            $row = $('#edit-' + post_id);

            //dynamic_qr_redirect_response
            $dynamic_qr_redirect_response = $('#dynamic_qr_redirect_response_' + post_id);
            $dynamic_qr_redirect_response_value = $dynamic_qr_redirect_response.text();
            $row.find('#dynamic_qr_redirect_response').val($dynamic_qr_redirect_response_value);
            $row.find('#dynamic_qr_redirect_response').children('[value="' + $dynamic_qr_redirect_response + '"]').attr('selected', true);

        }

    }

});

/*
 * Post Bulk Edit Script
 * Hooks into the inline post editor functionality to extend it to our custom metadata
 */
jQuery(function($){
	$( 'body' ).on( 'click', 'input[name="bulk_edit"]', function() {
 
		// let's add the WordPress default spinner just before the button
		$( this ).after('<span class="spinner is-active"></span>');
 
 
		// define: prices, featured products and the bulk edit table row
		var bulk_edit_row = $( 'tr#bulk-edit' ),
		    post_ids = new Array()
			dynamic_qr_redirect_response = bulk_edit_row.find( 'select[name="dynamic_qr_redirect_response"]' ).val(),
 
		// now we have to obtain the post IDs selected for bulk edit
		bulk_edit_row.find( '#bulk-titles' ).children().each( function() {
			post_ids.push( $( this ).attr( 'id' ).replace( /^(ttle)/i, '' ) );
		});

		// save the data with AJAX
		$.ajax({
			url: ajaxurl, // WordPress has already defined the AJAX url for us (at least in admin area)
			type: 'POST',
			async: false,
			cache: false,
			data: {
				action: 'qr_save_bulk', // wp_ajax action hook
				post_ids: post_ids, // array of post IDs
				dynamic_qr_redirect_response: dynamic_qr_redirect_response, // new dynamic_qr_redirect_response
				nonce: $('#dynamic_qr_redirector_nonce').val() // I take the nonce from hidden #dynamic_qr_redirector_nonce field
			}
		});
	});
});

