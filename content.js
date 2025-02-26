let isActive = true;
let position = 'top-right';

function createViewportUI() {
  const existing = document.getElementById('viewport-snap');
  if (existing) return;

  const container = document.createElement('div');
  container.id = 'viewport-snap';
  container.innerHTML = `
    <div class="viewport-header">
      <span class="viewport-title">ViewportSnap</span>
      <span class="viewport-pin">📌</span>
    </div>
    <div class="viewport-info">
      <div>Width: <span id="width"></span></div>
      <div>Height: <span id="height"></span></div>
      <div>Type: <span id="type"></span></div>
      <div>Orientation: <span id="orientation"></span></div>
      <div>Breakpoint: <span id="breakpoint"></span></div>
    </div>
  `;
  document.body.appendChild(container);

  const pin = container.querySelector('.viewport-pin');
  pin.addEventListener('click', () => {
    container.classList.toggle('pinned');
    pin.textContent = container.classList.contains('pinned') ? '📍' : '📌';
  });

  container.style.display = isActive ? 'block' : 'none';
  applyPosition(container, position);
}

function applyPosition(container, pos) {
  container.classList.remove('top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-navbar');
  container.classList.add(pos);
  if (pos === 'top-navbar') {
    document.body.style.marginTop = `${container.offsetHeight}px`;
  } else {
    document.body.style.marginTop = '0';
  }
}

function updateViewportInfo() {
  if (!isActive) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  let breakpoint = 'xs';
  if (width >= 1400) breakpoint = 'xxl';
  else if (width >= 1200) breakpoint = 'xl';
  else if (width >= 992) breakpoint = 'lg';
  else if (width >= 768) breakpoint = 'md';
  else if (width >= 576) breakpoint = 'sm';

  let deviceType = 'Desktop';
  if (width <= 480) deviceType = 'Mobile';
  else if (width <= 768) deviceType = 'Tablet';

  const orientation = width > height ? 'Landscape' : 'Portrait';

  const widthSpan = document.querySelector('#width');
  const heightSpan = document.querySelector('#height');
  const typeSpan = document.querySelector('#type');
  const orientationSpan = document.querySelector('#orientation');
  const breakpointSpan = document.querySelector('#breakpoint');

  if (widthSpan) widthSpan.textContent = `${width}px`;
  if (heightSpan) heightSpan.textContent = `${height}px`;
  if (typeSpan) typeSpan.textContent = deviceType;
  if (orientationSpan) orientationSpan.textContent = orientation;
  if (breakpointSpan) breakpointSpan.textContent = breakpoint;

  const container = document.getElementById('viewport-snap');
  if (container && position === 'top-navbar') {
    document.body.style.marginTop = `${container.offsetHeight}px`;
  }
}

chrome.runtime.onMessage.addListener((message) => {
  if (typeof message.active !== 'undefined') {
    isActive = message.active;
    const container = document.getElementById('viewport-snap');
    if (container) {
      container.style.display = isActive ? 'block' : 'none';
    }
    if (isActive) updateViewportInfo();
  }
  if (message.position) {
    position = message.position;
    const container = document.getElementById('viewport-snap');
    if (container) applyPosition(container, position);
  }
});

chrome.storage.sync.get(['viewportSnapActive', 'viewportSnapPosition'], (result) => {
  isActive = result.viewportSnapActive !== false;
  position = result.viewportSnapPosition || 'top-right';
  createViewportUI();
  updateViewportInfo();
});

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(updateViewportInfo, 100);
});