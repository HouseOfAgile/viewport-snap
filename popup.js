document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle');
  const title = document.getElementById('title');
  const positionBtns = document.querySelectorAll('.position-btn');

  chrome.storage.sync.get(['viewportSnapActive', 'viewportSnapPosition'], (result) => {
    const isActive = result.viewportSnapActive !== false;
    toggleBtn.textContent = isActive ? 'Disable' : 'Enable';
    title.textContent = isActive ? 'ViewportSnap' : 'ViewportSnap (Disabled)';
    const activePos = result.viewportSnapPosition || 'top-right';
    positionBtns.forEach(btn => {
      if (btn.dataset.pos === activePos) btn.classList.add('active');
    });
  });

  toggleBtn.addEventListener('click', () => {
    chrome.storage.sync.get(['viewportSnapActive'], (result) => {
      const isActive = result.viewportSnapActive !== false;
      const newState = !isActive;
      chrome.storage.sync.set({ viewportSnapActive: newState });
      toggleBtn.textContent = newState ? 'Disable' : 'Enable';
      title.textContent = newState ? 'ViewportSnap' : 'ViewportSnap (Disabled)';
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { active: newState });
      });
    });
  });

  positionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const newPosition = btn.dataset.pos;
      chrome.storage.sync.set({ viewportSnapPosition: newPosition });
      positionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { position: newPosition });
      });
    });
  });
});