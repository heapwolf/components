const Tonic = require('@optoolco/tonic')

class TonicButton extends Tonic {
  get value () {
    return this.props.value
  }

  get form () {
    return this.querySelector('button').form
  }

  get disabled () {
    return this.props.disabled === true
  }

  set disabled (state) {
    this.props.disabled = state
  }

  defaults () {
    return {
      height: '38px',
      width: '150px',
      margin: '0px',
      autofocus: 'false',
      async: false,
      radius: '2px',
      borderWidth: '1px',
      textColorDisabled: 'var(--tonic-disabled)',
      backgroundColor: 'transparent'
    }
  }

  static stylesheet () {
    return `
      tonic-button {
        display: inline-block;
      }

      tonic-button button {
        color: var(--tonic-button, #333);
        width: auto;
        min-height: 38px;
        font: 12px var(--tonic-subheader, 'Arial', sans-serif);
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 8px;
        position: relative;
        background-color: transparent;
        border: 1px solid var(--tonic-button, #333);
        transition: all 0.3s ease;
        appearance: none;
      }

      tonic-button button[disabled],
      tonic-button button.tonic--active {
        color: var(--tonic-medium, #999);
        background-color: var(--tonic-background, #fff);
        border-color: var(--tonic-background, #fff);
      }

      tonic-button button[disabled] {
        pointer-events: none;
        user-select: none;
      }

      tonic-button button:not([disabled]):hover,
      tonic-button button:not(.tonic--loading):hover {
        color: var(--tonic-window, #fff) !important;
        background-color: var(--tonic-button, #333) !important;
        border-color: var(--tonic-button, #333) !important;
        cursor: pointer;
      }

      tonic-button button.tonic--loading {
        color: transparent !important;
        background: var(--tonic-medium, #999);
        border-color: var(--tonic-medium, #999);
        transition: all 0.3s ease;
        pointer-events: none;
      }

      tonic-button button.tonic--loading:hover {
        color: transparent !important;
        background: var(--tonic-medium, #999) !important;
        border-color: var(--tonic-medium, #999) !important;
      }

      tonic-button button.tonic--loading:before {
        margin-top: -8px;
        margin-left: -8px;
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        opacity: 1;
        transform: translateX(-50%) translateY(-50%);
        border: 2px solid white;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear 0s infinite;
        transition: opacity 0.3s ease;
      }

      tonic-button button:before {
        content: '';
        width: 14px;
        height: 14px;
        opacity: 0;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `
  }

  loading (state) {
    const button = this.querySelector('button')
    const method = state ? 'add' : 'remove'
    if (button) button.classList[method]('tonic--loading')
  }

  click (e) {
    const disabled = this.props.disabled === 'true'
    const async = this.props.async === 'true'
    const href = this.props.href

    if (async && !disabled) {
      this.loading(true)
    }

    if (href) {
      const target = this.getAttribute('target')

      if (target && target !== '_self') {
        window.open(href)
      } else {
        window.open(href, '_self')
      }
    }
  }

  styles () {
    const {
      width,
      height,
      margin,
      radius,
      fill,
      disabled,
      borderColor,
      borderWidth,
      textColor,
      textColorDisabled
    } = this.props

    return {
      button: {
        width,
        height,
        color: disabled && disabled === 'true' ? textColorDisabled : textColor,
        backgroundColor: fill,
        borderRadius: radius,
        borderColor: fill || borderColor,
        borderWidth: borderWidth
      },
      wrapper: {
        width,
        height,
        margin
      }
    }
  }

  render () {
    const {
      value,
      type,
      disabled,
      autofocus,
      active,
      async,
      tabindex
    } = this.props

    let classes = []

    if (active) classes.push('tonic--active')
    classes = classes.join(' ')

    if (tabindex) this.removeAttribute('tabindex')

    let label = ''

    if (this.querySelector('style')) {
      label = this.querySelector('button').textContent
    } else {
      label = this.textContent || type || 'Button'
    }

    return this.html`
      <div class="tonic--button--wrapper" styles="wrapper">
        <button ... ${{
          styles: 'button',
          async: String(async),
          disabled: disabled && disabled !== 'false',
          autofocus,
          alt: label,
          value,
          type,
          tabindex,
          class: classes
        }}>${label}</button>
      </div>
    `
  }
}

module.exports = { TonicButton }
