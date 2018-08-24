class InputText extends Tonic { /* global Tonic */
  constructor (node) {
    super(node)
    this.root.setInvalid = msg => this.setInvalid(msg)
    this.root.setValid = () => this.setValid()

    const that = this
    Object.defineProperty(this.root, 'value', {
      get () { return that.value }
    })
  }

  defaults () {
    return {
      type: 'text',
      value: '',
      placeholder: '',
      spellcheck: false,
      ariaInvalid: false,
      invalid: false,
      radius: '3px',
      disabled: false,
      width: '250px',
      errorMessage: 'Invalid'
    }
  }

  get value () {
    return this.root.querySelector('input').value
  }

  setValid () {
    this.reRender(props => Object.assign({}, props, {
      invalid: false
    }))
  }

  setInvalid (msg) {
    this.reRender(props => Object.assign({}, props, {
      invalid: true,
      errorMessage: msg
    }))
  }

<<<<<<< HEAD
  style () {
    return {
      '.tonic--wrapper': {
        position: 'relative',
        width: this.props.width,
        height: this.props.height,
        padding: this.props.padding,
        borderRadius: this.props.radius
      },
      '.tonic--wrapper.tonic--right icon-container': {
        right: '10px'
      },
      '.tonic--wrapper.tonic--right input': {
        paddingRight: '40px'
      },
      '.tonic--wrapper.tonic--left icon-container': {
        left: '10px'
      },
      '.tonic--wrapper.tonic--left input': {
        paddingLeft: '40px'
      },
      'icon-container': {
        position: 'absolute',
        bottom: '7px'
      },
      'label': {
        color: 'var(--medium)',
        fontWeight: '500',
        font: '12px/14px var(--subheader)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        paddingBottom: '10px',
        display: 'block'
      },
      '.tonic--wrapper input': {
        color: 'var(--primary)',
        font: '14px var(--monospace)',
        width: this.props.width,
        height: this.props.height,
        padding: '10px',
        backgroundColor: 'transparent',
        border: '1px solid var(--border)',
        borderRadius: this.props.radius,
        transition: 'border 0.2s ease-in-out',
        '-webkit-appearance': 'none',
        '-moz-appearance': 'none',
        appearance: 'none',
        outline: 'none'
      },
      '.tonic--wrapper input:focus': {
        borderColor: 'var(--primary)'
      },
      '.tonic--wrapper input[disabled]': {
        backgroundColor: 'var(--background)'
      },
      '.tonic--wrapper input:invalid': {
        borderColor: 'var(--error)'
      },
      '.tonic--wrapper input:invalid:focus': {
        borderColor: 'var(--error)'
      },
      '.tonic--wrapper input:invalid ~ .tonic--invalid': {
        transition: 'opacity 0.2s ease, transform 0.2s ease, visibility 1s ease 0s',
        '-webkit-transform': 'translateY(0)',
        '-ms-transform': 'translateY(0)',
        transform: 'translateY(0)',
        visibility: 'visible',
        opacity: '1'
      },
      '.tonic--invalid': {
        fontSize: '14px',
        textAlign: 'center',
        position: 'absolute',
        bottom: '50px',
        left: '0',
        right: '0',
        '-webkit-transform': 'translateY(-10px)',
        '-ms-transform': 'translateY(-10px)',
        transform: 'translateY(-10px)',
        transition: 'opacity 0.2s ease, transform 0.2s ease, visibility 0s ease 1s',
        visibility: 'hidden',
        opacity: '0'
      },
      '.tonic--invalid span': {
        color: 'white',
        padding: '2px 6px',
        margin: '0 auto',
        position: 'relative',
        display: 'inline-block',
        backgroundColor: 'var(--error)',
        borderRadius: '2px'
      },
      '.tonic--invalid span:after': {
        content: '""',
        width: '0',
        height: '0',
        display: 'block',
        position: 'absolute',
        bottom: '-6px',
        left: '50%',
        '-webkit-transform': 'translateX(-50%)',
        '-ms-transform': 'translateX(-50%)',
        transform: 'translateX(-50%)',
        borderWidth: '6px',
        borderStyle: 'solid',
        borderColor: 'transparent',
        borderTopColor: 'var(--error)'
      }
    }
=======
  stylesheet () {
    return `
      input-text .tonic--wrapper {
        position: relative;
      }

      input-text .tonic--right icon-container {
        right: 10px;
      }

      input-text .tonic--right input {
        padding-right: 40px;
      }

      input-text .tonic--left icon-container {
        left: 10px;
      }

      input-text .tonic--left input {
        padding-left: 40px;
      }

      input-text icon-container {
        position: absolute;
        bottom: 7px;
      }

      input-text label {
        color: var(--medium);
        font-weight: 500;
        font: 12px/14px var(--subheader);
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-bottom: 10px;
        display: block;
      }

      input-text input {
        color: var(--primary);
        font: 14px var(--monospace);
        padding: 10px;
        background-color: transparent;
        border: 1px solid var(--border);
        transition: border 0.2s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
      }

      input-text input:invalid {
        border-color: var(--error);
      }

      input-text input:invalid:focus {
        border-color: var(--error);
      }

      input-text input:invalid ~ .tonic--invalid {
        transform: translateY(0);
        visibility: visible;
        opacity: 1;
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 1s ease 0s;
      }

      input-text input:focus {
        border-color: var(--primary);
      }

      input-text input[disabled] {
        background-color: var(--background);
      }

      .tonic--invalid {
        font-size: 14px;
        text-align: center;
        position: absolute;
        bottom: 50px;
        left: 0;
        right: 0;
        transform: translateY(-10px);
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 0s ease 1s;
        visibility: hidden;
        opacity: 0;
      }

      .tonic--invalid span {
        color: white;
        padding: 2px 6px;
        background-color: var(--error);
        border-radius: 2px;
        position: relative;
        display: inline-block;
        margin: 0 auto;
      }

      .tonic--invalid span:after {
        content: '';
        width: 0;
        height: 0;
        display: block;
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid var(--error);
      }
    `
>>>>>>> refacor-styles
  }

  renderLabel () {
    if (!this.props.label) return ''
    return `<label>${this.props.label}</label>`
  }

  renderIcon () {
    if (!this.props.src) return ''

    return `
      <icon-container
        src="${this.props.src}"
        color="${this.props.color}">
      </icon-container>
    `
  }

  updated () {
    const input = this.root.querySelector('input')
    setTimeout(() => {
      if (this.props.invalid) {
        input.setCustomValidity(this.props.errorMessage)
      } else {
        input.setCustomValidity('')
      }
    }, 32)
  }

  connected () {
    const {
      width,
      height,
      radius,
      padding
    } = this.props

    const input = this.root.querySelector('input')

    if (width) input.style.width = width
    if (height) input.style.height = height
    if (radius) input.style.borderRadius = radius
    if (padding) input.style.padding = padding
  }

  render () {
    const {
      type,
      value,
      placeholder,
      spellcheck,
      ariaInvalid,
      disabled,
      required,
      pattern,
      theme,
      position
    } = this.props

    const patternAttr = pattern ? `pattern="${pattern}"` : ''
    const valueAttr = (value && value !== 'undefined') ? `value="${value}"` : ''
    const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : ''
    const spellcheckAttr = spellcheck ? `spellcheck="${spellcheck}"` : ''
    const ariaInvalidAttr = ariaInvalid ? `aria-invalid="${ariaInvalid}"` : ''
    const positionAttr = position ? `tonic--${position}` : ''

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)

    return `
      <div class="tonic--wrapper ${positionAttr}">
        ${this.renderLabel()}
        ${this.renderIcon()}

        <input
          ${patternAttr}
          type="${type}"
          ${valueAttr}
          ${placeholderAttr}
          ${spellcheckAttr}
          ${ariaInvalidAttr}
          ${disabled ? 'disabled' : ''}
<<<<<<< HEAD
          ${required ? 'required' : ''}/>
=======
          ${required ? 'required' : ''}
        />
>>>>>>> refacor-styles
        <div class="tonic--invalid">
          <span>${this.props.errorMessage}</span>
        </div>
      </div>
    `
  }
}

Tonic.add(InputText)
