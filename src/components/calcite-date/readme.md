# calcite-date

calcite-date is used to toggle a value on or off. You can optionally pass in a checkbox. This is useful when using a framework like React to get around their synthetic event handling:

```html
<calcite-date>
  <input name="myCheckbox" type="checkbox" onChange={this.handleInputChange} />
</calcite-date>
```

 If you don't pass in an input, calcite-date will act as the source of truth: 

```html
<label>
  <calcite-date switched="true"></calcite-date> Switch is on
</label>
```

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute       | Description                                                                                  | Type     | Default |
| ------------- | --------------- | -------------------------------------------------------------------------------------------- | -------- | ------- |
| `max`         | `max`           | Value of the form control                                                                    | `string` | `""`    |
| `min`         | `min`           | Name of the form control (useful for specifying input/label relationship)                    | `string` | `""`    |
| `nextMonth`   | `next-month`    |                                                                                              | `string` | `""`    |
| `prevMonth`   | `prev-month`    |                                                                                              | `string` | `""`    |
| `startOfWeek` | `start-of-week` | Sun by default 0: Sunday 1: Monday 2: Tuesday 3: Wednesday 4: Thursday 5: Friday 6: Saturday | `number` | `0`     |
| `value`       | `value`         | True if the control should be switched on                                                    | `string` | `""`    |


## Events

| Event               | Description | Type               |
| ------------------- | ----------- | ------------------ |
| `calciteDateChange` |             | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
