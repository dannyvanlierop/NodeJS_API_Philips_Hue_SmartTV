/***************************************************************************************************
*   Info:                                                                                          *
*                                                                                                  *
*   Tested on Philips Smart Tv (55PFS8209/12)                                                      *
*                                                                                                  *
*   Examples:                                                                                      *
*   GET  - getJSON('9',function(callback){ console.log(callback)})                                 *
*   POST - postJSON('12', { "key": "VolumeDown" }, function(callback){ console.log(callback) });   *
*                                                                                                  *
*   	                                                                                             *
***************************************************************************************************/       

//
//  TODO :      
//    * PERFORMANCE CHECK
//    * DEBUG COPYPASTE: http://192.168.0.97:1925/5/audio/volume
//    * PUT 'update objects'
//    * DELETE 'remove objects'
//

var request = require('request');
var sUri = 'http://192.168.0.97';
var sPort = '1925';
var sArrayPaths = [];
var arrPos = 0;

/******************\
| Predefined Paths |###############################################################################################################################################################################
\******************/

 sArrayPaths[0]=undefined;                                        //   EMPTY
 sArrayPaths[1]='/5/activities/tv';                               // GET -      // {"channelList":{"id":"alltv","version":"60"},"channel":{"name":"NPO 1 HD","preset":1,"ccid":1000147}}
 sArrayPaths[2]='/5/ambilight/cached';                            // GET - POST // {"layer1":{"bottom":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0}},"right":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0}},"left":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0}},"top":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0},"4":{"b":0,"g":0,"r":0},"5":{"b":0,"g":0,"r":0},"6":{"b":0,"g":0,"r":0},"7":{"b":0,"g":0,"r":0}}}}
 sArrayPaths[3]='/5/ambilight/lounge';                            // GET - POST // {"speed":0,"colordelta":{"brightness":0,"saturation":0,"hue":0},"color":{"brightness":0,"saturation":0,"hue":0},"mode":"Default"}
 sArrayPaths[4]='/5/ambilight/measured';                          // GET -      // {"layer1":{"bottom":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0}},"right":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0}},"left":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0}},"top":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0},"4":{"b":0,"g":0,"r":0},"5":{"b":0,"g":0,"r":0},"6":{"b":0,"g":0,"r":0},"7":{"b":0,"g":0,"r":`10}}}}
 sArrayPaths[5]='/5/ambilight/mode';                              // GET - POST // 
 sArrayPaths[6]='/5/ambilight/processed';                         // GET -      // {"layer1":{"bottom":{"0":{"b":42,"g":0,"r":254},"1":{"b":42,"g":0,"r":254}},"right":{"0":{"b":42,"g":0,"r":254},"1":{"b":42,"g":0,"r":254},"2":{"b":42,"g":0,"r":254},"3":{"b":42,"g":0,"r":254}},"left":{"0":{"b":42,"g":0,"r":254},"1":{"b":42,"g":0,"r":254},"2":{"b":42,"g":0,"r":254},"3":{"b":42,"g":0,"r":254}},"top":{"0":{"b":42,"g":0,"r":254},"1":{"b":42,"g":0,"r":254},"2":{"b":42,"g":0,"r":254},"3":{"b":42,"g":0,"r":254},"4":{"b":42,"g":0,"r":254},"5":{"b":42,"g":0,"r":254},"6":{"b":42,"g":0,"r":254},"7":{"b":42,"g":0,"r":254}}}}
 sArrayPaths[7]='/5/ambilight/topology';                          // GET -      // {"bottom":2,"left":4,"right":4,"top":8,"layers":"1"}
 sArrayPaths[8]='/5/applications';                                // GET -      // {"applications":[{"id":"com.google.tv.netflix.NetflixActivity-com.google.tv.netflix","order":4,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.tv.netflix/.NetflixActivity;end","component":{"packageName":"com.google.tv.netflix","className":"com.google.tv.netflix.NetflixActivity"}},"label":"Netflix"}],"version":8048} 
 sArrayPaths[9]='/5/audio/volume';                                // GET - POST // {"min":0,"current":20,"muted":true,"max":60}
