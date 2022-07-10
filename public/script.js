var spells = [];
var names = ['Hannah Abbot', 'Aragog', 'Ludo Bagman', 'Bane', 'The Bloody Baron', 'Bathilda Bagshot', 'Buckbeak', 'Katie Bell', 'Crookshanks', 'Cuthbert Binns', 'Phineas Nigellus Black', 'Regulus Arcturus Black', 'Sirius Black', 'Amelia Bones', 'Susan Bones', 'Terry Boot', 'Lavender Brown', 'Millicent Bullstrode', 'Charity Burbage', 'Frank Bryce', 'Alecto Carrow', 'Amycus Carrow', 'Reginald Cattermole', 'Cho Chang', 'Penelope Clearwater', 'Vincent Crabbe', 'Colin Creevy', 'Dennis Creevy', 'Dirk Cresswell', 'Barty Crouch Sr', 'Barty Crouch Jr', 'John Dawlish', 'Fleur Delacour', 'Gabrielle Delacour', 'Dedalus Diggle', 'Amos Diggory', 'Cedric Diggory', 'Dobby', 'Elphias Doge', 'Antonin Dolohov', 'Aberforth Dumbledore', 'Albus Dumbledore', 'Ariana Dumbledore', 'Kendra Dumbledore', 'Percival Dumbledore', 'Dudley Dursley', 'Marge Dursley', 'Petunia Dursley', 'Vernon Dursley', 'Marietta Edgecombe', 'Errol', 'Fang', 'The Fat Friar', 'Fawkes', 'Arabella Figg', 'Argus Filch', 'Justin Finch-Fletchley', 'Seamus Finnigan', 'Firenze', 'Nicolas Flamel', 'Mundungus Fletcher', 'Filius Flitwick', 'Fluffy', 'Cornelius Fudge', 'Marvolo Gaunt', 'Merope Gaunt', 'Morfin Gaunt', 'Anthony Goldstein', 'Gregory Goyle', 'Hermione Granger', 'Grawp', 'Gregorovitch', 'Fenrir Greyback', 'Gellert Grindelwald', 'Wilhelmina Grubbly-Plank', 'Godric Gryffindor', 'Rubeus Hagrid', 'Hedwig', 'Hokey', 'Rolanda Hooch', 'Mafalda Hopkirk', 'Helga Hufflepuff', 'Angelina Johnson', 'Lee Jordan', 'Bertha Jorkins', 'Igor Karkaroff', 'Kreacher', 'Viktor Krum', 'Bellatrix Lestrange', 'Gilderoy Lockhart', 'Alice Longbottom', 'Frank Longbottom', 'Augusta Longbottom', 'Neville Longbottom', 'Luna Lovegood', 'Xenophilius Lovegood', 'Remus Lupin', 'Walden Macnair', 'Magorian', 'Draco Malfoy', 'Lucius Malfoy', 'Narcissa Malfoy', 'Madam Malkin', 'Griselda Marchbanks', 'Olympe Maxime', 'Ernie Macmillan', 'Minerva McGonagall', 'Eloise Midgen', 'Cormac McLaggen', 'Graham Montague', 'Alastor Moody', 'Aunt Muriel', 'Nagini', 'Nearly Headless Nick', 'Norbert', 'Theodore Nott', 'Bob Ogden', 'Garrick Ollivander', 'Pansy Parkinson', 'Padma Patil', 'Parvati Patil', 'Peter Pettigrew', 'Peeves', 'Pigwidgeon', 'Irma Pince', 'Sturgis Podmore', 'Poppy Pomfrey', 'Harry Potter', 'James Potter', 'Lily Potter', 'Quirinius Quirrell', 'Helena Ravenclaw', 'Rowena Ravenclaw', 'Tom Marvolo Riddle', 'Demelza Robins', 'Ronan', 'Augustus Rookwood', 'Madam Rosmerta', 'Thorfinn Rowle', 'Albert Runcorn', 'Scabbers', 'Rufus Scrimgeour', 'Kingsley Shacklebolt', 'Stan Shunpike', 'Aurora Sinistra', 'Rita Skeeter', 'Horace Slughorn', 'Salazar Slytherin', 'Zacharias Smith', 'Severus Snape', 'Alicia Spinnet', 'Pomona Sprout', 'Pius Thicknesse', 'Dean Thomas', 'Andromeda Tonks', 'Nymphadora Tonks', 'Ted Tonks', 'Travers', 'Sybill Trelawney', 'Trevor', 'Wilkie Twycross', 'Dolores Umbridge', 'Emmeline Vance', 'Romilda Vane', 'Septima Vector', 'Myrtle Warren', 'Arthur Weasley', 'Bill Weasley', 'Charlie Weasley', 'Fred Weasley', 'George Weasley', 'Ginny Weasley', 'Molly Weasley', 'Percy Weasley', 'Ron Weasley', 'Winky', 'Oliver Wood', 'Corban Yaxley', 'Blaise Zabini'];



fetch('./Spells.json')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        for(let i = 0; i < data.spells.length; i++){
            if (data.spells[i].incantation === 'Unknown'){
                continue
            }
            else{
                if(spells.includes(data.spells[i].incantation)){
                    // do nothing
                }
                else{
                    spells.push(data.spells[i].incantation);
                }
                
            }
        }
        createSpellOptions();
    });

