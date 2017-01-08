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
    
    universe.resources.push("button_1.png");
    
    universe.hud = new LevelCreatorHUD();
    
    universe.init = function (world, graphics) {
        this.hud.init(world, graphics, this.wizard);
        graphics.addTask(new LevelGraphics(world));
        graphics.addTask(this.hud);
        graphics.disableDebug();
        
        world.getCamera().setFocusObj(this.wizard);
        world.getCamera().setScaleBounds(1.0, 2.0);
        world.getCamera().setTileSize(this.tileSize);
        
        for (var i = 0; i < this.unit_data.length; i++) {
            if (this.unit_data[i] > 0) { 
                this.addUnit(this.unit_data[i] - 1, i * this.tileSize, i);
            }
        }
    };
    
    universe.wizard = {
            x: 0,
            y: 0,
            pos : {x: 0, y:0},
            speed: 2,
            brush: 0,
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
                
                if (ctrl.space) {
                    var fileData = LevelDataGenerator(world.getUniverse());
                    var file = document.getElementsByTagName('html');
                    file[0].innerHTML = fileData;
                }
                
                if (ctrl.isDown) {
                    world.getUniverse().setBlock(this.pos.x, this.pos.y, this.brush);
                }
            }
        };
    
    /**
     * The main game loop. Called dt/1000 times a second.
     * 
     * @param {Universe} world The entire universe
     */
    universe.update = function(world){
        this.hud.update(world, this.wizard);
        this.wizard.update(world);
    };
    
    return universe;
}
    ;/**
 * The Heads up display for the LevelCreator
 */
function LevelCreatorHUD () {
    
    var buttons = [];
    
    var tools = [];
    
    /** Block selector variables */
    var rowLength = 10;
    
    var tileSize = 0;
    
    this.init = function (world, graphics) {
        
        var level = world.getUniverse();
        var terrain = level.sprite_index;
        tileSize = level.tileSize;
        
        // creates buttons for every terrain sprite
        for (var i = 0; i < terrain.length; i++) {
            var sprite = terrain[i].sprite;
            var converted_image = document.createElement("canvas");
            converted_image.width = sprite.w;
            converted_image.height = sprite.h;
            converted_image.getContext("2d").drawImage(world.get(level.terrain_sprite),
                sprite.x * tileSize, sprite.y * tileSize, sprite.w, sprite.h, 
                0, 0, sprite.w, sprite.h);
            buttons.push(new Button(converted_image, 
                (i % rowLength) * (tileSize + 1) + 1, 
                -Math.floor(i / rowLength) * (tileSize + 1) - 1, 
                tileSize, tileSize, "bottom", "left", i));
        }
    };
    
    this.update = function (world, wiz) {
        for (var i = 0; i < buttons.length; i++) {
            var u = buttons[i].update(world);
            if (typeof u === "number" ) {
               wiz.brush = u;
            }
        }
    };
    
    this.print = function (world, c) {
        this.printBlockSelector(world, c);
    };
    
    this.printBlockSelector = function (world, c) {
        var cam = world.getCamera();
        
        var menuHeight = 48;
        
        c.fillStyle = "#577f63";
        c.fillRect(0, cam.canvasHeight - (menuHeight + 2), cam.canvasWidth, 1);
        c.fillStyle = "#bfd8bd";
        c.fillRect(0, cam.canvasHeight - (menuHeight + 1), 
                cam.canvasWidth, menuHeight + 2);
        
        c.fillStyle = "#77bfa3";
        c.fillRect(0, cam.canvasHeight - (menuHeight + 1), 
                rowLength * (tileSize + 1) + 1, menuHeight + 1);
        c.fillStyle = "#577f63";
        c.fillRect(rowLength * (tileSize + 1) + 1, 
                cam.canvasHeight - (menuHeight + 1), 1, menuHeight + 1);
        
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].graphics.print(world, c);
        }
    };
}
;/**
 * Generates levelData from a level object
 * 
 * @param {Level} level Level to generate data for.
 */
function LevelDataGenerator (level) {
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
}