sArrayPaths[10]='/5/channeldb/tv';                                // GET -      // {"favoriteLists":[],"channelLists":[{"id":"alltv","version":"60"}]} 
sArrayPaths[11]='/5/context';                                     // GET -      // {"data":"NA","level2":"Playstate","level3":"NA","level1":"WatchExtension"} 
sArrayPaths[12]='/5/input/key';                                   //     - POST // { "key": "VolumeUp" }       
sArrayPaths[13]='/5/input/pointer';                               //     - POST //      
sArrayPaths[14]='/5/network/devices';                             // GET -      // [{"wake-on-lan":"Disabled","type":"Wifi","id":"wifi0","mac":"30:10:B3:C0:AB:65"},{"wake-on-lan":"Enabled","id":"eth0","mac":"1B:5A:6C:7E:80:77","type":"Ethernet","ip":"192.168.0.97"}]   
sArrayPaths[15]='/5/powerstate';                                  // GET - POST // {"powerstate":"On"} or {"powerstate":"Standby"}   
sArrayPaths[16]='/5/system';                                      // GET -      // {"serialnumber_encrypted":"нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу=\n","nettvversion":"5.0.0","name":"wlan tv","model_encrypted":"нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу=\n","menulanguage":"Dutch","softwareversion_encrypted":"нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу=\n","deviceid_encrypted":"нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу=\n","country":"Netherlands"}
sArrayPaths[17]='/5/system/country';                              // GET -      // {"country":"Netherlands"}  
sArrayPaths[18]='/5/system/deviceid_encrypted';                   // GET -      // {"serialnumber_encrypted":"нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу"}  
sArrayPaths[19]='/5/system/epgsource';                            // GET -      // {"epgsource":"broadcast"}   
sArrayPaths[20]='/5/system/menulanguage';                         // GET -      // {"menulanguage":"Dutch"} 
sArrayPaths[21]='/5/system/model_encrypted';                      // GET -      // {"model_encrypted":"нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу"}  
sArrayPaths[22]='/5/system/name';                                 // GET -      // {"name":"SmartTV"}
sArrayPaths[23]='/5/system/softwareversion_encrypted';            // GET -      // {"softwareversion_encrypted":"нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу"}   
sArrayPaths[24]='/5/system/serialnumber_encrypted';               // GET -      // {"country":"нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу"}



/********************\
| GET/POST Functions |###############################################################################################################################################################################
\********************/

function getJSON(arrPos, callback){           //Example: getJSON('9',function(callback){ console.log(callback)})

    if ( arrPos < 1 ) return;
    request.get({ uri: sUri + ':' + sPort + sArrayPaths[arrPos], json: true } , 
        function(err, res) {
            if ( err || res.statusCode != 200){ 
              console.log(err);
            }
            callback(JSON.stringify(res.body));
            //callback(res.body);
        }
    );
}

function postJSON(arrPos, jObj, callback){    //  Example:   postJSON('12', { "key": "VolumeDown" }, function(callback){ console.log(callback) });
    if ( arrPos < 1 ) return;
    request.post({ url: sUri + ':' + sPort + sArrayPaths[arrPos], body: jObj, json: true } , 
        function(err, res) {
            if ( err || res.statusCode != 200){ 
              console.log(err);
            }
            //console.log( 'Modified: ' + res.request.uri.href + ' ' + res.request.body );
            callback('Modified: ' + res.request.uri.href + ' ' + res.request.body)
        }
    );
}


/**************************\
| PreDefined GET Functions |###############################################################################################################################################################################
\**************************/

exports.getVolume = function (){                         getJSON('1' ,function(callback){ console.log(callback)}) }
exports.getActivitiesTv = function (){                   getJSON('1' ,function(callback){ console.log(callback)}) }
exports.getAmbilightCached = function (){                getJSON('2' ,function(callback){ console.log(callback)}) }
exports.getAmbilightLounge = function (){                getJSON('3' ,function(callback){ console.log(callback)}) }
exports.getAmbilightMeasured = function (){              getJSON('4' ,function(callback){ console.log(callback)}) }
exports.getAmbilightMode = function (){                  getJSON('5' ,function(callback){ console.log(callback)}) }
exports.getAmbilightProcessed = function (){             getJSON('6' ,function(callback){ console.log(callback)}) }
exports.getAmbilightTopology = function (){              getJSON('7' ,function(callback){ console.log(callback)}) }
exports.getApplications = function (){                   getJSON('8' ,function(callback){ console.log(callback)}) }
exports.getAudioVolume = function (){                    getJSON('9' ,function(callback){ console.log(callback)}) }
exports.getChanneldbTv = function (){                    getJSON('10',function(callback){ console.log(callback)}) }
exports.getContext = function (){                        getJSON('11',function(callback){ console.log(callback)}) }
exports.getNetworkDevices = function (){                 getJSON('14',function(callback){ console.log(callback)}) }
exports.getPowerstate = function (){                     getJSON('15',function(callback){ console.log(callback)}) }
exports.getSystem = function (){                         getJSON('16',function(callback){ console.log(callback)}) }
exports.getSystemCountry = function (){                  getJSON('17',function(callback){ console.log(callback)}) }
exports.getSystemDeviceIdEncrypted = function (){        getJSON('18',function(callback){ console.log(callback)}) }
exports.getSystemEpgsource = function (){                getJSON('19',function(callback){ console.log(callback)}) }
exports.getSystemMenulanguage = function (){             getJSON('20',function(callback){ console.log(callback)}) }
exports.getSystemModelEncrypted = function (){           getJSON('21',function(callback){ console.log(callback)}) }
exports.getSystemName = function (){                     getJSON('22',function(callback){ console.log(callback)}) }
exports.getSystemSoftwareversionEncrypted = function (){ getJSON('23',function(callback){ console.log(callback)}) }
exports.getSystemSerialnumberEncrypted = function (){    getJSON('24',function(callback){ console.log(callback)}) }


