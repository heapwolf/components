# Properties

Properties are used by a component to help it decide how it should appear or
how it should behave. Properties are read only. In this case, `message` is our
property and `Hello, World` is our property value.

```js
class MyApp extends Tonic {
  render () {
    return `
      <my-greeting message='Hello, World'></my-greeting>
    `
  }
}
```

---

Properties added to a component appear on the `this.props` object.

```js
class MyGreeting extends Tonic {
  render () {
    return `
      <h1>${this.props.message}</h1>
    `
  }
}
```

---

Tonic has no templating language, it uses HTML! Remember, HTML only understands
string values. If we want to pass more complex values to a component, prefix the
string returned by the render function with `this.html`.

```js
const data = { greeting: 'hello, world' }

class MyApp extends Tonic {
  render () {
    return this.html`
      <my-component title=${data}></my-component>
    `
  }
}
```

---

Now `this.props` has a reference to the `data` object.

```js
class MyComponent extends Tonic {
  render () {
    return `
      <h1>${this.props.data.greeting}</h1>
    `
  }
}
```

> <i><b>Note</b>: A property named `fooBar='30'` will become lowercased
> (as per the HTML spec). If you want the property name to be camel cased when
> added to the props object, use `foo-bar='30'` to get `this.props.fooBar`.</i>

---

You can use the "spread" operator to expand object literals into html properties.

```js
class FooBar extends Tonic {
  render () {
    const o = {
      a: 'testing',
      b: 2.2,
      fooBar: '"ok"'
    }

    return this.html`
      <spread-component ...${o}>
      </spread-component>

      <div ...${o}>
      </div>
    `
  }
}
```

The above compoent renders the following output.

```html
<foo-bar>
  <spread-component a="testing" b="2.2" foo-bar="&quot;ok&quot;">
    <div a="testing" b="2.2" foo-bar="&amp;quot;ok&amp;quot;">
    </div>
  </spread-component>

  <div a="testing" b="2.2" foo-bar="&quot;ok&quot;">
  </div>
</foo-bar>
```

### Updating properties

If you want to manually update a component, you should think of your document's
hierarchy and where in it the update should take place. It's better to update a
component higher up in the hierarchy and let the data cascade downward to child
components.

---

To manually update a component you can use the `.reRender()` method. This method
receives either an object or a function. For example...

```js
// Update a component's properties
this.reRender(props => ({
  ...props,
  color: 'red'
}))

// Reset a component's properties
this.reRender({ color: 'red' })

// Re-render a component with its existing properties
this.reRender()
```

---

The `.reRender()` method can also be called directly on a component.

```js
document.getElementById('parent').reRender({ data: [1,2,3, ...9999] })
```
