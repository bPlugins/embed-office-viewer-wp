const Style = ({ attributes, id }) => {
    const { officeViewer } = attributes;
    const { officeFile, disableFullScreen, disableRightClick } = officeViewer || {};

    // const isPPTX = file && file.split('.').pop().toLowerCase() === 'pptx';

    const blockWrapper = `#${id}`;

    // Determine if the file is a PPTX
    const isPPTX = officeFile && officeFile?.url?.split('.').pop().toLowerCase() === 'pptx';

    // Base styles
    let css = `
        ${blockWrapper} {
            position: relative;
            container-type: inline-size;
        }
    `;

    // Conditionally add #block overlay styles only when protect content is enabled
    if (disableRightClick) {
        css += `
        ${blockWrapper} #block {
            position: absolute;
            top: 0;
            right: 20px;
            width: 100%;
            height: ${isPPTX ? 'calc(100% - 30px)' : 'calc(100% - 55px)'};
        }
        ${blockWrapper} {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
    `;
    }

    // Conditionally add fullscreen disabling styles (works with either toggle for backward compat)
    if (disableFullScreen || disableRightClick) {
        css += `
        ${blockWrapper} #disableFullscreen {
            position: absolute;
            bottom: 0;
            right: 0px;
            width: 100px;
            height: 50px;
        }
    `;
    }

    // Conditionally add #block height depending on file type
    css += `
        ${blockWrapper} .disablePopout {
            position: absolute;
            opacity: 0;
            right: 0px;
            top: 0px;
            width: 80px;
            height: 50px;
            z-index: 9;
        }

        @container (max-width: 600px) {
            ${blockWrapper} .disablePopout {
                width: 60px;
                height: 50px;
            }
        }

        @container (max-width: 480px) {
            ${blockWrapper} .disablePopout {
                display: none;
            }
        }
    `;


    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: css.replace(/\s+/g, " "),
                }}
            />
        </>
    );
};

export default Style;

