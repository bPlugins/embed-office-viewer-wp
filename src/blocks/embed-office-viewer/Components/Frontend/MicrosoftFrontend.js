import React from 'react';


const MicrosoftFrontend = ({ attributes, onLoad }) => {
    const { officeViewer } = attributes;
    const { officeFile, height, width, isRemoveDownloadBtn, isRemoveFullScreen } = officeViewer;

    const fileExtension = officeFile?.url?.split('.').pop().toLowerCase();


    return <>
        {
            officeFile?.url ? <div className="eov-ms-container" style={{ width, height }}>
                <iframe
                    id="s_pdf_frame"
                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${officeFile.url}`}
                    height={height}
                    width={width}
                    frameBorder="0"
                    className="eov-ms-iframe"
                    onLoad={onLoad}
                />
                {
                    isRemoveDownloadBtn && (fileExtension === 'pptx') &&
                    <div className="eov-ms-remove-download" />
                }
                {
                    isRemoveFullScreen && (fileExtension === 'pptx') &&
                    <div className="eov-ms-remove-fullscreen" />
                }
            </div> : null
        }
    </>
}

export default MicrosoftFrontend;