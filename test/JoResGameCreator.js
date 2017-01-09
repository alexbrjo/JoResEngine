/**
 * Generates levelData from a level object
 * 
 * @param {Level} level Level to generate data for.
 */
function DataGenerator (level) {
    var file = "var JoResLevel = function () {";
    
    // Prints width and height variables
    file += "this.w = " + level.data.length + "; ";
    file += "this.h = " + level.data[0].length + "; ";
    
    // Prints tileSize variable
    file += "this.tileSize = " + level.tileSize + "; ";

    file += "this.terrain_sprite =" + level.terrain_sprite + "; ";
    
    // Prints resources list
    file += "this.resources = [";
    for (var i = 0; i < level.resources.length; i++) {
        file += level.resources[i];
        if (i !== level.resources.length - 1) file += ",";
    }
    file += "]; ";
    
    // Prints the sprite list
    file += "this.sprite_index = [";
    for (var i = 0; i < level.sprite_index.length; i++) {
        var s = level.sprite_index[i];
        file += "{sprite:{x:" + s.sprite.x + ",y:" + s.sprite.y; 
        file += ",w:" + s.sprite.w + ",h:" + s.sprite.h + "},"; 
        file += "AABB:{x:" + s.AABB.x + ",y:" + s.AABB.y; 
        file += ",w:" + s.AABB.w + ",h:" + s.AABB.h + "}"; 
        file += "}";
        if (i !== level.sprite_index.length - 1) file += ",";
    }
    file += "]; ";
    
    // Prints level.data
    file += "this.data = [\n";
    for (var i = 0; i < level.data.length; i++) {
        file += "\t[";
        for (var j = 0; j < level.data[i].length; j++) {
            file += "\t\t[";
            for (var k = 0; k < level.data[i][j].length; k++) {
                file += level.data[i][j][k];
                if (k !== level.data[i][j].length - 1) file += ",";
            }
            file += "]";
            if (j !== level.data[i].length - 1) file += ",";
            file += "\n";
        }
        file += "]";
        if (i !== level.data.length - 1) file += ",";
        file += "\n";
    }
    file += "]; ";
    
    return file + "}";
};/**
 * Impementation of a window. Can be minimized, closed, dragged and opened from
 * the navbar.
 * @param {String} html_id Id of the dialog element
 */
function Dialog (html_id) {
    
    /** The HTML element */
    this.dialogElement = document.getElementById(html_id);
    this.dragbarElement = this.dialogElement.children[0];
    this.closeButtonElement = this.dragbarElement.children[0];
    
    /** The bottom part  */
    this.content = function(){};
    
    /** Array of buttons from the dialog */
    this.buttons = [];
    
    /** The index of the button that is currently selected */
    this.selection = 0;
    
    /** 
     * Initializes the dialong content 
     * @param {Universe} world The entire universe
     * @param {RenderingContext2D} graphics The canvas graphics
     */
    this.init = function (world, graphics) {
        this.content(world, graphics);
    };
    
    this.dialogElement.joResDragClick = { x: 0, y: 0, dragging: false };
    
    /**
     * Sets the mouse events for the dialog
     */
    this.setMouseEvents = function () {
        
        var de = this.dialogElement;
        
        this.dragbarElement.onmousedown = function (event) {
            de.joResDragClick.x = event.offsetX;
            de.joResDragClick.y = event.offsetY;
            de.joResDragClick.dragging = true;
            de.style.zindex = 3;
            
            window.onmousemove = function (event) {
                if(de.joResDragClick.dragging){
                    de.style.left = event.clientX - de.joResDragClick.x + "px";
                    de.style.top = event.clientY - de.joResDragClick.y + "px";
                } 
            };
        };

        this.dragbarElement.onmouseup = function (event) {
            de.joResDragClick.dragging = false;
            de.style.zindex = 1;
        };

        this.closeButtonElement.onclick = function (event) {
            de.style.display = "none";
        };
        
    };
    this.setMouseEvents();
    
    /** Minimize and maximize to be implemented */
    this.minimize = function () {};
    this.maximize = function () {};
    
    /**  
     * Shows the dialog via style
     */
    this.show = function () {
        this.dialogElement.style.display = "block";
    };
    
    /**
     * Hides the dialog via style
     */
    this.hide = function () {
        this.dialogElement.style.display = "none";
    };
} 
;/**
 * The object that contains all the Application's data
 */
