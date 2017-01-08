/**
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
        converted_image.getContext("2d").drawImage(world.get(level.terrain_sprite),
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
