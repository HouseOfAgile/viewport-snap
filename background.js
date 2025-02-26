let isActive = true;

chrome.storage.sync.get(['viewportSnapActive'], (result) => {
  isActive = result.viewportSnapActive !== false;
  updateIcon();
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { active: isActive });
});

function updateIcon() {
  const iconPath = isActive ? 'icon128.png' : 'icon128-off.png';
  chrome.action.setIcon({ path: iconPath });
}