function JoResGameCreator() {

    /** The semi-global resourceLoader */
    this.rsc = new ResourceLoader();
    
    // Default Screens
    this.screens = {
        loading: JoResLoad,
        splash: JoResSplash,
        levelSelect: null,
        settings: null
    };
    
    // DEFAULT IMAGES
    var logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAAlCAYAAAD7u09NAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AwOAQAtu6IdUgAAAiVJREFUaN7tWDGugzAMdb4ycQnmLFyhh6mYCluP0S1lqjjMv0IXZi6RNX8hyIQ4CXzgF/1YqoiCndgv2H4pQJIkSRYIc01+57mOtb30/eJNX89H9PpldT8UEE45U2fZzGmp1Dius0xLpVghBLy7brUDsmlnc/XtCgCgB/AOBebLNXnpe3h3HbN/ezlR364MAJz7yKbVAACFEH8HyH+WBEgCJAGSAEmAHMBDFkuAzJEkznCO4enkJ3gcIHUzzrJUn60Nus4ykEqx4TmZdxE5DAp2Egdrg2I7HGk32lD6ls1kj11SRirFbLAN83URLEPMyupuH5Bhq15CF0vkMAEsqzuTTQuyabVs2lH/42qIDcqeTBWx8PH6wT11YPXl7ROFqFWzGkIW1a0ub0cGaOqEeZbVnRVCaMLWpCR7PR8jKPysJ+66JeNTN4dIXEpxsdX17ToePD9xCpAdyNFlov9C4Na1n5k6MrRMLZUCyHM7nSZP0o7Q/03BRUHOOtDw1WgAYIUQWN/ZrewUI3mIK+9Cn2aE3UTf0g2t5bPd1K8kSZIkKYTQkXXQXVBcxrh/2+9d795dx/A4xtZXyI1ezN6+tZfae4PwbYABoO4J9jrUuj69mPEaG8qeU8EsacNmgxBIp/yDCAfkQ3JpTodSZone1vUG78l9n/qW12zsABVsrN6evnEDAFV8qPexm9m2riBj9UI2e/j2L1vtrO2eFYBQM0iSJMnu8gON3OByW0Ib0QAAAABJRU5ErkJggg==";
    var startPic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAPCAYAAAB9YDbgAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAL5JREFUSA3Vko0KgCAMhC16/1cuJp4ca/4sGGlg03me34YpbfQdhfXegBmsaXXYzHcZHW2BS2W9PVixpnZj4iyfg5dE9sh5CCVi5I3y0zm9hlby/PHaOuPJpZOdO3Op7lWh0jMYb7XyrJmaz8JOmUWLrDeLO3VHRp3FuVH87KthLSCYS7T2NRz0Oo81PEY66GuMeAYCg1EvMiZuaA0r1borNkBCUtYzaAGjEyEgHtNlu1mKyHzc2dWBPc3/X/sAP64pCEy0Ns8AAAAASUVORK5CYII=";
    
    this.rsc.load([
        {name: "JoRes_logo",    path: logo}, 
        {name: "JoRes_start",   path: startPic} 
    ]);
    // DEFAULT IMAGES
    
    /** The core object that handles modules */
    this.core = null;

    /** Path of the level data and imgs used */
    var levelPath = null, imgPath = null;   

    /** 
     * A lot of functions need to pass the app to a callback function so a 
     * reference to this object is needed. 
     */
    var joRes = this;

    /**
     * Starts the main game loop using requestAnimationFrame
     */
    this.start = function () {
        this.core = new CoreManager(16, joRes.rsc, "JoResGameCreator-target");
        this.core.update();
        
        var animationDone = false;
        var loadDone = false;
        
        this.rsc.whenReady(function () {
            if (animationDone) joRes.build(0);
            else loadDone = true;
        });
        
        this.screen("splash", function () {
            if (loadDone) joRes.build(0);
            else animationDone = true;
        });
        
        function loop() {
            joRes.update();
            frame = window.requestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    window.oRequestAnimationFrame;
            frame(loop, joRes.core.graphics.getCanvas());
        };
        loop();
    };
    
    /**
     * Updates the core or changes the application state
     */
    this.update = function () {
        if (typeof this.core.applicationStateChange === "function") {
            this.core.applicationStateChange(this);
            this.core.applicationStateChange = null;
        } else {
            this.core.update();
        }
    };

    /** 
     * Starts the game part of the app
     * 
     * @param {Number} level_id Which level to load.
     */
    this.build = function (level_id) {
        
        this.core.close();
        this.screen("loading");
        
        //loads level data
        this.rsc.load(this.getLevelPath(level_id));
        this.rsc.whenReady(function () {
            joRes.core.component = new LevelCreator(joRes.unit_list);
            
            // loads level resource data
            joRes.rsc.load(joRes.core.component.resources);
            joRes.rsc.whenReady(function(){ joRes.core.init();});
        });
    };

    /** 
     * Starts the main menu
     * 
     * @param {String} screen_name Name of the screen to switch to
     * @param {Function|null} f Function to call when screen is complete
     */
    this.screen = function (screen_name, f) {
        this.core.close();
        var screen = new this.screens[screen_name](f);
        screen.init(this.core.public());
        this.core.graphics.addTask(screen);
        this.core.camera.setFocusObj({x: 0, y: 0});
        this.core.component = screen;
    };
    
    this.unit_list = [];
    this.addUnit = function (u) {
        this.unit_list.push(u);
    };
    
    /** Quits the application */
    this.quit = function () {
        // Save game in a cookie
        this.core.close();
    };

    this.setLevelPath = function (url) {
        levelPath = url;
    };

    this.load = function (url) {
        this.rsc.load(url);
    };

    this.setImgPath = function (url) {
        imgPath = url;
    };
    
    this.getLevelPath = function (id) {
        return levelPath.replace("*", id);
    };
}
;/**
 * Converts a game universe into a Level Designer
 */  
