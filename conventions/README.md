# Component Guidelines

This is a living document defining our best practices and reasoning for authoring Calcite Components.

## General Guidelines

Generally we should try to adhere and follow these best practices for authoring components.

* [Google Web Component Best Practices](https://developers.google.com/web/fundamentals/web-components/best-practices)
* [Custom Element Conformance - W3C Editor's Draft](https://w3c.github.io/webcomponents/spec/custom/#custom-element-conformance)

## Color Themes

If a component has multiple color themes (for example Blue, Red, Green and Yellow) representing various state implement a `color` prop and reflect it to an attributes.

```tsx
enum Colors {
  red = "red",
  blue = "blue",
  green = "green",
  yellow = "yellow",
}

export class CalciteComponent {

// ...

@Prop({ reflectToAttr: true }) color: Colors = 'blue'

// ...
```

You can then the `:host()` selector to define your custom colors:

```scss
:host([color="blue"]) {
  .something {
    // make it blue
  }
}

:host([color="red"]) {
  .something {
    // make it red
  }
}
```

**Discussed In**:

* https://github.com/ArcGIS/calcite-components/pull/24/files/3446c89010e3ef0421803d68d627aba2e7c4bfa0);
* https://github.com/ArcGIS/calcite-components/pull/24/files/3446c89010e3ef0421803d68d627aba2e7c4bfa0#issuecomment-497962263

**Implemented In:**

* [`<calcite-alert>`](../src/components/calcite-alert/calcite-alert.tsx);


## Light Theme/Dark Theme

Similar to a color theme all components should implement a dark theme via a `theme` property.

```tsx
export class CalciteComponent {

// ...

@Prop({ reflectToAttr: true }) theme: "light" | "dark" = 'light';

// ...
```

You can then use SASS or CSS variables to style your component. It is preferred to use CSS variables for this since they can use used an inherited by multiple child components. You can also interpolate colors from Calcite Web as shown below:

```scss
// calcite-tabs.scss
:host {
  --calcite-tabs-color: #{$darkest-gray};
  --calcite-tabs-border: #{$lighter-gray};
  --calcite-tabs-border-hover: #{$light-gray};
  --calcite-tabs-color-active: #{$off-black};
  --calcite-tabs-border-active: #{$blue};
}

:host([theme="dark"]) {
  --calcite-tabs-color: #{$lightest-gray};
  --calcite-tabs-border: #{$darker-gray};
  --calcite-tabs-border-hover: #{$gray};
  --calcite-tabs-color-active: #{$off-white};
  --calcite-tabs-border-active: #{$white};
}
```

Using CSS variables you can then access these same variables in child components like `<calcite-tab-title>`:

```scss
// calcite-tab.scss
:host(:active),
:host(:focus),
:host(:hover) {
  a {
    outline: none;
    text-decoration: none;
    color: var(--calcite-tabs-color-active);
    border-bottom-color: var(--calcite-tabs-border-hover);
  }
}
```

This will fetch the varaible `var(--calcite-tabs-color-active)` from its nearest parent (in this case `<calcite-tabs>`) which will have the appropriate light/dark variables set.

**Implemented In:**

* [`<calcite-tabs>`](../src/components/calcite-tabs/calcite-tabs.scss);
* [`<calcite-tab-nav>`](../src/components/calcite-tab-nav/calcite-tab-nav.scss);
* [`<calcite-tab>`](../src/components/calcite-tab/calcite-tab.scss);

## Form Elements and Custom Inputs

Custom form elements represent a particularly tricky part of Calcite Components. Other Stencil based frameworks such as a [Ionic](https://github.com/ionic-team/ionic) ship additional wrappers around their Web Components such as [`@ionic/react`](https://github.com/ionic-team/ionic/tree/master/react), [`@ionic/angular`](https://github.com/ionic-team/ionic/tree/master/angular) and [`@ionic.vue`](https://github.com/ionic-team/ionic/tree/master/vue). These wrapper adapt the custom events of the Ionic components like `ionChange` to work with things like Reacts synthetic `onChange={}` event, and Angular's `[(ngModel)]` to support standard form handling within those frameworks. However the additional effort to build and maintain these wrappers is likely not worth it.

Instead we will allow a native `<input>` or `select` element to become the source of truth for a component.

```html
<!-- <calcite-checkbox> is the source of truth -->
<calcite-checkbox checked disabled></calcite-checkbox>
```

and

```html
<calcite-checkbox>
  <!-- the <input> is the source of truth -->
  <input type="checkbox" checked disabled>
</calcite-checkbox>
```

Frameworks can use their native tools to interact with the provided `<input>` while the input can also be omitted if the application only needs a more basic interaction. The input can be hidden inside the component like so:

```html
<div hidden>
  <slot>
    <!-- a default checkbox in case the user doesn't pass one-->
    <input type="checkbox" checked disabled>
  </slot>
<div>
```

Several interactions are required to properly implement:

* If the `value`, `disabled`, `selected`, or `checked` properties on the input change, update the state of the custom input. The attributes of the passed input can be observed with a [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe).
* Update the state of the input when the user interacts with the custom input.
* Focus the custom input when the user focuses the passed input. This allows the standard `<label>` element to be wrapped around the custom element.
   ```html
   <label>
     My Checkbox
     <calcite-checkbox>
       <input type="checkbox" checked disabled>
     </calcite-checkbox>
   </label>
   ```

**Discussed In:**

* https://github.com/ArcGIS/calcite-components/pull/24#discussion_r289444267
* https://github.com/ArcGIS/calcite-components/pull/24#issuecomment-497813876
* https://github.com/ArcGIS/calcite-components/pull/24#issuecomment-497888962
* https://github.com/ArcGIS/calcite-components/pull/24#issuecomment-497894715

## Component Responsibilities

Calcite Components broadly targets 2 groups of projects inside Esri:

* **Sites** like [esri.com](https://esri.com) and [developers.arcgis.com](https://developers.arcgis.com).
* **Apps** like [ArcGIS Online](https://arcgis.com), [Vector Tile Style Editor](https://developers.arcgis.com/vector-tile-style-editor), [Workforce](https://www.esri.com/en-us/arcgis/products/workforce/overview), [ArcGIS Hub](https://hub.arcgis.com) ect...

Components should present the the minimum possible implementation to be usable by both sites and apps and leave as much as possible to users.

It is generally agreed on that components should not:

* Make network requests. Authentication and the exact environment of hte request is difficult to mange and better left to the specific application or site.
* Manage routing or manipulate the URL. managing the URL is the the domain and the specific site or app.
* Implement any feature which can easily be achieved with simple CSS and HTML.
* Implement any feature which might replace a browser feature. For example there will never be a `<calcite-button>` in Calcite Components because it already exists in the browser.

However components are allowed to:

* Use or implement `localStorage` if there is specific use case.
* Communicate with other components if a specific use case exists.

**Discussed In**:

* [Should tabs support syncing and loading from localstorage?](https://github.com/ArcGIS/calcite-components/pull/27) . **Yes** because such feature are difficult to impliment for **Sites** and would require lots of additional JavaScript work on the part of teams and authors
* [Should switch support a label?](https://github.com/ArcGIS/calcite-components/pull/24#discussion_r289424140). **No** because label place


## Event Namespacing

Event names should be treated like global variables since they can collide with any other event names and global variables. As such follow these guidelines when naming events.

* Name events list `Component + Event name` for example the `change` event on `<calcite-tabs>` should be named `calciteTabsChange`.
* Always prefix event names with `calcite` and never use an event name used by existing DOM standards https://developer.mozilla.org/en-US/docs/Web/Events.
* For example:
   * Bad: `change`
   * Good: `calciteChange`
   * Better: `calciteTabsChange`

**Discussed In:**

* https://github.com/ArcGIS/calcite-components/pull/24/files/3446c89010e3ef0421803d68d627aba2e7c4bfa0#discussion_r289430227
* https://github.com/ArcGIS/calcite-components/pull/24/files/3446c89010e3ef0421803d68d627aba2e7c4bfa0#issuecomment-497962263

**Implemented In:**

* [`<calcite-tabs>`](../src/components/calcite-tabs/calcite-tabs.tsx);
* [`<calcite-tab-nav>`](../src/components/calcite-tab-nav/calcite-tab-nav.tsx);
* [`<calcite-tab>`](../src/components/calcite-tab/calcite-tab.tsx);

## Private Events

If you need to use events to pass information inside your components for example to communicate between parents and children make sure you call `event.stopPropagation();` and `event.preventDefault();` to prevent the event from reaching outside the component.

**Implemented In:**

* [`<calcite-tabs>`](../src/components/calcite-tabs/calcite-tabs.tsx);
* [`<calcite-tab-nav>`](../src/components/calcite-tab-nav/calcite-tab-nav.tsx);
* [`<calcite-tab>`](../src/components/calcite-tab/calcite-tab.tsx);

## Event Details

Only attach additional data to your event if that data cannot be determined from the state of the component. This is because events also get a reference to the component the fired the event also passes a reference to the component that fired the event. For example you do not need to pass anything exposed as a `@Prop()` in the event details.


```tsx
  @Listen("calciteCustomEvent") customEventHandler(
    event: CustomEvent
  ) {
    console.log(event.target.prop); // event.target is the component that fired the event.
  }
```

`<calcite-tab-nav>` is also an example of this. The `event.details.tab` item contains the index of the selected tab or the tab name which cannot be easily determined from the state of `<calcite-tab-nav>` in some cases so it makes sense to include in the event.

**Implemented In:**

* [`<calcite-tab-nav>`](../src/components/calcite-tab-nav/calcite-tab-nav.tsx);

## CSS Class Names

@TODO Discuss BEM

* https://github.com/ArcGIS/calcite-components/issues/28
* https://github.com/ArcGIS/calcite-components/pull/24#discussion_r287462934
* https://github.com/ArcGIS/calcite-components/pull/24#issuecomment-495788683
* https://github.com/ArcGIS/calcite-components/pull/24#issuecomment-497962263

## a11y

In generally follow the guidelines and standards in these articles:

* [Google Accessibility Overview](https://developers.google.com/web/fundamentals/accessibility/)
* [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)

**Implemented In:**

* [`<calcite-tabs>`](../src/components/calcite-tabs/calcite-tabs.tsx);
* [`<calcite-tab-nav>`](../src/components/calcite-tab-nav/calcite-tab-nav.tsx);
* [`<calcite-tab>`](../src/components/calcite-tab/calcite-tab.tsx);
* [`<calcite-tab-title>`](../src/components/calcite-tab-title/calcite-tab-title.tsx);

## i18n

Components should require as a few text translations as possible. In general lets users supply text values via slots and attributes. The lets user handle translations with their apps.

If you component involves formatting numbers or dates use the [`Intl` APIs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) for formating the display of numbers and dates in your component.

To add RTL support to your components you should use the internal `getElementDir` helper to apply the `dir` attribute to your component. This means that your components `dir` attribute will always match the documents `dir`.

```tsx
import { Component, Host, Element, h} from "@stencil/core";
import { getElementDir } from "../../utils/dom";

@Component({
  tag: "calcite-component",
  styleUrl: "calcite-component.scss",
  shadow: true
})
export class CalciteComponent {
  @Element() el: HTMLElement;

  // ...

  render() {
    const dir = getElementDir(this.el);

    return (
      <Host dir={dir}>
        <!-- The rest of your component -->
      </Host>
    );
  }
}
```

You can then implement direction specific CSS with CSS variables:

```scss
:host {
  --calcite-tabs-tab-margin-start: 1.25rem;
  --calcite-tabs-tab-margin-end: 0;
}

:host([dir="rtl"]) {
  --calcite-tabs-tab-margin-start: 0;
  --calcite-tabs-tab-margin-end: 1.25rem;
}
```

Your component and its child components can then use `var(--calcite-tabs-tab-margin-start)` to access their proper values based on the direction of the document.

*** **Implemented By:**

* [`<calcite-tabs>`](../src/components/calcite-tabs/calcite-tabs.tsx);

## Bundling and Loading

Stencil has the capability to build and distribute a large variety of outputs based on our needs. YOu can read more about this in the [output targets](https://github.com/ionic-team/stencil/blob/cc55401555ff5c28757cf99edf372dcada2c0b25/src/compiler/output-targets/readme.md) documentation.

As a best practice we should follow [Ionic's configuration](https://github.com/ionic-team/ionic/blob/master/core/stencil.config.ts) and generate a `bundle` for each component. Stencil will then generate a loader that will dynamically load the components used on the page.

**Note:** This is highly likely to change as we move closer to our first release and as stencil improves their documentation around their specific methods and build processes.