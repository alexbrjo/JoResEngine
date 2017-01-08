/**
 * Sets up mouse events to move palette and tool windows
 */
function initWindows () {
    var blockWindow = document.getElementById('block_palette');
    var blockButton = blockWindow.children[0];
    var blockClose  = blockButton.children[0];
    
    var unitWindow = document.getElementById('unit_palette');
    var unitButton = unitWindow.children[0];
    var unitClose  = unitButton.children[0];
    
    var toolWindow = document.getElementById('selection_tools');
    var toolButton = toolWindow.children[0];
    var toolClose  = toolButton.children[0];

    initWindow(blockWindow, blockButton, blockClose);
    initWindow(unitWindow,  unitButton,  unitClose);
    initWindow(toolWindow,  toolButton,  toolClose);
}

/**
 * Sets up the mouse event functions for the HTML windows and bars
 * @param {HTML element} w The HTML element for the entire window 
 * @param {HTML element} b The menu bar on the window
 * @param {HTML element} c The close window button on the window
 */
function initWindow (w, b, c) {
    // Add a simple object for JoRes to access
    w.joRes = {
        x: 0,
        y: 0,
        dragging: false
    };
    
    b.onmousedown = function (event) {
        w.joRes.x = event.offsetX;
        w.joRes.y = event.offsetY;
        w.joRes.dragging = true;
        w.style.zindex = 3;
    };
    
    w.onmouseup = function (event) {
        w.joRes.dragging = false;
        w.style.zindex = 1;
    };
    
    w.onmousemove = function (event) {
        if(w.joRes.dragging){
            w.style.left = event.clientX - w.joRes.x + "px";
            w.style.top = event.clientY - w.joRes.y + "px";
        } 
    };
    
    c.onclick = function (event) {
        w.style.display = "none";
    };
}
