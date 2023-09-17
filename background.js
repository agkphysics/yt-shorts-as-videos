function redirectShorts(nav) {
    const url = new URL(nav.url);
    const matches = /shorts\/(.*)/.exec(url.pathname);
    if (matches === null)
        return;
    const videoId = matches[1];
    const newUrl = `https://www.youtube.com/watch?v=${videoId}`;
    console.log(`Tab ${nav.tabId} -> ${newUrl}`);
    browser.tabs.update(nav.tabId, { url: newUrl });
}

const shortsFilter = { url: [{ hostContains: ".youtube.com", pathPrefix: "/shorts" }] };

browser.runtime.onInstalled.addListener(() => {
    browser.webNavigation.onHistoryStateUpdated.addListener(redirectShorts, shortsFilter);
    browser.webNavigation.onBeforeNavigate.addListener(redirectShorts, shortsFilter);
    console.log("Added listeners for webNavigation.");
});