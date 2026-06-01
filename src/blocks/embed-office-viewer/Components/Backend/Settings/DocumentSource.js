import React from "react";
import { PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { updateData } from "../../../../../../../bpl-tools/utils/functions";
import { Notice, InlineMediaUpload } from "../../../../../../../bpl-tools/Components";

const DocumentSource = ({ attributes, setAttributes }) => {
  const { officeViewer } = attributes;
  const { officeFile } = officeViewer;

  const documentIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  );

  return (
    <PanelBody
      className="bPlPanelBody"
      initialOpen={false}
      title={
        <div className="bpleov-panel-title">
          {documentIcon}
          {__("Document Source", "embed-office-viewer")}
        </div>
      }
    >
      <InlineMediaUpload
        className="mt10"
        label={__("Document File", "embed-office-viewer")}
        value={officeFile.url}
        types={[
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          "application/pdf",
          "text/html",
        ]}
        onChange={(value) => {
          setAttributes({
            officeViewer: updateData(
              officeViewer,
              {
                ...(value?.url
                  ? { url: value.url, title: value.title }
                  : { url: value }),
              },
              "officeFile"
            ),
          });
        }}
        placeholder={__("https://", "embed-office-viewer")}
      />
      <p className="components-base-control__help" style={{ marginTop: "8px", fontSize: "12px", lineHeight: "1.4", color: "#666" }}>
        <strong>{__("Supported formats: ", "embed-office-viewer")}</strong>
        {__("Word (.doc, .docx), Excel (.xls, .xlsx), PowerPoint (.ppt, .pptx), PDF (.pdf), and HTML (.html).", "embed-office-viewer")}
      </p>

      <Notice status="premium" isIcon={true}>
        {__("Unlock Google Drive and Dropbox document sources—available exclusively in Premium.", "embed-office-viewer")}
      </Notice>
    </PanelBody>
  );
};

export default DocumentSource;
