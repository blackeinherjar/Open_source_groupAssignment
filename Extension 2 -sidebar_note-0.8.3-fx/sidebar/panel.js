const defaults = {
    note: "",
    softWrap: true,
    noteScrollTop: 0,
    noteScrollLeft: 0,
    saveScrollPosition: true,
    darkTheme: false,
    font: "",
    fontSize: "12"
}
let saveScrollPosition = false;
let scrollTimeoutID = null;
let noteSaveTimeoutID = null;

browser.storage.local.get(defaults, (options) => {
    saveScrollPosition = options.saveScrollPosition;
    document.getElementById("note").value = options.note;
    changeSoftWrap(options.softWrap);
    changeFont(options.font);
    changeFontSize(options.fontSize);
    changeDarkTheme(options.darkTheme);

    if (saveScrollPosition) {
        document.getElementById("note").scrollTop = options.noteScrollTop;
        document.getElementById("note").scrollLeft = options.noteScrollLeft;
    }

    document.getElementById("note").addEventListener("input", () => {
        if (noteSaveTimeoutID != null) {
            clearTimeout(noteSaveTimeoutID);
        }
        noteSaveTimeoutID = setTimeout(() => {
            noteSave();
        }, 500);
    });

    document.getElementById("note").addEventListener("scroll", () => {
        if (saveScrollPosition) {
            if (scrollTimeoutID != null) {
                clearTimeout(scrollTimeoutID);
            }
            scrollTimeoutID = setTimeout(() => {
                browser.storage.local.set({
                    noteScrollTop: document.getElementById("note").scrollTop,
                    noteScrollLeft: document.getElementById("note").scrollLeft
                });
            }, 500);
        }
    });
});

browser.runtime.onMessage.addListener((message) => {
    if (message.note != null) {
        document.getElementById("note").value = message.note;
    }
    if (message.softWrap != null) {
        changeSoftWrap(message.softWrap);
    }
    if (message.saveScrollPosition != null) {
        saveScrollPosition = message.saveScrollPosition;
        if (saveScrollPosition) {
            browser.storage.local.set({
                noteScrollTop: document.getElementById("note").scrollTop,
                noteScrollLeft: document.getElementById("note").scrollLeft
            });
        }
    }
    if (message.darkTheme != null) {
        changeDarkTheme(message.darkTheme);
    }
    if (message.font != null) {
        changeFont(message.font);
    }
    if (message.fontSize != null) {
        changeFontSize(message.fontSize);
    }
});

function changeSoftWrap(softWrap) {
    if (softWrap) {
        document.getElementById("note").style.whiteSpace = "pre-wrap";
    } else {
        document.getElementById("note").style.whiteSpace = "pre";
    }
}

function changeDarkTheme(darkTheme) {
    if (darkTheme) {
        document.getElementById("darkTheme").href = "panel_dark.css";
    } else {
        document.getElementById("darkTheme").href = "";
    }
}

function changeFont(font) {
    document.getElementById("note").style.fontFamily = font;
}

function changeFontSize(fontSize) {
    document.getElementById("note").style.fontSize = fontSize + "px";
}

function noteSave() {
    browser.storage.local.set({
        note: document.getElementById("note").value
    });
    browser.runtime.sendMessage({
        note: document.getElementById("note").value
    });
}