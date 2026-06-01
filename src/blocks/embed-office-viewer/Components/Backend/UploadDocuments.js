import { useRef, useState } from "react";
import { uploadMedia } from "@wordpress/media-utils";
import "./UploadDocuments.scss";
import DropboxChooser from "../Common/Viewers/DropboxChooser";
import GooglePicker from "../Common/Viewers/GooglePicker";
import { updateData } from "../../../../../../bpl-tools/utils/functions";

// Sleek, minimal icons for navigation
const deviceIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const mediaIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
    <polyline points="14 2 14 8 20 8" />
    <circle cx="12" cy="14" r="3" />
    <path d="M12 17h.01" />
  </svg>
);

const urlIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const googleIcon = (
  <svg width="15" height="15" viewBox="0 0 1440 1440" fill="currentColor">
    <path d="M960 90l450 780H930L480 90h480z" fill="#0066da" />
    <path d="M480 90l240 420-450 780L30 870 480 90z" fill="#00aa47" />
    <path d="M720 510l210 360H60l210-360h450z" fill="#ffba00" />
  </svg>
);

const dropboxIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 1.998l6 3.864-6 3.862-6-3.862zm0 15.426l6-3.863 6 3.863-6 3.864zm6-11.562l6-3.864 6 3.864-6 3.862zm0 7.698l6-3.862 6 3.862-6 3.864zm-6 0l-6-3.862 6-3.864 6 3.864z" fill="#0061ff"/>
  </svg>
);

