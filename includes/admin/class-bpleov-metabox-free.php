<?php
namespace BPLEOV;
use BPLEOV\Helper\Functions;
use CSF;

class MetaboxFree
{

    public static function init()
    {
        if (class_exists('CSF')) {

            $prefix = '_bpleovm_';

            CSF::createMetabox($prefix, array(
                'title' => 'Viewer Configuration',
                'post_type' => 'officeviewer',
                'data_type' => 'unserialize',
                'class' => 'spt-main-class',
                'priority' => 'high',
                'theme' => 'light'
            ));
            // Section — Document Settings
            CSF::createSection($prefix, array(
                'title' => __('Document Settings', 'embed-office-viewer'),
                'fields' => array(
                    Functions::bpleov_lock_field(array(
                        'id' => 'bpleov_document_source',
                        'title' => Functions::bpleov_pro_title(__('Document Source', 'embed-office-viewer')),
                        'type' => 'button_set',
                        'options' => array(
                            'library' => __('Library', 'embed-office-viewer'),
                            'google' => __('Google Drive', 'embed-office-viewer'),
                            'dropbox' => __('Dropbox', 'embed-office-viewer'),
                        ),
                        'multiselect' => false,
                        'default' => 'library',
                        'attributes' => array('id' => 'document_source_btn')
                    )),
                    array(
                        'id' => 'bpleov_view_type',
                        'title' => __('Viewer', 'embed-office-viewer'),
                        'type' => 'radio',
                        'options' => array(
                            'gooogle' => __('Google Doc Viewer', 'embed-office-viewer'),
                            'microsoft' => __('Microsoft Online Viewer', 'embed-office-viewer'),
                            'js' => __('JS Viewer', 'embed-office-viewer'),
                        ),
                        'default' => 'microsoft',
                        'class' => 'viewer-type',
                        'dependency' => array('bpleov_document_source', '==', 'library'),
                    ),
                    array(
                        'id' => 'bpleov_document',
                        'type' => 'upload',
                        'title' => __('Document', 'embed-office-viewer'),
                        'subtitle' => '',
                        'desc' => __('also support .pdf and .html in "View From" google', 'embed-office-viewer'),
                        'help' => 'help',
                        'before' => '<p class="dfsp">Choose a document from Library or <b>Paste an external file link.</b></p>',
                        'after' => 'Microsoft Word, Excel And Powerpodint Doc Only, Supported File Extension: .doc, .docx, .xls, .xlsx, .ppt, .pptx ',
                        'button_title' => 'Choose File',
                        'placeholder' => 'http://',
                        'class' => 'eov_document',
                        'dependency' => array('bpleov_document_source', '==', 'library'),
                    ),
                    array(
                        'id' => 'bpleov_document_width',
                        'type' => 'dimensions',
                        'title' => __('Viewer Width', 'embed-office-viewer'),
                        'height' => false,
                        'default' => array(
                            'width' => '640',
                            'unit' => 'px',
                        ),
                        'class' => 'document-width',
                        'desc' => __('Set how wide the document viewer should be. Leave blank to use the default width (640px).', 'embed-office-viewer'),
                        'units' => array('px'),
                    ),
                    array(
                        'id' => 'bpleov_document_height',
                        'type' => 'dimensions',
                        'title' => __('Viewer Height', 'embed-office-viewer'),
                        'width' => false,
                        'class' => 'document-height',
                        'default' => array(
                            'height' => '900',
                            'unit' => 'px',
                        ),
                        'desc' => __('Set how tall the document viewer should be. Leave blank to use the default height (900px).', 'embed-office-viewer'),
                        'units' => array('px'),
                    ),
                ),
            ));

            // Section — Security & Restrictions
            CSF::createSection($prefix, array(
                'title' => __('Security & Restrictions', 'embed-office-viewer'),
                'fields' => array(
                    Functions::bpleov_lock_field([
                        'id' => 'bpleov_disbale_popout',
                        'type' => 'switcher',
                        'title' => Functions::bpleov_pro_title(esc_html__('Hide Pop-out Button', 'embed-office-viewer')),
                        'desc' => esc_html__('Prevents users from opening the document in a separate browser tab or window. Applies when using Google Viewer with Library source.', 'embed-office-viewer'),
                    ]),
                    Functions::bpleov_lock_field([
                        'id' => 'bpleov_show_name',
                        'type' => 'switcher',
                        'title' => Functions::bpleov_pro_title(esc_html__('Display File Name', 'embed-office-viewer')),
                        'desc' => esc_html__('Shows the name of your document clearly at the top of the viewer. Applies to Library source only.', 'embed-office-viewer'),
                    ]),
                    Functions::bpleov_lock_field([
                        'id' => 'bpleov_download_button',
                        'type' => 'switcher',
                        'title' => Functions::bpleov_pro_title(esc_html__('Add Download Button', 'embed-office-viewer')),
                        'desc' => esc_html__('Places a visible download button on top, allowing visitors to easily save the file. Applies to Library source only.', 'embed-office-viewer'),
                    ]),
                    Functions::bpleov_lock_field([
                        'id' => 'isRemoveDownloadBtn',
                        'type' => 'switcher',
                        'title' => Functions::bpleov_pro_title(esc_html__('Hide Built-in Download Option', 'embed-office-viewer')),
                        'desc' => esc_html__('Removes the default download button provided natively by the document reading engine. Applies to Microsoft Viewer with PPTX files.', 'embed-office-viewer'),
                        'class' => 'eov_disable_download_btn'
                    ]),
                    Functions::bpleov_lock_field([
                        'id' => 'isRemoveFullScreen',
                        'type' => 'switcher',
                        'title' => Functions::bpleov_pro_title(esc_html__('Hide Built-in Full Screen Option', 'embed-office-viewer')),
                        'desc' => esc_html__('Removes the default full-screen button provided natively by the document reading engine. Applies to Microsoft Viewer with PPTX files.', 'embed-office-viewer'),
                        'class' => 'eov_disable_download_btn'
                    ]),
                    Functions::bpleov_lock_field([
                        'id' => 'bpleov_right_click',
                        'type' => 'switcher',
                        'title' => Functions::bpleov_pro_title(esc_html__('Protect Content (Disable Right-click)', 'embed-office-viewer')),
                        'desc' => esc_html__('Stops visitors from right-clicking the document, making it harder to copy or download unauthorized content.', 'embed-office-viewer'),
                    ]),
                ),
            ));

            // Cloud API Settings
            $prefix = 'free_cloud_settings';

            // Create options
            CSF::createOptions($prefix, array(
                'framework_title' => 'Cloud API Settings',
                'theme' => 'light',
                'menu_title' => __('Cloud API Settings', 'embed-office-viewer'),
                'menu_parent' => 'edit.php?post_type=officeviewer',
                'menu_slug' => 'bpleov-onedrive',
                'menu_type' => 'submenu',
                'menu_capability' => 'manage_options',
            ));
            CSF::createSection($prefix, array(
                'id' => 'bpleov_onedrive_tab',
                'fields' => array(
                    Functions::bpleov_lock_field(
                        array(
                            'id' => 'bpleov_dropbox_appkey',
                            'title' => Functions::bpleov_pro_title(__('Dropbox App Key', 'embed-office-viewer')),
                            'type' => 'text',
                            'attributes' => array('id' => 'bpleov_dropbox_appkey'),
                            'desc' => 'Please <a href="https://www.dropbox.com/developers/apps/create" target="_blank">Click Here</a> to create Dropbox API key',
                        )
                    ),
                    array(
                        'id' => "content",
                        'type' => 'content',
                        'content' => __('Google API Setup', 'embed-office-viewer'),
                        'class' => 'csf-field-subheading',
                    ),
                    Functions::bpleov_lock_field(array(
                        'id' => 'bpleov_google_apikey',
                        'type' => 'text',
                        'title' => Functions::bpleov_pro_title(__('Google API key', 'embed-office-viewer')),
                        'before' => '<p><a href="https://console.cloud.google.com/" target="_blank">Click Here</a> To Get Google Credentials</p>',
                    )),
                    Functions::bpleov_lock_field(array(
                        'id' => 'bpleov_google_client_id',
                        'type' => 'text',
                        'title' => Functions::bpleov_pro_title(__('Google Client ID', 'embed-office-viewer')),
                    )),
                    Functions::bpleov_lock_field(array(
                        'id' => 'bpleov_google_project_number',
                        'type' => 'text',
                        'title' => Functions::bpleov_pro_title(__('Google Project Number', 'embed-office-viewer')),
                    )),
                ),
            ));

        }
    }

}
