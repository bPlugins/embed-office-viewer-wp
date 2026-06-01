import { Info } from '../../../utils/icons';
const Google = ({ attributes }) => {
    const { officeViewer } = attributes;
    const { officeFile, height, width } = officeViewer;

    return <>
        {
            officeFile ? <iframe
                id="s_pdf_frame"
                src={`//docs.google.com/gview?embedded=true&url=${officeFile.url}`}
                className="eov-center-iframe"
                height={height}
                width={width}
                frameBorder="0">
            </iframe> : <div className='file-uploader-page'>
                <div className='uploader-text'>
                    <Info />
                    <p>Please upload your document</p>
                </div>
            </div>
        }
    </>
}

export default Google;