/***************************\
| PreDefined POST Functions |###############################################################################################################################################################################
\***************************/

exports.postAmbilightCached = function (){               postJSON('2',  {"layer1":{"bottom":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0}},"right":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0}},"left":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0}},"top":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0},"4":{"b":0,"g":0,"r":0},"5":{"b":0,"g":0,"r":0},"6":{"b":0,"g":0,"r":0},"7":{"b":0,"g":0,"r":0}}}}, function(callback){ console.log(callback) }); }
exports.postAmbiLightLounge = function (){               postJSON('3',  {"speed":0,"colordelta":{"brightness":0,"saturation":0,"hue":0},"color":{"brightness":0,"saturation":0,"hue":0},"mode":"Default"}, function(callback){ console.log(callback) }); }
exports.postAmbiLightMode = function (){                 postJSON('5',  {"current":"internal"}, function(callback){ console.log(callback) }); }
exports.postAudioVolume = function (){                   postJSON('9',  {"min":0,"current":20,"muted":true,"max":60}, function(callback){ console.log(callback) }); }
exports.postInputPointer = function (){                  postJSON('11', { "?????": "?????" }, function(callback){ console.log(callback) }); }   //????
exports.postInputKeyStandby = function (){               postJSON('12', { "key": "Standby" }, function(callback){ console.log(callback) }); }
exports.postInputKeyBack = function (){                  postJSON('12', { "key": "Back" }, function(callback){ console.log(callback) }); }
exports.postInputKeyFind = function (){                  postJSON('12', { "key": "Find" }, function(callback){ console.log(callback) }); }
exports.postInputKeyRedColour = function (){             postJSON('12', { "key": "RedColour" }, function(callback){ console.log(callback) }); }
exports.postInputKeyGreenColour = function (){           postJSON('12', { "key": "GreenColour" }, function(callback){ console.log(callback) }); }
exports.postInputKeyYellowColour = function (){          postJSON('12', { "key": "YellowColour" }, function(callback){ console.log(callback) }); }
exports.postInputKeyBlueColour = function (){            postJSON('12', { "key": "BlueColour" }, function(callback){ console.log(callback) }); }
exports.postInputKeyHome = function (){                  postJSON('12', { "key": "Home" }, function(callback){ console.log(callback) }); }
exports.postInputKeyVolumeUp = function (){              postJSON('12', { "key": "VolumeUp" }, function(callback){ console.log(callback) }); }
exports.postInputKeyVolumeDown = function (){            postJSON('12', { "key": "VolumeDown" }, function(callback){ console.log(callback) }); }
exports.postInputKeyMute = function (){                  postJSON('12', { "key": "Mute" }, function(callback){ console.log(callback) }); }
exports.postInputKeyOptions = function (){               postJSON('12', { "key": "Options" }, function(callback){ console.log(callback) }); }
exports.postInputKeyDot = function (){                   postJSON('12', { "key": "Dot" }, function(callback){ console.log(callback) }); }
exports.postInputKeyDigit0 = function (){                postJSON('12', { "key": "Digit0" }, function(callback){ console.log(callback) }); }
exports.postInputKeyDigit1 = function (){                postJSON('12', { "key": "Digit1" }, function(callback){ console.log(callback) }); }
exports.postInputKeyDigit2 = function (){                postJSON('12', { "key": "Digit2" }, function(callback){ console.log(callback) }); }
exports.postInputKeyDigit3 = function (){                postJSON('12', { "key": "Digit3" }, function(callback){ console.log(callback) }); }
exports.postInputKeyDigit4 = function (){                postJSON('12', { "key": "Digit4" }, function(callback){ console.log(callback) }); }
exports.postInputKeyDigit5 = function (){                postJSON('12', { "key": "Digit5" }, function(callback){ console.log(callback) }); }
exports.postInputKeyDigit6 = function (){                postJSON('12', { "key": "Digit6" }, function(callback){ console.log(callback) }); }
exports.postInputKeyDigit7 = function (){                postJSON('12', { "key": "Digit7" }, function(callback){ console.log(callback) }); }
exports.postInputKeyDigit8 = function (){                postJSON('12', { "key": "Digit8" }, function(callback){ console.log(callback) }); }
exports.postInputKeyDigit9 = function (){                postJSON('12', { "key": "Digit9" }, function(callback){ console.log(callback) }); }
exports.postInputKeyInfo = function (){                  postJSON('12', { "key": "Info" }, function(callback){ console.log(callback) }); }
exports.postInputKeyCursorUp = function (){              postJSON('12', { "key": "CursorUp" }, function(callback){ console.log(callback) }); }
exports.postInputKeyCursorDown = function (){            postJSON('12', { "key": "CursorDown" }, function(callback){ console.log(callback) }); }
exports.postInputKeyCursorLeft = function (){            postJSON('12', { "key": "CursorLeft" }, function(callback){ console.log(callback) }); }
exports.postInputKeyCursorRight = function (){           postJSON('12', { "key": "CursorRight" }, function(callback){ console.log(callback) }); }
exports.postInputKeyConfirm = function (){               postJSON('12', { "key": "Confirm" }, function(callback){ console.log(callback) }); }
exports.postInputKeyNext = function (){                  postJSON('12', { "key": "Next" }, function(callback){ console.log(callback) }); }
exports.postInputKeyPrevious = function (){              postJSON('12', { "key": "Previous" }, function(callback){ console.log(callback) }); }
exports.postInputKeyAdjust = function (){                postJSON('12', { "key": "Adjust" }, function(callback){ console.log(callback) }); }
exports.postInputKeyWatchTV = function (){               postJSON('12', { "key": "WatchTV" }, function(callback){ console.log(callback) }); }
exports.postInputKeyViewmode = function (){              postJSON('12', { "key": "Viewmode" }, function(callback){ console.log(callback) }); }
exports.postInputKeyTeletext = function (){              postJSON('12', { "key": "Teletext" }, function(callback){ console.log(callback) }); }
exports.postInputKeySubtitle = function (){              postJSON('12', { "key": "Subtitle" }, function(callback){ console.log(callback) }); }
exports.postInputKeyChannelStepUp = function (){         postJSON('12', { "key": "ChannelStepUp" }, function(callback){ console.log(callback) }); }
exports.postInputKeyChannelStepDown = function (){       postJSON('12', { "key": "ChannelStepDown" }, function(callback){ console.log(callback) }); }
exports.postInputKeySource = function (){                postJSON('12', { "key": "Source" }, function(callback){ console.log(callback) }); }
exports.postInputKeyAmbilightOnOff = function (){        postJSON('12', { "key": "AmbilightOnOff" }, function(callback){ console.log(callback) }); }
exports.postInputKeyPlayPause = function (){             postJSON('12', { "key": "PlayPause" }, function(callback){ console.log(callback) }); }
exports.postInputKeyPause = function (){                 postJSON('12', { "key": "Pause" }, function(callback){ console.log(callback) }); }
exports.postInputKeyFastForward = function (){           postJSON('12', { "key": "FastForward" }, function(callback){ console.log(callback) }); }
exports.postInputKeyStop = function (){                  postJSON('12', { "key": "Stop" }, function(callback){ console.log(callback) }); }
exports.postInputKeyRewind = function (){                postJSON('12', { "key": "Rewind" }, function(callback){ console.log(callback) }); }
exports.postInputKeyRecord = function (){                postJSON('12', { "key": "Record" }, function(callback){ console.log(callback) }); }
exports.postInputKeyOnline = function (){                postJSON('12', { "key": "Online" }, function(callback){ console.log(callback) }); }
exports.postPowerstateOn = function (){                  postJSON('15', { "powerstate":"On" }, function(callback){ console.log(callback) }); }
exports.postPowerstateStandby = function (){             postJSON('15', { "powerstate":"Standby" }, function(callback){ console.log(callback) }); }
