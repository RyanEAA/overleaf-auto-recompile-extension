function waitForEditor() {
    const editor = document.querySelector('.cm-content.cm-lineWrapping');

    if (!editor) {
        console.log("Waiting for editor...");
        setTimeout(waitForEditor, 1000);
        return;
    }

    console.log("Editor found!");

    let isClicking = false;

    const observer = new MutationObserver(() => {
        clearTimeout(window._recompileTimeout);

        window._recompileTimeout = setTimeout(() => {
            const button = document.querySelector('button.compile-button');

            if (button && !isClicking) {
                console.log("Clicking Recompile...");
                isClicking = true;
                button.click();

                setTimeout(() => {
                    isClicking = false;
                }, 1000);
            }
        }, 500); // wait for typing to stop
    });

    observer.observe(editor, {
        childList: true,
        subtree: true,
        characterData: true
    });
}

waitForEditor();