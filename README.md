# ViewportSnap Chrome Extension

A Chrome extension that displays viewport information in real-time.

## Features
- Real-time viewport size, type, orientation, and Bootstrap breakpoints
- Toggle enable/disable from toolbar popup
- Configurable position: Top Right, Top Left, Bottom Right, Bottom Left, Top Navbar
- Sticky pin feature

## Installation

1. Clone from [[github.com/HouseOfAgile/viewport-snap](https://github.com/HouseOfAgile/viewport-snap)](#)
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension icon should appear in your toolbar

## Usage
- Click the toolbar icon to open the control popup
- Toggle enable/disable and select position


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

## Dependencies

- Includes Bootstrap Icons (v1.11.3) locally for position icons

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.