function LevelCreator(){
    var universe = new Universe();
    
    universe.nav = new LevelCreatorNav();
    
    universe.init = function (world, graphics) {
        this.nav.init(world, graphics);
        graphics.addTask(new LevelGraphics(world));
        graphics.disableDebug();
        
        world.getCamera().setFocusObj(this.wizard);
        world.getCamera().setScaleBounds(1.0, 2.0);
        world.getCamera().setTileSize(this.tileSize);
        
        this.wizard.init(world);
        
        for (var i = 0; i < this.data.length; i++) {
            for (var j = 0; j < this.data[i].unit.length; j++) {
                var ud = this.data[i].unit[j];
                this.addUnit(ud.type - 1, 
                        (i * this.tileSize * this.sliceSize) + (ud.x * this.tileSize), 
                        ud.y);
            }
        }
    };
    
    universe.wizard = {
            x: 0,
            y: 0,
            pos : {x: 0, y:0},
            speed: 2,
            init: function (world) {
                this.x = world.getCamera().canvasWidth / 2;
                this.y = world.getCamera().canvasHeight / 2;
            },
            update: function (world) {
                var ctrl = world.getController();
                if (ctrl.a) this.x -= this.speed;
                if (ctrl.d) this.x += this.speed;
                if (ctrl.w) this.y -= this.speed;
                if (ctrl.s) this.y += this.speed;
                
                var mouse = ctrl.current;
                if (mouse !== null) {
                    var cam = world.getCamera();
                    this.pos.x = Math.trunc((mouse.offsetX / 2 + cam.x) / world.getUniverse().tileSize);
                    this.pos.y = Math.trunc((mouse.offsetY / 2 + cam.y) / world.getUniverse().tileSize);
                }
                
                if (ctrl.isDown) {
                    world.getUniverse().setBlock(this.pos.x, this.pos.y, 
                            universe.nav.blockBrush());
                }
            }
        };
    
    /**
     * The main game loop. Called dt/1000 times a second.
     * @param {Universe} world The entire universe
     */
    universe.update = function(world){
        this.wizard.update(world);
    };
    
    return universe;
}
    ;/**
 * The havigation display for the LevelCreator
 */
