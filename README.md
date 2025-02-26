# viewport-snap Info Chrome Extension

A simple Chrome extension that displays viewport information including:
- Viewport size (width x height in pixels)
- Device type (Mobile/Tablet/Desktop)
- Orientation (Landscape/Portrait)

## Installation

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension icon should appear in your toolbar

## Usage

1. Click the extension icon in Chrome toolbar
2. View the popup displaying current viewport information

## Features

- Real-time viewport dimensions
- Device type detection based on viewport width:
  - Mobile: ≤ 480px
  - Tablet: ≤ 768px
  - Desktop: > 768px
- Orientation detection (Landscape/Portrait)

## Notes

- The extension requires permission to access the active tab
- No external dependencies required
- Simple, clean UI

## Development

To modify the extension:
1. Edit the source files
2. Go to `chrome://extensions/`
3. Click the refresh button on the extension card to reload

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.