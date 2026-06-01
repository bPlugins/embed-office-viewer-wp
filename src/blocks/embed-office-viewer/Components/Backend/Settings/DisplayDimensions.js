import React from "react";
import { PanelBody, __experimentalUnitControl as UnitControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { updateData } from "../../../../../../../bpl-tools/utils/functions";
import { perUnit, pxUnit } from "../../../../../../../bpl-tools/utils/options";
import { Notice } from "../../../../../../../bpl-tools/Components";

const DisplayDimensions = ({ attributes, setAttributes }) => {
  const { officeViewer } = attributes;
  const { width, height, docSource } = officeViewer;

  const displayIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="9" y1="3" x2="9" y2="21"></line>
    </svg>
  );

  return (
    <PanelBody
      className="bPlPanelBody"
      initialOpen={false}
      title={
        <div className="bpleov-panel-title">
          {displayIcon}
          {__("Display & Dimensions", "embed-office-viewer")}
        </div>
      }
    >
      <UnitControl
        className="10"
        label={__("Width", "embed-office-viewer")}
        value={width}
        units={[pxUnit(), perUnit()]}
        onChange={(v) =>
          setAttributes({ officeViewer: updateData(officeViewer, v, "width") })
        }
      />
      <UnitControl
        label={__("Height", "embed-office-viewer")}
        value={height}
        units={[pxUnit(), perUnit()]}
        onChange={(v) =>
          setAttributes({ officeViewer: updateData(officeViewer, v, "height") })
        }
      />

      {docSource === "library" && (
        <Notice status="premium" isIcon={true}>
          {__("Unlock File Name display and Download Button options—available exclusively in Premium.", "embed-office-viewer")}
        </Notice>
      )}
    </PanelBody>
  );
};

export default DisplayDimensions;
