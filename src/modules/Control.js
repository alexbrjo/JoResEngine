/**
 * Keeps user input up to date
 * @param {Canvas} canvas The HTML canvas element to capture mouse events
 */
function Control (canvas) {
    
    /** The current mouse event */
    this.current = null;
    
    /** 
     * String of all characters typed since the last time the enter key has 
     * been pressed
     */
    this.charString = "";
    
    /** Whether or not to log the keys pressed */
    this.logKeys = false;
    
    /** List of last 10 mouseEvents */
    this.clickList = new Array(10);
    
    this.clickPos = function () {
        this.blocks_rendered.unshift(this.blocks_rendered.pop());
            this.blocks_rendered[0] = value;
    };
    
    /** If the mouse is clicked */
    this.isDown = false;
    
    /** If the space bar is pressed down */
    this.space = false;
    
    /** If the shift key is pressed down */
    this.shift = false;
    
    /** If the enter key is pressed down */
    this.enter = false;
    
    /** If the enter key is pressed down */
    this.delete = false;

//         __ _     _                           
//        / /(_)___| |_ ___ _ __   ___ _ __   ___ 
//       / / | / __| __/ _ \ '_ \ / _ \ '_ \ / __|
//      / /__| \__ \ ||  __/ | | |  __/ | | |\__ \
//      \____/_|___/\__\___|_| |_|\___|_| | ||___/
//       KeyEvent Listeners, MouseEvent Listeners                                     
//
    /**
     * @param {Number} which The char code of the key that is down
     * @param {Boolean} down If the key is down
     */
    this.setKey = function (which, down) {
        var char = "";
        if (which >= 65 && which <= 90) {
            char = String.fromCharCode(which);
            this[char.toLowerCase()] = down;
        } else {
            if (which === 8) this.delete = down;
            if (which === 13) {
                this.enter = down;
                this.charString = "";
            }
            if (which === 16) this.shift = down;
            if (which === 32) this.space = down;
        }
        
        // Logs the keys if enabled
        if (down && this.logKeys) {
            if (this.space) {
                this.charString += " ";
            } else if (this.delete) {
                this.charString = this.charString.substring(0, this.charString.length - 1);
            } else {
                if (this.shift) {
                    this.charString += char.toUpperCase();
                } else {
                    this.charString += char.toLowerCase();
                }
            }
        }
    };
    
    /**
     * Resets all key and mouse variables
     */
    this.reset = function () {
        for (var i = 65; i <= 90; i++) {
            this.setKey(i, false);
            this.charString = "";
        }
        
        this.clickList = new Array(10);
        this.isDown = false;
        this.space = false;
        this.shift = false;
        this.enter = false;
        this.delete = false;

    };
    
    /**
     * Starts a click
     * @param {MouseEvent} mouseEvent The mouse event from the HTML document
     */
    this.setMouseDown = function (mouseEvent) {
        this.setMouse(mouseEvent);
        this.clickList.unshift(this.clickList.pop());
        this.clickList[0] = mouseEvent;
    };
    
    /**
     * Ends a click
     * @param {MouseEvent} mouseEvent The mouse event from the HTML document
     */
    this.setMouseUp = function (mouseEvent) {
        this.setMouse(mouseEvent);
    };
    
    /**
     * Sets the position of the mouse
     * @param {MouseEvent} mouseEvent The mouse event from the HTML document
     */
    this.setMouse = function (mouseEvent) {
        window.onkeydown = function (keyEvent) { canvas.onkeydown(keyEvent); }
        window.onkeyup = function (keyEvent) { canvas.onkeyup(keyEvent); }
        this.current = mouseEvent;
        this.isDown = mouseEvent.buttons > 0;
    };
    
    /**
     * Set key listener functions here
     */
    var t = this;
    canvas.onkeydown = function (keyEvent) { t.setKey(keyEvent.which, true); };
    canvas.onkeyup = function (keyEvent) { t.setKey(keyEvent.which, false); };
    canvas.onmousedown = function (mouseEvent) { canvas.focus(); t.setMouseDown(mouseEvent); }; 
    canvas.onmouseup = function (mouseEvent) { canvas.focus(); t.setMouseUp(mouseEvent); }; 
    canvas.onmousemove = function (mouseEvent) { canvas.focus(); t.setMouse(mouseEvent); }; 
}
