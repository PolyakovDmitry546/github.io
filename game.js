var grid = document.getElementById('grid');
var text_level = document.getElementById('level');
var text_timer = document.getElementById('timer');
var text_score = document.getElementById('score');

var grid_size = 2;
var unique_elem_number = 1;
var elem_color;
var unique_elem_color;
var color_difference;
var time = 60;
var timer;
var score = 0;

document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyQ' && event.ctrlKey) 
    {
        var temp = `rgb(${255},${0},${0})`;
        var unique_elem = document.getElementById('unique_elem');
        unique_elem.style.backgroundColor = temp;
        setTimeout(()=>unique_elem.style.backgroundColor = unique_elem_color, 50);
    }
});

function getRandomInt(max) 
{
    return Math.floor(Math.random() * Math.floor(max));
}

function start()
{
    ShowScore();
    clearInterval(timer);
    time = 60;
    text_level.innerText = `Уровень: ${grid_size - 1}`;
    unique_elem_number = getRandomInt(grid_size * grid_size)

    removeAllGridChild(grid);
    createGrid();

    timer = setInterval(ShowTimer, 1000);
}

function getRandomColorIntWithTrueDifference(number, difference)
{
    if(number > difference && number < 256 - difference)
    {
        var flag = getRandomInt(2);
        if(flag == 0)
            return number + difference - getRandomInt(3);
        else
            return number - difference + getRandomInt(3);
    }
    else if(number <= difference)
    {
        return number + difference - getRandomInt(3);
    }
    else
    {
        return number - difference + getRandomInt(3);
    }
}

function genColors()
{
    var red = getRandomInt(256);
    var green = getRandomInt(256);
    var blue = getRandomInt(256);
    elem_color = `rgb(${red},${green},${blue})`;
    unique_elem_color = `rgb(${getRandomColorIntWithTrueDifference(red, color_difference)},
        ${getRandomColorIntWithTrueDifference(green, color_difference)},
        ${getRandomColorIntWithTrueDifference(blue, color_difference)})`;
}

function ShowTimer()
{
    text_timer.innerText = `${time}`;
    time--;
    if(time == -2)
    {
        alert("Время закончилось!");
        newGame();
    }
}

function ShowScore()
{
    text_score.innerText = `Очки: ${score}`;
}

function nextLevel()
{
    score += time * (grid_size - 1);
    grid_size++;
    if(color_difference > 10)
        color_difference-=2;
    genColors();
    start();
}

function newGame()
{
    score = 0;
    grid_size = 2;
    color_difference = 33;
    genColors();
    start();
}

function removeAllGridChild(node)
{
    while (node.firstChild) 
    {
        node.removeChild(node.firstChild);
    }
}

function createGrid()
{
    for(var i = 0; i < grid_size; i++)
    {
        var row = createRow(grid);
        for(var j = 0; j < grid_size; j++)
        {
            createElement(row, i*grid_size + j);
        }
    }
}

function createRow(parent)
{
    var row = document.createElement('div');
    row.className = 'grid_row';
    parent.appendChild(row);
    return row;
}

function createElement(parent, elem_number) 
{
    var elem = document.createElement('div');
    if(elem_number == unique_elem_number)
    {
        elem.className = "grid_elem_unique";
        elem.id = "unique_elem";
        elem.style.backgroundColor = unique_elem_color;
        elem.onclick = function(event)
        {
            nextLevel();
        }
    }
    else
    {
        elem.className = "grid_elem";
        elem.style.backgroundColor = elem_color;
        elem.onclick = function(event)
        {
            newGame();
        }
    }
    parent.appendChild(elem);
}