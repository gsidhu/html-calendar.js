// HTML-Calendar.JS
// Author: Gurjot Sidhu (thatgurjot.com)
//
// 1. Generates an HTML table for a given month and year
// 2. (Optional) Highlight certain dates in the table
//
// Relies on Bootstrap table classes but you can use the optional CSS file or your own CSS

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let numDays = [31,28,31,30,31,30,31,31,30,31,30,31]
const days = ["S", "M", "T", "W", "T", "F", "S"]
const colourCodes = {
  "red": ["#dc3545", "white"],
  "green": ["#198754", "white"],
  "yellow": ["#fff770", "white"]
}
const colours = Object.keys(colourCodes)

// generate table for a month and year
// when compactCal is true, the table has tight padding
function generateMonth(m, y, compactCal=false) {
  if (m < 10) { m = '0' + m} // need this for compatibility with Safari & Firefox on mobile
  let ymd = y + '-' + m + '-01'
  const startDate = new Date(ymd)
  const startDay = startDate.getDay()
  const startMonth = startDate.getMonth()
  const startYear = startDate.getFullYear()

  // fix leap year
  if (startYear === 2024 || startYear === 2028) {
    numDays[1] = 29
  }

  let table = document.createElement('table')
  let head = document.createElement('thead')
  let body = document.createElement('tbody')
  body.classList.add('table-group-divider')

  // add header row
  let headerRow = document.createElement('tr')
  for (const d of days) {
    let headElement = document.createElement('th')
    headElement.innerText = d
    headElement.setAttribute("scope", "col")
    headerRow.appendChild(headElement)
  }
  head.appendChild(headerRow)

  // add date rows
  //// add dates into rows one after the other
  let dateCounter = 1
  for (rowindex=0; rowindex < 5; rowindex++) {
    let row = document.createElement('tr')
    for (dayindex=0; dayindex < 7; dayindex++){
      let cellElement = document.createElement('td')
      if (dateCounter <= numDays[startMonth]) {
        if (startDay === dayindex) {
          cellElement.textContent = dateCounter
          cellElement.classList.add(startYear+'-'+(startMonth+1)+'-'+dateCounter)
          dateCounter += 1
        } else if (dateCounter > 1) {
          cellElement.textContent = dateCounter
          cellElement.classList.add(startYear+'-'+(startMonth+1)+'-'+dateCounter)
          dateCounter += 1
        }
      }
      row.appendChild(cellElement)
    }
    body.appendChild(row)
  }
  //// check if all dates have been covered
  //// if not, fix it
  if (dateCounter <= numDays[startMonth]) {
    let firstRow = body.getElementsByTagName('tr')[0]
    let cells = firstRow.getElementsByTagName('td')
    for (const cell of cells) {
      if ((cell.innerText === '') && (dateCounter <= numDays[startMonth])) {
        cell.innerText = dateCounter
        cell.classList.add(startYear+'-'+(startMonth+1)+'-'+dateCounter)
        dateCounter += 1
      }
    }
  }

  // insert elements to table
  table.appendChild(head)
  table.appendChild(body)
  table.classList.add('table', 'table-bordered')
  if (compactCal) {
    table.classList.add('table-sm', 'm-0')
  }

  let tableTitle = document.createElement('p')
  tableTitle.innerText = months[startMonth] + " " + startYear
  tableTitle.classList.add('text-center', 'text-muted')

  return [table, tableTitle]
}

// add colour to calendar
function colorDates(table, specification) {
  // specification = [[start, end, colour], [start, end, bgColour, textColour], ...]
  // get month and year of the Saturday element in first row
  let monthYear = table.getElementsByTagName('td')[6].classList[0]
  monthYear = monthYear.split('-')
  monthYear = monthYear.slice(0,2).join('-')

  // add colour
  for (const spec of specification) {
    for (var i = spec[0]; i <= spec[1]; i++) {
      let bgColour = spec[2]
      let textColour = spec[3]
      if (colours.indexOf(spec[2]) > -1) {
        bgColour = colourCodes[spec[2]][0]
        textColour = colourCodes[spec[2]][1]
      }
      let tempEl = table.getElementsByClassName(monthYear.substr(0,8) + '-' + i)[0]
      tempEl.style.backgroundColor = bgColour
      tempEl.style.color = textColour
    }
  }
  return table
}

// looks for all elements with the `html-calendar` CSS class
// get the year and month from each element's ID and insert the calendar
function autoAddCalendarToDOM(compactCal=false) {
  let htmlCals = document.getElementsByClassName('html-calendar')
  for (cal of htmlCals) {
    let calID = cal.getAttribute('id')
    // check if given ID already has a generated calendar
    if (cal.childElementCount === 0) {
      let generatedCal =  generateMonth(parseInt(calID.split('-')[1]), parseInt(calID.split('-')[0]), compactCal)
      document.getElementById(calID).appendChild(generatedCal[1])
      document.getElementById(calID).appendChild(generatedCal[0])
    }
  }
}