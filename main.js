function seatApiCall(type) {
    fetch('https://ergast.com/api/f1/2020/1/driverStandings.json')
    .then((res) => res.json())
    .then((responseData) => seatParse(responseData, type))
}

function seatParse(data, type) {
    
    for (i of data.MRData.StandingsTable.StandingsLists[0].DriverStandings) {

        if (i.type == type || type == "") {

            let racerPosition = i.position
            let racerName = i.Driver.driverId
            let racerNationality = i.Driver.nationality
            let racerPoints = i.points

            let clone = myTemplate.content.cloneNode(true); // Cloning an HTML template
            let td = clone.querySelectorAll('td') // clone variable narrows in on 'td' elements

            td[0].textContent = racerPosition
            td[1].textContent = racerName
            td[2].textContent = racerNationality
            td[3].textContent = racerPoints

            tableBody.appendChild(clone);
        }
    }
}

const myForm = document.getElementById('form')

myForm.addEventListener('submit', (season) => {
    season.preventDefault()
    tableBody.innerHTML = ''
    const myForm = document.getElementById('form')
    formData = new FormData(myForm)
    let myList = []
    for (const [key, value] of formData) {
        myList.push(value)
    }
    console.log(myList)
    seatApiCall(myList[0])
})
// function dataRetriever(eventType) {
//     console.log('hi')
// }

// dataRetriever('concert')



seatApiCall()