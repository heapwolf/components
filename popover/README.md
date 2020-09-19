# Popover

The `popover` component creates a popover activated by a click event. It is positioned in relation to the trigger.

## Demo

<tonic-popover id="popover-example" width="175px" for="popover-example-trigger">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</tonic-popover>

<style nonce="%nonce%">
  #popover-example-trigger {
    width: 50px;
    height: 50px;
    background-color: var(--tonic-background);
    display: inline-block;
    padding: 15px;
    text-align: center;
    border-radius: 7px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  #popover-example-trigger:hover {
    background-color: var(--tonic-secondary);
  }

  .tonic--popover {
    line-height: 25px;    
  }
</style>

<div class="example">
  <div id="popover-example-trigger">+</div>
</div>

## Code

#### HTML
```html
<tonic-popover id="popover-example" width="175px" for="popover-example-trigger">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</tonic-popover>
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `for` | *string* | Adds a `for` attribute. <span class="req">required</span> |  |
| `width` | *string* | Changes the `width` style. | `auto` |
| `height` | *string* | Changes `height` style. | `auto` |
| `open` | *boolean* | Determines the default state of the popover. | `false` |
| `padding` | *string* | Changes `padding` style. | `15px` |
| `margin` | *number* | Changes `margin` style. | `10` |
| `position` | *string* | Changes position of popover. Can be one of: `top`, `topleft`, `topright`, `bottom`, `bottomleft`, or `bottomright`. | `bottomleft` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `show()` | Shows the popover. |
| `hide()` | Hides the popover. |
