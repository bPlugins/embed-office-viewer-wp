import React from 'react';


const GDriveFrontend = ({ attributes, onLoad }) => {
    const { officeViewer } = attributes;
    const { googleDriveURL, height, width } = officeViewer;

    return <div>
        {
            googleDriveURL && <iframe
                id="s_pdf_frame"
                src={googleDriveURL}
                className="eov-center-iframe"
                height={height}
                width={width}
                frameBorder="0"
                onLoad={onLoad}
            ></iframe>
        }
    </div>
}

export default GDriveFrontend;