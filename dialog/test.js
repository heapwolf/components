const Tonic = require('@optoolco/tonic')

const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

const { Dialog } = require('./index')

const sleep = n => new Promise(resolve => setTimeout(resolve, n))

class ExampleDialog extends Dialog {
  async click (e) {
    return Tonic.match(e.target, 'tonic-button')
  }

  render () {
    return `
      <header>Dialog</header>
      <main>
        ${this.props.message || 'Ready'}
      </main>
      <footer>
        <tonic-button class="tonic--close" id="close">Close</tonic-button>
      </footer>
    `
  }
}

Tonic.add(ExampleDialog)

document.body.appendChild(html`
<section id="dialog">
  <h2>Dialog</h2>

  <div id="dialog-1" class="test-container">
    <span>Default Dialog</span>
    <tonic-button id="dialog-default-button">Open</tonic-button>
    <example-dialog message="Hello!" id="dialog-default"></example-dialog>
  </div>

  <!-- <div class="test-container">
    <span>width="150px"</span>
    <tonic-button id="dialog-width-button">Open</tonic-button>
    <example-dialog message="width: 150px" width="150px" id="dialog-width"></example-dialog>
  </div>

  <div class="test-container">
    <span>width="100%"</span>
    <tonic-button id="dialog-full-width-button">Open</tonic-button>
    <example-dialog message="width: 100%" width="100%" id="dialog-full-width"></example-dialog>
  </div>

  <div class="test-container">
    <span>height="700px"</span>
    <tonic-button id="dialog-height-button">Open</tonic-button>
    <example-dialog message="height: 700px" height="700px" id="dialog-height"></example-dialog>
  </div>

  <div class="test-container">
    <span>height="100%"</span>
    <tonic-button id="dialog-full-height-button">Open</tonic-button>
    <example-dialog message="height: 100%" height="100%" id="dialog-full-height"></example-dialog>
  </div>

  <div class="test-container">
    <span>overlay="true"</span>
    <tonic-button id="dialog-overlay-button">Open</tonic-button>
    <example-dialog message="overlay: true" overlay="true" id="dialog-overlay"></example-dialog>
  </div>

  <div class="test-container">
    <span>overlay="false"</span>
    <tonic-button id="dialog-no-overlay-button">Open</tonic-button>
    <example-dialog message="overlay: false" overlay="false" id="dialog-no-overlay"></example-dialog>
  </div>

  <div class="test-container">
    <span>background-color="red"</span>
    <tonic-button id="dialog-background-button">Open</tonic-button>
    <example-dialog message="background-color: red" background-color="red" id="dialog-background"></example-dialog>
  </div> -->

</section>
`)

//
// Dialog Tests
//
const tape = require('@pre-bundled/tape')
const { qs } = require('qs')

tape('{{dialog-1}} is constructed properly, opens and closes properly', async t => {
  const container = qs('#dialog-1')
  const component = qs('example-dialog', container)
  const isShowingInitialState = component.classList.contains('tonic--show')

  t.plan(6)

  t.equal(isShowingInitialState, false, 'the element has no show class')
  t.ok(component.hasAttribute('id'), 'the component has an id')

  const styles = window.getComputedStyle(component)
  t.equal(styles.position, 'fixed')

  await component.show()

  const close = qs('.tonic--close', component)
  t.ok(close, 'the component contains the close button')

  const isShowingAfterOpen = component.classList.contains('tonic--show')
  t.equal(isShowingAfterOpen, true, 'the element has been opened, has show class')

  await sleep(128)
  await component.hide()

  const isShowing = component.classList.contains('tonic--show')
  t.equal(isShowing, false, 'the element has been closed, has no show class')

  t.end()
})
