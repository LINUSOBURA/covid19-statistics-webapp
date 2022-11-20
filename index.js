const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'd659872ffemsh308228174fbd5fdp1b8815jsn940937d2e69e',
    'X-RapidAPI-Host': 'covid-193.p.rapidapi.com',
  },
}

fetch('https://covid-193.p.rapidapi.com/statistics', options)
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    let tableData = ''
    data = Array.from(data.response)
    data.map((values) => {
      tableData += `<tr><td>${values.continent}</td>
      <td>${values.country}</td>
    <td>${values.population}</td>
    <td>${values.cases.new}</td>
    <td>${values.cases.active}</td>
    <td>${values.cases.critical}</td>
    <td>${values.cases.recovered}</td>
    <td>${values.cases.total}</td>
    <td>${values.deaths.new}</td>
    <td>${values.deaths.total}</td>
    <td>${values.tests.total}</td>
    <td>${values.day}</td>
    <td>${values.time}</td>
    </tr>`
    })
    document.getElementById('tablebody').innerHTML = tableData

    $('.tablemanager').tablemanager({
      firstSort: [
        [3, 0],
        [2, 0],
        [1, 'asc'],
      ],
      appendFilterby: true,
      debug: true,
      vocabulary: {
        voc_filter_by: 'Filter By',
        voc_type_here_filter: 'Filter...',
        voc_show_rows: 'Rows Per Page',
      },
      pagination: true,
      showrows: [20, 50, 100],
    })
  })

  .catch((err) => console.error(err))

/*Graph*/
fetch('https://covid-193.p.rapidapi.com/history?country=all', options)
  .then((response) => response.json())
  .then((data) => {
    plotData(data)
  })
function plotData(data) {
  data = Array.from(data.response)
  var keys = data.map((values) => values.time),
    cases = data.map((values) => values.cases.total),
    deaths = data.map((values) => values.deaths.total),
    tests = data.map((values) => values.tests.total)

  keys.unshift('time')
  cases.unshift('cases')
  deaths.unshift('deaths')
  tests.unshift('tests')

  bb.generate({
    bindto: '#covid-all-cases',
    data: {
      x: 'time',
      axes: { cases: 'y', deaths: 'y2', tests: 'y3' },
      columns: [keys, cases, deaths, tests],
      types: { cases: 'bar' },
    },
    axis: {
      x: {
        type: 'category',
        clipPath: false,
        tick: {
          count: 10,
          fit: true,
        },
      },
      y: {
        label: {
          text: 'cases',
          position: 'outer-center',
        },
      },
      y2: {
        show: true,
        label: {
          text: 'deaths',
          position: 'outer-center',
        },
      },
      y3: {
        show: true,
        label: {
          text: 'tests',
          position: 'outer-center',
        },
      },
    },
    padding: { right: 100 },
  })
}
