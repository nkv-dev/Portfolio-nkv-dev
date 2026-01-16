# Mouse Tracker Module

Interactive mouse tracker with red ball that follows user's cursor movement.

## Features

### Core Functionality
- **Smooth Tracking**: Real-time mouse position following with smooth transitions
- **Red Theme**: Matches portfolio's red accent colors
- **Performance Optimized**: Uses `requestAnimationFrame` for 60fps movement

### Visual Effects
- **Pulsing Animation**: Subtle scale and glow animation
- **Trail Effect**: Creates fading trail behind cursor
- **Click Ripples**: Red ripple effect on mouse clicks
- **Interactive Hover**: Ball changes when hovering over buttons/links
- **Magnetic Effect**: Magnetic pull to interactive elements

### Responsive Features
- **Mobile Support**: Automatically disabled on mobile for performance
- **Reduced Motion**: Respects user's motion preferences
- **High Contrast**: Added border for high contrast mode

## Technical Implementation

### CSS Classes
- `.mouse-tracker`: Main tracker ball
- `.mouse-trail`: Trail elements
- `.mouse-ripple`: Click ripple effect
- `.interactive`: Hover state for interactive elements
- `.magnetic`: Magnetic effect state

### JavaScript Components
- `MouseTracker` class with smooth lerp movement
- Event handling for mouse, touch, and interactive elements
- Performance-optimized animation loop
- Cleanup methods for dynamic behavior

### Browser Support
- Modern browsers with ES6 support
- Touch device detection for mobile exclusion
- Responsive media queries for optimal performance

## File Structure
```
mouse-tracker/
├── mouse-tracker.css    # Styles and animations
├── mouse-tracker.js     # JavaScript functionality
└── README.md           # This documentation
```

## Integration
- CSS linked in `<head>` of index.html
- JS loaded before closing `</body>` tag
- Automatically initializes on DOM content loaded
- Window resize handling for mobile/tablet detection

## Performance Considerations
- Throttled trail creation (50ms minimum interval)
- GPU acceleration with CSS transforms
- Will-change property for better rendering
- Automatic cleanup of trail elements
- Mobile device exclusion for better performance

## Customization
- Ball size: 20px diameter (adjustable in CSS)
- Trail frequency: 50ms intervals
- Animation speeds: CSS transition durations
- Colors: Match portfolio red theme (#ef4444, #dc2626)