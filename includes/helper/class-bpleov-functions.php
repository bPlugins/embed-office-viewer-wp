<?php
namespace BPLEOV\Helper;

class Functions {

    /**
     * Get post meta value with fallback lookup to legacy eov_ keys.
     */
    public static function meta( $id, $key, $default = null ) {
        if ( metadata_exists( 'post', $id, $key ) ) {
            $value = get_post_meta( $id, $key, true );
            if ( $value !== '' ) {
                return $value;
            }
        }

        // Fallback: If key starts with bpleov_, check legacy eov_ counterpart
        if ( strpos( $key, 'bpleov_' ) === 0 ) {
            $old_key = str_replace( 'bpleov_', 'eov_', $key );
            if ( metadata_exists( 'post', $id, $old_key ) ) {
                $value = get_post_meta( $id, $old_key, true );
                if ( $value !== '' ) {
                    return $value;
                }
            }
        }

        return $default;
    }

    /**
     * Get option value with fallback lookup to legacy eov_ options.
     */
    public static function get_option( $option, $default = false ) {
        $value = get_option( $option, null );
        if ( $value !== null ) {
            return $value;
        }

        // Fallback: If option starts with bpleov_, check legacy eov_ counterpart
        if ( strpos( $option, 'bpleov_' ) === 0 ) {
            $old_option = str_replace( 'bpleov_', 'eov_', $option );
            $value = get_option( $old_option, null );
            if ( $value !== null ) {
                return $value;
            }
        }

        return $default;
    }

    /**
     * Wrap premium metabox fields.
     */
    public static function bpleov_lock_field( $field, $is_section = false ) {
        if ( function_exists( 'bpleov_fs' ) && bpleov_fs()->can_use_premium_code() ) {
            return $field;
        }

        // Lock the UI
        if ( isset( $field['id'] ) && $field['id'] === 'bpleov_document_source' ) {
            $field['class'] = 'bpleov-lock-field document_source_btn' . ( $is_section ? 'section' : '' );
        } else {
            $field['class'] = 'bpleov-lock-field ' . ( $is_section ? 'section' : '' );
        }

        // Force safe default (prevents DB pollution)
        if ( isset( $field['default'] ) ) {
            $field['value'] = $field['default'];
        }
        return $field;
    }

    /**
     * Render Pro title badge.
     */
    public static function bpleov_pro_title( $title ) {
        if ( function_exists( 'bpleov_fs' ) && bpleov_fs()->can_use_premium_code() ) {
            return esc_html( $title );
        }

        return '
            <div class="bpleov-field-title">
                <h4>' . esc_html( $title ) . '</h4>
                <span class="bpleov-pro-badge">PRO</span>
            </div>
        ';
    }

}
