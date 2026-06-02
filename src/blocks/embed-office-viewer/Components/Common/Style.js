const Style = ({ id }) => {
    const blockWrapper = `#${id}`;

    // Base styles
    const css = `
        ${blockWrapper} {
            position: relative;
            container-type: inline-size;
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

