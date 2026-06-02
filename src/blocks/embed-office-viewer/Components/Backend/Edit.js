import { useEffect } from "react";
import { useBlockProps } from "@wordpress/block-editor";
import { withDispatch } from "@wordpress/data";

import { tabController } from "../../../..../../../../../bpl-tools/utils/functions";

import Settings from "./Settings/Settings";
import Google from "../Common/Viewers/Google";
import Microsoft from "../Common/Viewers/Microsoft";
import { usePremiumInEditor } from "../../../../../../bpl-tools/hooks";
import Style from "../Common/Style";
import UploadDocuments from "./UploadDocuments";

const Edit = (props) => {
  const { attributes, setAttributes, clientId, isSelected, selectBlock } =
    props;
  const { officeViewer } = attributes;
  const {
    officeFile,
    docSource,
    viewer,
    width,
  } = officeViewer;

  const { isPremium } = usePremiumInEditor("bpleovUtils", "bpleovPipeChecker");

  const id = `bpleovOfficeViewer-${clientId}`;

  useEffect(() => tabController(), [isSelected]);

  const hasFile = docSource === "library" && officeFile?.url;

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
