var grid = document.getElementById('grid');
var text_level = document.getElementById('level')

var grid_size = 2;
var unique_elem_number = 1;
var elem_color;
var unique_elem_color;
var color_difference;

function getRandomInt(max) 
{
    return Math.floor(Math.random() * Math.floor(max));
}

function start()
{
    unique_elem_number = getRandomInt(grid_size * grid_size)

    removeAllGridChild(grid);
    createGrid();
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

function nextLevel()
{
    grid_size++;
    text_level.innerText = `Уровень: ${grid_size - 1}`;
    if(color_difference > 32)
        color_difference-=2;
    genColors();
    start();
}

function newGame()
{
    grid_size = 2;
    text_level.innerText = `Уровень: ${grid_size - 1}`;
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
        //elem.style.backgroundColor = unique_elem_color;
        elem.onclick = function(event)
        {
            nextLevel();
        }
    }
    else
    {
        elem.className = "grid_elem";
        //elem.style.backgroundColor = elem_color;
        elem.onclick = function(event)
        {
            newGame();
        }
    }
    parent.appendChild(elem);
}