/**
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
        converted_image.getContext("2d").drawImage(world.get(unit.imgPath),
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
