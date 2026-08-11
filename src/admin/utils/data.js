import {
  posts,
  row,
  viewer,
  documention,
  gutenbergTabIcon,
  shortcodeTabIcon
} from './icons';

const slug = "embed-office-viewer";
const webSlug = "document-viewer";

// ─── Identity & shared props ──────────────────────────────────────────────────
export const dashboardInfo = (info) => {
  const { version, adminUrl = "" } = info;
  const cleanAdminUrl = adminUrl.replace(/\/$/, "");

  return {
    name: "Document Viewer",
    displayName: "Document Viewer - View Office and PDF Files and Any Documents in Browser",
    description: "Easily display any Office documents on your WordPress site using Google or Microsoft viewers. Customize layout size, enable or disable pop-outs, show or hide file names and download buttons, and control right-click functionality for a secure, user-friendly viewing experience.",
    slug,
    version,
    isPremium: false,
    hasPro: false,
    displayOurPlugins: true,
    adminUrl: cleanAdminUrl,
    media: {
      logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
      banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
      thumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}.png`,
    },
    pages: {
      org: `https://wordpress.org/plugins/${webSlug}/`,
      landing: `https://bplugins.com/products/${webSlug}/`,
      docs: `https://bplugins.com/docs/${webSlug}/`,
      pricing: `https://bplugins.com/products/${webSlug}/pricing`,
    },
    freemius: {
      product_id: '7003',
      plan_id: '11415',
      public_key: 'pk_0657e65491580bc23260341c9d8e0',
    },
    startButton: {
      label: 'Add New Document',
      url: `${cleanAdminUrl}/post-new.php?post_type=officeviewer`
    }
  }
}

// ─── Welcome page content ─────────────────────────────────────────────────────
export const welcomeInfo = (adminUrl) => ({
  keywords: ["PDF", "Word", "Excel", "PowerPoint", "Office Documents"],
  keywordsLabel: "Supported Formats",
  gettingStarted: {
    tabs: [
      {
        key: "gutenberg",
        label: "Gutenberg Block",
        icon: gutenbergTabIcon,
        steps: [
          {
            num: 1,
            title: "Insert the Block",
            body: "Open any page or post. Click the <strong>+</strong> button in the block editor, search for <strong>Document Viewer</strong>, and insert it.",
            link: { url: `${adminUrl}/post-new.php`, label: "Open Editor" }
          },
          {
            num: 2,
            title: "Choose Document",
            body: "In the block options, upload your document (PDF, DOCX, XLSX, PPTX, etc.) or choose one from the media library."
          },
          {
            num: 3,
            title: "Configure & Publish",
            body: "Set the custom width and height, configure Pop-out/Download controls in the block settings panel, then publish your page."
          }
        ]
      },
      {
        key: "shortcode",
        label: "Shortcode Generator",
        icon: shortcodeTabIcon,
        steps: [
          {
            num: 1,
            title: "Create Document Link",
            body: "Go to <strong>Office Viewer › Add New</strong> in your WordPress admin menu.",
            link: { url: `${adminUrl}/post-new.php?post_type=officeviewer`, label: "Add New" }
          },
          {
            num: 2,
            title: "Configure Settings",
            body: "Give it a title, upload/select your document, choose your preferred viewer engine (Google or Microsoft), and adjust dimensions."
          },
          {
            num: 3,
            title: "Publish & Copy Shortcode",
            body: "Click <strong>Save/Publish</strong> to generate the shortcode. Copy the shortcode <code>[office_doc id=\"POST_ID\"]</code> displayed above the settings."
          },
          {
            num: 4,
            title: "Paste Anywhere",
            body: "Paste the shortcode into any Gutenberg shortcode block, classic editor, or sidebar widget on your site."
          }
        ]
      }
    ]
  },
  changelogs: [
    {
      version: "2.4.2 - 11 August, 2026",
      type: "update",
      list: [
        "Security: Updated Freemius SDK dependency to the latest version to patch identified vulnerabilities and ensure robust plugin security.",
      ],
    },
    {
      version: "2.4.1 - 27 June 2026",
      type: "update",
      list: [
        "Update: Redesigned and integrated the new standardized help & demos admin dashboard.",
      ],
    },
    {
      version: "2.4.0 - 3 June, 2026",
      type: "new",
      list: [
        "New: Added 4 dedicated, modular settings panels (DocumentSource, ViewerEngine, DisplayDimensions, SecurityRestrictions) to group Gutenberg settings.",
        "New: Added custom SVG icons inside the titles of the block settings panels.",
        "Update: Redesigned Gutenberg block settings field titles to use friendly, concise terms for non-technical users.",
        "Update: Consolidated admin assets enqueuing into a single class loader.",
        "Update: Standardized core classes under `includes/core/` and helper files under lowercase `includes/helper/` to ensure namespace consistency.",
        "Improvement: Integrated Composer autoloading to boot and resolve PHP dependencies dynamically.",
        "Improvement: Unified the legacy shortcode rendering pipeline to run through the Gutenberg block rendering engine via the native `render_block()` API.",
        "Improvement: Replaced the block settings TabPanel with separate, sequential settings panels.",
        "Improvement: Applied a premium aesthetic theme color (#f1fdfe) for settings panel backgrounds and matching blue (#226df5) for panel header icons.",
        "Improvement: Added detailed file format descriptions to simplify the document selector experience.",
        "Improvement: Added a fixed height and smooth fade-in transition for the Upload Documents editor UI to prevent layout jumping on tab change.",
        "Improvement: Reorganized metabox fields into two clean tabbed sections: \"Document Settings\" and \"Security & Restrictions\".",
        "Fix: Resolved fatal error during plugins_loaded hook by replacing query loops with safe get_posts() in ImportMeta class.",
        "Fix: Resolved cross-origin iframe console errors in block editor under content protection mode.",
        "Fix: Resolved pop-out overlay alignment and responsiveness by using CSS container queries.",
        "Fix: Resolved \"Protect Content\" text selection and keyboard shortcuts bypasses (Ctrl/Cmd + C, A, S, P).",
        "Fix: Resolved \"Disable Full Screen\" and pop-out overlay styles targeting mismatches.",
        "Fix: Resolved missing i18n translation wrappers on \"Protect Content\" toggle labels."
      ],
    },
    {
      version: "2.3.3 - 8 November 2025",
      type: "update",
      list: ["Updated Block - Editor upload options."],
    },
    {
      version: "2.3.2 - 10 October, 2025",
      type: "new",
      list: ["Add Modern Dashboard and improved. "],
    },
    {
      version: "2.3.1 - 12 July, 2025",
      type: "fix",
      list: ["Fixed issues"],
    },
    {
      version: "2.3.0 - 10 May, 2025",
      type: "new",
      list: ["Fixed textdomain issue", "Added powerful Gutenberg block"],
    },
    {
      version: "2.2.10 - 29 January 2025",
      type: "update",
      list: ["Updated WordPress SDK"],
    },
    {
      version: "2.2.9 - 04 July, 2024",
      type: "update",
      list: ["Updated WordPress SDK"],
    },
    {
      version: "2.2.7",
      type: "update",
      list: ["Updated Freemius WordPress SDK"],
    },
    {
      version: "2.2.5",
      type: "update",
      list: ["Updated Freemius WordPress SDK"],
    },
    {
      version: "2.2.4",
      type: "fix",
      list: ["Fixed height issue"],
    },
    {
      version: "2.2.3",
      type: "update",
      list: ["Fixed security issue", "Improved performance"],
    },
    {
      version: "2.0.9",
      type: "new",
      list: ["Added PDF viewer support", "Improved performance"],
    },
    {
      version: "1.1",
      type: "update",
      list: [
        "Added document management screen",
        "Improved performance",
        "Added Gutenberg block support",
      ],
    },
    {
      version: "1.0",
      type: "new",
      list: ["Initial release"],
    },
  ],
  changelogsLimit: 2,
  changelogsReadMoreLabel: "View More Changelogs",
  proFeatures: [
    "Choose between Google Doc or Microsoft Online Viewer.",
    "Customize document layout with adjustable width and height.",
    "Choose Document from Google Drive",
    "Choose Document from OneDrive",
    "Choose Document from Dropbox",
    "View Document by Google Doc Viewer",
    "Disable/Enable Pop-out",
    "Show/Hide Filename in top",
    "Show/Hide Download button on top",
    "Disable/Enable Right Click"
  ],
})

