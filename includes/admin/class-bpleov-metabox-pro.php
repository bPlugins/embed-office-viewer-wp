<?php
namespace BPLEOV;
use CSF;

class MetaboxPro {

    public static function init() {
        if ( class_exists( 'CSF' ) ) {

            /*
             * Create Setting Page to take Ondrive api details
             */
            $prefix = 'bpleov_onedrive';

            // Create options
            CSF::createOptions( $prefix, array(
                'framework_title' => 'Cloud API Settings',
                'theme'           => 'light',
                'menu_title'      => __( 'Cloud API Settings', 'embed-office-viewer' ),
                'menu_parent'     => 'edit.php?post_type=officeviewer',
                'menu_slug'       => 'bpleov-onedrive',
                'menu_type'       => 'submenu',
                'menu_capability' => 'manage_options',
                
            ) );
            CSF::createSection( $prefix, array(
                'id'     => 'bpleov_onedrive_tab',
                'fields' => array(
                    array(
                        'id'         => 'bpleov_dropbox_appkey',
                        'title'      => __( 'Dropbox App Key', 'embed-office-viewer' ),
                        'type'       => 'text',
                        'attributes' => array( 'id' => 'bpleov_dropbox_appkey' ),
                        'desc'       => 'Please <a href="https://www.dropbox.com/developers/apps/create" target="_blank">Click Here</a> to create Dropbox API key',
                    ),
                    array(
                        'type'    => 'content',
                        'content' => __( 'Google API Setup', 'embed-office-viewer' ),
                        'class'   => 'csf-field-subheading',
                    ),
                    array(
                        'id'     => 'bpleov_google_apikey',
                        'type'   => 'text',
                        'title'  => __( 'Google API key', 'embed-office-viewer' ),
                        'before' => '<p><a href="https://console.cloud.google.com/" target="_blank">Click Here</a> To Get Google Credentials</p>',
                    ),
                    array(
                        'id'    => 'bpleov_google_client_id',
                        'type'  => 'text',
                        'title' => __( 'Google Client ID', 'embed-office-viewer' ),
                    ),
                    array(
                        'id'    => 'bpleov_google_project_number',
                        'type'  => 'text',
                        'title' => __( 'Google Project Number', 'embed-office-viewer' ),
                    ),
                ),
            ) );

            // Set a unique slug_like ID
            $prefix = '_bpleovm_';
            // Create a metabox
            CSF::createMetabox( $prefix, array(
                'title'     => __( 'Viewer Configuration', 'embed-office-viewer' ),
                'post_type' => 'officeviewer',
                'data_type' => 'unserialize',
                'class'     => 'spt-main-class',
                'priority'  => 'high',
                'theme'     => 'light'
            ) );

            // Section — Document Settings
            CSF::createSection( $prefix, array(
                'title'  => __( 'Document Settings', 'embed-office-viewer' ),
                'fields' => array(
                    array(
                        'id'          => 'bpleov_document_source',
                        'title'       => __( 'Document Source', 'embed-office-viewer' ),
                        'type'        => 'button_set',
                        'options'     => array(
                            'library' => __( 'Library', 'embed-office-viewer' ),
                            'google'  => __( 'Google Drive', 'embed-office-viewer' ),
                            'dropbox' => __( 'Dropbox', 'embed-office-viewer' ),
                        ),
                        'multiselect' => false,
                        'default'     => 'library',
                        'attributes'  => array( 'id' => 'document_source_btn' ),
                        'class'       => 'document_source_btn',
                    ),
                    array(
                        'id'         => 'bpleov_dropbox_document',
                        'type'       => 'text',
                        'title'      => __( 'Dropbox Document URL', 'embed-office-viewer' ),
                        'placeholder' => 'https://',
                        'dependency' => array( 'bpleov_document_source', '==', 'dropbox' ),
                        'attributes' => array( 'style' => 'min-height:29px !important;height:29px;', 'id' => 'dropbox_cloud_file_url' ),
                        'validate'   => 'csf_validate_url',
                    ),
                    array(
                        'id'         => 'bpleov_onedrive_document',
                        'type'       => 'text',
                        'title'      => __( 'OneDrive Document URL', 'embed-office-viewer' ),
                        'dependency' => array( 'bpleov_document_source', '==', 'onedrive' ),
                        'class'      => 'eov_ondrive_doc',
                        'validate'   => 'csf_validate_url',
                        'attributes' => array( 'style' => 'min-height:29px !important;height:29px;', 'id' => 'eov_ondeive_file_url' ),
                    ),
                    array(
                        'id'         => 'bpleov_google_document',
                        'title'      => __( 'Google Drive Document URL', 'embed-office-viewer' ),
                        'type'       => 'text',
                        'validate'   => 'csf_validate_url',
                        'attributes' => array(
                            'style' => 'min-height:29px !important;height:29px',
                            'id'    => 'eov_google_document_url',
                        ),
                        'dependency' => array( 'bpleov_document_source', '==', 'google' ),
                    ),
                    array(
                        'id'         => 'bpleov_view_type',
                        'title'      => 'Viewer',
                        'type'       => 'radio',
                        'options'    => array(
                            'gooogle'   => __( 'Google Doc Viewer', 'embed-office-viewer' ),
                            'microsoft' => __( 'Microsoft Online Viewer', 'embed-office-viewer' ),
                            'js'        => __( 'JS Viewer', 'embed-office-viewer' ),
                        ),
                        'default'    => 'microsoft',
                        'dependency' => array( 'bpleov_document_source', '==', 'library' ),
                    ),
                    array(
                        'id'           => 'bpleov_document',
                        'type'         => 'upload',
                        'title'        => __( 'Document', 'embed-office-viewer' ),
                        'subtitle'     => '',
                        'desc'         => __( 'also support .pdf and .html in "View From" google', 'embed-office-viewer' ),
                        'help'         => 'help',
                        'before'       => '<p class="dfsp">Choose a document from Library or <b>Paste an external file link.</b></p>',
                        'after'        => 'Microsoft Word, Excel And Powerpodint Doc Only, Supported File Extension: .doc, .docx, .xls, .xlsx, .ppt, .pptx ',
                        'button_title' => 'Choose File',
                        'placeholder'  => 'http://',
                        'class'        => 'eov_document',
                        'dependency'   => array( 'bpleov_document_source', '==', 'library' ),
                    ),
                    array(
                        'id'      => 'bpleov_document_width',
                        'type'    => 'dimensions',
                        'title'   => __( 'Viewer Width', 'embed-office-viewer' ),
                        'height'  => false,
                        'default' => array(
                            'width' => '640',
                            'unit'  => 'px',
                        ),
                        'class'   => 'document-width',
                        'desc'    => __( 'Set how wide the document viewer should be. Leave blank to use the default width (640px).', 'embed-office-viewer' ),
                        'units'   => array( 'px' ),
                    ),
                    array(
                        'id'      => 'bpleov_document_height',
                        'type'    => 'dimensions',
                        'title'   => __( 'Viewer Height', 'embed-office-viewer' ),
                        'width'   => false,
                        'class'   => 'document-height',
                        'default' => array(
                            'height' => '900',
                            'unit'   => 'px',
                        ),
                        'desc'    => __( 'Set how tall the document viewer should be. Leave blank to use the default height (900px).', 'embed-office-viewer' ),
                        'units'   => array( 'px' ),
                    ),
                    array(
                        'id'    => 'bpleov_document_ext',
                        'type'  => 'text',
                        'title' => __( 'Document Extension', 'embed-office-viewer' ),
                        'class' => "eov_document_ext_field",
                    ),
                ),
            ) );

            // Section — Security & Restrictions
            CSF::createSection( $prefix, array(
                'title'  => __( 'Security & Restrictions', 'embed-office-viewer' ),
                'fields' => array(
                    array(
                        'id'    => 'bpleov_disbale_popout',
                        'type'  => 'switcher',
                        'title' => __( 'Hide Pop-out Button', 'embed-office-viewer' ),
                        'desc'  => __( 'Prevents users from opening the document in a separate browser tab or window. Applies when using Google Viewer with Library source.', 'embed-office-viewer' ),
                    ),
                    array(
                        'id'    => 'bpleov_show_name',
                        'type'  => 'switcher',
                        'title' => __( 'Display File Name', 'embed-office-viewer' ),
                        'desc'  => __( 'Shows the name of your document clearly at the top of the viewer. Applies to Library source only.', 'embed-office-viewer' ),
                    ),
                    array(
                        'id'    => 'bpleov_download_button',
                        'type'  => 'switcher',
                        'title' => __( 'Add Download Button', 'embed-office-viewer' ),
                        'desc'  => __( 'Places a visible download button on top, allowing visitors to easily save the file. Applies to Library source only.', 'embed-office-viewer' ),
                    ),
                    array(
                        'id'    => 'isRemoveDownloadBtn',
                        'type'  => 'switcher',
                        'title' => __( 'Hide Built-in Download Option', 'embed-office-viewer' ),
                        'desc'  => __( 'Removes the default download button provided natively by the document reading engine. Applies to Microsoft Viewer with PPTX files.', 'embed-office-viewer' ),
                        'class' => 'eov_disable_download_btn'
                    ),
                    array(
                        'id'    => 'isRemoveFullScreen',
                        'type'  => 'switcher',
                        'title' => __( 'Hide Built-in Full Screen Option', 'embed-office-viewer' ),
                        'desc'  => __( 'Removes the default full-screen button provided natively by the document reading engine. Applies to Microsoft Viewer with PPTX files.', 'embed-office-viewer' ),
                        'class' => 'eov_disable_download_btn'
                    ),
                    array(
                        'id'    => 'bpleov_right_click',
                        'type'  => 'switcher',
                        'title' => __( 'Protect Content (Disable Right-click)', 'embed-office-viewer' ),
                        'desc'  => __( 'Stops visitors from right-clicking the document, making it harder to copy or download unauthorized content.', 'embed-office-viewer' ),
                    ),
                    array(
                        'id'      => 'bpleov_disable_fullscreen',
                        'type'    => 'switcher',
                        'title'   => __( 'Disable Full Screen Viewing', 'embed-office-viewer' ),
                        'desc'    => __( 'Prevents the viewer from being expanded to take up the whole screen.', 'embed-office-viewer' ),
                        'default' => 0
                    ),
                ),
            ) );
        }
    }

}
