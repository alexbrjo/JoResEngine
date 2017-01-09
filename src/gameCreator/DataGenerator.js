/**
 * Generates levelData from a level object
 * 
 * @param {Level} level Level to generate data for.
 */
function DataGenerator (level) {
    var file = "var JoResLevel = function () {";
    
    // Prints width and height variables
    file += "this.w = " + level.data.length + "; ";
    file += "this.h = " + level.data[0].block[0].length + "; ";
    
    // Prints tileSize variable
    file += "this.tileSize = " + level.tileSize + "; ";

    file += "this.terrain_sprite = '" + level.terrain_sprite + "'; ";
    
    // Prints resources list
    file += "this.resources = "
    file += JSON.stringify(level.resources);
    file += ";";
    
     // Prints the unit list
    file += "this.unit_index = [";
    for (var i = 0; i < level.unit_index.length; i++) {
        if (typeof level.unit_index[i] === "function") {
            file += level.unit_index[i].toString();
        } else {
            file += JSON.stringify(level.unit_index[i]);
        }
        if (i !== level.sprite_index.length - 1) file += ",";
    }
    file += "]; ";
    
    // Prints the sprite list
    file += "this.sprite_index = [";
    for (var i = 0; i < level.sprite_index.length; i++) {
        file += JSON.stringify(level.sprite_index[i]);
        if (i !== level.sprite_index.length - 1) file += ",";
    }
    file += "]; ";
    
    // Prints level.data slices
    file += "this.data = [\n";
    for (var i = 0; i < level.data.length; i++) {
        file += JSON.stringify(level.data[i]);
        if (i !== level.data.length - 1) file += ",";
    }
    file += "]";
    
    return file + "}";
}