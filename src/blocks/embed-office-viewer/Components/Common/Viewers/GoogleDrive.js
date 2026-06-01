import React from 'react';
import { Info } from '../../../utils/icons';
import GooglePicker from './GooglePicker';

const GoogleDrive = ({ attributes, setAttributes }) => {
    const { officeViewer } = attributes;
    const { googleDriveURL, width, height } = officeViewer;


    return <>
        {
            (window.eovData?.credentials?.google?.api_key && window.eovData?.credentials?.google?.client_id && window.eovData?.credentials?.google?.project_number) ? <>
                {
                    googleDriveURL ? <iframe
                        id="s_pdf_frame"
                        src={googleDriveURL}
                        className="eov-center-iframe"
                        height={height}
                        width={width}
                        frameBorder="0"
                    ></iframe> : <div className='file-uploader-page'>
                        <div className='uploader-text'>
                            <Info />
                            <p>Please upload your file from Google Drive</p>
                        </div>
                        <div className='upload-btn eov-google-picker-btn-wrapper'>
                            <GooglePicker attributes={attributes} setAttributes={setAttributes} />
                        </div>
                    </div>
                }
            </> : <div className='non-cr-page'>
                <div className='cr-text'>
                    <Info />
                    <p>Please add your credentials</p>
                </div>
                <button className='cr-link'>
                    <a href="/wp-admin/edit.php?post_type=officeviewer&page=bpleov-onedrive" target='_blank'>Add Your Credentials</a>
                </button>
            </div>
        }
    </>
        ;
};

export default GoogleDrive;
