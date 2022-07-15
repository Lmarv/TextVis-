var spells = [];
var names = ['Bane', 'The Bloody Baron', 'Bathilda Bagshot', 'Buckbeak', 'Katie Bell', 'Crookshanks', 'Cuthbert Binns', 'Phineas Nigellus Black', 'Regulus Arcturus Black', 'Sirius Black', 'Amelia Bones', 'Susan Bones', 'Terry Boot', 'Lavender Brown', 'Millicent Bullstrode', 'Charity Burbage', 'Frank Bryce', 'Alecto Carrow', 'Amycus Carrow', 'Reginald Cattermole', 'Cho Chang', 'Penelope Clearwater', 'Vincent Crabbe', 'Colin Creevy', 'Dennis Creevy', 'Dirk Cresswell', 'Barty Crouch Sr', 'Barty Crouch Jr', 'John Dawlish', 'Fleur Delacour', 'Gabrielle Delacour', 'Dedalus Diggle', 'Amos Diggory', 'Cedric Diggory', 'Dobby', 'Elphias Doge', 'Antonin Dolohov', 'Aberforth Dumbledore', 'Albus Dumbledore', 'Ariana Dumbledore', 'Kendra Dumbledore', 'Percival Dumbledore', 'Dudley Dursley', 'Marge Dursley', 'Petunia Dursley', 'Vernon Dursley', 'Marietta Edgecombe', 'Errol', 'Fang', 'The Fat Friar', 'Fawkes', 'Arabella Figg', 'Argus Filch', 'Justin Finch-Fletchley', 'Seamus Finnigan', 'Firenze', 'Nicolas Flamel', 'Mundungus Fletcher', 'Filius Flitwick', 'Fluffy', 'Cornelius Fudge', 'Marvolo Gaunt', 'Merope Gaunt', 'Morfin Gaunt', 'Anthony Goldstein', 'Gregory Goyle', 'Hermione Granger', 'Grawp', 'Gregorovitch', 'Fenrir Greyback', 'Gellert Grindelwald', 'Wilhelmina Grubbly-Plank', 'Godric Gryffindor', 'Rubeus Hagrid', 'Hedwig', 'Hokey', 'Rolanda Hooch', 'Mafalda Hopkirk', 'Helga Hufflepuff', 'Angelina Johnson', 'Lee Jordan', 'Bertha Jorkins', 'Igor Karkaroff', 'Kreacher', 'Viktor Krum', 'Bellatrix Lestrange', 'Gilderoy Lockhart', 'Alice Longbottom', 'Frank Longbottom', 'Augusta Longbottom', 'Neville Longbottom', 'Luna Lovegood', 'Xenophilius Lovegood', 'Remus Lupin', 'Walden Macnair', 'Magorian', 'Draco Malfoy', 'Lucius Malfoy', 'Narcissa Malfoy', 'Madam Malkin', 'Griselda Marchbanks', 'Olympe Maxime', 'Ernie Macmillan', 'Minerva McGonagall', 'Eloise Midgen', 'Cormac McLaggen', 'Graham Montague', 'Alastor Moody', 'Aunt Muriel', 'Nagini', 'Nearly Headless Nick', 'Norbert', 'Theodore Nott', 'Bob Ogden', 'Garrick Ollivander', 'Pansy Parkinson', 'Padma Patil', 'Parvati Patil', 'Peter Pettigrew', 'Peeves', 'Pigwidgeon', 'Irma Pince', 'Sturgis Podmore', 'Poppy Pomfrey', 'Harry Potter', 'James Potter', 'Lily Potter', 'Quirinius Quirrell', 'Helena Ravenclaw', 'Rowena Ravenclaw', 'Tom Marvolo Riddle', 'Demelza Robins', 'Ronan', 'Augustus Rookwood', 'Madam Rosmerta', 'Thorfinn Rowle', 'Albert Runcorn', 'Scabbers', 'Rufus Scrimgeour', 'Kingsley Shacklebolt', 'Stan Shunpike', 'Aurora Sinistra', 'Rita Skeeter', 'Horace Slughorn', 'Salazar Slytherin', 'Zacharias Smith', 'Severus Snape', 'Alicia Spinnet', 'Pomona Sprout', 'Pius Thicknesse', 'Dean Thomas', 'Andromeda Tonks', 'Nymphadora Tonks', 'Ted Tonks', 'Travers', 'Sybill Trelawney', 'Trevor', 'Wilkie Twycross', 'Dolores Umbridge', 'Emmeline Vance', 'Romilda Vane', 'Septima Vector', 'Myrtle Warren', 'Arthur Weasley', 'Bill Weasley', 'Charlie Weasley', 'Fred Weasley', 'George Weasley', 'Ginny Weasley', 'Molly Weasley', 'Percy Weasley', 'Ron Weasley', 'Winky', 'Oliver Wood', 'Corban Yaxley', 'Blaise Zabini'];
var list = [];


