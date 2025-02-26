document.addEventListener('DOMContentLoaded', function() {
  // Check if chrome.scripting is available
  if (!chrome || !chrome.scripting) {
    displayError('Scripting API not available. Please check extension permissions.');
    return;
  }

  // Query the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (!tabs || tabs.length === 0) {
      displayError('No active tab found.');
      return;
    }

    const tabId = tabs[0].id;
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: getViewportInfo
    }, (results) => {
      if (chrome.runtime.lastError) {
        displayError(`Execution error: ${chrome.runtime.lastError.message}`);
        return;
      }

      if (results && results[0] && results[0].result) {
        const { width, height, deviceType, orientation } = results[0].result;
        document.querySelector('#viewport-size span').textContent = `${width}x${height}px`;
        document.querySelector('#viewport-type span').textContent = deviceType;
        document.querySelector('#orientation span').textContent = orientation;
      } else {
        displayError('No valid results returned.');
      }
    });
  });
});

function getViewportInfo() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  let deviceType = 'Desktop';
  
  if (width <= 480) {
    deviceType = 'Mobile';
  } else if (width <= 768) {
    deviceType = 'Tablet';
  }

  const orientation = (window.innerWidth > window.innerHeight) ? 'Landscape' : 'Portrait';

  return {
    width: width,
    height: height,
    deviceType: deviceType,
    orientation: orientation
  };
}

// Helper function to display errors in the popup
function displayError(message) {
  const container = document.querySelector('.container');
  if (container) {
    container.innerHTML = `<p style="color: red;">Error: ${message}</p>`;
  }
}