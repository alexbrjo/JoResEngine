/**
 * The graphics for the terrian, units and entities. Divides up the level into 
 * slices to optimize drawing terrain.
 * @param {Universe} world The entire universe
 */
function LevelGraphics (world) {

    // Master array of slices loaded from the level
    var slices = [];
    
    var level = world.getUniverse();
    var height = level.height();
    for (var i = 0; i < level.data.length; i ++) { //@TODO don't directly use level.data
        slices.push(new Slice(i, level.sliceSize, height, world));
    }
    
    /**
     * Prints the level
     * @param {Universe} world The entire Universe
     * @param {RenderingContext2D} c The context to draw on
     */
    this.print = function(world, c) {
        this.printBackground(world, c);
        this.printSlices(world, c);
    	this.printUnits(world, c);
    };
    
    /**
     * Prints the background image
     * @Todo:
     *      + Add static/2.5D background support
     * @param {Universe} world The entire universe
     * @param {RenderingContext2D} c The context to draw graphics
     */
    this.printBackground = function(world, c) { 
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 2; j++) {
                var bg_image = world.get("bg.png");
                c.drawImage(bg_image,
                    0, 0, bg_image.width, bg_image.height,
                    i * bg_image.width, j * bg_image.width, bg_image.width, bg_image.height);
            }
        }
    };
    
    /**
     * Prints all units in the Unit queue
     * @param {Universe} world The entire universe
     * @param {RenderingContext2D} c The context to draw graphics
     */
    this.printUnits = function(world, c) {
        var units = world.getUniverse().units;
	for (var i = 0; i < units.length; i++) {
            units[i].print(world, c);
        }
    };

    /**
     * Draws all the slices
     * Todo:
     *    + Draw only 3 or 4 slices closest to player
     *    + Clip slices images so only drawn inside canvas bounds
     * @param {Universe} world The entire Universe
     * @param {RenderingContext} c The rendering context of the canvas
     */
    this.printSlices = function (world, c) {
        //var blocksWidth = Math.ceil(world.getCamera().canvasWidth / world.getUniverse().tileSize);
        //var slicesToDisplay = Math.ceil( blocksWidth / world.getUniverse().sliceSize) + 1;
        for (var i = 0; i < slices.length; i++) {
            var img = slices[i].getImage(world);
            var pos = slices[i].pos;
            c.drawImage(img,
                0, 0, img.width, img.height,
                pos.x - c.camera.x, pos.y - c.camera.y, img.width, img.height);
        }
    };
}
