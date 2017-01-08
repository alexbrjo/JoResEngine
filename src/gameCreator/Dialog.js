/**
 * Impementation of a window. Can be minimized, closed, dragged and opened from
 * the navbar.
 * @param {String} html_id Id of the dialog element
 */
function Dialog (html_id) {
    this.dialogElement = document.getElementById(html_id);
    this.dragbarElement = this.dialogElement.children[0];
    this.closeButtonElement = this.dragbarElement.children[0];
    
    this.content = function(){};
    
    this.buttons = [];
    
    this.selection = 0;
    
    this.init = function (world, graphics) {
        this.content(world, graphics);
    };
    
    this.dialogElement.joResDragClick = { x: 0, y: 0, dragging: false };
    
    this.setMouseEvents = function () {
        
        var de = this.dialogElement;
        
        this.dragbarElement.onmousedown = function (event) {
            de.joResDragClick.x = event.offsetX;
            de.joResDragClick.y = event.offsetY;
            de.joResDragClick.dragging = true;
            de.style.zindex = 3;
        };

        this.dragbarElement.onmouseup = function (event) {
            de.joResDragClick.dragging = false;
            de.style.zindex = 1;
        };

        this.dialogElement.onmousemove = function (event) {
            if(de.joResDragClick.dragging){
                de.style.left = event.clientX - de.joResDragClick.x + "px";
                de.style.top = event.clientY - de.joResDragClick.y + "px";
            } 
        };

        this.closeButtonElement.onclick = function (event) {
            de.style.display = "none";
        };
        
    };
    this.setMouseEvents();
    
    this.minimize = function () {
        
    };
    
    this.maximize = function () {
        
    };
    
    this.show = function () {
        this.dialogElement.style.display = "block";
    };
    
    this.hide = function () {
        this.dialogElement.style.display = "none";
    };
} 
