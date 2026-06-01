import React from 'react';


const DropboxFrontend = ({ attributes, onLoad }) => {
    const { officeViewer } = attributes;
    const { dropboxURL, width, height } = officeViewer;

    const directLink = dropboxURL
        .replace("www.dropbox.com", "dl.dropboxusercontent.com")
        .replace("?dl=0", "");

    return (
        <>
            {dropboxURL && (
                <iframe
                    src={`https://docs.google.com/gview?url=${encodeURIComponent(directLink)}&embedded=true`}
                    className="eov-border-none"
                    width={width}
                    height={height}
                    frameBorder="0"
                    title="Dropbox Document Viewer"
                    onLoad={onLoad}
                />
            )}
        </>
    );
};


export default DropboxFrontend;