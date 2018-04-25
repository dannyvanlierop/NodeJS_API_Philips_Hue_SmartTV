/***************************************************************************************************
*   Info:                                                                                          *
*                                                                                                  *
*   Tested on Philips Smart Tv (55PFS8209/12)                                                      *
*                                                                                                  *
*   TODO's:                                                                                        *
*          - DEBUG COPYPASTE: http://192.168.0.97:1925/5/audio/volume                              *
*          - Merge oDb.system.timestamp and oDb.system.epgsource to oDb.system                     *
*          - values for pointer                                                                    *
*   	                                                                                           *
*   INCLUDE:                                                                                       *
*   	     - tv = require( path + './tv.js' );                                                   *
*   	                                                                                           *
*   GET:                                                                                           *
*          -                                                                                       *
*          -                                                                                       *
*          -                                                                                       *
*                                                                                                  *
*   POST:                                                                                          *
*          -                                                                                       *
*          -                                                                                       *
*          -                                                                                       *
*                                                                                                  *
*   JSON:                                                                                          *
*          - Collect:                                                                              *
*              _this.GetJSONObjAsyncAll());                                                        *
*          - Write to file:                                                                        *
*              _this.GetJSONObjAsyncAllToDb();                                                     *
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
////      .replace(/\n/g,'').split("\r").map(x => '\n' + x +  " = '';");
//var parallel = 10;
//var agent = new http.Agent({maxSockets: parallel});

const _this = this;
const fs = require("fs");
const http = require("http");

//const EventEmitter = require('events');
//const util = require('util');
//const co = require("co");

const cachepath = './public/cache/';
const cachedb = cachepath + './db-tv.json';
const cachefile = cachepath + './_tempdb';
var WriteJSONFile = false;

var counter = 0;
var interval = 100;     // > 150
const proto = 'http://';

var timestarted = 0;
var time0 = 0;
var time1 = 0;

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
|
\*****************************************************************************************************************************************************************************************************/
//Predefine oDb
var oDb = {}; oDb.activities = {}; oDb.ambilight = {}; oDb.audio = {}; oDb.channeldb = {}; oDb.input = {}; oDb.network = {}; oDb.system = {};
//oDb.system.epgsource; //oDb.system.timestamp; //fs.writeFileSync( "./db-_thisnew.json", JSON.stringify(oDb) , 'utf-8');

