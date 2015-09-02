/**
 * 
 */
/*var mySound = new buzz.sound( "/sounds/myfile", {
    formats: [ "ogg", "mp3", "aac" ]
});*/
var selectSound = new buzz.sound( "audio/sfx_selection", {
	formats: [ "mp3", "wav" ]
});

var clickSound = new buzz.sound ( "audio/sfx_click", {
	formats: [ "mp3", "wav"]
});

var hitSound = new buzz.sound ( "audio/sfx_hit", {
	formats: [ "mp3", "wav"],
	volume: 20
});

var introSound = new buzz.sound ( "audio/introLoop", {
	formats: [ "wav",  "mp3"],
	preload:true,
	autoplay:true,
	loop:false,
	volume: 10
});

var mainSound = new buzz.sound ( "audio/Yarrr-TD -Day-Time-byWhirlguy", {
	formats: [ "mp3","wav"],
	preload:true,
	loop:true,
	volume: 2
});