fetch('./Spells.json')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        for(let i = 0; i < data.spells.length; i++){
            if (data.spells[i].incantation === 'Unknown'){
                continue
            }
            else if (data.spells[i].incantation === 'None'){
                continue
            }
            else{
                if(list.includes(data.spells[i].incantation)){
                    // do nothing
                }
                else{
                    list.push(data.spells[i].incantation);
                }
                
            }
        }
        // 
        
        // var list = [];
        fetch('./Data.json')
        .then(function(resp2) {
            return resp2.json();
        })
        .then(function(data2) {
            
            for(let i = 0; i < list.length; i++){
                var spell= list[i];
                var count = 0;
                for(let j = 0; j < data2.entry.length; j++){
                    if(data2.entry[j].spells.includes(spell)){
                        count = count + 1;
                    }
                }
                if(count == 0){
                    // do nothing
                }
                else{
                    spells.push([spell]);
                }
            }
            createSpellOptions();
        });
        
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


        

function drawSentiment(){
    // Create array for storing data points with x and y coordinates for chart.
    var datapoints = [];
    // Create Arrays to store coordinates for selcted persons, groups and spells.
    var personArray = [];
    var groupArray = [];
    var spellArray = [];
    // Empty container to delete previous chart.
    document.getElementById("con2").innerHTML = "";
    document.getElementById("con3").innerHTML = "";
    
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
            let sen = data.entry[i].sentence;
            let chapter = data.entry[i].chapter;
            let characters = data.entry[i].characters;
            let groups = data.entry[i].groups;
            let spells = data.entry[i].spells;
            datapoints.push({'x': x, 'sentiment': y, 'sentence' : sen, 'chapter': chapter,
            'characters': characters, 'groups' : groups, 'spells': spells});
        }
        // Setting attributes for svg, sentiment lines and scales.
        document.getElementById("con2").style.width = data.entry.length + 100;
        const margin = { top: 100, right: 50, bottom: 100, left: 50 },
        width = data.entry.length,
        height = 800 +margin.bottom + margin.top;

                
        const x = d3.scaleLinear().range([0, width]).domain([0, data.entry.length]);
        const y = d3.scaleLinear().range([height, 0]).domain([-1.1, 1.1]);

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
        .attr("id", "svg")
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
        .attr("stroke", pathLength)
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


                    
        const focus = svg
        .append("g")
        .attr("class", "focus")
        .style("display", "none");

        // append the circle at the intersection
        focus
        .append("circle")
        .attr("class", "y")
        .style("fill", "none")
        .attr("r", 2); // radius

        // place the value at the intersection


        focus.append("text").attr("class", "y1").attr("dx", 0).attr("dy", "0em");
        focus.append("text").attr("class", "y2").attr("dx", 0).attr("dy", "1em");
        focus.append("text").attr("class", "y3").attr("dx", 0).attr("dy", "2em");
        focus.append("text").attr("class", "y4").attr("dx", 0).attr("dy", "3em");

                    
        function mouseMove(event) {
            const bisect = d3.bisector((d) => d.x).left,
            x0 = x.invert(d3.pointer(event, this)[0]),
            i = bisect(datapoints, x0, 1),
            d0 = datapoints[i - 1],
            d1 = datapoints[i],
            d = x0 - d0.x > d1.x - x0 ? d1 : d0;

            focus
                .select("circle.y")
                .attr("transform", "translate(" + x(d.x) + "," + y(d.sentiment) + ")");

            focus
                .select("text.y1")
                .attr("transform", "translate(" + x(d.x) + ")") 
                .style("fill", "black")
                .text('Sentence-ID: '+ d.x);
            
            focus
                .select("text.y2")
                .attr("transform", "translate(" + x(d.x) +  ")")
                .style("fill", "black")
                .text('Sentiment: '+ d.sentiment);

            focus
                .select("text.y3")
                .attr("transform", "translate(" + x(d.x) + ")") 
                .style("fill", "black")
                .text('Sentence: ' + d.sentence);
            
            focus
                .select("text.y4")
                .attr("transform", "translate(" + x(d.x) +  ")")
                .style("fill", "black")
                .text('Chapter: ' + d.chapter);


            focus
                .select(".x")
                .attr("transform", "translate(" + x(d.x) + "," + y(d.sentiment) + ")")
                .attr("y2", height - y(d.sentiment));

            focus
                .select(".y")
                .attr("transform", "translate(" + width * -1 + "," + y(d.sentiment) + ")")
                .attr("x2", width + width);
        }

        svg
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "rect")
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", () => {
            focus.style("display", null);
        })
        .on("mouseout", () => {
            focus.style("display", "none");
        })
        .on("touchmove mousemove", mouseMove)
        // word clouds of respective chapter are drawn on click on the graph
        .on("click", function(f){
            const bisect = d3.bisector((d) => d.x).left,
            x0 = x.invert(d3.pointer(f, this)[0]),
            i = bisect(datapoints, x0, 1),
            d0 = datapoints[i - 1],
            d1 = datapoints[i],
            d = x0 - d0.x > d1.x - x0 ? d1 : d0;
            var c = Number(d.chapter.split(" ")[0]);
            drawWordClouds(c, 3);
        });
        
       
        var PersonOption = document.getElementById("formSelectPerson").value;
        for(let i = 0; i< datapoints.length; i++){
            if(datapoints[i].characters.includes(PersonOption)){
                personArray.push({"x": datapoints[i].x, "y":90});
            }
            
        }

        for(let j = 0; j<personArray.length; j++){
            let x = personArray[j].x;
            let y = personArray[j].y;
            
            svg
            .append('circle')
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 2)
            .style('stroke', 'green')
            .style('fill', 'green')
            .style('stroke-width', 2)
            .style('z-index', 1500);
        }

        var GroupOption = document.getElementById("formSelectGroup").value;
        for(let i = 0; i< datapoints.length; i++){
            if(datapoints[i].groups.includes(GroupOption)){
                groupArray.push({"x": datapoints[i].x, "y": 110});
            }
            
        }

        for(let j = 0; j<groupArray.length; j+=10){
            let x = groupArray[j].x ;
            let y = groupArray[j].y;
            
            svg
            .append('circle')
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 2)
            .style('stroke', 'red')
            .style("fill", 'red')
            .style('stroke-width', 2)
            .style('z-index', 1500);
        }

        var SpellOption = document.getElementById("formSelectSpell").value;
        for(let i = 0; i< datapoints.length; i++){
            if(datapoints[i].spells.includes(SpellOption)){
                spellArray.push({"x": datapoints[i].x, "y": 130});
            }
            
        }

        for(let j = 0; j<spellArray.length; j++){
            let x = spellArray[j].x ;
            let y = spellArray[j].y;
            
            svg
            .append('circle')
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 2)
            .style('stroke', '#6A5ACD')
            .style("fill", '#6A5ACD')
            .style('stroke-width', 2)
            .style('z-index', 1500);
        }
    });
    
};