//Paths listening                                         //Automatic update             // cycles between updates         //Able to POST request   //Able to GET request                                                               
var sArrayPaths=[];                                       var updateAfterInit=[];        var countBeforeUpdate=[];         var canDoPost=[];        var canDoGet=[];                                
                                                                                                                                                              
    sArrayPaths[0] = void 0;                              updateAfterInit[0]  = false;   countBeforeUpdate[0]  = void 0;   canDoPost[0]  = false;   canDoGet[0]  = false;                                                           
    sArrayPaths[1] ='/5/activities/tv';                   updateAfterInit[1]  = false;   countBeforeUpdate[1]  = void 0;   canDoPost[1]  = false;   canDoGet[1]  = true ;                                                           
    sArrayPaths[2] ='/5/ambilight/cached';                updateAfterInit[2]  = true ;   countBeforeUpdate[2]  = 100;      canDoPost[2]  = true ;   canDoGet[2]  = true ;                                                           
    sArrayPaths[3] ='/5/ambilight/lounge';                updateAfterInit[3]  = true ;   countBeforeUpdate[3]  = 50;       canDoPost[3]  = true ;   canDoGet[3]  = true ;                                                           
    sArrayPaths[4] ='/5/ambilight/measured';              updateAfterInit[4]  = true ;   countBeforeUpdate[4]  = 50;       canDoPost[4]  = false;   canDoGet[4]  = true ;                                                           
    sArrayPaths[5] ='/5/ambilight/mode';                  updateAfterInit[5]  = true ;   countBeforeUpdate[5]  = 10;       canDoPost[5]  = true ;   canDoGet[5]  = true ;                                                           
    sArrayPaths[6] ='/5/ambilight/processed';             updateAfterInit[6]  = true ;   countBeforeUpdate[6]  = 1;        canDoPost[6]  = false;   canDoGet[6]  = true ;                                                           
    sArrayPaths[7] ='/5/ambilight/topology';              updateAfterInit[7]  = false;   countBeforeUpdate[7]  = void 0;   canDoPost[7]  = false;   canDoGet[7]  = true ;                                                           
    sArrayPaths[8] ='/5/applications';                    updateAfterInit[8]  = false;   countBeforeUpdate[8]  = void 0;   canDoPost[8]  = false;   canDoGet[8]  = true ;                                                           
    sArrayPaths[9] ='/5/audio/volume';                    updateAfterInit[9]  = true ;   countBeforeUpdate[9]  = 4;        canDoPost[9]  = true ;   canDoGet[9]  = true ; 
    sArrayPaths[10]='/5/channeldb/tv';                    updateAfterInit[10] = false;   countBeforeUpdate[10] = void 0;   canDoPost[10] = false;   canDoGet[10] = true ; 
    sArrayPaths[11]='/5/context';                         updateAfterInit[11] = true ;   countBeforeUpdate[11] = 8;        canDoPost[11] = false;   canDoGet[11] = true ; 
    sArrayPaths[12]='/5/input/key';                       updateAfterInit[12] = false;   countBeforeUpdate[12] = void 0;   canDoPost[12] = true ;   canDoGet[12] = false; 
    sArrayPaths[13]='/5/input/pointer';                   updateAfterInit[13] = false;   countBeforeUpdate[13] = void 0;   canDoPost[13] = true ;   canDoGet[13] = false; 
    sArrayPaths[14]='/5/network/devices';                 updateAfterInit[14] = false;   countBeforeUpdate[14] = void 0;   canDoPost[14] = false;   canDoGet[14] = true ; 
    sArrayPaths[15]='/5/powerstate';                      updateAfterInit[15] = true ;   countBeforeUpdate[15] = 4;        canDoPost[15] = true ;   canDoGet[15] = true ; 
    sArrayPaths[16]='/5/system';                          updateAfterInit[16] = false;   countBeforeUpdate[16] = void 0;   canDoPost[16] = false;   canDoGet[16] = true ; 
    sArrayPaths[17]='/5/system/country';                  updateAfterInit[17] = false;   countBeforeUpdate[17] = void 0;   canDoPost[17] = false;   canDoGet[17] = true ; 
    sArrayPaths[18]='/5/system/deviceid_encrypted';       updateAfterInit[18] = false;   countBeforeUpdate[18] = void 0;   canDoPost[18] = false;   canDoGet[18] = true ; 
    sArrayPaths[19]='/5/system/epgsource';                updateAfterInit[19] = true ;   countBeforeUpdate[19] =50;        canDoPost[19] = false;   canDoGet[19] = true ; 
    sArrayPaths[20]='/5/system/menulanguage';             updateAfterInit[20] = false;   countBeforeUpdate[20] = void 0;   canDoPost[20] = false;   canDoGet[20] = true ; 
    sArrayPaths[21]='/5/system/model_encrypted';          updateAfterInit[21] = false;   countBeforeUpdate[21] = void 0;   canDoPost[21] = false;   canDoGet[21] = true ; 
    sArrayPaths[22]='/5/system/name';                     updateAfterInit[22] = false;   countBeforeUpdate[22] = void 0;   canDoPost[22] = false;   canDoGet[22] = true ; 
    sArrayPaths[23]='/5/system/serialnumber_encrypted';   updateAfterInit[23] = false;   countBeforeUpdate[23] = void 0;   canDoPost[23] = false;   canDoGet[23] = true ; 
    sArrayPaths[24]='/5/system/timestamp';                updateAfterInit[24] = true ;   countBeforeUpdate[24] = 1;        canDoPost[24] = false;   canDoGet[24] = true ; 


    //Set defaults at init to the empty objects
