import { Info } from '../../../utils/icons';
import DropboxChooser from './DropboxChooser';

const Dropbox = ({ attributes, setAttributes }) => {
    const { officeViewer } = attributes;
    const { dropboxURL, height, width } = officeViewer;


    const directLink = dropboxURL
        .replace("www.dropbox.com", "dl.dropboxusercontent.com")
        .replace("?dl=0", "");

    return <>
        {
            window.eovData?.credentials?.dropbox?.app_key ? <>
                {
                    dropboxURL ? <iframe
                        src={`https://docs.google.com/gview?url=${encodeURIComponent(directLink)}&embedded=true`}
                        className="eov-border-none"
                        width={width}
                        height={height}
                        frameBorder="0"
                        title="Dropbox Document Viewer"
                    /> : <div className='file-uploader-page'>
                        <div className='uploader-text'>
                            <Info />
                            <p>Please upload your file from Dropbox</p>
                        </div>
                        <div className='upload-btn'>
                            <DropboxChooser attributes={attributes} setAttributes={setAttributes} />
                        </div>
                    </div>
                }
            </> : <div className='non-cr-page'>
                <div className='cr-text'>
                    <Info />
                    <p>Please add your credentials</p>
                </div>
                <button className='cr-link'>
                    <a href="/wp-admin/edit.php?post_type=officeviewer&page=bpleov-onedrive">Add Your Credentials</a>
                </button>
            </div>
        }
    </>
}

export default Dropbox;