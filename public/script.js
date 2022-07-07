var spells = [];
var names = ['Hannah Abbot', 'Aragog', 'Ludo Bagman', 'Bane', 'The Bloody Baron', 'Bathilda Bagshot', 'Buckbeak', 'Katie Bell', 'Crookshanks', 'Cuthbert Binns', 'Phineas Nigellus Black', 'Regulus Arcturus Black', 'Sirius Black', 'Amelia Bones', 'Susan Bones', 'Terry Boot', 'Lavender Brown', 'Millicent Bullstrode', 'Charity Burbage', 'Frank Bryce', 'Alecto Carrow', 'Amycus Carrow', 'Reginald Cattermole', 'Cho Chang', 'Penelope Clearwater', 'Vincent Crabbe', 'Colin Creevy', 'Dennis Creevy', 'Dirk Cresswell', 'Barty Crouch Sr', 'Barty Crouch Jr', 'John Dawlish', 'Fleur Delacour', 'Gabrielle Delacour', 'Dedalus Diggle', 'Amos Diggory', 'Cedric Diggory', 'Dobby', 'Elphias Doge', 'Antonin Dolohov', 'Aberforth Dumbledore', 'Albus Dumbledore', 'Ariana Dumbledore', 'Kendra Dumbledore', 'Percival Dumbledore', 'Dudley Dursley', 'Marge Dursley', 'Petunia Dursley', 'Vernon Dursley', 'Marietta Edgecombe', 'Errol', 'Fang', 'The Fat Friar', 'Fawkes', 'Arabella Figg', 'Argus Filch', 'Justin Finch-Fletchley', 'Seamus Finnigan', 'Firenze', 'Nicolas Flamel', 'Mundungus Fletcher', 'Filius Flitwick', 'Fluffy', 'Cornelius Fudge', 'Marvolo Gaunt', 'Merope Gaunt', 'Morfin Gaunt', 'Anthony Goldstein', 'Gregory Goyle', 'Hermione Granger', 'Grawp', 'Gregorovitch', 'Fenrir Greyback', 'Gellert Grindelwald', 'Wilhelmina Grubbly-Plank', 'Godric Gryffindor', 'Rubeus Hagrid', 'Hedwig', 'Hokey', 'Rolanda Hooch', 'Mafalda Hopkirk', 'Helga Hufflepuff', 'Angelina Johnson', 'Lee Jordan', 'Bertha Jorkins', 'Igor Karkaroff', 'Kreacher', 'Viktor Krum', 'Bellatrix Lestrange', 'Gilderoy Lockhart', 'Alice Longbottom', 'Frank Longbottom', 'Augusta Longbottom', 'Neville Longbottom', 'Luna Lovegood', 'Xenophilius Lovegood', 'Remus Lupin', 'Walden Macnair', 'Magorian', 'Draco Malfoy', 'Lucius Malfoy', 'Narcissa Malfoy', 'Madam Malkin', 'Griselda Marchbanks', 'Olympe Maxime', 'Ernie Macmillan', 'Minerva McGonagall', 'Eloise Midgen', 'Cormac McLaggen', 'Graham Montague', 'Alastor Moody', 'Aunt Muriel', 'Nagini', 'Nearly Headless Nick', 'Norbert', 'Theodore Nott', 'Bob Ogden', 'Garrick Ollivander', 'Pansy Parkinson', 'Padma Patil', 'Parvati Patil', 'Peter Pettigrew', 'Peeves', 'Pigwidgeon', 'Irma Pince', 'Sturgis Podmore', 'Poppy Pomfrey', 'Harry Potter', 'James Potter', 'Lily Potter', 'Quirinius Quirrell', 'Helena Ravenclaw', 'Rowena Ravenclaw', 'Tom Marvolo Riddle', 'Demelza Robins', 'Ronan', 'Augustus Rookwood', 'Madam Rosmerta', 'Thorfinn Rowle', 'Albert Runcorn', 'Scabbers', 'Rufus Scrimgeour', 'Kingsley Shacklebolt', 'Stan Shunpike', 'Aurora Sinistra', 'Rita Skeeter', 'Horace Slughorn', 'Salazar Slytherin', 'Zacharias Smith', 'Severus Snape', 'Alicia Spinnet', 'Pomona Sprout', 'Pius Thicknesse', 'Dean Thomas', 'Andromeda Tonks', 'Nymphadora Tonks', 'Ted Tonks', 'Travers', 'Sybill Trelawney', 'Trevor', 'Wilkie Twycross', 'Dolores Umbridge', 'Emmeline Vance', 'Romilda Vane', 'Septima Vector', 'Myrtle Warren', 'Arthur Weasley', 'Bill Weasley', 'Charlie Weasley', 'Fred Weasley', 'George Weasley', 'Ginny Weasley', 'Molly Weasley', 'Percy Weasley', 'Ron Weasley', 'Winky', 'Oliver Wood', 'Corban Yaxley', 'Blaise Zabini'];
var book1 = '1';
var book2 = '2';
var book3 = '3';
var book4 = '4';
var book5 = '5';
var book6 = '6';
var book7 = '7';
var content = {};



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

fetch('./Data.json')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        // for(let i = 0; i< data.entry.length; i++){
        //     // console.log(data.entry[i].book);
        //     if(data.entry[i].book.includes(book1)){
        //         console.log(data.entry[i]);
        //     }
        // }
        
        
    });



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

var svg = document.getElementById('svg');

d3.select(svg)
    .append('line')
    .attr('x1', 10)
    .attr('x2', 10)
    .attr('y1', 20)
    .attr('y2', 500)
    .style('stroke', 'red')
    .style('stroke-width', '3px');