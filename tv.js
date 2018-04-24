/***************************************************************************************************
*   Info:                                                                                          *
*                                                                                                  *
*   Tested on Philips Smart Tv (55PFS8209/12)                                                      *
*                                                                                                  *
*   TODO's:                                                                                        *
*          - Full Test                                                                             *
*          - DEBUG COPYPASTE: http://192.168.0.97:1925/5/audio/volume                              *
*          - Merge oDb.system.timestamp and oDb.system.epgsource to oDb.system                     *
*          - values for pointer                                                                    *
*   	                                                                                           *
*   INCLUDE:                                                                                       *
*   	     - tv = require( path + './tv.js' );                                                   *
*   	                                                                                           *
*   GET:                                                                                           *
*          - returnJSONObj (path)                                                                  *
*          - console.log(_this.getJSON('/5/activities/tv'));                                       *
*          - console.log(_this.returnActivitiesTv().channelList);                                  *
*                                                                                                  *
*   POST:                                                                                          *
*          - pushBufferobj (path, jObj, callback)                                                  *
*          - _this.pushBufferobjInputKeyVolumeDown();                                              *
*          - _this.pushBufferobj('/5/input/key', { "key": "VolumeDown" });                         *
*                                                                                                  *
*   JSON:                                                                                          *
*          - Collect:                                                                              *
*              _this.returnJSONObjAll());                                                          *
*          - Write to file:                                                                        *
*              _this.returnJSONObjAllToDb();                                                       *
*   	     - Read from file:                                                                     *
*              console.log(fs.readFileSync( pathprivate + "./db.json", 'UTF8'));                   *
*                                                                                                  *
*  DEPENDENCY:                                                                                     *
*          - independent (only Node.js Built-in Modules): fs, http                                 *
*   	                                                                                           *
*                                                                                                  *
***************************************************************************************************/

//  * @param  {string}   reqUrl   The required url in any form
//  * @param  {object}   options  An options object (this is optional)
//  * @param  {Function} cb       This is passed the 'res' object from your request

//var parallel = 10;
//var agent = new http.Agent({maxSockets: parallel});

const _this = this;
const EventEmitter = require('events');
const util = require('util');
//const co = require("co");

const fs = require("fs");
const http = require("http");

const cachepath = './public/cache/';
const cachedb = cachepath + './db-tv.json';
const cachefile = cachepath + './_tempdb';

var counter = 0;
var oDb = {};

const proto = 'http://';

const host = '192.168.0.97';
const port = 1925;

const testhost = 'date.jsontest.com';
const testport = 80;
const testpath = '/ip';



function ConfigGetJSON(path){
    return {
        hostname: host,
        port: port,
        path: path,
        method: 'GET',
        headers: {
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength("")
        }
    };
}



function ConfigPostJSON(path,jObj){
    return {
        host: host,
        port: port,
        path: path,
        method: 'POST',
        json: true,
        headers: {
            'Content-Type' : 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(jObj))
        }
    };
}


/*************************\
| Predefined/Cache Values |############################################################################################################################################################################
|
| Returned JSON from the paths above, save fetched value's here.
|
\*****************************************************************************************************************************************************************************************************/
/******************\
| Predefined Paths |###################################################################################################################################################################################
|
| These paths are tested, still searching for other available parths
|
\*****************************************************************************************************************************************************************************************************/
/*************************\
| Predefined/Cache Values |############################################################################################################################################################################
|
| Returned JSON from the jArrayValues above, save in this object
|
\*****************************************************************************************************************************************************************************************************/

var canDoPost = [];
var canDoGet = [];
var sArrayPaths = [];
var jArrayValues = [];

