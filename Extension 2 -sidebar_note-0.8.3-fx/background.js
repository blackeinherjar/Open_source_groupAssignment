const defaults = {
	note: "",
	showAddToNoteContextMenu: true
}

browser.browserAction.onClicked.addListener(() => {
	browser.sidebarAction.open();
});

function menusOnClicked(info, tab) {
	if (info.menuItemId == "add-to-sidebar-note") {
		browser.storage.local.get(defaults, (options) => {
			let newNote = options.note;
			if (newNote == "") {
				newNote = info.selectionText;
			} else {
				newNote = newNote + "\n" + info.selectionText;
			}
			browser.storage.local.set({
				note: newNote
			});
			browser.runtime.sendMessage({
				note: newNote
			});
		});
	}
}

browser.storage.local.get(defaults, (options) => {
	changeShowAddToNoteContextMenu(options.showAddToNoteContextMenu);
});

browser.runtime.onMessage.addListener((message) => {
	if (message.showAddToNoteContextMenu != null) {
		changeShowAddToNoteContextMenu(message.showAddToNoteContextMenu);
	}
});

function changeShowAddToNoteContextMenu(showAddToNoteContextMenu) {
	if (showAddToNoteContextMenu) {
		browser.menus.create({
				id: "add-to-sidebar-note",
				title: browser.i18n.getMessage("addToNote"),
				contexts: ["selection"],
				documentUrlPatterns: ['<all_urls>'],
				icons: {
					"16": "icons/sidebar-note.svg",
					"32": "icons/sidebar-note.svg"
				}
			},
			browser.menus.onClicked.addListener(menusOnClicked));
	} else {
		browser.menus.onClicked.removeListener(menusOnClicked);
		browser.menus.removeAll();
	}
}