/**
 * A slice of the world. Generates image for the slice to limit number of images
 * drawn per second.
 * @param {Number} a The slice id, also the 'slices' array idex
 * @param {Number} w Width of the slice
 * @param {Number} h Height of the slice
 * @param {Universe} world The entire Universe
 */
function Slice (a, w, h, world) {
    /** The order of the slice also the index in the slice array */
    this.number = a;
    
    /** A block selection box */
    this.selectBox = {
        x: 0, // {Number} x x coordinate of the slice
        y: 0, // {Number} y y coordinate of the slice
        w: 0, // {Number} w Width of the slice
        h: 0, // {Number} h Hegiht of the slice
        color: "#00FF00", // {String} color Hex or text color
        display: false, // {Boolean} display If the select box is shown
        /**
         * Sets the select box
         * @param {Number} x x coordinate of the slice
         * @param {Number} y y coordinate of the slice
         * @param {Number} w Width of the slice
         * @param {Number} h Hegiht of the slice
         * @param {String} color Color of the selectBox
         */
        set: function (x, y, w, h, color) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.color = color | "#00FF00"; // default is solid green
            this.display = true;
        },
        show: function () {this.display = true;}, // makes the selectBox visable
        hide: function () {this.display = false;} // makes the selectBox invisable
    };
    
    // width and height of the slice
    this.w = w, this.h = h;
    
    // x position of the slice (y will always be 0)
    this.x = a * this.w;
    
    // the slice image, only unpdated on slice alterations
    this.image = document.createElement('canvas');
    
    var ctx = this.image.getContext('2d');
    var lvl = world.getUniverse();
    var ts = lvl.tileSize;
    
    this.altered = true;
    this.image.width = this.w * ts;
    this.image.height = this.h * ts;
    this.pos = {
        x: a * w * ts,
        y: 0
    };
    
    /**
     * Gets the slice image and generates a need one if the slice has been 
     * altered.
     * @param {Universe} world The entire Universe
     */
    this.getImage = function (world) {
        if (world.getUniverse().altered(this.number)) this.generateImage(world);
        return this.image;
    };
    
    /**
     * Generates the slice image
     * @param {Universe} world The entire Universe
     */
    this.generateImage = function(world) {
        ctx.clearRect(0, 0, this.image.width, this.image.height);
        for (var i = 0; i < this.w; i++) {
            for (var j = 0; j < this.h; j++) {
                var block = lvl.generateBlockObject(ts * (i + this.x), ts * j);
                var pos = block.pos; // pos of tile in background
                var img = block.sprite; //pos of sprite on img file

                if (img.id > 0) {
                    ctx.drawImage(world.get(lvl.terrain_sprite),
                            img.x * ts, img.y * ts, img.w, img.h,
                            pos.x - (this.x * ts), pos.y, pos.w, pos.h);
                    this.blocks_rendered++;
                }
            } // for j
        } // for i
        this.altered = false;
        var box = this.selectBox || {display: false}; // prevents null reference
        if (box.display) {
            ctx.strokeStyle = box.color;
            ctx.lineWidth = 1;
            ctx.strokeRect(box.x * ts, box.y * ts, box.w * ts, box.h * ts);
        }
    };
    this.generateImage(world);
}
