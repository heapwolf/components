# ProgressBar
The `ProgressBar` component creates an updatable progress bar.

## Demo

<div class="example">
  <tonic-progress-bar id="progress-bar-example">
  </tonic-progress-bar>
  <div class="button-group">
    <span id="start-progress">Start</span>
    <span id="stop-progress">Stop</span>
  </div>
</div>

## Code

#### HTML
```html
<tonic-progress-bar id="progress-bar-example">
</tonic-progress-bar>
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `width` | *string* | Changes the width of the progress bar. | `280px` |
| `height` | *string* | Changes the height of the progress bar. | `15px` |
| `color` | *string* | Changes the color of the progress bar. | `--accent` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods

| Method | Description |
| :--- | :--- |
| `setProgress(number)` | Sets the progress (percentage). |

### Instance Members

| Method | Description |
| :--- | :--- |
| `value` | A getter/setter that provides the current percentage value of the progress bar. |
