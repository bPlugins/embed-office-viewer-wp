import React from 'react';
import { Info } from '../../../utils/icons';





const Microsoft = ({ attributes }) => {
    const { officeViewer } = attributes;
    const { officeFile, height, width, isRemoveDownloadBtn, isRemoveFullScreen } = officeViewer;

    const fileExtension = officeFile?.url?.split('.').pop().toLowerCase();


    return <>
        {
            officeFile ? <div className="eov-ms-container" style={{ width, height }}>
                <iframe
                    id="s_pdf_frame"
                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${officeFile.url}`}
                    height={height}
                    width={width}
                    frameBorder="0"
                    className="eov-ms-iframe"
                />
                {
                    isRemoveDownloadBtn && (fileExtension === 'pptx') &&
                    <div className="eov-ms-remove-download" />
                }
                {
                    isRemoveFullScreen && (fileExtension === 'pptx') &&
                    <div className="eov-ms-remove-fullscreen" />
                }
            </div> : <div className='file-uploader-page'>
                <div className='uploader-text'>
                    <Info />
                    <p>Please upload your document</p>
                </div>
            </div>
        }
    </>
}

export default Microsoft;