canDoPost[0]=false;  canDoGet[0]=false;  sArrayPaths[0]=undefined;                            jArrayValues[0]=undefined;                                                                           
canDoPost[1]=false;  canDoGet[1]=true;   sArrayPaths[1]='/5/activities/tv';                   jArrayValues[1]={"channelList":{"id":"alltv","version":"60"},"channel":{"name":"NPO 1 HD","preset":1,"ccid":1000147}};                                                                                     
canDoPost[2]=true;   canDoGet[2]=true;   sArrayPaths[2]='/5/ambilight/cached';                jArrayValues[2]={"layer1":{"bottom":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0}},"right":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0}},"left":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0}},"top":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0},"4":{"b":0,"g":0,"r":0},"5":{"b":0,"g":0,"r":0},"6":{"b":0,"g":0,"r":0},"7":{"b":0,"g":0,"r":0}}}};                                                                                       
canDoPost[3]=true;   canDoGet[3]=true;   sArrayPaths[3]='/5/ambilight/lounge';                jArrayValues[3]={"speed":0,"colordelta":{"brightness":0,"saturation":0,"hue":0},"color":{"brightness":0,"saturation":0,"hue":0},"mode":"Default"};                                                                                       
canDoPost[4]=false;  canDoGet[4]=true;   sArrayPaths[4]='/5/ambilight/measured';              jArrayValues[4]={"layer1":{"bottom":{"1":{"b":0,"g":0,"r":0},"0":{"b":0,"g":0,"r":0}},"right":{"3":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"0":{"b":0,"g":0,"r":0}},"left":{"3":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"0":{"b":0,"g":0,"r":0}},"top":{"3":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"0":{"b":0,"g":0,"r":0},"7":{"b":0,"g":0,"r":0},"6":{"b":0,"g":0,"r":0},"5":{"b":0,"g":0,"r":0},"4":{"b":0,"g":0,"r":0}}}};                                                                                         
canDoPost[5]=true;   canDoGet[5]=true;   sArrayPaths[5]='/5/ambilight/mode';                  jArrayValues[5]={"current":"internal"};                                                                                       
canDoPost[6]=false;  canDoGet[6]=true;   sArrayPaths[6]='/5/ambilight/processed';             jArrayValues[6]={"layer1":{"bottom":{"1":{"b":11,"g":11,"r":11},"0":{"b":11,"g":11,"r":11}},"right":{"3":{"b":11,"g":11,"r":11},"2":{"b":11,"g":11,"r":11},"1":{"b":11,"g":11,"r":11},"0":{"b":11,"g":11,"r":11}},"left":{"3":{"b":11,"g":11,"r":11},"2":{"b":11,"g":11,"r":11},"1":{"b":11,"g":11,"r":11},"0":{"b":11,"g":11,"r":11}},"top":{"3":{"b":11,"g":11,"r":11},"2":{"b":11,"g":11,"r":11},"1":{"b":11,"g":11,"r":11},"0":{"b":11,"g":11,"r":11},"7":{"b":11,"g":11,"r":11},"6":{"b":11,"g":11,"r":11},"5":{"b":11,"g":11,"r":11},"4":{"b":11,"g":11,"r":11}}}};                                                                                         
canDoPost[7]=false;  canDoGet[7]=true;   sArrayPaths[7]='/5/ambilight/topology';              jArrayValues[7]={"bottom":2,"left":4,"right":4,"top":8,"layers":"1"};                                                                                         
canDoPost[8]=false;  canDoGet[8]=true;   sArrayPaths[8]='/5/applications';                    jArrayValues[8]={"applications":[{"id":"com.google.tv.netflix.NetflixActivity-com.google.tv.netflix","order":4,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.tv.netflix/.NetflixActivity;end","component":{"packageName":"com.google.tv.netflix","className":"com.google.tv.netflix.NetflixActivity"}},"label":"Netflix"},{"id":"org.droidtv.epg.RecordingListLauncher-org.droidtv.epg","order":7,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=org.droidtv.epg/.RecordingListLauncher;end","component":{"packageName":"org.droidtv.epg","className":"org.droidtv.epg.RecordingListLauncher"}},"label":"Opnames"},{"id":"org.droidtv.epg.EpgLauncher-org.droidtv.epg","order":6,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=org.droidtv.epg/.EpgLauncher;end","component":{"packageName":"org.droidtv.epg","className":"org.droidtv.epg.EpgLauncher"}},"label":"TV-gids"},{"id":"org.droidtv.skype.moduleskypeActivity-org.droidtv.skype","order":11,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=org.droidtv.skype/.moduleskypeActivity;end","component":{"packageName":"org.droidtv.skype","className":"org.droidtv.skype.moduleskypeActivity"}},"label":"Skype"},{"id":"org.droidtv.eum.EUMLauncher-org.droidtv.eum","order":10,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=org.droidtv.eum/.EUMLauncher;end","component":{"packageName":"org.droidtv.eum","className":"org.droidtv.eum.EUMLauncher"}},"label":"Help"},{"id":"com.google.android.apps.chrome.Main-com.chrome.tv.stable","order":3,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.chrome.tv.stable/com.google.android.apps.chrome.Main;end","component":{"packageName":"com.chrome.tv.stable","className":"com.google.android.apps.chrome.Main"}},"label":"Chrome"},{"id":"org.droidtv.demome.DemoMeOptionsActivity-org.droidtv.demome","order":9,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=org.droidtv.demome/.DemoMeOptionsActivity;end","component":{"packageName":"org.droidtv.demome","className":"org.droidtv.demome.DemoMeOptionsActivity"}},"label":"Demo"},{"id":"com.android.providers.downloads.ui.DownloadList-com.android.providers.downloads.ui","order":14,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.android.providers.downloads.ui/.DownloadList;end","component":{"packageName":"com.android.providers.downloads.ui","className":"com.android.providers.downloads.ui.DownloadList"}},"label":"Downloads"},{"id":"com.google.tv.mediabrowser.newui.MainActivity-com.google.tv.mediabrowser","order":12,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.tv.mediabrowser/.newui.MainActivity;end","component":{"packageName":"com.google.tv.mediabrowser","className":"com.google.tv.mediabrowser.newui.MainActivity"}},"label":"Foto's"},{"id":"com.google.tv.quicksearchbox.SearchActivity-com.google.tv.quicksearchbox","order":14,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.tv.quicksearchbox/.SearchActivity;end","component":{"packageName":"com.google.tv.quicksearchbox","className":"com.google.tv.quicksearchbox.SearchActivity"}},"label":"Zoeken"},{"id":"com.google.tv.player.PlayerActivity-com.google.tv.player","order":16,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.tv.player/.PlayerActivity;end","component":{"packageName":"com.google.tv.player","className":"com.google.tv.player.PlayerActivity"}},"label":"Live tv"},{"id":"com.android.music.activitymanagement.TopLevelActivity-com.google.android.music","order":8,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.android.music/com.android.music.activitymanagement.TopLevelActivity;end","component":{"packageName":"com.google.android.music","className":"com.android.music.activitymanagement.TopLevelActivity"}},"label":"Play Music"},{"id":"com.android.vending.AssetBrowserActivity-com.android.vending","order":2,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.android.vending/.AssetBrowserActivity;end","component":{"packageName":"com.android.vending","className":"com.android.vending.AssetBrowserActivity"}},"label":"Play Store"},{"id":"com.googlecode.eyesfree.setorientation.SetOrientationActivity-com.googlecode.eyesfree.setorientation","order":6,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.googlecode.eyesfree.setorientation/.SetOrientationActivity;end","component":{"packageName":"com.googlecode.eyesfree.setorientation","className":"com.googlecode.eyesfree.setorientation.SetOrientationActivity"}},"label":"Set Orientation"},{"id":"lysesoft.andsmb.SplashActivity-lysesoft.andsmb","order":6,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=lysesoft.andsmb/.SplashActivity;end","component":{"packageName":"lysesoft.andsmb","className":"lysesoft.andsmb.SplashActivity"}},"label":"AndSMB"},{"id":"com.google.android.youtube.videos.EntryPoint-com.google.android.videos","order":10,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.android.videos/com.google.android.youtube.videos.EntryPoint;end","component":{"packageName":"com.google.android.videos","className":"com.google.android.youtube.videos.EntryPoint"}},"label":"Play Films"},{"id":"com.roysolberg.android.developertools.ui.activity.MainActivity-com.roysolberg.android.developertools","order":9,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.roysolberg.android.developertools/.ui.activity.MainActivity;end","component":{"packageName":"com.roysolberg.android.developertools","className":"com.roysolberg.android.developertools.ui.activity.MainActivity"}},"label":"Developer Tools"},{"id":"com.google.android.apps.youtube.tv.activity.TvGuideActivity-com.google.android.youtube.googletv","order":8,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.android.youtube.googletv/com.google.android.apps.youtube.tv.activity.TvGuideActivity;end","component":{"packageName":"com.google.android.youtube.googletv","className":"com.google.android.apps.youtube.tv.activity.TvGuideActivity"}},"label":"YouTube"},{"id":"com.synology.DSdownload.activities.SplashActivity-com.synology.DSdownload","order":3,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.synology.DSdownload/.activities.SplashActivity;end","component":{"packageName":"com.synology.DSdownload","className":"com.synology.DSdownload.activities.SplashActivity"}},"label":"DS get"},{"id":"com.synology.DSaudio.SplashActivity-com.synology.DSaudio","order":4,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.synology.DSaudio/.SplashActivity;end","component":{"packageName":"com.synology.DSaudio","className":"com.synology.DSaudio.SplashActivity"}},"label":"DS audio"},{"id":"org.droidtv.settings.setupmenu.SetupMenuActivity-org.droidtv.settings","order":8,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=org.droidtv.settings/.setupmenu.SetupMenuActivity;end","component":{"packageName":"org.droidtv.settings","className":"org.droidtv.settings.setupmenu.SetupMenuActivity"}},"label":"Configuratie"},{"id":"org.droidtv.settings.common.VoiceSearchAlert-org.droidtv.settings","order":4,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=org.droidtv.settings/.common.VoiceSearchAlert;end","component":{"packageName":"org.droidtv.settings","className":"org.droidtv.settings.common.VoiceSearchAlert"}},"label":"Voice Search"},{"id":"com.teamviewer.quicksupport.ui.QSActivity-com.teamviewer.quicksupport.market","order":16,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.teamviewer.quicksupport.market/com.teamviewer.quicksupport.ui.QSActivity;end","component":{"packageName":"com.teamviewer.quicksupport.market","className":"com.teamviewer.quicksupport.ui.QSActivity"}},"label":"QuickSupport"},{"id":"com.google.android.apps.docs.app.NewMainProxyActivity-com.google.android.apps.docs","order":6,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.android.apps.docs/.app.NewMainProxyActivity;end","component":{"packageName":"com.google.android.apps.docs","className":"com.google.android.apps.docs.app.NewMainProxyActivity"}},"label":"Google Drive"},{"id":"com.synology.dsvideo.SplashActivity-com.synology.dsvideo","order":5,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.synology.dsvideo/.SplashActivity;end","component":{"packageName":"com.synology.dsvideo","className":"com.synology.dsvideo.SplashActivity"}},"label":"DS video"},{"id":"de.renewahl.all4hue.activities.ActivityStartup-de.renewahl.all4hue","order":7,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=de.renewahl.all4hue/.activities.ActivityStartup;end","component":{"packageName":"de.renewahl.all4hue","className":"de.renewahl.all4hue.activities.ActivityStartup"}},"label":"all 4 hue"},{"id":"com.synology.DSfile.Splash-com.synology.DSfile","order":5,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.synology.DSfile/.Splash;end","component":{"packageName":"com.synology.DSfile","className":"com.synology.DSfile.Splash"}},"label":"DS file"},{"id":"com.google.android.gms.app.settings.GoogleSettingsActivity-com.google.android.gms","order":12,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.android.gms/.app.settings.GoogleSettingsActivity;end","component":{"packageName":"com.google.android.gms","className":"com.google.android.gms.app.settings.GoogleSettingsActivity"}},"label":"Google Instellingen"}],"version":8126};                                                                                 
canDoPost[9]=true;   canDoGet[9]=true;   sArrayPaths[9]='/5/audio/volume';                    jArrayValues[9]={"min":0,"current":19,"muted":false,"max":60};                                                                                   
canDoPost[10]=false; canDoGet[10]=true;  sArrayPaths[10]='/5/channeldb/tv';                  jArrayValues[10]={"favoriteLists":[],"channelLists":[{"id":"alltv","version":"60"}]};                                                                                   
canDoPost[11]=false; canDoGet[11]=true;  sArrayPaths[11]='/5/context';                       jArrayValues[11]={"data":"NA","level2":"Playstate","level3":"NA","level1":"WatchExtension"};                                                                               
canDoPost[12]=true;  canDoGet[12]=false; sArrayPaths[12]='/5/input/key';                     jArrayValues[12]={ "key": "Standby" };                                                                                   
canDoPost[13]=true;  canDoGet[13]=false; sArrayPaths[13]='/5/input/pointer';                 jArrayValues[13]={ "???": "???" };                                                                                       
canDoPost[14]=false; canDoGet[14]=true;  sArrayPaths[14]='/5/network/devices';               jArrayValues[14]=[{"wake-on-lan":"Disabled","type":"Wifi","id":"wifi0","mac":"30:10:B3:B0:85:65"},{"wake-on-lan":"Enabled","id":"eth0","mac":"1C:5A:6B:7D:80:77","type":"Ethernet","ip":"192.168.0.97"}];                                                                                       
canDoPost[15]=true;  canDoGet[15]=true;  sArrayPaths[15]='/5/powerstate';                    jArrayValues[15]={"powerstate":"On"};                                                                                     
canDoPost[16]=false; canDoGet[16]=true;  sArrayPaths[16]='/5/system';                        jArrayValues[16]={"serialnumber_encrypted":"REFLdnv9gJ0gYiTRQNhLhqPMg1PKCmmFnLP1dBxyto8=\n","nettvversion":"","name":"wlan tv","model_encrypted":"MJFQN6geXDOkNZckkoGiGAgBtfy2dy7GTQ2KLXDb2jY=\n","menulanguage":"Dutch","softwareversion_encrypted":"RJD3T\/+xj12AVwSce3ajLD4edK8B0u6Nl1ihtScwABI=\n","deviceid_encrypted":"Ss9acNv+yoJo9zuFWkYO0ZEma6KIqcKgJYObOOGCMIU=\n","country":"Netherlands"};                                                                               
canDoPost[17]=false; canDoGet[17]=true;  sArrayPaths[17]='/5/system/country';                jArrayValues[17]={"country":"Netherlands"};                                                                                       
canDoPost[18]=false; canDoGet[18]=true;  sArrayPaths[18]='/5/system/deviceid_encrypted';     jArrayValues[18]={"serialnumber_encrypted":"нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу"};                                                                                                   
canDoPost[19]=false; canDoGet[19]=true;  sArrayPaths[19]='/5/system/epgsource';              jArrayValues[19]={"epgsource":"broadcast"};                                                                                       
canDoPost[20]=false; canDoGet[20]=true;  sArrayPaths[20]='/5/system/menulanguage';           jArrayValues[20]={"menulanguage":"Dutch"};                                                                                           
canDoPost[21]=false; canDoGet[21]=true;  sArrayPaths[21]='/5/system/model_encrypted';        jArrayValues[21]={"model_encrypted":"нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу"};                                                                                               
canDoPost[22]=false; canDoGet[22]=true;  sArrayPaths[22]='/5/system/name';                   jArrayValues[22]={"name":"wlan tv"};                                                                                   
canDoPost[23]=false; canDoGet[23]=true;  sArrayPaths[23]='/5/system/serialnumber_encrypted'; jArrayValues[23]={"serialnumber_encrypted":"нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу"};                                                                                                       
canDoPost[24]=false; canDoGet[24]=true;  sArrayPaths[24]='/5/system/timestamp';              jArrayValues[24]={"timestamp":"13842"};                                                                                       



function PathsGetPosbyPath (path){
    for (var i = 1; i < sArrayPaths.length; i++) {
        if (sArrayPaths[i] === path){
            return i;
        }
    }
};      //PathsGetPosbyPath('/5/audio/volume');



function PathsGetValueOfPos (pos){
    return sArrayPaths[pos];
};      //PathsGetValueOfPos(1);



function SdbSetValueToPos (val,pos){
    jArrayValues[pos] = val;
}       //SdbSetValueToPos ({"powerstate":"On"},15)



function SdbGetValueFromPos (pos){
    return jArrayValues[pos] = pos;
}       //SdbGetValueFromPos(24)



exports.OdbSyncVarToOdb = function(){

console.log("Function: OdbSyncVarToOdb started");
oDb.activities = {};                                 ; 
oDb.activities.tv                  = jArrayValues[1];
oDb.ambilight = {};                                  ;                            
oDb.ambilight.cached               = jArrayValues[2];                          
oDb.ambilight.lounge               = jArrayValues[3];                          
oDb.ambilight.measured             = jArrayValues[4];                            
oDb.ambilight.mode                 = jArrayValues[5];                        
oDb.ambilight.processed            = jArrayValues[6];                            
oDb.ambilight.topology             = jArrayValues[7];                            
oDb.applications                   = jArrayValues[8];                      
oDb.audio = {};                                      ;              
oDb.audio.volume                   = jArrayValues[9];
oDb.channeldb = {};                                  ;              
oDb.channeldb.tv                   = jArrayValues[10];                      
//oDb.context                                        ;    
oDb.context                        = jArrayValues[11];                
oDb.input     = {}                                   ; 
oDb.input.key                      = jArrayValues[12];                  
oDb.input.pointer                  = jArrayValues[13];                      
oDb.network = {};                                    ;            
oDb.network.devices                = jArrayValues[14];                        
oDb.powerstate                     = jArrayValues[15];                    
oDb.system                         = jArrayValues[16];                
oDb.system.country                 = jArrayValues[17];                        
oDb.system.deviceid_encrypted      = jArrayValues[18];                                  
//oDb.system.epgsource                               ;              
oDb.epgsource                      = jArrayValues[19];                          
oDb.system.menulanguage            = jArrayValues[20];                            
oDb.system.model_encrypted         = jArrayValues[21];                                
oDb.system.name                    = jArrayValues[22];                    
oDb.system.serialnumber_encrypted  = jArrayValues[23];                                      
//oDb.system.timestamp                               ;                  
oDb.timestamp                      = jArrayValues[24];                          
//fs.writeFileSync( "./db-_thisnew.json", JSON.stringify(oDb) , 'utf-8');
};



/***************\
| POST Function |###############################################################################################################################################################################
|
| Added own post function to make this module independent, this function will return an object.
|
\***********************************************************************************************************************************************************************************************/
exports.pushBufferobj = function(path, jObj){

  // Set up the request
  var post_req = http.request(ConfigPostJSON(path,jObj), function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(JSON.stringify(jObj));
  post_req.end();
}



/***************************\
| PreDefined POST Functions |####################################################################################################################################################################
|
| Some predefined functions
|
\***********************************************************************************************************************************************************************************************/
exports.pushBufferobjAmbilightCached = function (){               _this.pushBufferobj(sArrayPaths[2] ,  jArrayValues[2]            )};                
exports.pushBufferobjAmbiLightLounge = function (){               _this.pushBufferobj(sArrayPaths[3] ,  jArrayValues[3]            )};                
exports.pushBufferobjAmbiLightMode = function (){                 _this.pushBufferobj(sArrayPaths[5] ,  jArrayValues[5]            )};                
exports.pushBufferobjAudioVolume = function (){                   _this.pushBufferobj(sArrayPaths[9] ,  jArrayValues[9]            )};                
exports.pushBufferobjInputPointer = function (){                  _this.pushBufferobj(sArrayPaths[11], jArrayValues[11]            )};                
exports.pushBufferobjInputKeyStandby = function (){               _this.pushBufferobj(sArrayPaths[12],{ "key": "Standby" }         )};                       
exports.pushBufferobjInputKeyBack = function (){                  _this.pushBufferobj(sArrayPaths[12],{ "key": "Back" }            )};                    
exports.pushBufferobjInputKeyFind = function (){                  _this.pushBufferobj(sArrayPaths[12],{ "key": "Find" }            )};                    
exports.pushBufferobjInputKeyRedColour = function (){             _this.pushBufferobj(sArrayPaths[12],{ "key": "RedColour" }       )};                         
exports.pushBufferobjInputKeyGreenColour = function (){           _this.pushBufferobj(sArrayPaths[12],{ "key": "GreenColour" }     )};                           
exports.pushBufferobjInputKeyYellowColour = function (){          _this.pushBufferobj(sArrayPaths[12],{ "key": "YellowColour" }    )};                            
exports.pushBufferobjInputKeyBlueColour = function (){            _this.pushBufferobj(sArrayPaths[12],{ "key": "BlueColour" }      )};                          
exports.pushBufferobjInputKeyHome = function (){                  _this.pushBufferobj(sArrayPaths[12],{ "key": "Home" }            )};                    
exports.pushBufferobjInputKeyVolumeUp = function (){              _this.pushBufferobj(sArrayPaths[12],{ "key": "VolumeUp" }        )};                        
exports.pushBufferobjInputKeyVolumeDown = function (){            _this.pushBufferobj(sArrayPaths[12],{ "key": "VolumeDown" }      )};                          
exports.pushBufferobjInputKeyMute = function (){                  _this.pushBufferobj(sArrayPaths[12],{ "key": "Mute"  }           )};                     
exports.pushBufferobjInputKeyOptions = function (){               _this.pushBufferobj(sArrayPaths[12],{ "key": "Options" }         )};                       
exports.pushBufferobjInputKeyDot = function (){                   _this.pushBufferobj(sArrayPaths[12],{ "key": "Dot"    }          )};                      
exports.pushBufferobjInputKeyDigit0 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit0" }          )};                      
exports.pushBufferobjInputKeyDigit1 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit1" }          )};                      
exports.pushBufferobjInputKeyDigit2 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit2" }          )};                      
exports.pushBufferobjInputKeyDigit3 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit3" }          )};                      
exports.pushBufferobjInputKeyDigit4 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit4" }          )};                      
exports.pushBufferobjInputKeyDigit5 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit5" }          )};                      
exports.pushBufferobjInputKeyDigit6 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit6" }          )};                      
exports.pushBufferobjInputKeyDigit7 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit7" }          )};                      
exports.pushBufferobjInputKeyDigit8 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit8" }          )};                      
exports.pushBufferobjInputKeyDigit9 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit9" }          )};                      
exports.pushBufferobjInputKeyInfo = function (){                  _this.pushBufferobj(sArrayPaths[12],{ "key": "Info" }            )};                    
exports.pushBufferobjInputKeyCursorUp = function (){              _this.pushBufferobj(sArrayPaths[12],{ "key": "CursorUp" }        )};                        
exports.pushBufferobjInputKeyCursorDown = function (){            _this.pushBufferobj(sArrayPaths[12],{ "key": "CursorDown" }      )};                          
exports.pushBufferobjInputKeyCursorLeft = function (){            _this.pushBufferobj(sArrayPaths[12],{ "key": "CursorLeft" }      )};                          
exports.pushBufferobjInputKeyCursorRight = function (){           _this.pushBufferobj(sArrayPaths[12],{ "key": "CursorRight" }     )};                           
exports.pushBufferobjInputKeyConfirm = function (){               _this.pushBufferobj(sArrayPaths[12],{ "key": "Confirm" }         )};                       
exports.pushBufferobjInputKeyNext = function (){                  _this.pushBufferobj(sArrayPaths[12],{ "key": "Next" }            )};                    
exports.pushBufferobjInputKeyPrevious = function (){              _this.pushBufferobj(sArrayPaths[12],{ "key": "Previous" }        )};                        
exports.pushBufferobjInputKeyAdjust = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Adjust" }          )};                      
exports.pushBufferobjInputKeyWatchTV = function (){               _this.pushBufferobj(sArrayPaths[12],{ "key": "WatchTV" }         )};                       
exports.pushBufferobjInputKeyViewmode = function (){              _this.pushBufferobj(sArrayPaths[12],{ "key": "Viewmode" }        )};                        
exports.pushBufferobjInputKeyTeletext = function (){              _this.pushBufferobj(sArrayPaths[12],{ "key": "Teletext" }        )};                        
exports.pushBufferobjInputKeySubtitle = function (){              _this.pushBufferobj(sArrayPaths[12],{ "key": "Subtitle" }        )};                        
exports.pushBufferobjInputKeyChannelStepUp = function (){         _this.pushBufferobj(sArrayPaths[12],{ "key": "ChannelStepUp" }   )};                             
exports.pushBufferobjInputKeyChannelStepDown = function (){       _this.pushBufferobj(sArrayPaths[12],{ "key": "ChannelStepDown" } )};                               
exports.pushBufferobjInputKeySource = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Source" }          )};                      
exports.pushBufferobjInputKeyAmbilightOnOff = function (){        _this.pushBufferobj(sArrayPaths[12],{ "key": "AmbilightOnOff" }  )};                              
exports.pushBufferobjInputKeyPlayPause = function (){             _this.pushBufferobj(sArrayPaths[12],{ "key": "PlayPause" }       )};                         
exports.pushBufferobjInputKeyPause = function (){                 _this.pushBufferobj(sArrayPaths[12],{ "key": "Pause" }           )};                     
exports.pushBufferobjInputKeyFastForward = function (){           _this.pushBufferobj(sArrayPaths[12],{ "key": "FastForward" }     )};                           
exports.pushBufferobjInputKeyStop = function (){                  _this.pushBufferobj(sArrayPaths[12],{ "key": "Stop" }            )};                    
exports.pushBufferobjInputKeyRewind = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Rewind" }          )};                      
exports.pushBufferobjInputKeyRecord = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Record" }          )};                      
exports.pushBufferobjInputKeyOnline = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Online" }          )};                      
exports.pushBufferobjPowerstateOn = function (){                  _this.pushBufferobj(sArrayPaths[15],{ "powerstate":"On" }        )};                        
exports.pushBufferobjPowerstateStandby = function (){             _this.pushBufferobj(sArrayPaths[15],{ "powerstate":"Standby" }   )};                             



/**************\
| GET Function |#################################################################################################################################################################################
|
| 
|
\***********************************************************************************************************************************************************************************************/
exports.GetJSONObjAsync = async function(path){

    var cache = ''; //this is where we store data, if its there

    try { var req = await http.request(ConfigGetJSON(path)); // Make the request
            return new Promise(function (resolve, reject) { // Async start
                req.on('response', function(res){ // when the response comes back
                    res.setEncoding('utf-8'); //
                    res.on('error', function(err){ return reject(err); }); // when there is an error
                    res.on('data',  function(chunk){ cache += chunk; }); // concat chunks
                    res.on('end',   function(data){ if (!cache){ return reject('No data found!'); // when the response ends resolve promise and save value
                                                } else { SdbSetValueToPos(cache,PathsGetPosbyPath(path)); return resolve(cache); }
                    });
                }).end(); // when the request ends    // req.end();  // end the request 
            }) // Async end
    } catch(error) { console.log(error); }            //.catch(err => console.error(err))
};  //GetJSONObjAsync(sArrayPaths[9]).then(output => console.log(output))



/**************************\
| PreDefined GET Functions |#####################################################################################################################################################################
|
| Some predefined get functions, this function will return an object.
|
\***********************************************************************************************************************************************************************************************/
exports.returnActivitiesTv = function (){                         return _this.returnJSONObj(sArrayPaths[1]   )};
exports.returnAmbilightCached = function (){                      return _this.returnJSONObj(sArrayPaths[2]   )};
exports.returnAmbilightLounge = function (){                      return _this.returnJSONObj(sArrayPaths[3]   )};
exports.returnAmbilightMeasured = function (){                    return _this.returnJSONObj(sArrayPaths[4]   )};
exports.returnAmbilightMode = function (){                        return _this.returnJSONObj(sArrayPaths[5]   )};
exports.returnAmbilightProcessed = function (){                   return _this.returnJSONObj(sArrayPaths[6]   )};
exports.returnAmbilightTopology = function (){                    return _this.returnJSONObj(sArrayPaths[7]   )};
exports.returnApplications = function (){                         return _this.returnJSONObj(sArrayPaths[8]   )};
exports.returnAudioVolume = function (){                          return _this.returnJSONObj(sArrayPaths[9]   )};
exports.returnChanneldbTv = function (){                          return _this.returnJSONObj(sArrayPaths[10]  )};
exports.returnContext = function (){                              return _this.returnJSONObj(sArrayPaths[11]  )};
exports.returnNetworkDevices = function (){                       return _this.returnJSONObj(sArrayPaths[14]  )};
exports.returnPowerstate = function (){                           return _this.returnJSONObj(sArrayPaths[15]  )};
exports.returnSystem = function (){                               return _this.returnJSONObj(sArrayPaths[16]  )};
exports.returnSystemCountry = function (){                        return _this.returnJSONObj(sArrayPaths[17]  )};
exports.returnSystemDeviceIdEncrypted = function (){              return _this.returnJSONObj(sArrayPaths[18]  )};
exports.returnSystemEpgsource = function (){                      return _this.returnJSONObj(sArrayPaths[19]  )};
exports.returnSystemMenulanguage = function (){                   return _this.returnJSONObj(sArrayPaths[20]  )};
exports.returnSystemModelEncrypted = function (){                 return _this.returnJSONObj(sArrayPaths[21]  )};
exports.returnSystemName = function (){                           return _this.returnJSONObj(sArrayPaths[22]  )};
exports.returnSystemSerialnumberEncrypted = function (){          return _this.returnJSONObj(sArrayPaths[23]  )};
exports.returnSystemTimeStamp = function (){                      return _this.returnJSONObj(sArrayPaths[24]  )};



/****************************\
| PreDefined GETALL Function |###############################################################################################################################################################################
|
| Returns an JSON object with all available values included
|
\***********************************************************************************************************************************************************************************************************/

exports.returnJSONObjAll = function(){

    //AmbiLight
    _this.GetJSONObjAsync( sArrayPaths[2])            //.then(output => console.log(output))
    _this.GetJSONObjAsync( sArrayPaths[3])            //.then(output => console.log(output))
    _this.GetJSONObjAsync( sArrayPaths[4])            //.then(output => console.log(output))
    _this.GetJSONObjAsync( sArrayPaths[5])            //.then(output => console.log(output))
    _this.GetJSONObjAsync( sArrayPaths[6])            //.then(output => console.log(output))
    
    //volume
    _this.GetJSONObjAsync( sArrayPaths[9])            //.then(output => console.log(output))
    //context
    _this.GetJSONObjAsync(sArrayPaths[11])            //.then(output => console.log(output))

    //Powerstate
    _this.GetJSONObjAsync(sArrayPaths[15])            //.then(output => console.log(output))
    
    //Static system information
    if (counter == 0 ){
        _this.GetJSONObjAsync( sArrayPaths[1])        //.then(output => console.log(output))
        _this.GetJSONObjAsync( sArrayPaths[7])        //.then(output => console.log(output))
        _this.GetJSONObjAsync( sArrayPaths[8])        //.then(output => console.log(output))
        _this.GetJSONObjAsync(sArrayPaths[10])        //.then(output => console.log(output))
        _this.GetJSONObjAsync(sArrayPaths[14])        //.then(output => console.log(output))
        _this.GetJSONObjAsync(sArrayPaths[16])        //.then(output => console.log(output))
        _this.GetJSONObjAsync(sArrayPaths[17])        //.then(output => console.log(output))
        _this.GetJSONObjAsync(sArrayPaths[18])        //.then(output => console.log(output))
        _this.GetJSONObjAsync(sArrayPaths[19])        //.then(output => console.log(output))
        _this.GetJSONObjAsync(sArrayPaths[20])        //.then(output => console.log(output))
        _this.GetJSONObjAsync(sArrayPaths[21])        //.then(output => console.log(output))
        _this.GetJSONObjAsync(sArrayPaths[22])        //.then(output => console.log(output))
        _this.GetJSONObjAsync(sArrayPaths[23])        //.then(output => console.log(output))
    };

    //timestamp
    _this.GetJSONObjAsync(sArrayPaths[24]) //.then(output => console.log(output));
}




/****************************\
| PreDefined GETALL Function |###############################################################################################################################################################################
|
| Returns an JSON db file with all available values included
|
\***********************************************************************************************************************************************************************************************************/
exports.returnJSONObjAllToDb = function(){
  //fs.writeFileSync( pathprivate + "./db-_this.json", JSON.stringify(_this.returnJSONObjAll()) );
  fs.writeFileSync( "./db-_this.json", JSON.stringify(oDb) , 'utf-8');
};





setInterval(function(){ 
    console.log(counter++);
    console.log("db: ");
    console.log(oDb.timestamp);
    console.log("arr: ");
    console.log(jArrayValues[24]);

    _this.returnJSONObjAll();         //Set all captured variables to value array
    _this.OdbSyncVarToOdb();          //Sets all value's from value array to object

    if ((counter % 25) == 0){
        _this.returnJSONObjAllToDb();     //writes all
    }


}, 2000)










    //_this.returnJSONObjAllToDb();
//, obj.join(',') , 'utf-8');

//const EventEmitter = require('events');
//class MyEmitter extends EventEmitter {}
//
//const myEmitter = new MyEmitter();
//
////Event Do
//myEmitter.on('event', () => {
//  console.log('an event occurred!');
//});
//
////Event Call
//myEmitter.emit('event');