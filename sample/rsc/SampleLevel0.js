/** 
 * Sample level
 */
var JoResLevel = function () {
    this.h = 25;
    this.w = 24;
    this.tileSize = 24;
    this.terrain_sprite = "terrain.png";
    this.resources = ["terrain.png", "bg.png", "enemy.png", "hud.png", "rpgsoldier.png", "warrior.png"];
    this.unit_index = [
        {type: "player",  image: "warrior.png"},
        {type: "soldier", image: "enemy.png"},
        {type: "soldier", image: "rpgsoldier.png"}
    ];
    this.sprite_index = [
        {sprite: {x: 0, y: 0, w:  0, h:  0}, AABB: {x: 0, y: 0, w:  0, h:  0}}, // air
        {sprite: {x: 0, y: 0, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // grass
        {sprite: {x: 1, y: 0, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // stone
        {sprite: {x: 0, y: 1, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // dirt
        {sprite: {x: 1, y: 1, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // blank dirt
        
        {sprite: {x: 2, y: 0, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // big dirt top left
        {sprite: {x: 3, y: 0, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // big dirt top right
        {sprite: {x: 2, y: 1, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // big dirt bottom left
        {sprite: {x: 3, y: 1, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // big dirt bottom right
        
        {sprite: {x: 4, y: 0, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // big stone top left
        {sprite: {x: 5, y: 0, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // big stone top right
        {sprite: {x: 4, y: 1, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // big stone bottom left
        {sprite: {x: 5, y: 1, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // big stone bottom right
        
        {sprite: {x: 6, y: 0, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // textured stone
        {sprite: {x: 6, y: 1, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // textured dirt
        {sprite: {x: 7, y: 0, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // fish bone
        {sprite: {x: 7, y: 1, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // bones
        
        {sprite: {x: 0, y: 2, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // grass | dirt
        {sprite: {x: 1, y: 2, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // dirt | stone
        {sprite: {x: 2, y: 2, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // stone | dirt
        {sprite: {x: 3, y: 2, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // small stone in dirt
        {sprite: {x: 4, y: 2, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // small stone in dirt
        {sprite: {x: 5, y: 2, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // small stone in dirt
        {sprite: {x: 6, y: 2, w: 24, h: 24}, AABB: {x: 0, y: 0, w: 24, h: 24}}, // small stone in dirt

    ];
    
    this.unit_data = [0,1,0,0,0,0,0,2];
    
    this.data =  [ [0,0,0,0,0,0,1,3,18,18,2,19,2,2,4,4,4,4,4,4,4,4,4,4,1], [0,0,0,0,0,1,17,3,2,2,18,2,20,2,4,2,4,4,4,4,4,4,4,4,4], [0,0,0,0,0,1,3,18,2,21,5,7,2,9,11,4,4,2,4,4,4,4,4,4,4], [0,0,0,0,0,17,3,20,3,3,6,8,19,10,12,2,2,4,4,2,4,4,4,4,4], [0,0,0,0,0,0,0,0,0,17,3,18,23,2,2,4,4,9,11,4,4,4,4,4,4], [0,0,0,0,0,0,0,0,0,0,17,3,2,2,21,2,18,10,12,2,4,4,4,4,4], [0,0,0,0,0,0,0,0,0,0,1,3,5,7,2,19,2,2,18,4,2,4,4,4,4], [0,0,0,0,0,0,0,0,0,0,0,17,6,8,3,22,23,2,2,2,2,2,4,4,4], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,17,3,18,3,2,23,4,4,4,4], [0,0,0,0,0,0,0,0,0,0,0,0,0,17,0,1,23,5,7,2,4,2,4,4,4], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,6,8,2,3,4,4,4,4], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,21,5,7,4,4,4,4,4], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,18,2,6,8,2,4,4,4,4], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,17,3,2,20,3,2,4,4,4,4], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,17,22,2,2,2,2,4,4,4,4], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,17,3,18,2,19,4,4,4,4,4], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,2,19,3,4,2,4,4,4], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,3,9,11,4,4,4,4], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,6,8,18,10,12,4,4,4,4], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,21,19,4,4,4,4,4,4], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,17,2,2,3,2,4,4,4,4,4], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,22,2,4,4,4,4,4,4], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,6,8,2,19,4,4,4,4,4,4], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,18,20,4,4,4,4,4,4,4] ]; 
}