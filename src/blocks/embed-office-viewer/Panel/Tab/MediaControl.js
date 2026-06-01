import { Label } from '../../../../../../bpl-tools/Components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, PanelRow, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const InlineMediaUpload = props => {
    const { className, label = '', value, types = ['image'], onChange, placeholder = __('Enter URL') } = props;

    return <div className={className}>
        {label && <Label className='mb5'>{label}</Label>}

        <PanelRow className={`bPlInlineMediaUpload`}>
            <TextControl value={value} onChange={val => onChange(val)} placeholder={placeholder} />

            <MediaUploadCheck>
                <MediaUpload
                    allowedTypes={types}
                    onSelect={val => onChange(val)}
                    render={({ open }) => <Button className='button button-primary' onClick={open} icon={'upload'}></Button>}
                />
            </MediaUploadCheck>
        </PanelRow>
    </div>
}