function selectBook(){
    var BookOption = document.getElementById("formSelectBooks").value;
    return BookOption;
};

function selectColor(){
    var ColorOption = document.getElementById("color-picker").value;
    console.log(ColorOption);
    return ColorOption;
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


// Loading and drawing the word clouds
// author: Julia Guettler
function drawWordClouds(chapter, threshold) {
    // clear the container from previous word cloud
    document.getElementById("con3").innerHTML = "";
    // fetch json data
    fetch("./lemmatizedT3.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // get entries
            var entries = Object.entries(data);
            var entries1 = entries[0][1]
            var freqs = [];

            // filter for entries from the chapter "chapter" and with a frequency higher than "threshold" 
            var frequentWord = entries1.filter(function (entry) {
                if (entry.freq > threshold && entry.chapter === chapter) {
                    // create list of frequencies to later calculate the upper, middle, and lower third of occurrences
                    freqs.push(entry.freq);
                    return entry;
                }
            });

            // sort the entries by frequency
            frequentWord.sort(function (a, b) {
                return b.freq - a.freq;
            });

            // sort the list of frequencies 
            freqs.sort(function (a, b) {
                return b - a;
            });

            // create a scale to assign the font size to each tag according to it's frequency
            let scale = d3.scaleSqrt()
                .range([10, 60])
                .domain(d3.extent(
                    frequentWord.map(function (d) {
                        return d.freq
                    })
                ));
            // for every word create an object containing the text, color, scaled size and context words
            // if the word is in the upper third of appearing words, it is written in navy blue, middle third is written in dodger blue and lower third in medium turquoise
            let words = Object.keys(frequentWord).map(function (d) {
                return {
                    text: frequentWord[d].token,
                    color: frequentWord[d].freq > freqs[( Math.ceil(freqs.length / 3) )] ? "navy" :
                    frequentWord[d].freq > freqs[( Math.ceil(freqs.length / 3) * 2) ] ? "dodgerblue" :
                    "mediumturquoise",
                    size: scale(frequentWord[d].freq),
                    context: frequentWord[d].context
                };
            });

            {
                // append svg to container 3
                const svg = d3.select("#con3").append("svg").attr("id", "#cloudsvg");

                // define parameters of the word cloud layout
                let layout = d3.layout.cloud()
                    // size of the word cloud
                    .size([600, 600])
                    .words(words)
                    // distance between two words
                    .padding(2)
                    // no rotation
                    .rotate(function () { return 0 })
                    // font size for each word is is calculated before
                    .fontSize(function (d) { return d.size; })
                    .random(function (d) { return 0.5; })
                    .on("end", draw);
                layout.start();

                return svg.node();

                // function to draw the words in the cloud
                function draw(tags) {
                    // create tooltip to show context on mouseover
                    var tooltip = d3.select("body")
                                    .append("div")
                                    .style("position", "absolute")
                                    .style("z-index", "10")
                                    // tooltip stays hidden unless a mouseover event takes place
                                    .style("visibility", "hidden")
                                    .style("background", "#ffffff")
                                    .style("color","#740001")
                                    .text("test");
                    // add attributes to the svg such as the tags (words for word cloud)
                    svg.attr("width", layout.size()[0])
                        .attr("height", layout.size()[1])
                        .append("g")
                        // place word cloud in the center of the 600x600 layout
                        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                        .selectAll("text")
                        .data(tags)
                        .enter()
                        .append("text")
                        .style("font-size", function (d) { return d.size + "px"; })
                        .style("font-family", "sans-serif")
                        // id had to be set to the context of the word, otherwise the context could not have been shown in the tooltip
                        .attr("id", function (d) { return d.context; })
                        .attr("text", function(d){ return d.text; })
                        .attr("text-anchor", "middle")
                        .attr("fill", function (d) { return d.color; })
                        .attr("class", "words")
                        .attr("transform", function (d) { return "translate(" + [d.x, d.y] + ")"; })
                        .text(function (d) { return d.text; })
                        // on mousever event the tooltip showing the context words becomes visible
                        .on("mouseover", function(d){
                            tooltip.text(d.target.id);
                            return tooltip.style("visibility", "visible");	
                        })
                        .on("mousemove", function(d){
                            return tooltip.style("top", (d.pageY-10)+"px").style("left", (d.pageX+10)+"px");
                        })
                        // on mouseout the tooltip becomes invisible again
                        .on("mouseout", function(){
                            return tooltip.style("visibility", "hidden");
                        });
                }
            }
        });
}