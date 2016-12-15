/**
 * Converts a game universe into a Level Designer
 */  
function LevelCreator(){
    var universe = new Universe();
    universe.wizard = {
            x: 0,
            y: 0,
            update: function (world) {
                var ctrl = world.getController();
                if (ctrl.a) this.x--;
                if (ctrl.d) this.x++;
                if (ctrl.w) this.y--;
                if (ctrl.s) this.y++;
            }
        };
    
    /**
     * The main game loop. Called dt/1000 times a second.
     */
    universe.update = function(world){
        this.wizard.update(world);
    };
    
    return universe;
}
    