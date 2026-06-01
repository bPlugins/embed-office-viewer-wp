import React from 'react';


const JsViewFrontend = ({ attributes, onLoad }) => {
    const { officeViewer } = attributes;
    const { officeFile, height, width } = officeViewer;

    return <>
        {
            officeFile?.url ? <iframe
                id="s_pdf_frame"
                src={`${window?.eovData?.pdfJsFilePath}?file=${officeFile.url}`}
                height={height}
                width={width}
                onLoad={onLoad}>
            </iframe> : null
        }
    </>
}

export default JsViewFrontend;