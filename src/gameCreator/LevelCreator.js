/**
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
                    var exportWindow = window.open();
                    exportWindow.document.open();
                    exportWindow.document.write( "<html>" +
                            DataGenerator(world.getUniverse()) + "</html>"
                    );
                    exportWindow.document.close();
                    ctrl.space = false; // forces space to be false
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
    