import React from 'react';


const MicrosoftFrontend = ({ attributes, onLoad }) => {
    const { officeViewer } = attributes;
    const { officeFile, height, width } = officeViewer;

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
            </div> : null
        }
    </>
}

export default MicrosoftFrontend;