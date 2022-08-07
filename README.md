# html-calendar.js
Generate calendars using HTML tables

- Lightweight
- No dependencies
- Pretty

## [Live Demo](https://gsidhu.github.io/html-calendar.js)

## Features
1. Add the calendar for any given month
2. Add the calendar for a range of months
3. (Optional) Colour specific dates in the calendar

## How to use
```html
<script src="./html-calendar.js"></script>

<div class="html-calendar" id="2022-08"></div>

<script>
  autoAddCalendarToDOM()
</script>
```
1. Add the script to your webpage.
2. Create a `div` element with the `html-calendar` class and give it an ID in the **YYYY-MM** format.
3. Run the `autoAddCalendarToDOM()` function and a calendar will automatically be added to the 

## How to add colour
Each `td` element in the generated calendar table has the date in YYYY-MM-DD format as a class. Using this the built-in `colorDates` function is able to add colour to specific dates.

You can call the function by passing the table element as the first parameter and an array with specifications as the second parameter. The specification array looks like this –
```js
specification = [
  // [startDate, endDate, bgColour, textColour], 
  [1, 5, "red", "white"],
  [6, 6, "green", "white"],
   ...
]
```

There are three built-in colour options – red, green and yellow. Or you can specify the hex code directly.

## Change the look of the table
The final generated table has the following CSS classes: `table` and `table-bordered`. These are the [Bootstrap](https://getbootstrap.com/) classes for tables. If you use some other CSS framework or want to specify your own styles, simply modify [`line 88`](./html-calendar.js#L88) in the script.

If you do use Bootstrap 5, you can pass an optional boolean parameter called `compactCal` to `autoAddCalendarToDOM()` for generating a slimmer table output. By default it is set to `false`, but if you set it to `true`, the generated tables will have `table-sm` and `m-0` classes added in addition to the default.

## License
This code is licensed under the GNU GPL v3 license.