var oPropertyName = [''];
    oPropertyName[0]  = oDb;                                                                           
    oPropertyName[1]  = {"channelList":{"id":"alltv","version":"60"},"channel":{"name":"NPO 1 HD","preset":1,"ccid":1000147}};                                                                                     
    oPropertyName[2]  = {"layer1":{"bottom":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0}},"right":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0}},"left":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0}},"top":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0},"4":{"b":0,"g":0,"r":0},"5":{"b":0,"g":0,"r":0},"6":{"b":0,"g":0,"r":0},"7":{"b":0,"g":0,"r":0}}}};                                                                                       
    oPropertyName[3]  = {"speed":0,"colordelta":{"brightness":0,"saturation":0,"hue":0},"color":{"brightness":0,"saturation":0,"hue":0},"mode":"Default"};                                                                                       
    oPropertyName[4]  = {"layer1":{"bottom":{"1":{"b":0,"g":0,"r":0},"0":{"b":0,"g":0,"r":0}},"right":{"3":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"0":{"b":0,"g":0,"r":0}},"left":{"3":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"0":{"b":0,"g":0,"r":0}},"top":{"3":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"0":{"b":0,"g":0,"r":0},"7":{"b":0,"g":0,"r":0},"6":{"b":0,"g":0,"r":0},"5":{"b":0,"g":0,"r":0},"4":{"b":0,"g":0,"r":0}}}};                                                                                         
    oPropertyName[5]  = {"current":"internal"};                                                                                       
    oPropertyName[6]  = {"layer1":{"bottom":{"1":{"b":11,"g":11,"r":11},"0":{"b":11,"g":11,"r":11}},"right":{"3":{"b":11,"g":11,"r":11},"2":{"b":11,"g":11,"r":11},"1":{"b":11,"g":11,"r":11},"0":{"b":11,"g":11,"r":11}},"left":{"3":{"b":11,"g":11,"r":11},"2":{"b":11,"g":11,"r":11},"1":{"b":11,"g":11,"r":11},"0":{"b":11,"g":11,"r":11}},"top":{"3":{"b":11,"g":11,"r":11},"2":{"b":11,"g":11,"r":11},"1":{"b":11,"g":11,"r":11},"0":{"b":11,"g":11,"r":11},"7":{"b":11,"g":11,"r":11},"6":{"b":11,"g":11,"r":11},"5":{"b":11,"g":11,"r":11},"4":{"b":11,"g":11,"r":11}}}};                                                                                         
    oPropertyName[7]  = {"bottom":2,"left":4,"right":4,"top":8,"layers":"1"};                                                                                         
    oPropertyName[8]  = {"applications":[{"id":"com.google.tv.netflix.NetflixActivity-com.google.tv.netflix","order":4,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.tv.netflix/.NetflixActivity;end","component":{"packageName":"com.google.tv.netflix","className":"com.google.tv.netflix.NetflixActivity"}},"label":"Netflix"},{"id":"org.droidtv.epg.RecordingListLauncher-org.droidtv.epg","order":7,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=org.droidtv.epg/.RecordingListLauncher;end","component":{"packageName":"org.droidtv.epg","className":"org.droidtv.epg.RecordingListLauncher"}},"label":"Opnames"},{"id":"org.droidtv.epg.EpgLauncher-org.droidtv.epg","order":6,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=org.droidtv.epg/.EpgLauncher;end","component":{"packageName":"org.droidtv.epg","className":"org.droidtv.epg.EpgLauncher"}},"label":"TV-gids"},{"id":"org.droidtv.skype.moduleskypeActivity-org.droidtv.skype","order":11,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=org.droidtv.skype/.moduleskypeActivity;end","component":{"packageName":"org.droidtv.skype","className":"org.droidtv.skype.moduleskypeActivity"}},"label":"Skype"},{"id":"org.droidtv.eum.EUMLauncher-org.droidtv.eum","order":10,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=org.droidtv.eum/.EUMLauncher;end","component":{"packageName":"org.droidtv.eum","className":"org.droidtv.eum.EUMLauncher"}},"label":"Help"},{"id":"com.google.android.apps.chrome.Main-com.chrome.tv.stable","order":3,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.chrome.tv.stable/com.google.android.apps.chrome.Main;end","component":{"packageName":"com.chrome.tv.stable","className":"com.google.android.apps.chrome.Main"}},"label":"Chrome"},{"id":"org.droidtv.demome.DemoMeOptionsActivity-org.droidtv.demome","order":9,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=org.droidtv.demome/.DemoMeOptionsActivity;end","component":{"packageName":"org.droidtv.demome","className":"org.droidtv.demome.DemoMeOptionsActivity"}},"label":"Demo"},{"id":"com.android.providers.downloads.ui.DownloadList-com.android.providers.downloads.ui","order":14,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.android.providers.downloads.ui/.DownloadList;end","component":{"packageName":"com.android.providers.downloads.ui","className":"com.android.providers.downloads.ui.DownloadList"}},"label":"Downloads"},{"id":"com.google.tv.mediabrowser.newui.MainActivity-com.google.tv.mediabrowser","order":12,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.tv.mediabrowser/.newui.MainActivity;end","component":{"packageName":"com.google.tv.mediabrowser","className":"com.google.tv.mediabrowser.newui.MainActivity"}},"label":"Foto's"},{"id":"com.google.tv.quicksearchbox.SearchActivity-com.google.tv.quicksearchbox","order":14,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.tv.quicksearchbox/.SearchActivity;end","component":{"packageName":"com.google.tv.quicksearchbox","className":"com.google.tv.quicksearchbox.SearchActivity"}},"label":"Zoeken"},{"id":"com.google.tv.player.PlayerActivity-com.google.tv.player","order":16,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.tv.player/.PlayerActivity;end","component":{"packageName":"com.google.tv.player","className":"com.google.tv.player.PlayerActivity"}},"label":"Live tv"},{"id":"com.android.music.activitymanagement.TopLevelActivity-com.google.android.music","order":8,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.android.music/com.android.music.activitymanagement.TopLevelActivity;end","component":{"packageName":"com.google.android.music","className":"com.android.music.activitymanagement.TopLevelActivity"}},"label":"Play Music"},{"id":"com.android.vending.AssetBrowserActivity-com.android.vending","order":2,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.android.vending/.AssetBrowserActivity;end","component":{"packageName":"com.android.vending","className":"com.android.vending.AssetBrowserActivity"}},"label":"Play Store"},{"id":"com.googlecode.eyesfree.setorientation.SetOrientationActivity-com.googlecode.eyesfree.setorientation","order":6,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.googlecode.eyesfree.setorientation/.SetOrientationActivity;end","component":{"packageName":"com.googlecode.eyesfree.setorientation","className":"com.googlecode.eyesfree.setorientation.SetOrientationActivity"}},"label":"Set Orientation"},{"id":"lysesoft.andsmb.SplashActivity-lysesoft.andsmb","order":6,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=lysesoft.andsmb/.SplashActivity;end","component":{"packageName":"lysesoft.andsmb","className":"lysesoft.andsmb.SplashActivity"}},"label":"AndSMB"},{"id":"com.google.android.youtube.videos.EntryPoint-com.google.android.videos","order":10,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.android.videos/com.google.android.youtube.videos.EntryPoint;end","component":{"packageName":"com.google.android.videos","className":"com.google.android.youtube.videos.EntryPoint"}},"label":"Play Films"},{"id":"com.roysolberg.android.developertools.ui.activity.MainActivity-com.roysolberg.android.developertools","order":9,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.roysolberg.android.developertools/.ui.activity.MainActivity;end","component":{"packageName":"com.roysolberg.android.developertools","className":"com.roysolberg.android.developertools.ui.activity.MainActivity"}},"label":"Developer Tools"},{"id":"com.google.android.apps.youtube.tv.activity.TvGuideActivity-com.google.android.youtube.googletv","order":8,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.android.youtube.googletv/com.google.android.apps.youtube.tv.activity.TvGuideActivity;end","component":{"packageName":"com.google.android.youtube.googletv","className":"com.google.android.apps.youtube.tv.activity.TvGuideActivity"}},"label":"YouTube"},{"id":"com.synology.DSdownload.activities.SplashActivity-com.synology.DSdownload","order":3,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.synology.DSdownload/.activities.SplashActivity;end","component":{"packageName":"com.synology.DSdownload","className":"com.synology.DSdownload.activities.SplashActivity"}},"label":"DS get"},{"id":"com.synology.DSaudio.SplashActivity-com.synology.DSaudio","order":4,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.synology.DSaudio/.SplashActivity;end","component":{"packageName":"com.synology.DSaudio","className":"com.synology.DSaudio.SplashActivity"}},"label":"DS audio"},{"id":"org.droidtv.settings.setupmenu.SetupMenuActivity-org.droidtv.settings","order":8,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=org.droidtv.settings/.setupmenu.SetupMenuActivity;end","component":{"packageName":"org.droidtv.settings","className":"org.droidtv.settings.setupmenu.SetupMenuActivity"}},"label":"Configuratie"},{"id":"org.droidtv.settings.common.VoiceSearchAlert-org.droidtv.settings","order":4,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=org.droidtv.settings/.common.VoiceSearchAlert;end","component":{"packageName":"org.droidtv.settings","className":"org.droidtv.settings.common.VoiceSearchAlert"}},"label":"Voice Search"},{"id":"com.teamviewer.quicksupport.ui.QSActivity-com.teamviewer.quicksupport.market","order":16,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.teamviewer.quicksupport.market/com.teamviewer.quicksupport.ui.QSActivity;end","component":{"packageName":"com.teamviewer.quicksupport.market","className":"com.teamviewer.quicksupport.ui.QSActivity"}},"label":"QuickSupport"},{"id":"com.google.android.apps.docs.app.NewMainProxyActivity-com.google.android.apps.docs","order":6,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.android.apps.docs/.app.NewMainProxyActivity;end","component":{"packageName":"com.google.android.apps.docs","className":"com.google.android.apps.docs.app.NewMainProxyActivity"}},"label":"Google Drive"},{"id":"com.synology.dsvideo.SplashActivity-com.synology.dsvideo","order":5,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.synology.dsvideo/.SplashActivity;end","component":{"packageName":"com.synology.dsvideo","className":"com.synology.dsvideo.SplashActivity"}},"label":"DS video"},{"id":"de.renewahl.all4hue.activities.ActivityStartup-de.renewahl.all4hue","order":7,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=de.renewahl.all4hue/.activities.ActivityStartup;end","component":{"packageName":"de.renewahl.all4hue","className":"de.renewahl.all4hue.activities.ActivityStartup"}},"label":"all 4 hue"},{"id":"com.synology.DSfile.Splash-com.synology.DSfile","order":5,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.synology.DSfile/.Splash;end","component":{"packageName":"com.synology.DSfile","className":"com.synology.DSfile.Splash"}},"label":"DS file"},{"id":"com.google.android.gms.app.settings.GoogleSettingsActivity-com.google.android.gms","order":12,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.android.gms/.app.settings.GoogleSettingsActivity;end","component":{"packageName":"com.google.android.gms","className":"com.google.android.gms.app.settings.GoogleSettingsActivity"}},"label":"Google Instellingen"}],"version":8126};                                                                                 
    oPropertyName[9]  = {"min":0,"current":19,"muted":false,"max":60};
    oPropertyName[10] = {"favoriteLists":[],"channelLists":[{"id":"alltv","version":"60"}]};
    oPropertyName[11] = {"data":"NA","level2":"Playstate","level3":"NA","level1":"WatchExtension"};                                                                               
    oPropertyName[12] = { "key": "Standby" };                                                                                   
    oPropertyName[13] = { "???": "???" };                                                                                       
    oPropertyName[14] = [{"wake-on-lan":"Disabled","type":"Wifi","id":"wifi0","mac":"30:10:B3:B0:85:65"},{"wake-on-lan":"Enabled","id":"eth0","mac":"1C:5A:6B:7D:80:77","type":"Ethernet","ip":"192.168.0.97"}];                                                                                       
    oPropertyName[15] = {"powerstate":"On"};                                                                                     
    oPropertyName[16] = {"serialnumber_encrypted":"REFLdnv9gJ0gYiTRQNhLhqPMg1PKCmmFnLP1dBxyto8=\n","nettvversion":"","name":"wlan tv","model_encrypted":"MJFQN6geXDOkNZckkoGiGAgBtfy2dy7GTQ2KLXDb2jY=\n","menulanguage":"Dutch","softwareversion_encrypted":"RJD3T\/+xj12AVwSce3ajLD4edK8B0u6Nl1ihtScwABI=\n","deviceid_encrypted":"Ss9acNv+yoJo9zuFWkYO0ZEma6KIqcKgJYObOOGCMIU=\n","country":"Netherlands"};                                                                               
    oPropertyName[17] = {"country":"Netherlands"};                                                                                       
    oPropertyName[18] = {"serialnumber_encrypted":"нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу"};                                                                                                   
    oPropertyName[19] = {"epgsource":"broadcast"};                                                                                       
    oPropertyName[20] = {"menulanguage":"Dutch"};                                                                                           
    oPropertyName[21] = {"model_encrypted":"нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу"};                                                                                               
    oPropertyName[22] = {"name":"wlan tv"};                                                                                   
    oPropertyName[23] = {"serialnumber_encrypted":"нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу"};                                                                                                       
    oPropertyName[24] = {"timestamp":"13842"};                                                                                       

        //Paths
    function PathsGetPosbyPath (path){
        for (var i = 1; i < sArrayPaths.length; i++) {
            if (sArrayPaths[i] === path){
                return i;
            }
        }
    };      //PathsGetPosbyPath('/5/audio/volume');

    function PathsGetValuebyPos (pos){
        if ( pos < sArrayPaths.length) {
              return sArrayPaths[pos];
        } else{
            console.log("ERROR PathsGetPathbyPos: Path is not in range")
        }
    };      //PathsGetValueByPos(1);



/***************************\
| Set/Get value to/from Odb |##########################################################################################################################################################################
|
|   Get: from JSON                        OdbValue( oPropertyPosition , 'get' , oPropertyValue )                      
|   Set: to Odb                           OdbValue( oPropertyPosition , 'set' , oPropertyValue )                  
|   Set: to Odb (without error check)     OdbValue( oPropertyPosition ,  null , oPropertyValue )                                          
|
\*****************************************************************************************************************************************************************************************************/
function OdbValue(pos,method,value){
        
    //Check method
    if (method == null) {
        //return console.log("Error: wrong method " + method );  //Use later to set the default
    } else if (pos > oPropertyName.length){
        return console.log("Error: item " + pos + " not available" );
    } else if (method == 'set' && !canDoPost[pos]){
        return console.log("Error: set is disabled for item " + pos );
    } else if (method == 'get' && !canDoGet[pos]){
        return console.log("Error: get is disabled for item " + pos );
    }

    //Get value
    if (method == 'get'){ return oPropertyName[pos] };

    //Set value
    if(method == 'set'){ return oPropertyName[pos] = JSON.parse(value) };

    //Set value without checks
    if(method == null){ return oPropertyName[pos] = JSON.parse(value) };

}
function OdbValueReset(pos,value){ OdbValue(pos,null,value) };
function OdbValueSet(pos,value){ OdbValue(pos,'set',value) };
function OdbValueGet(pos){ OdbValue(pos,'get') };



/***************\
| POST Function |###############################################################################################################################################################################
|
| Added own post function to make this module independent, this function will return an object.
|
\***********************************************************************************************************************************************************************************************/
//SmartTvValuePost
exports.SmartTvValuePost = function(path, jObj){

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



/**************\
| GET Function |#######################################################################################################################################################################################
|
| 
|
\*****************************************************************************************************************************************************************************************************/
exports.GetJSONObjAsync = async function(path, pos){

    if ( (!pos && !path) || (pos && path) ){ 
            return console.log("Error: path: " + path + "  or  position: " + pos + "param error"); 

        } else if (!path){ path = 
            PathsGetValuebyPos(pos); 

        } else if (!pos){  
            pos = PathsGetPosbyPath(path);
    };

    var cache = ''; //this is where we store data, if its there   

    process.stdout.write(" > " + pos);

    try { var req = await http.request(ConfigGetJSON(path)); // Make the request
            // Async start
            return new Promise(function (resolve, reject) { 
                req.on('response', function(res){ // when the response comes back
                    res.setEncoding('utf-8'); //
                    res.on('error', function(err){ return reject(err); }); // when there is an error
                    res.on('data',  function(chunk){ cache += chunk; }); // concat chunks
                    res.on('end',   function(data){ if (!cache){ 
                                                        return reject('No data found!'); // when the response ends resolve promise and save value
                                                    } else { 
                                                        OdbValue(pos,null,cache);
                                                        return resolve(cache); 
                                                        }                                      
                    });
                })
                req.end();  // end the request or .end();
            })
            // Async end
    } catch(error) { 
        console.log(error); }            //.catch(err => console.error(err))
    finally {
    if (cache){
        return cache;
        //Returning from a finally block
//If the finally block returns a value, this value becomes the return value of the entire try-catch-finally production, regardless of any return statements in the try and catch blocks. This includes exceptions thrown inside of the catch block:
    }
    //return;
  }
};  //GetJSONObjAsync(sArrayPaths[9]).then(output => console.log(output))



/***************************\
| PreDefined POST Functions |####################################################################################################################################################################
|
| Some predefined functions
|
\***********************************************************************************************************************************************************************************************/
exports.SmartTvValuePostAmbilightCached = function (){               _this.SmartTvValuePost(sArrayPaths[2] ,  jArrayValues[2]            )};                
exports.SmartTvValuePostAmbiLightLounge = function (){               _this.SmartTvValuePost(sArrayPaths[3] ,  jArrayValues[3]            )};                
exports.SmartTvValuePostAmbiLightMode = function (){                 _this.SmartTvValuePost(sArrayPaths[5] ,  jArrayValues[5]            )};                
exports.SmartTvValuePostAudioVolume = function (){                   _this.SmartTvValuePost(sArrayPaths[9] ,  jArrayValues[9]            )};                
exports.SmartTvValuePostInputPointer = function (){                  _this.SmartTvValuePost(sArrayPaths[11], jArrayValues[11]            )};                
exports.SmartTvValuePostInputKeyStandby = function (){               _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Standby" }         )};                       
exports.SmartTvValuePostInputKeyBack = function (){                  _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Back" }            )};                    
exports.SmartTvValuePostInputKeyFind = function (){                  _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Find" }            )};                    
exports.SmartTvValuePostInputKeyRedColour = function (){             _this.SmartTvValuePost(sArrayPaths[12],{ "key": "RedColour" }       )};                         
exports.SmartTvValuePostInputKeyGreenColour = function (){           _this.SmartTvValuePost(sArrayPaths[12],{ "key": "GreenColour" }     )};                           
exports.SmartTvValuePostInputKeyYellowColour = function (){          _this.SmartTvValuePost(sArrayPaths[12],{ "key": "YellowColour" }    )};                            
exports.SmartTvValuePostInputKeyBlueColour = function (){            _this.SmartTvValuePost(sArrayPaths[12],{ "key": "BlueColour" }      )};                          
exports.SmartTvValuePostInputKeyHome = function (){                  _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Home" }            )};                    
exports.SmartTvValuePostInputKeyVolumeUp = function (){              _this.SmartTvValuePost(sArrayPaths[12],{ "key": "VolumeUp" }        )};                        
exports.SmartTvValuePostInputKeyVolumeDown = function (){            _this.SmartTvValuePost(sArrayPaths[12],{ "key": "VolumeDown" }      )};                          
exports.SmartTvValuePostInputKeyMute = function (){                  _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Mute"  }           )};                     
exports.SmartTvValuePostInputKeyOptions = function (){               _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Options" }         )};                       
exports.SmartTvValuePostInputKeyDot = function (){                   _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Dot"    }          )};                      
exports.SmartTvValuePostInputKeyDigit0 = function (){                _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit0" }          )};                      
exports.SmartTvValuePostInputKeyDigit1 = function (){                _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit1" }          )};                      
exports.SmartTvValuePostInputKeyDigit2 = function (){                _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit2" }          )};                      
exports.SmartTvValuePostInputKeyDigit3 = function (){                _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit3" }          )};                      
exports.SmartTvValuePostInputKeyDigit4 = function (){                _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit4" }          )};                      
exports.SmartTvValuePostInputKeyDigit5 = function (){                _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit5" }          )};                      
exports.SmartTvValuePostInputKeyDigit6 = function (){                _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit6" }          )};                      
exports.SmartTvValuePostInputKeyDigit7 = function (){                _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit7" }          )};                      
exports.SmartTvValuePostInputKeyDigit8 = function (){                _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit8" }          )};                      
exports.SmartTvValuePostInputKeyDigit9 = function (){                _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit9" }          )};                      
exports.SmartTvValuePostInputKeyInfo = function (){                  _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Info" }            )};                    
exports.SmartTvValuePostInputKeyCursorUp = function (){              _this.SmartTvValuePost(sArrayPaths[12],{ "key": "CursorUp" }        )};                        
exports.SmartTvValuePostInputKeyCursorDown = function (){            _this.SmartTvValuePost(sArrayPaths[12],{ "key": "CursorDown" }      )};                          
exports.SmartTvValuePostInputKeyCursorLeft = function (){            _this.SmartTvValuePost(sArrayPaths[12],{ "key": "CursorLeft" }      )};                          
exports.SmartTvValuePostInputKeyCursorRight = function (){           _this.SmartTvValuePost(sArrayPaths[12],{ "key": "CursorRight" }     )};                           
exports.SmartTvValuePostInputKeyConfirm = function (){               _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Confirm" }         )};                       
exports.SmartTvValuePostInputKeyNext = function (){                  _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Next" }            )};                    
exports.SmartTvValuePostInputKeyPrevious = function (){              _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Previous" }        )};                        
exports.SmartTvValuePostInputKeyAdjust = function (){                _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Adjust" }          )};                      
exports.SmartTvValuePostInputKeyWatchTV = function (){               _this.SmartTvValuePost(sArrayPaths[12],{ "key": "WatchTV" }         )};                       
exports.SmartTvValuePostInputKeyViewmode = function (){              _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Viewmode" }        )};                        
exports.SmartTvValuePostInputKeyTeletext = function (){              _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Teletext" }        )};                        
exports.SmartTvValuePostInputKeySubtitle = function (){              _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Subtitle" }        )};                        
exports.SmartTvValuePostInputKeyChannelStepUp = function (){         _this.SmartTvValuePost(sArrayPaths[12],{ "key": "ChannelStepUp" }   )};                             
exports.SmartTvValuePostInputKeyChannelStepDown = function (){       _this.SmartTvValuePost(sArrayPaths[12],{ "key": "ChannelStepDown" } )};                               
exports.SmartTvValuePostInputKeySource = function (){                _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Source" }          )};                      
exports.SmartTvValuePostInputKeyAmbilightOnOff = function (){        _this.SmartTvValuePost(sArrayPaths[12],{ "key": "AmbilightOnOff" }  )};                              
exports.SmartTvValuePostInputKeyPlayPause = function (){             _this.SmartTvValuePost(sArrayPaths[12],{ "key": "PlayPause" }       )};                         
exports.SmartTvValuePostInputKeyPause = function (){                 _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Pause" }           )};                     
exports.SmartTvValuePostInputKeyFastForward = function (){           _this.SmartTvValuePost(sArrayPaths[12],{ "key": "FastForward" }     )};                           
exports.SmartTvValuePostInputKeyStop = function (){                  _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Stop" }            )};                    
exports.SmartTvValuePostInputKeyRewind = function (){                _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Rewind" }          )};                      
exports.SmartTvValuePostInputKeyRecord = function (){                _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Record" }          )};                      
exports.SmartTvValuePostInputKeyOnline = function (){                _this.SmartTvValuePost(sArrayPaths[12],{ "key": "Online" }          )};                      
exports.SmartTvValuePostPowerstateOn = function (){                  _this.SmartTvValuePost(sArrayPaths[15],{ "powerstate":"On" }        )};                        
exports.SmartTvValuePostPowerstateStandby = function (){             _this.SmartTvValuePost(sArrayPaths[15],{ "powerstate":"Standby" }   )};    



/**************************\
| PreDefined GET Functions |###########################################################################################################################################################################
|
| Some predefined get functions, this function will return an object.
\*****************************************************************************************************************************************************************************************************/
exports.SmartTvValueGetActivitiesTv = function (){                return _this.oPropertyName[1];};
exports.SmartTvValueGetAmbilightCached = function (){             return _this.oPropertyName[2];};
exports.SmartTvValueGetAmbilightLounge = function (){             return _this.oPropertyName[3];};
exports.SmartTvValueGetAmbilightMeasured = function (){           return _this.oPropertyName[4];};
exports.SmartTvValueGetAmbilightMode = function (){               return _this.oPropertyName[5];};
exports.SmartTvValueGetAmbilightProcessed = function (){          return _this.oPropertyName[6];};
exports.SmartTvValueGetAmbilightTopology = function (){           return _this.oPropertyName[7];};
exports.SmartTvValueGetApplications = function (){                return _this.oPropertyName[8];};
exports.SmartTvValueGetAudioVolume = function (){                 return _this.oPropertyName[9];};
exports.SmartTvValueGetChanneldbTv = function (){                 return _this.oPropertyName[10];};
exports.SmartTvValueGetContext = function (){                     return _this.oPropertyName[11];};
exports.SmartTvValueGetNetworkDevices = function (){              return _this.oPropertyName[14];};
exports.SmartTvValueGetPowerstate = function (){                  return _this.oPropertyName[15];};
exports.SmartTvValueGetSystem = function (){                      return _this.oPropertyName[16];};
exports.SmartTvValueGetSystemCountry = function (){               return _this.oPropertyName[17];};
exports.SmartTvValueGetSystemDeviceIdEncrypted = function (){     return _this.oPropertyName[18];};
exports.SmartTvValueGetSystemEpgsource = function (){             return _this.oPropertyName[19];};
exports.SmartTvValueGetSystemMenulanguage = function (){          return _this.oPropertyName[20];};
exports.SmartTvValueGetSystemModelEncrypted = function (){        return _this.oPropertyName[21];};
exports.SmartTvValueGetSystemName = function (){                  return _this.oPropertyName[22];};
exports.SmartTvValueGetSystemSerialnumberEncrypted = function (){ return _this.oPropertyName[23];};
exports.SmartTvValueGetSystemTimeStamp = function (){             return _this.oPropertyName[24];};



/****************************\
| PreDefined GETALL Function |#########################################################################################################################################################################
|
| Returns an JSON object with all available values included
|
\*****************************************************************************************************************************************************************************************************/
exports.GetJSONObjAsyncAll = function(){
// Fetch new value from device when the check of updateAfterInit[X] and ( counter % countBeforeUpdate[X] ) is true,
    process.stdout.write(" Get value");
    for (var i = 1; i < sArrayPaths.length; i++) {
        if (updateAfterInit[i] && counter != undefined && ( counter % countBeforeUpdate[i] ) == 0) {
            _this.GetJSONObjAsync(PathsGetValuebyPos(i));
        }

        if(i == sArrayPaths.length - 1){
            process.stdout.write("   Done..." + (new Date().getTime() - timestarted) + "ms.")
        }
    }
}



/****************************\
| PreDefined GETALL Function |#########################################################################################################################################################################
|
| Returns an JSON db file with all available values included
\*****************************************************************************************************************************************************************************************************/
exports.GetJSONObjAsyncAllToDb = function(){
  //fs.writeFileSync( pathprivate + "./db-_this.json", JSON.stringify(_this.GetJSONObjAsyncAll()) );
  fs.writeFileSync( "./db-_this.json", JSON.stringify(oDb) , 'utf-8');
};



/*****************\
| Runs the script |####################################################################################################################################################################################
|
| Returns an JSON object with all available values included
|
\*****************************************************************************************************************************************************************************************************/
function isEven(n) {
   return n % 2 == 0;
}

function isOdd(n) {
   return Math.abs(n % 2) == 1;
}

setInterval(function(){ 
    timestarted = new Date().getTime();
    if (isEven(counter)){time0 = timestarted; process.stdout.write('\n' + "CycleTime:" + (time0 - time1) + "ms.");}
    if (isOdd(counter)){ time1 = timestarted; process.stdout.write('\n' + "CycleTime:" + (time1 - time0) + "ms.");}
       process.stdout.write('\n' + counter++ + ": ");

    // Fetch new value from device when the check of updateAfterInit[X] and ( counter % countBeforeUpdate[X] ) is true,
    _this.GetJSONObjAsyncAll();

    //Save all values at init and after some couter
    if ( counter == 0 || (counter % 1000) == 0 || WriteJSONFile){
        _this.GetJSONObjAsyncAllToDb();     //writes all content from Odb to file
    }
    console.log( "" + oPropertyName[6].layer1.left[0].r);
    console.log( "" + oPropertyName[6].layer1.left[0].g);
    console.log( oPropertyName[6].layer1.left[0].b);
}, interval);










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
