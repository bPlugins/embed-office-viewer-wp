import React from "react";
import { PanelBody, SelectControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { viewerOptions } from "../../../utils/options";
import { updateData } from "../../../../../../../bpl-tools/utils/functions";
import { Notice } from "../../../../../../../bpl-tools/Components";

const ViewerEngine = ({ attributes, setAttributes }) => {
  const { officeViewer } = attributes;
  const { docSource, viewer } = officeViewer;

  if (docSource !== "library") {
    return null;
  }

  const engineIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  );

  const displayOptions = viewerOptions.filter(opt => opt.value !== "js");

  return (
    <PanelBody
      className="bPlPanelBody"
      initialOpen={false}
      title={
        <div className="bpleov-panel-title">
          {engineIcon}
          {__("Viewer Engine", "embed-office-viewer")}
        </div>
      }
    >
      <SelectControl
        label={__("Viewer Engine", "embed-office-viewer")}
        help={__("Choose a service to display the document.", "embed-office-viewer")}
        value={viewer}
        options={displayOptions}
        onChange={(val) =>
          setAttributes({
            officeViewer: updateData(officeViewer, val, "viewer"),
          })
        }
      />

      <Notice status="premium" isIcon={true}>
        {__("Unlock Custom PDF Viewer engine—available exclusively in Premium.", "embed-office-viewer")}
      </Notice>
    </PanelBody>
  );
};

export default ViewerEngine;
