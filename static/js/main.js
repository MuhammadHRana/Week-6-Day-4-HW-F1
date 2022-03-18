// var audios = new Audio('../images/audio.mp3');

function play() {
    var audios = new Audio('../images/audio.mp3');
    // audios.play();
    audios.loop = true

}


class Driver {
    constructor(data) {
        this.position = data.position;
        this.givenName = data.Driver.givenName;
        this.familyName = data.Driver.familyName;
        this.nationality = data.Driver.nationality;
        this.sponsor = data.Constructors[0].constructorId;
        this.points = data.points;
    }
}

const form = document.querySelector('#f1');
console.log(form);


form.addEventListener('submit', (event) => {
    event.preventDefault();
    let season = event.path[0][0].value;
    let round = event.path[0][1].value;

    console.log(event);
    console.log(season, round);

    requestData(season, round);
    audios.play()
    season = ''
    round = ''
    // audio.play();
})

const requestData = async (season, round) => {
    try {
        let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`);
        console.log(response.status);
        console.log(response.data);

        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].position);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.givenName);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.familyName);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.nationality);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0].constructorId);
        
        clearTable();

        driverData = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

        for (let i=0; i < driverData.length; i++) {
            let driver = new Driver(driverData[i]);
            console.log(driverData[i]);
            createRow(driver);
        }
    } catch (err) {
        window.alert("Invalid Input. Please enter valid range of season(1950-2021) and round");
    }
}

function createRow(data){
    var tablebody = document.getElementById("search").getElementsByTagName('tbody')[0];
    var row = tablebody.insertRow();
    var ranking = row.insertCell(0);
    var name = row.insertCell(1);
    var nationality = row.insertCell(2);
    var sponsor = row.insertCell(3);
    var score = row.insertCell(4);
    ranking.innerHTML = `${data.position}`;
    name.innerHTML = `${data.givenName} ${data.familyName}`;
    nationality.innerHTML = `${data.nationality}`;
    sponsor.innerHTML = `${data.sponsor}`;
    score.innerHTML = `${data.points}`;
}

function clearTable() {
    var tbody = document.getElementById("search").getElementsByTagName('tbody')[0];
    tbody.innerHTML = "";
}

