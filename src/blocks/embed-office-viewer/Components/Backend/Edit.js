import { useEffect } from "react";
import { useBlockProps } from "@wordpress/block-editor";
import { withDispatch } from "@wordpress/data";

import { tabController } from "../../../..../../../../../bpl-tools/utils/functions";

import Settings from "./Settings/Settings";
import Google from "../Common/Viewers/Google";
import Microsoft from "../Common/Viewers/Microsoft";
import JsView from "../Common/Viewers/JsView";
import Dropbox from "../Common/Viewers/Dropbox";
import { usePremiumInEditor } from "../../../../../../bpl-tools/hooks";
import GoogleDrive from "../Common/Viewers/GoogleDrive";
import Style from "../Common/Style";
import UploadDocuments from "./UploadDocuments";

const Edit = (props) => {
  const { attributes, setAttributes, clientId, isSelected, selectBlock } =
    props;
  const { officeViewer } = attributes;
  const {
    showFileNameOnTop,
    showDownloadBtnOnTop,
    officeFile,
    docSource,
    viewer,
    disableRightClick,
    disableFullScreen,
    disablePopout,
    googleDriveURL,
    dropboxURL,
    width,
  } = officeViewer;

  const { isPremium } = usePremiumInEditor("bpleovUtils", "bpleovPipeChecker");

  const id = `bpleovOfficeViewer-${clientId}`;

  useEffect(() => tabController(), [isSelected]);

  useEffect(() => {
    const head = document.head;
    const script = document.createElement("script");
    script.src = "https://www.dropbox.com/static/api/2/dropins.js";
    script.id = "dropboxjs";
    script.setAttribute(
      "data-app-key",
      window?.eovData?.credentials?.dropbox?.app_key
    );
    head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!disableRightClick) return;

    const disablePageContext = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disablePageContext);

    const timeoutId = setTimeout(() => {
      try {
        const iframe = document.getElementById("s_pdf_frame");
        if (iframe?.contentWindow?.document) {
          iframe.contentWindow.document.oncontextmenu = (e) => {
            e.preventDefault();
          };
        }
      } catch (err) {
        // Mute cross-origin console errors safely
      }
    }, 1000);

    return () => {
      document.removeEventListener("contextmenu", disablePageContext);
      clearTimeout(timeoutId);
    };
  }, [disableRightClick]);

  const hasFile = (
    (docSource === "library" && officeFile?.url) ||
    (docSource === "googleDrive" && googleDriveURL) ||
    (docSource === "dropbox" && dropboxURL)
  );

  return (
    <>
      <Settings
        attributes={attributes}
        setAttributes={setAttributes}
        isPremium={isPremium}
      />

      <div
        {...useBlockProps()}
        id={id}
        onClick={() => selectBlock(clientId)}
      > 
        <Style attributes={attributes} id={id} />

        {hasFile ? (
          <div className="eov_wrapper" style={{ width: width || "100%", margin: "0 auto" }}>
            <div
              className="eov-editor-selection-overlay"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                selectBlock(clientId);
              }}
            />
            {docSource === "library" && (
              <>
                {showFileNameOnTop && <p>File Name: {officeFile?.title}</p>}
                {showDownloadBtnOnTop && (
                  <button
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = officeFile.url;
                      link.download = officeFile.title || "downloaded-file";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="eov-download-btn"
                  >
                    Download File
                  </button>
                )}
              </>
            )}

            {disableRightClick ? (
              <>
                <div
                  id="wrapper"
                  className="eov_wrapper"
                >
                  <div id="block"></div>
                  {(disableRightClick || disableFullScreen) && <div id="disableFullscreen"></div>}
                  {docSource === "library" && viewer === "google" && (
                    <Google
                      attributes={attributes}
                      setAttributes={setAttributes}
                    />
                  )}
                  {docSource === "library" && viewer === "microsoft" && (
                    <Microsoft
                      attributes={attributes}
                      setAttributes={setAttributes}
                    />
                  )}
                  {docSource === "library" && viewer === "js" && (
                    <JsView
                      attributes={attributes}
                      setAttributes={setAttributes}
                    />
                  )}
                  {docSource === "googleDrive" && (
                    <GoogleDrive
                      attributes={attributes}
                      setAttributes={setAttributes}
                    />
                  )}
                  {docSource === "dropbox" && (
                    <Dropbox
                      attributes={attributes}
                      setAttributes={setAttributes}
                    />
                  )}
                </div>
                {disablePopout && <div className="disablePopout"></div>}
              </>
            ) : (
              <>
                {docSource === "library" && viewer === "google" && (
                  <Google
                    attributes={attributes}
                    setAttributes={setAttributes}
                  />
                )}
                {docSource === "library" && viewer === "microsoft" && (
                  <Microsoft
                    attributes={attributes}
                    setAttributes={setAttributes}
                  />
                )}
                {docSource === "library" && viewer === "js" && (
                  <JsView
                    attributes={attributes}
                    setAttributes={setAttributes}
                  />
                )}
                {docSource === "googleDrive" && (
                  <GoogleDrive
                    attributes={attributes}
                    setAttributes={setAttributes}
                  />
                )}
                {docSource === "dropbox" && (
                  <Dropbox
                    attributes={attributes}
                    setAttributes={setAttributes}
                  />
                )}
                {disablePopout && <div className="disablePopout"></div>}
              </>
            )}
          </div>
        ) : (
          <div className="file-uploader-page">
            <UploadDocuments
              attributes={attributes}
              setAttributes={setAttributes}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default withDispatch((dispatch, ownProps) => {
  return {
    selectBlock: () => {
      dispatch("core/block-editor").selectBlock(ownProps.clientId);
    },
  };
})(Edit);