const UploadDocuments = ({ attributes, setAttributes }) => {
  const [url, setUrl] = useState("");
  const [activeUploadOption, setActiveUploadOption] = useState("device");
  const [isDragging, setIsDragging] = useState(false);
  const uploadInputRef = useRef(null);
  const { officeViewer } = attributes;

  /** Upload From Device */
  const handleDeviceUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    const file = files[0];

    uploadMedia({
      filesList: [file],
      onFileChange: (media) => {
        const m = media[0];
        setAttributes({
          officeViewer: updateData(officeViewer, m, "officeFile"),
        });
      },
      onError: (err) => console.error(`Upload Error: ${err}`),
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      uploadMedia({
        filesList: [file],
        onFileChange: (media) => {
          const m = media[0];
          setAttributes({
            officeViewer: updateData(officeViewer, m, "officeFile"),
          });
        },
        onError: (err) => console.error(`Upload Error: ${err}`),
      });
    }
  };

  /** Upload Via URL */
  const handleUrlUpload = async () => {
    if (!url) return;
    setAttributes({
      officeViewer: updateData(officeViewer, { url }, "officeFile"),
    });
    setUrl("");
  };

  /** Media Library */
  const openLibraryModal = () => {
    const frame = wp.media({
      title: "Select Document",
      multiple: false,
      button: { text: "Use this document" },
    });

    frame.on("select", () => {
      const file = frame.state().get("selection").first().toJSON();
      setAttributes({
        officeViewer: updateData(officeViewer, file, "officeFile"),
      });
    });

    frame.open();
  };

  return (
    <div className="bpl-upload-docs-minimal">
      <div className="uploader-workspace">
        {/* Upload From Device */}
        {activeUploadOption === "device" && (
          <div className="workspace-pane">
            <div
              className={`drag-drop-zone ${isDragging ? "dragging" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => uploadInputRef.current.click()}
            >
              <div className="zone-content">
                <svg className="upload-cloud-icon" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#226df5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <h3>Drag & Drop document here or <span className="browse-text">browse</span></h3>
                <p>Supports Word, Excel, PowerPoint, PDF, HTML</p>
              </div>
            </div>
            <input
              type="file"
              accept={[
                ".doc",
                ".docx",
                ".xls",
                ".xlsx",
                ".ppt",
                ".pptx",
                ".pdf",
                ".html",
              ]}
              ref={uploadInputRef}
              onChange={handleDeviceUpload}
              hidden
            />
          </div>
        )}

        {/* Media Library */}
        {activeUploadOption === "media-library" && (
          <div className="workspace-pane">
            <div className="media-library-zone" onClick={openLibraryModal}>
              <div className="zone-content">
                <svg className="folder-icon" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#226df5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                <h3>WordPress Media Library</h3>
                <p>Embed an existing document from your media files.</p>
                <button className="bpl-btn-primary" onClick={(e) => { e.stopPropagation(); openLibraryModal(); }}>
                  Open Media Library
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Insert Via URL */}
        {activeUploadOption === "url" && (
          <div className="workspace-pane">
            <div className="url-zone">
              <div className="url-input-wrapper">
                <svg className="link-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <input
                  type="text"
                  className="upload-url-input"
                  placeholder="Enter document URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <button className="bpl-btn-primary" onClick={handleUrlUpload} disabled={!url}>
                  Insert
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Google Drive */}
        {activeUploadOption === "google-drive" && (
          <div className="workspace-pane">
            <div className="cloud-zone">
              <div className="zone-content">
                <div className="cloud-brand-logo google">
                  <svg width="32" height="32" viewBox="0 0 1440 1440" fill="currentColor">
                    <path d="M960 90l450 780H930L480 90h480z" fill="#0066da" />
                    <path d="M480 90l240 420-450 780L30 870 480 90z" fill="#00aa47" />
                    <path d="M720 510l210 360H60l210-360h450z" fill="#ffba00" />
                  </svg>
                </div>
                <h3>Google Drive</h3>
                <p className="cloud-desc">
                  Select and embed documents directly from your Google Drive.
                </p>
                <div className="cloud-picker-wrapper">
                  <GooglePicker attributes={attributes} setAttributes={setAttributes} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dropbox */}
        {activeUploadOption === "dropbox" && (
          <div className="workspace-pane">
            <div className="cloud-zone">
              <div className="zone-content">
                <div className="cloud-brand-logo dropbox">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 1.998l6 3.864-6 3.862-6-3.862zm0 15.426l6-3.863 6 3.863-6 3.864zm6-11.562l6-3.864 6 3.864-6 3.862zm0 7.698l6-3.862 6 3.862-6 3.864zm-6 0l-6-3.862 6-3.864 6 3.864z" fill="#0061ff" />
                  </svg>
                </div>
                <h3>Dropbox</h3>
                <p className="cloud-desc">
                  Select and embed documents directly from your Dropbox account.
                </p>
                <div className="cloud-picker-wrapper">
                  <DropboxChooser attributes={attributes} setAttributes={setAttributes} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="uploader-footer-tabs">
        <button
          onClick={() => setActiveUploadOption("device")}
          className={`tab-btn ${activeUploadOption === "device" ? "active" : ""}`}
        >
          {deviceIcon}
          <span>Upload File</span>
        </button>
        <button
          onClick={() => setActiveUploadOption("media-library")}
          className={`tab-btn ${activeUploadOption === "media-library" ? "active" : ""}`}
        >
          {mediaIcon}
          <span>Media Library</span>
        </button>
        <button
          onClick={() => setActiveUploadOption("url")}
          className={`tab-btn ${activeUploadOption === "url" ? "active" : ""}`}
        >
          {urlIcon}
          <span>URL</span>
        </button>
        <button
          onClick={() => setActiveUploadOption("google-drive")}
          className={`tab-btn ${activeUploadOption === "google-drive" ? "active" : ""}`}
        >
          {googleIcon}
          <span>Google Drive</span>
        </button>
        <button
          onClick={() => setActiveUploadOption("dropbox")}
          className={`tab-btn ${activeUploadOption === "dropbox" ? "active" : ""}`}
        >
          {dropboxIcon}
          <span>Dropbox</span>
        </button>
      </div>
    </div>
  );
};

export default UploadDocuments;