createCharacterOptions();


function createSpellOptions(){
const select = document.getElementById('formSelectSpell');
for (const [index, a] of spells.entries()) {
  const opt = document.createElement('option');
  opt.value = a;
  opt.innerHTML = a;
  select.appendChild(opt);
}
};

function createCharacterOptions(){
    const select = document.getElementById('formSelectPerson');
    for (const [index, a] of names.entries()) {
      const opt = document.createElement('option');
      opt.value = a;
      opt.innerHTML = a;
      select.appendChild(opt);
    }
};


        

function drawSVG(){
    // Create array for storing data points with x and y coordinates for chart.
    var datapoints = [];
    // Empty container to delete previous chart.
    document.getElementById("con2").innerHTML = "";
    
    // Get selected book number and color for correct JSON file and color of the line chart.
    var booknumber = document.getElementById("formSelectBooks").value;
    var color = document.getElementById("color-picker").value;
    // Check which book is selected and set correct JSON file for data.
    if(booknumber == 1){
        var file = './Book1.json';
    }
    else if(booknumber == 2){
        var file = './Book2.json';
    }
    else if(booknumber == 3){
        var file = './Book3.json';
    }
    else if(booknumber == 4){
        var file = './Book4.json';
    }
    else if(booknumber == 5){
        var file = './Book5.json';
    }
    else if(booknumber == 6){
        var file = './Book6.json';
    }
    else if(booknumber == 7){
        var file = './Book7.json';
    }

    // Fetch JSON data.
    fetch(file)
    .then(function(resp) {
        return resp.json();
    }) 
    .then(function(data) {
        // Iterate over JSON data and parse sentiment to Float and set i to x (for sentence number) and set y to sentiment -> store in datapoints array.
        for(let i = 0; i< data.entry.length; i++){
            let y = parseFloat(data.entry[i].sentiment);
                let x = i;
                datapoints.push({'x': x, 'sentiment': y});
        }
        // Setting attributes for svg, sentiment lines and scales.
        document.getElementById("con2").style.width = data.entry.length + 10;
        const margin = { top: 100, right: 30, bottom: 50, left: 50 },
        width = data.entry.length - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

                
        const x = d3.scaleLinear().range([0, width]).domain([0, data.entry.length]);
        const y = d3.scaleLinear().range([height, 0]).domain([-1, 1]);

        // Setting area and valueline.
        const area = d3
        .area()
        .x((d) => { return x(d.x); })
        .y0(height)
        .y1((d) => { return y(d.sentiment); })
        .curve(d3.curveCardinal);

        const valueline = d3
        .line()
        .x((d) => { return x(d.x); })
        .y((d) => { return y(d.sentiment); })
        .curve(d3.curveCardinal);
        

        // Create svg and append it to container 2 
        const svg = d3
        .select("#con2")
        .append("svg")     
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)); 

        svg.append("g").attr("class", "y axis").call(d3.axisLeft(y));

        // Label for y axis
        svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Sentiment");

        // Label for x axis
        svg
        .append("text")
        .attr("x", 0 + width * 1/2)
        .attr("y", 0 + height + 30)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Sentence");

        // Transition both axes to the right scales from data.
        svg
        .select(".x.axis") // set the x-axis
        .transition()
        .duration(750)
        .call(d3.axisBottom(x));
        
        svg
        .select(".y.axis") // set the y-axis
        .transition()
        .duration(750)
        .call(d3.axisLeft(y));

                    
        const areaPath = svg
        .append("path")
        .data([datapoints])
        .attr("class", "area")
        .attr("d", area)
        .attr("transform", "translate(0,300)")
        .transition()
        .duration(1000)
        .attr("transform", "translate(0,0)");

                    
        const linePath = svg
        .append("path")
        .data([datapoints])
        .attr("class", "line")
        .attr("d", valueline);

        const pathLength = linePath.node().getTotalLength();

        // Draw line chart.
        linePath
        .attr("stroke-dasharray", pathLength)
        .attr("stroke-dashoffset", pathLength)
        .attr("stroke-width", 0)
        .transition()
        .duration(1000)
        .attr("stroke-width", 1)
        .attr("fill", color)
        .attr("stroke", color)
        .attr("stroke-dashoffset", 0);

        // Label for sentiment chart and book number.
        svg
        .append("text")
        .attr("class", "title")
        .attr("x", width * 1/2)
        .attr("y", 0 )
        .attr("text-anchor", "middle")
        .text("Harry Potter sentiment chart: Book " + booknumber);
        
    });
};


function selectBook(){
    var BookOption = document.getElementById("formSelectBooks").value;
    return BookOption;
};

function selectPerson(){
    var PersonOption = document.getElementById("formSelectPerson").value;
    return PersonOption;
};

function selectGroup(){
    var GroupOption = document.getElementById("formSelectGroup").value;
    return GroupOption;
};

function selectSpell(){
    var SpellOption = document.getElementById("formSelectSpell").value;
    return SpellOption;
};

function selectColor(){
    var ColorOption = document.getElementById("color-picker").value;
    return ColorOption;
};

