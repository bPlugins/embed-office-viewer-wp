import React, { useState, useEffect, useRef } from "react";
import { updateData } from "../../../../../../../bpl-tools/utils/functions";

const GooglePicker = ({ attributes, setAttributes }) => {
  const [driveUrl, setDriveUrl] = useState("");
  const [accessToken, setAccessToken] = useState(
    sessionStorage.getItem("google_access_token") || null
  );
  const [pickerInited, setPickerInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const { officeViewer } = attributes;

  const CLIENT_ID = window.eovData?.credentials?.google?.client_id;
  const API_KEY = window.eovData?.credentials?.google?.api_key;
  const APP_ID = window.eovData?.credentials?.google?.project_number;
  const SCOPES = "https://www.googleapis.com/auth/drive.metadata.readonly";
  let tokenClient = useRef(null);

  useEffect(() => {
    const loadScripts = () => {
      const loadGapi = new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        script.onload = () => {
          window.gapi.load("client:picker", async () => {
            await window.gapi.client.load(
              "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
            );
            setPickerInited(true);
          });
          resolve();
        };
        document.body.appendChild(script);
      });

      const loadGis = new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.onload = () => {
          tokenClient.current = window.google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: "", // Will be set later
          });
          setGisInited(true);
          resolve();
        };
        document.body.appendChild(script);
      });

      Promise.all([loadGapi, loadGis]).then(() => {});
    };
    loadScripts();
  }, []);

  const maybeEnableButtons = () => pickerInited && gisInited;

  const handleAuthClick = () => {
    tokenClient.current.callback = async (response) => {
      if (response.error) {
        throw response;
      }
      setAccessToken(response.access_token);
      sessionStorage.setItem("google_access_token", response.access_token);
      createPicker(response.access_token);
    };

    if (!accessToken) {
      tokenClient.current.requestAccessToken({ prompt: "consent" });
    } else {
      tokenClient.current.requestAccessToken({ prompt: "" });
    }
  };

  const handleSignoutClick = () => {
    if (accessToken) {
      window.google.accounts.oauth2.revoke(accessToken);
      setAccessToken(null);
      sessionStorage.removeItem("google_access_token");
    }
  };

  const createPicker = (token) => {
    const view = new window.google.picker.View(
      window.google.picker.ViewId.DOCS
    );
    // view.setMimeTypes('image/png,image/jpeg,image/jpg'); // optionally use this line
    const picker = new window.google.picker.PickerBuilder()
      .enableFeature(window.google.picker.Feature.NAV_HIDDEN)
      .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
      .setDeveloperKey(API_KEY)
      .setAppId(APP_ID)
      .setOAuthToken(token)
      .addView(view)
      .addView(new window.google.picker.DocsUploadView())
      .setCallback(pickerCallback)
      .build();

    picker.setVisible(true);
  };

  const handleSelectFileClick = () => {
    if (accessToken) {
      createPicker(accessToken);
    }
  };

  const pickerCallback = async (data) => {
    if (data.action === window.google.picker.Action.PICKED) {
      setDriveUrl(data.docs[0].embedUrl);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("google_access_token");
    if (token && !accessToken) {
      setAccessToken(token);
    }
  }, []);

  useEffect(() => {
    if (!driveUrl) return;
    const updatedViewer = updateData(
      updateData(officeViewer, driveUrl, "googleDriveURL"),
      "googleDrive",
      "docSource"
    );

    setAttributes({
      officeViewer: updatedViewer,
    });
    setDriveUrl("");
  }, [driveUrl]);

  return (
    <>
      {window.eovData?.credentials?.google?.api_key &&
      window.eovData?.credentials?.google?.client_id &&
      window.eovData?.credentials?.google?.project_number ? (
        <>
          {!accessToken && maybeEnableButtons() && (
            <button className="driveBtn" onClick={handleAuthClick}>
              Login to Google Drive
            </button>
          )}
          {accessToken && (
            <>
              <button className="driveBtn" onClick={handleSelectFileClick}>
                Select File
              </button>
              <button className="driveBtn signOut" onClick={handleSignoutClick}>
                Sign Out
              </button>
            </>
          )}
        </>
      ) : (
        <button className="addCrBtn">
          <a href="/wp-admin/edit.php?post_type=officeviewer&page=bpleov-onedrive">
            Add Your Credentials
          </a>
        </button>
      )}
    </>
  );
};

export default GooglePicker;
