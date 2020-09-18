const tape = require('@pre-bundled/tape')
const { qs } = require('qs')
const Tonic = require('@optoolco/tonic')
const { Panel } = require('./index')

const { html } = require('../test/util')
const components = require('..')
components(require('@optoolco/tonic'))

class ExamplePanel extends Panel {
  async click (e) {
    if (e.target.value === 'close') {
      return this.hide()
    }
  }

  render () {
    return this.html`
      <header>Panel Example</header>

      <main>
        <h3>${this.props.title || 'Hello'}
      </main>

      <footer>
        <tonic-button value="close">Close</tonic-button>
      </footer>
    `
  }
}

Tonic.add(ExamplePanel)

document.body.appendChild(html`
<section id="panel">
  <h2>Panel</h2>

  <div class="test-container">
    <span>Default Panel</span>
    <tonic-button id="example-panel-default-button">
      Open Panel
    </tonic-button>
  </div>

  <example-panel id="example-panel-default">
  </example-panel>

  <!-- Panel Default -->
  <div class="test-container">
    <span>name="panel-name"</span>
    <tonic-button id="example-panel-name-button">
      Open Panel
    </tonic-button>
  </div>

  <example-panel
    id="example-panel-name"
    name="panel-name">
  </example-panel>

  <!-- Panel Overlay -->
  <div class="test-container">
    <span>overlay="true"</span>
    <tonic-button id="example-panel-overlay-button">
      Open Panel
    </tonic-button>
  </div>

  <example-panel
    id="example-panel-overlay"
    overlay="true">
  </example-panel>

  <!-- Panel w/ Position Right -->
  <div class="test-container">
    <span>position="right"</span>
    <tonic-button id="example-panel-position-right-button">
      Open Panel
    </tonic-button>
  </div>

  <example-panel
    id="example-panel-position-right"
    overlay="true"
    position="right">
  </example-panel>

  <!-- Panel w/ Position Left -->
  <div class="test-container">
    <span>position="left"</span>
    <tonic-button id="example-panel-position-button">
      Open Panel
    </tonic-button>
  </div>

  <example-panel
    id="example-panel-position"
    overlay="true"
    position="left">
  </example-panel>

  <!-- Panel w/ Background Color -->
  <div class="test-container">
    <span>background-color="rgba(255,255,255,0.8)"</span>
    <tonic-button id="example-panel-background-button">
      Open Panel
    </tonic-button>
  </div>

  <example-panel
    id="example-panel-background"
    overlay="true"
    background-color="rgba(255,255,255,0.8)">
  </example-panel>

  <!-- Panel w/ Theme Light -->
  <div class="test-container">
    <span>theme="light"</span>
    <tonic-button id="example-panel-theme-button">
      Open Panel
    </tonic-button>
  </div>

  <example-panel
    id="example-panel-theme"
    overlay="true"
    theme="light">
  </example-panel>

  <!-- Panel w/ Theme Dark -->
  <div class="test-container dark">
    <span>theme="dark"</span>
    <tonic-button id="example-panel-theme-dark-button">
      Open Panel
    </tonic-button>
  </div>

  <example-panel
    id="example-panel-theme-dark"
    overlay="true"
    theme="dark">
  </example-panel>

</section>
`)

//
// Panel Default
//
const panelDefaultButton = document.getElementById('example-panel-default-button')
const panelDefault = document.getElementById('example-panel-default')

panelDefaultButton.addEventListener('click', e => panelDefault.show())

//
// Panel Name
//
const panelNameButton = document.getElementById('example-panel-name-button')
const panelName = document.getElementById('example-panel-name')

panelNameButton.addEventListener('click', e => panelName.show())

//
// Panel Overlay
//
const panelOverlayButton = document.getElementById('example-panel-overlay-button')
const panelOverlay = document.getElementById('example-panel-overlay')

panelOverlayButton.addEventListener('click', e => panelOverlay.show())

//
// Panel w/ Position Right
//
const panelPositionRightButton = document.getElementById('example-panel-position-right-button')
const panelPositionRight = document.getElementById('example-panel-position-right')

panelPositionRightButton.addEventListener('click', e => panelPositionRight.show())

//
// Panel w/ Position Left
//
const panelPositionButton = document.getElementById('example-panel-position-button')
const panelPosition = document.getElementById('example-panel-position')

panelPositionButton.addEventListener('click', e => panelPosition.show())

//
// Panel w/ Background Color
//
const panelBackgroundButton = document.getElementById('example-panel-background-button')
const panelBackground = document.getElementById('example-panel-background')

panelBackgroundButton.addEventListener('click', e => panelBackground.show())

//
// Panel w/ Theme Light
//
const panelThemeLightButton = document.getElementById('example-panel-theme-button')
const panelThemeLight = document.getElementById('example-panel-theme')

panelThemeLightButton.addEventListener('click', e => panelThemeLight.show())

//
// Panel w/ Theme Dark
//
const panelThemeDarkButton = document.getElementById('example-panel-theme-dark-button')
const panelThemeDark = document.getElementById('example-panel-theme-dark')

panelThemeDarkButton.addEventListener('click', e => panelThemeDark.show())

tape('opening a panel', async t => {
  const container = qs('#example-panel-default')
  const overlay = qs('.tonic--overlay')
  const main = qs('main', container)
  const h3 = qs('h3', main)

  t.ok(container)
  t.ok(overlay)
  t.ok(main)
  t.ok(h3)

  t.equal(h3.textContent.trim(), 'Hello')

  t.ok(container.hasAttribute('hidden'))

  await container.show()

  t.ok(!container.hasAttribute('hidden'))

  await sleep(128)
  await container.hide()

  t.ok(container.hasAttribute('hidden'))

  t.end()
})

function sleep (n) {
  return new Promise(resolve => {
    setTimeout(resolve, n)
  })
}