function LevelCreatorNav () {
    
    /** Array og dialog windows */
    var dialogs = [];
    
    /** Reference to the world object */
    var worldRef = null;
    
    /** Buttons that are a part of the navbar */
    var buttons = [
        function () { console.log("Not implemented"); },
        function () {
            var exportWindow = window.open();
            exportWindow.document.open();
            exportWindow.document.write( "<html>" +
                    DataGenerator(worldRef.getUniverse()) + "</html>"
            );
            exportWindow.document.close();
        },
        function () { console.log("Not implemented"); },
        function () { console.log("Not implemented"); },
        function () { console.log("Not implemented"); },
        function () { console.log("Not implemented"); },
        function () { console.log("Not implemented"); },
        function () { console.log("Not implemented"); },
        function () { console.log("Not implemented"); },
        function () { console.log("Not implemented"); },
        function () { if (dialogs.length > 0) dialogs[0].show(); },
        function () { if (dialogs.length > 1) dialogs[1].show(); },
        function () { if (dialogs.length > 2) dialogs[2].show(); }
    ];
    
    this.blockBrush = function () {
        return dialogs[0].selection;
    };
    
    this.init = function (world, graphics) {
        
        worldRef = world;
        
        dialogs[0] = new Dialog('block_palette');
        dialogs[0].content = BlockPalette;
        
        dialogs[1] = new Dialog('unit_palette');
        dialogs[1].content = UnitPalette;
        
        dialogs[2] = new Dialog('selection_tools');
        dialogs[2].content = function(){};
        
        
        if (document.body.clientHeight < 600 || 
                document.body.clientWidth < 800) { 
            dialogs[3] = new Dialog('size_alert');
        }
        
        this.initAllDialogs(world, graphics);
        
        var menuItem;
        var i = 0;
        while ((menuItem = document.getElementById("button_" + i)) !== null) {
            if (i < buttons.length) menuItem.onclick = buttons[i];
            i++;
        }
    };
    
    this.initAllDialogs = function (world, graphics) {
        for (var i = 0; i < dialogs.length; i++) {
            dialogs[i].init(world, graphics);
            dialogs[i].show();
        }
    };
}
;/**
 * The content of a block palette
 * @param {World} world The entire universe
 */
function BlockPalette (world){
    var level = world.getUniverse();
    var terrain = level.sprite_index;
    var tileSize = level.tileSize;

    // creates buttons for every terrain sprite
    for (var i = 0; i < terrain.length; i++) {
        var sprite = terrain[i].sprite;
        var converted_image = document.createElement("canvas");
        converted_image.width = 24;
        converted_image.height = 24;
        var graphics = converted_image.getContext("2d");
        graphics.mozImageSmoothingEnabled = false;
        graphics.webkitImageSmoothingEnabled = false;
        graphics.msImageSmoothingEnabled = false;
        graphics.imageSmoothingEnabled = false;
        graphics.drawImage(world.get(level.terrain_sprite),
            sprite.x * tileSize, sprite.y * tileSize, sprite.w, sprite.h, 
            0, 0, converted_image.width, converted_image.height);

        var thi = this;
        this.buttons[i] = document.createElement('div');
        this.buttons[i].appendChild(converted_image);
        this.buttons[i].joResBlockIndex = i;
        this.buttons[i].onclick = function (event) {
            thi.selection = this.joResBlockIndex;
        };
        document.getElementById("block_palette").children[1].appendChild(this.buttons[i]);
    }
}
;/**
 * The content of a unit palette
 * @param {World} world The entire universe
 */
function UnitPalette (world){
    var units = world.getUniverse().unit_index;
    
    // creates buttons for every unit
    for (var i = 0; i < units.length; i++) {
        var unit;
        if (typeof units[i] === "function") {
            unit = units[i]();
        } else if (typeof units[i] === "object") {
            unit = Object.assign(units[i]);
        }
        
        if (typeof unit.move !== "function") {
            unit.move = BasicAI[unit.move];
        }
        
        unit = Object.assign(new Unit(i, 0, 0), unit);
        var sprite = unit.sprite(world.getTime());
        
        var converted_image = document.createElement("canvas");
        converted_image.width = 24;
        converted_image.height = 24;
        var graphics = converted_image.getContext("2d");
        graphics.mozImageSmoothingEnabled = false;
        graphics.webkitImageSmoothingEnabled = false;
        graphics.msImageSmoothingEnabled = false;
        graphics.imageSmoothingEnabled = false;
        graphics.drawImage(world.get(unit.imgPath),
            sprite.x, sprite.y, sprite.w, sprite.h, 
            0, 0, converted_image.width, converted_image.height);

        var thi = this;
        this.buttons[i] = document.createElement('div');
        this.buttons[i].appendChild(converted_image);
        this.buttons[i].joResUnitIndex = i;
        this.buttons[i].onclick = function (event) {
            thi.selection = this.joResUnitIndex;
        };
        document.getElementById("unit_palette").children[1].appendChild(this.buttons[i]);
    }
}
