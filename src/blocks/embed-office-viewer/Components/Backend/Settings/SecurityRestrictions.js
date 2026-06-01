import React from "react";
import { PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { PremiumBadge, PremiumPanel } from "../../../../../../../bpl-tools/ProControls";

const SecurityRestrictions = () => {
  const pricingUrl = "https://bplugins.com/products/document-viewer/#pricing";

  const securityIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );

  return (
    <PanelBody
      className="bPlPanelBody"
      title={
        <>
          <div className="bpleov-panel-title">
            {securityIcon} {__("Security & Restrictions", "embed-office-viewer")}
          </div>
          <PremiumBadge />
        </>
      }
      initialOpen={false}
    >
      <PremiumPanel
        title={__("Security & Restrictions", "embed-office-viewer")}
        description={__(
          "Protect your documents by disabling right-click, text selection, downloading, and full-screen options. These features are available in the Premium version.",
          "embed-office-viewer"
        )}
        pricingUrl={pricingUrl}
      />
    </PanelBody>
  );
};

export default SecurityRestrictions;
