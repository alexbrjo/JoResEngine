/**
 * The havigation display for the LevelCreator
 */
function LevelCreatorNav () {
    
    var dialogs = [];
    
    this.blockBrush = function () {
        return dialogs[0].selection;
    };
    
    this.init = function (world, graphics) {
        dialogs[0] = new Dialog('block_palette');
        dialogs[0].content = BlockPalette;
        
        dialogs[1] = new Dialog('unit_palette');
        dialogs[1].content = UnitPalette;
        
        dialogs[2] = new Dialog('selection_tools');
        dialogs[2].content = function(){};
        
        
        if (document.body.clientHeight >= 600 && 
                document.body.clientWidth >= 800) { 
            dialogs[3] = new Dialog('size_alert');
        }
        
        this.initAllDialogs(world, graphics);
    };
    
    this.initAllDialogs = function (world, graphics) {
        for (var i = 0; i < dialogs.length; i++) {
            dialogs[i].init(world, graphics);
            dialogs[i].show();
        }
    };
}
