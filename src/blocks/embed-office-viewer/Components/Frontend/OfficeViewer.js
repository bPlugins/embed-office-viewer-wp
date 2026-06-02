import React, { useEffect, useState } from 'react';
import GoogleFrontend from './GoogleFrontend';
import MicrosoftFrontend from './MicrosoftFrontend';


const OfficeViewer = ({ attributes, id }) => {
	const { officeViewer } = attributes;
	const { officeFile, viewer, docSource, height, width } = officeViewer || {};

	const [isLoading, setIsLoading] = useState(true);

	const currentUrl = officeFile?.url;

	useEffect(() => {
		setIsLoading(true);
	}, [currentUrl]);

	const handleOnLoad = () => {
		setIsLoading(false);
	};

	const hasFile = officeFile?.url;

	if (!hasFile) {
		return null;
	}

	return <>
		<div className='eovOfficeViewer' id={id}>
			<div id="wrapper" className="eov_wrapper" style={{ width: width || '100%', margin: '0 auto' }}>
				{isLoading && (
					<div className="eov-loading-overlay" style={{ height: height || '500px', width: width || '100%' }}>
						<div className="eov-spinner"></div>
						<span>Loading document...</span>
					</div>
				)}
				
				{docSource === 'library' && viewer === 'google' && <GoogleFrontend attributes={attributes} onLoad={handleOnLoad} />}
				{docSource === 'library' && viewer === 'microsoft' && <MicrosoftFrontend attributes={attributes} onLoad={handleOnLoad} />}
			</div>

		</div>
	</>
}
export default OfficeViewer;