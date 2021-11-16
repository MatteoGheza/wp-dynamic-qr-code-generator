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

            //qr_redirect_response
            $qr_redirect_response = $('#qr_redirect_response_' + post_id);
            $qr_redirect_response_value = $qr_redirect_response.text();
            $row.find('#qr_redirect_response').val($qr_redirect_response_value);
            $row.find('#qr_redirect_response').children('[value="' + $qr_redirect_response + '"]').attr('selected', true);

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
			qr_redirect_response = bulk_edit_row.find( 'select[name="qr_redirect_response"]' ).val(),
 
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
				qr_redirect_response: qr_redirect_response, // new qr_redirect_response
				nonce: $('#qr_redirector_nonce').val() // I take the nonce from hidden #qr_redirector_nonce field
			}
		});
	});
});

