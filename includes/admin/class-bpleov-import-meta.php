<?php
namespace BPLEOV;

class ImportMeta {

    public static function import() {
        $docs = get_posts( [
            'post_type'      => 'officeviewer',
            'post_status'    => 'any',
            'posts_per_page' => -1
        ] );

        foreach ( $docs as $doc ) {
            $id = $doc->ID;

            $doc_file           = get_post_meta( $id, '_ahp_doc_file', true );
            $width              = get_post_meta( $id, '_ahp_width', true );
            $height             = get_post_meta( $id, '_ahp_height', true );
            $is_name_top        = get_post_meta( $id, '_ahp_name_top', true );
            $download_button    = get_post_meta( $id, '_ahp_download_button', true );
            $disable_rightclick = get_post_meta( $id, '_ahp_disable', true );

            if ( $is_name_top != '' && false == metadata_exists( 'post', $id, 'bpleov_document' ) ) {
                update_post_meta( $id, 'bpleov_show_name', '1' );
            } else {
                if ( false == metadata_exists( 'post', $id, 'bpleov_show_name' ) ) {
                    update_post_meta( $id, 'bpleov_show_name', '0' );
                }
            }

            if ( $download_button != '' && false == metadata_exists( 'post', $id, 'bpleov_document' ) ) {
                update_post_meta( $id, 'bpleov_download_button', '1' );
            } else {
                if ( false == metadata_exists( 'post', $id, 'bpleov_download_button' ) ) {
                    update_post_meta( $id, 'bpleov_download_button', '0' );
                }
            }

            if ( $disable_rightclick != '' && false == metadata_exists( 'post', $id, 'bpleov_right_click' ) ) {
                update_post_meta( $id, 'bpleov_right_click', '1' );
            } else {
                if ( false == metadata_exists( 'post', $id, 'bpleov_right_click' ) ) {
                    update_post_meta( $id, 'bpleov_right_click', '0' );
                }
            }

            if ( $doc_file && false == metadata_exists( 'post', $id, 'bpleov_document' ) ) {
                update_post_meta( $id, 'bpleov_document', $doc_file );
            }

            if ( false == metadata_exists( 'post', $id, 'bpleov_document_width' ) ) {
                update_post_meta( $id, 'bpleov_document_width', array( 'width' => $width ) );
            }

            if ( false == metadata_exists( 'post', $id, 'bpleov_document_height' ) ) {
                update_post_meta( $id, 'bpleov_document_height', array( 'height' => $height ) );
            }
            if ( false == metadata_exists( 'post', $id, 'bpleov_document_source' ) ) {
                update_post_meta( $id, 'bpleov_document_source', 'library' );
            }
            if ( false == metadata_exists( 'post', $id, 'bpleov_view_type' ) ) {
                update_post_meta( $id, 'bpleov_view_type', 'microsoft' );
            }
        }
    }

}
