<?php
use BPLEOV\Helper\Functions;

if ( ! class_exists( 'BPLEOVPlugin' ) ) {

    class BPLEOVPlugin {

        public function __construct() {
            add_action( 'init', [$this, 'init'] );
            add_action( "enqueue_block_assets", [$this, "bpleovBlockAssets"] );

            add_action( 'wp_ajax_bpleovPipeChecker', [$this, 'bpleovPipeChecker'] );
            add_action( 'wp_ajax_nopriv_bpleovPipeChecker', [$this, 'bpleovPipeChecker'] );
            add_action( 'admin_init', [$this, 'registerSettings'] );
            add_action( 'rest_api_init', [$this, 'registerSettings'] );
        }

        function bpleovPipeChecker() {
            $nonce = $_POST['_wpnonce'] ?? null;
            
            if ( ! wp_verify_nonce( $nonce, 'wp_ajax' ) ) {
                wp_send_json_error( 'Invalid Request' );
            }

            wp_send_json_success( [
                'isPipe' => bpleovIsPremium()
            ] );
        }

        function registerSettings() {
            register_setting( 'bpleovUtils', 'bpleovUtils', [
                'show_in_rest' => [
                    'name'   => 'bpleovUtils',
                    'schema' => ['type' => 'string']
                ],
                'type'              => 'string',
                'default'           => wp_json_encode( ['nonce' => wp_create_nonce( 'wp_ajax' )] ),
                'sanitize_callback' => 'sanitize_text_field'
            ] );
        }

        function bpleovBlockAssets() {
            $data = array(
                'pdfJsFilePath' => BPLEOV_PLUGIN_DIR . 'assets/pdfjs-new/web/viewer.html'
            );

            if ( bpleovIsPremium() ) {
                $api_data = Functions::get_option( 'bpleov_onedrive' );
                if ( ! is_array( $api_data ) ) {
                    $api_data = [];
                }
                
                $g_apikey = isset( $api_data['bpleov_google_apikey'] ) ? $api_data['bpleov_google_apikey'] : ( isset( $api_data['eov_google_apikey'] ) ? $api_data['eov_google_apikey'] : '' );
                $g_client = isset( $api_data['bpleov_google_client_id'] ) ? $api_data['bpleov_google_client_id'] : ( isset( $api_data['eov_google_client_id'] ) ? $api_data['eov_google_client_id'] : '' );
                $g_proj   = isset( $api_data['bpleov_google_project_number'] ) ? $api_data['bpleov_google_project_number'] : ( isset( $api_data['eov_google_project_number'] ) ? $api_data['eov_google_project_number'] : '' );
                $db_key   = isset( $api_data['bpleov_dropbox_appkey'] ) ? $api_data['bpleov_dropbox_appkey'] : ( isset( $api_data['eov_dropbox_appkey'] ) ? $api_data['eov_dropbox_appkey'] : '' );
                $od_client = isset( $api_data['bpleov_onedrive_client_id'] ) ? $api_data['bpleov_onedrive_client_id'] : ( isset( $api_data['eov_onedrive_client_id'] ) ? $api_data['eov_onedrive_client_id'] : '' );

                $data['credentials'] = array(
                    'google' => array(
                        'api_key'        => $g_apikey,
                        'client_id'      => $g_client,
                        'project_number' => $g_proj,
                    ),
                    'dropbox' => array(
                        'app_key' => $db_key,
                    ),
                    'onedrive' => array(
                        'client_id' => $od_client,
                    ),
                );
            }

            $frontend_data = array(
                'pdfJsFilePath' => BPLEOV_PLUGIN_DIR . 'assets/pdfjs-new/web/viewer.html',
            );
        
            // Pass data to JavaScript
            wp_localize_script( 'eov-embed-office-viewer-editor-script', 'eovData', $data );
            wp_localize_script( 'eov-embed-office-viewer-view-script', 'eovData', $frontend_data );
        }
        
        function init() {
            register_block_type( BPLEOV_PLUGIN_PATH . 'build/blocks/embed-office-viewer' );
            wp_set_script_translations( 'eov-editor', 'embed-office-viewer', BPLEOV_PLUGIN_PATH . 'languages' );
        }
    }
}