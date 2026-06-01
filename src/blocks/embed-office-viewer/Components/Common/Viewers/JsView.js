import { Info } from '../../../utils/icons';



const JsView = ({ attributes }) => {
    const { officeViewer } = attributes;
    const { officeFile, height, width } = officeViewer;


    return <>
        {
            officeFile ? <iframe
                id="s_pdf_frame"
                src={`${window?.eovData?.pdfJsFilePath}?file=${officeFile.url}`}
                height={height}
                width={width}>
            </iframe> : <div className='file-uploader-page'>
                <div className='uploader-text'>
                    <Info />
                    <p>Please upload your document</p>
                </div>
            </div>
        }
    </>
}

export default JsView;