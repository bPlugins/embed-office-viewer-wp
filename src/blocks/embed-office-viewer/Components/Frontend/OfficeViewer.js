import React, { useEffect, useState } from 'react';
import DropboxFrontend from './DropboxFrontend';
import GDriveFrontend from './GDriveFrontend';
import GoogleFrontend from './GoogleFrontend';
import MicrosoftFrontend from './MicrosoftFrontend';
import JsViewFrontend from './JsViewFrontend';


const OfficeViewer = ({ attributes, id }) => {
	const { officeViewer } = attributes;
	const { officeFile, showDownloadBtnOnTop, showFileNameOnTop, viewer, docSource, disablePopout, disableRightClick, disableFullScreen, googleDriveURL, dropboxURL, height, width } = officeViewer || {};

	const [isLoading, setIsLoading] = useState(true);

	const currentUrl = docSource === 'library' ? officeFile?.url : (docSource === 'googleDrive' ? googleDriveURL : dropboxURL);

	useEffect(() => {
		setIsLoading(true);
	}, [currentUrl]);

	const handleOnLoad = () => {
		setIsLoading(false);
	};

	useEffect(() => {
		if (!disableRightClick) return;

		const disablePageContext = (e) => e.preventDefault();
		document.addEventListener('contextmenu', disablePageContext);

		// Block common keyboard shortcuts for copying/saving/printing
		const disableKeyboardShortcuts = (e) => {
			if ((e.ctrlKey || e.metaKey) && ['c', 'a', 's', 'p'].includes(e.key.toLowerCase())) {
				e.preventDefault();
			}
		};
		document.addEventListener('keydown', disableKeyboardShortcuts);

		const timeoutId = setTimeout(() => {
			try {
				const iframe = document.getElementById('s_pdf_frame');
				if (iframe?.contentWindow?.document) {
					iframe.contentWindow.document.oncontextmenu = (e) => {
						e.preventDefault();
					};
				}
			} catch (err) {
				// Mute cross-origin console errors safely
			}
		}, 1000);

		return () => {
			document.removeEventListener('contextmenu', disablePageContext);
			document.removeEventListener('keydown', disableKeyboardShortcuts);
			clearTimeout(timeoutId);
		};

	}, [disableRightClick]);

	const hasFile = (
		(docSource === 'library' && officeFile?.url) ||
		(docSource === 'googleDrive' && googleDriveURL) ||
		(docSource === 'dropbox' && dropboxURL)
	);

	if (!hasFile) {
		return null;
	}

	return <>
		<div className='eovOfficeViewer' id={id}>
			{
				(docSource === "library") && <>
					{
						showFileNameOnTop && <p>File Name: {officeFile?.title}</p>
					}
					{
						showDownloadBtnOnTop && <button
							onClick={() => {
								const link = document.createElement("a");
								link.href = officeFile.url;
								link.download = officeFile.title || "downloaded-file";
								document.body.appendChild(link);
								link.click();
								document.body.removeChild(link);
							}}
							className="eov-download-btn"
						>
							Download File
						</button>
					}
				</>
			}

			<div id="wrapper" className="eov_wrapper" style={{ width: width || '100%', margin: '0 auto' }}>
				{isLoading && (
					<div className="eov-loading-overlay" style={{ height: height || '500px', width: width || '100%' }}>
						<div className="eov-spinner"></div>
						<span>Loading document...</span>
					</div>
				)}
				{disableRightClick && <div id="block"></div>}
				{(disableRightClick || disableFullScreen) && <div id="disableFullscreen"></div>}
				
				{docSource === 'library' && viewer === 'google' && <GoogleFrontend attributes={attributes} onLoad={handleOnLoad} />}
				{docSource === 'library' && viewer === 'microsoft' && <MicrosoftFrontend attributes={attributes} onLoad={handleOnLoad} />}
				{docSource === 'library' && viewer === 'js' && <JsViewFrontend attributes={attributes} onLoad={handleOnLoad} />}
				{docSource === 'googleDrive' && <GDriveFrontend attributes={attributes} onLoad={handleOnLoad} />}
				{docSource === 'dropbox' && <DropboxFrontend attributes={attributes} onLoad={handleOnLoad} />}
				{disablePopout && <div className="disablePopout"></div>}
			</div>

		</div>
	</>
}
export default OfficeViewer;