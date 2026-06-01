import React from 'react';



const GoogleFrontend = ({ attributes, onLoad }) => {
    const { officeViewer } = attributes;
    const { officeFile, height, width } = officeViewer;

    return <>
        {
            officeFile?.url ? <iframe
                id="s_pdf_frame"
                src={`//docs.google.com/gview?embedded=true&url=${officeFile.url}`}
                className="eov-center-iframe"
                height={height}
                width={width}
                frameBorder="0"
                onLoad={onLoad}>
            </iframe> : null
        }
    </>
}

export default GoogleFrontend;