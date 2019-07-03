const defaults = {
	softWrap: true,
	saveScrollPosition: true,
	darkTheme: false,
	showAddToNoteContextMenu: true,
	font: "",
	fontSize: "12"
}

document.getElementById("softWrapText").textContent = browser.i18n.getMessage("softWrapText");
document.getElementById("saveScrollPositionText").textContent = browser.i18n.getMessage("saveScrollPositionText");
document.getElementById("darkThemeText").textContent = browser.i18n.getMessage("darkThemeText");
document.getElementById("showAddToNoteContextMenuText").textContent = browser.i18n.getMessage("showAddToNoteContextMenuText");
document.getElementById("fontText").textContent = browser.i18n.getMessage("fontText");
document.getElementById("fontSizeText").textContent = browser.i18n.getMessage("fontSizeText");

browser.storage.local.get(defaults, (options) => {
	document.getElementById("softWrap").checked = options.softWrap;
	document.getElementById("saveScrollPosition").checked = options.saveScrollPosition;
	document.getElementById("darkTheme").checked = options.darkTheme;
	document.getElementById("showAddToNoteContextMenu").checked = options.showAddToNoteContextMenu;
	document.getElementById("font").value = options.font;
	document.getElementById("fontSize").value = options.fontSize;

	document.getElementById("softWrap").addEventListener("change", () => {
		browser.storage.local.set({
			softWrap: document.getElementById("softWrap").checked
		});
		browser.runtime.sendMessage({
			softWrap: document.getElementById("softWrap").checked
		});
	});

	document.getElementById("saveScrollPosition").addEventListener("change", () => {
		browser.storage.local.set({
			saveScrollPosition: document.getElementById("saveScrollPosition").checked
		});
		browser.runtime.sendMessage({
			saveScrollPosition: document.getElementById("saveScrollPosition").checked
		});
		if (!document.getElementById("saveScrollPosition").checked) {
			browser.storage.local.set({
				noteScrollTop: 0,
				noteScrollLeft: 0
			});
		}
	});

	document.getElementById("darkTheme").addEventListener("change", () => {
		browser.storage.local.set({
			darkTheme: document.getElementById("darkTheme").checked
		});
		browser.runtime.sendMessage({
			darkTheme: document.getElementById("darkTheme").checked
		});
	});

	document.getElementById("showAddToNoteContextMenu").addEventListener("change", () => {
		browser.storage.local.set({
			showAddToNoteContextMenu: document.getElementById("showAddToNoteContextMenu").checked
		});
		browser.runtime.sendMessage({
			showAddToNoteContextMenu: document.getElementById("showAddToNoteContextMenu").checked
		});
	});

	document.getElementById("font").addEventListener("input", () => {
		browser.storage.local.set({
			font: document.getElementById("font").value
		});
		browser.runtime.sendMessage({
			font: document.getElementById("font").value
		});
	});

	document.getElementById("fontSize").addEventListener("change", () => {
		browser.storage.local.set({
			fontSize: document.getElementById("fontSize").value
		});
		browser.runtime.sendMessage({
			fontSize: document.getElementById("fontSize").value
		});
	});
});