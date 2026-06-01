<?php
namespace BPLEOV\Admin;

use BPLEOV\Helper\Functions;

class Admin {
    protected static $_instance = null;

    public static function instance() {
        if ( self::$_instance === null ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        add_action( 'admin_enqueue_scripts', [$this, 'bpleov_admin_scripts'] );
    }

    public function bpleov_admin_scripts( $hook ) {
        global $typenow;

        if ( $typenow == 'officeviewer' ) {
            $dropbox_app_key = Functions::get_option( 'bpleov_onedrive' ) ?? [];
            $app_key_val = isset( $dropbox_app_key['bpleov_dropbox_appkey'] ) ? $dropbox_app_key['bpleov_dropbox_appkey'] : ( isset( $dropbox_app_key['eov_dropbox_appkey'] ) ? $dropbox_app_key['eov_dropbox_appkey'] : '' );

            echo '<script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="' . esc_attr( $app_key_val ) . '"></script>';

            wp_enqueue_style( 'bpleov-admin-css', BPLEOV_PLUGIN_DIR . 'assets/css/style.css' );

            if ( function_exists( 'bpleov_fs' ) && bpleov_fs()->is_free_plan() && file_exists( BPLEOV_PLUGIN_PATH . 'assets/js/script-free.js' ) ) {
                wp_enqueue_script( 'bpleov-admin-js', BPLEOV_PLUGIN_DIR . 'assets/js/script-free.js', array( 'jquery' ), "" );
                $bpleov_plugin = array(
                    'plugin' => 'free',
                );
                wp_localize_script( 'bpleov-admin-js', 'bpleov', $bpleov_plugin );
            }

            if ( function_exists( 'bpleov_fs' ) && bpleov_fs()->can_use_premium_code__premium_only() && file_exists( BPLEOV_PLUGIN_PATH . 'assets/js/script-pro.js' ) ) {
                wp_enqueue_script( 'bpleov-google-js', BPLEOV_PLUGIN_DIR . 'assets/js/google.js', array( 'bpleov-google-picker-js' ), null, true );
                wp_enqueue_script( 'bpleov-google-picker-js', 'https://apis.google.com/js/api.js?onload=onApiLoad', array(), null,  true );
                wp_enqueue_script( 'bpleov-admin-pro-js', BPLEOV_PLUGIN_DIR . 'assets/js/script-pro.js', array( 'jquery' ), "" );

                $api_data = array();
                $api_form_data = Functions::get_option( 'bpleov_onedrive' );
                
                $g_apikey = isset( $api_form_data['bpleov_google_apikey'] ) ? $api_form_data['bpleov_google_apikey'] : ( isset( $api_form_data['eov_google_apikey'] ) ? $api_form_data['eov_google_apikey'] : '' );
                $g_client = isset( $api_form_data['bpleov_google_client_id'] ) ? $api_form_data['bpleov_google_client_id'] : ( isset( $api_form_data['eov_google_client_id'] ) ? $api_form_data['eov_google_client_id'] : '' );
                $g_proj   = isset( $api_form_data['bpleov_google_project_number'] ) ? $api_form_data['bpleov_google_project_number'] : ( isset( $api_form_data['eov_google_project_number'] ) ? $api_form_data['eov_google_project_number'] : '' );
                $db_key   = isset( $api_form_data['bpleov_dropbox_appkey'] ) ? $api_form_data['bpleov_dropbox_appkey'] : ( isset( $api_form_data['eov_dropbox_appkey'] ) ? $api_form_data['eov_dropbox_appkey'] : '' );

                if ( is_array( $api_form_data ) && ( !empty( $g_apikey ) || !empty( $g_client ) || !empty( $g_proj ) || !empty( $db_key ) ) ) {
                    $api_data = array(
                        'google'  => array(
                            'api_key'        => $g_apikey,
                            'client_id'      => $g_client,
                            'project_number' => $g_proj
                        ), 
                        'dropbox' => array(
                            'app_key' => $db_key,
                        ),
                        'plugin'  => 'pro',
                    );
                } else {
                    $api_data = array(
                        'plugin' => 'free',
                    );
                }
    
                wp_localize_script( 'bpleov-google-js', 'api', $api_data );
                wp_localize_script( 'bpleov-admin-pro-js', 'api', $api_data );
            }

        }

        // Dashboard Script and Style
        if ( $hook === "officeviewer_page_eov-dashboard" ) { 
            $asset_file = include BPLEOV_PLUGIN_PATH . 'build/admin-dashboard.asset.php';
            wp_enqueue_script( 'ovp-dashboard-js', BPLEOV_PLUGIN_DIR . 'build/admin-dashboard.js', array_merge( $asset_file['dependencies'], ['wp-util'] ), BPLEOV_VERSION, true );
            wp_enqueue_style( 'ovp-dashboard-css', BPLEOV_PLUGIN_DIR . 'build/admin-dashboard.css', [], BPLEOV_VERSION );
        }

    }
}
