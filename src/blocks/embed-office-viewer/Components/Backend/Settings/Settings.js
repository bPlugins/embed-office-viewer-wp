import React, { useState } from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { AboutProModal } from '../../../../../../../bpl-tools/ProControls';
import DocumentSource from './DocumentSource';
import ViewerEngine from './ViewerEngine';
import DisplayDimensions from './DisplayDimensions';
import SecurityRestrictions from './SecurityRestrictions';

const Settings = ({ attributes, setAttributes, isPremium }) => {
	const [isProModalOpen, setIsProModalOpen] = useState(false);

	const premiumProps = {
		isPremium,
		setIsProModalOpen
	}

	return <>
		<InspectorControls>
			<DocumentSource attributes={attributes} setAttributes={setAttributes} premiumProps={premiumProps} />

			<ViewerEngine attributes={attributes} setAttributes={setAttributes} premiumProps={premiumProps} />

			<DisplayDimensions attributes={attributes} setAttributes={setAttributes} premiumProps={premiumProps} />

			<SecurityRestrictions attributes={attributes} setAttributes={setAttributes} premiumProps={premiumProps} />
		</InspectorControls>

		<AboutProModal isProModalOpen={isProModalOpen} setIsProModalOpen={setIsProModalOpen} link='https://bplugins.com/products/document-viewer/#pricing'>
			<li>&emsp;<strong>{__('Google Drive: ', 'embed-office-viewer')}</strong>{__('You can upload document from your google drive', 'embed-office-viewer')}</li>
			<li>&emsp;<strong>{__('Dropbox: ', 'embed-office-viewer')}</strong>{__('Upload any document from your Dropbox.', 'embed-office-viewer')}</li>
			<li>&emsp;<strong>{__('Download Document: ', 'embed-office-viewer')}</strong>{__('User can download your document.', 'embed-office-viewer')}</li>
			<li>&emsp;<strong>{__('Display File Name: ', 'embed-office-viewer')}</strong>{__('Display/Enable file name at the top of your document.', 'embed-office-viewer')}</li>
			<li>&emsp;<strong>{__('Disable Right Click: ', 'embed-office-viewer')}</strong>{__('Disable/Enable right click.', 'embed-office-viewer')}</li>
			<li>&emsp;<strong>{__('Width: ', 'embed-office-viewer')}</strong>{__('Customize your document view width.', 'embed-office-viewer')}</li>
			<li>&emsp;<strong>{__('Height ', 'embed-office-viewer')}</strong>{__('Set Height for document.', 'embed-office-viewer')}</li>
		</AboutProModal>
	</>;
};
export default Settings;