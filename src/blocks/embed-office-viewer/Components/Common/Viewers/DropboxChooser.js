import React, { useState, useEffect } from "react";
import { updateData } from "../../../../../../../bpl-tools/utils/functions";

const DropboxChooser = ({ attributes, setAttributes }) => {
  const { officeViewer } = attributes;
  const { dropboxURL } = officeViewer;
  const [newDropUrl, setNewDropUrl] = useState(dropboxURL);

  // Dropbox
  useEffect(() => {
    if (!window.Dropbox) return;

    window.chooseDropboxFile = function () {
      window.Dropbox.choose({
        success: (files) => {
          if (!files[0]?.link) return;
          setNewDropUrl(files[0]?.link);
        },
        linkType: "preview",
        multiselect: false,
        extensions: [
          ".doc",
          ".docx",
          ".xls",
          ".xlsx",
          ".ppt",
          ".pptx",
          ".pdf",
          ".html",
        ],
      });
    };
  }, []);

  useEffect(() => {
    if (!newDropUrl) return;
    const updatedViewer = updateData(
      updateData(officeViewer, newDropUrl, "dropboxURL"),
      "dropbox",
      "docSource"
    );

    setAttributes({
      officeViewer: updatedViewer,
    });
    setNewDropUrl("");
  }, [newDropUrl]);

  return (
    <>
      {window.eovData?.credentials?.dropbox?.app_key ? (
        <button onClick={() => window.chooseDropboxFile()} className="driveBtn">
          Upload From Dropbox
        </button>
      ) : (
        <button className="addCrBtn">
          <a
            href="/wp-admin/edit.php?post_type=officeviewer&page=bpleov-onedrive"
            target="_blank"
          >
            Add Your Credentials
          </a>
        </button>
      )}
    </>
  );
};

export default DropboxChooser;
