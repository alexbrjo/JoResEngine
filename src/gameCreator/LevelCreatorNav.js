/**
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