// ─── Demos page ───────────────────────────────────────────────────────────────
export const demoInfo = {
  allInOneLabel: 'See All Demos',
  allInOneLink: "https://office-viewer.bplugins.com/demo/document-viewer-demos/",
  demos: [
    {
      icon: viewer,
      title: "Powerpoint Document",
      type: "iframe",
      url: "https://office-viewer.bplugins.com/demo/pptx-ms-viewer/",
      category: "Powerpoint",
    },
    {
      icon: posts,
      title: "PDF Document",
      type: "iframe",
      url: "https://office-viewer.bplugins.com/demo/pdf-document/",
      category: "PDF",
    },
    {
      icon: posts,
      title: "PDF Document (JS Viewer)",
      type: "iframe",
      url: "https://office-viewer.bplugins.com/demo/pdf-document-js-viewer/",
      category: "PDF",
    },
    {
      icon: row,
      title: "Exel File",
      type: "iframe",
      url: "https://office-viewer.bplugins.com/demo/exel-file/",
      category: "Excel",
    },
    {
      icon: documention,
      title: "Word Document",
      type: "iframe",
      url: "https://office-viewer.bplugins.com/demo/word-document/",
      category: "Word",
    },
    {
      icon: documention,
      title: "Word Document (Microsoft Viewer)",
      type: "iframe",
      url: "https://office-viewer.bplugins.com/demo/word-document-microsoft-viewer/",
      category: "Word",
    },
  ],
}

// ─── Pricing page ─────────────────────────────────────────────────────────────
export const pricingInfo = {
  logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
  pluginId: 7003,
  planId: 11415,
  licenses: [
    1,
    3,
    null
  ],
  button: {
    label: 'Buy Now ➜'
  },
  featured: {
    selected: 3,
  }
}
