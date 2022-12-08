/**
 * @author Danny van Lierop (https:
 * @contributors Schmitzenbergh (https:
 * @description Mirror hue bridge values to external source to offload bridge requests or make them available to other networks
 * @license MIT
 * @dependencies fastify, follow-redirects
 */
module.exports = {
    ObjectGet: do_ObjectGet,
    ObjectSet: do_ObjectSet,
    SmartTV_Fetch_Update_One: do_SmartTV_Fetch_Update_One,
    SmartTV_Fetch_Update_All: do_SmartTV_Fetch_Update_All
};
var http = require('./lib_http.js');
var aItem = [];
async function doPushIntoArray(id, iPrio, bDynamic, bPOST, bGET, sPath) {
    return aItem.push({
        id: 0,
        iPrio: iPrio,
        bDyn: bDynamic,
        bPOST: bPOST,
        bGET: bGET,
        sPath: sPath
    });
};
var SmartTV = {
    Config: {
        Version: 5,
        IP: "10.0.0.104",
        Port: 1925,
        fastifyIP: '0.0.0.0',
        fastifyPort: 80,
        fastifyLogger: false,
        fastifyName: 'fastify_SmartTV',
        AutoFetch: {
            SmartTV: {
                Interval: {
                    Cur: 100,
                },
                updateCycle: 0,
                smartTVUpdateNext: 0,
            },
        },
    },
    Data: {
        activities: { tv: {} },
        ambilight: {
            cached: { "layer1": { "bottom": { "0": { "b": 0, "g": 0, "r": 0 }, "1": { "b": 0, "g": 0, "r": 0 } }, "right": { "0": { "b": 0, "g": 0, "r": 0 }, "1": { "b": 0, "g": 0, "r": 0 }, "2": { "b": 0, "g": 0, "r": 0 }, "3": { "b": 0, "g": 0, "r": 0 } }, "left": { "0": { "b": 0, "g": 0, "r": 0 }, "1": { "b": 0, "g": 0, "r": 0 }, "2": { "b": 0, "g": 0, "r": 0 }, "3": { "b": 0, "g": 0, "r": 0 } }, "top": { "0": { "b": 0, "g": 0, "r": 0 }, "1": { "b": 0, "g": 0, "r": 0 }, "2": { "b": 0, "g": 0, "r": 0 }, "3": { "b": 0, "g": 0, "r": 0 }, "4": { "b": 0, "g": 0, "r": 0 }, "5": { "b": 0, "g": 0, "r": 0 }, "6": { "b": 0, "g": 0, "r": 0 }, "7": { "b": 0, "g": 0, "r": 0 } } } },
            lounge: { "speed": 0, "colordelta": { "brightness": 0, "saturation": 0, "hue": 0 }, "color": { "brightness": 0, "saturation": 0, "hue": 0 }, "mode": "Default" },
            measured: { "layer1": { "bottom": { "1": { "b": 0, "g": 0, "r": 0 }, "0": { "b": 0, "g": 0, "r": 0 } }, "right": { "3": { "b": 0, "g": 0, "r": 0 }, "2": { "b": 0, "g": 0, "r": 0 }, "1": { "b": 0, "g": 0, "r": 0 }, "0": { "b": 0, "g": 0, "r": 0 } }, "left": { "3": { "b": 0, "g": 0, "r": 0 }, "2": { "b": 0, "g": 0, "r": 0 }, "1": { "b": 0, "g": 0, "r": 0 }, "0": { "b": 0, "g": 0, "r": 0 } }, "top": { "3": { "b": 0, "g": 0, "r": 0 }, "2": { "b": 0, "g": 0, "r": 0 }, "1": { "b": 0, "g": 0, "r": 0 }, "0": { "b": 0, "g": 0, "r": 0 }, "7": { "b": 0, "g": 0, "r": 0 }, "6": { "b": 0, "g": 0, "r": 0 }, "5": { "b": 0, "g": 0, "r": 0 }, "4": { "b": 0, "g": 0, "r": 0 } } } },
            mode: { "current": "init" },
            processed: { "layer1": { "bottom": { "1": { "b": 0, "g": 0, "r": 0 }, "0": { "b": 0, "g": 0, "r": 0 } }, "right": { "3": { "b": 0, "g": 0, "r": 0 }, "2": { "b": 0, "g": 0, "r": 0 }, "1": { "b": 0, "g": 0, "r": 0 }, "0": { "b": 0, "g": 0, "r": 0 } }, "left": { "3": { "b": 0, "g": 0, "r": 0 }, "2": { "b": 0, "g": 0, "r": 0 }, "1": { "b": 0, "g": 0, "r": 0 }, "0": { "b": 0, "g": 0, "r": 0 } }, "top": { "3": { "b": 0, "g": 0, "r": 0 }, "2": { "b": 0, "g": 0, "r": 0 }, "1": { "b": 0, "g": 0, "r": 0 }, "0": { "b": 0, "g": 0, "r": 0 }, "7": { "b": 0, "g": 0, "r": 0 }, "6": { "b": 0, "g": 0, "r": 0 }, "5": { "b": 0, "g": 0, "r": 0 }, "4": { "b": 0, "g": 0, "r": 0 } } } },
            topology: { "bottom": 2, "left": 4, "right": 4, "top": 8, "layers": "1" }
        },
        applications: { "applications": [{ "id": "", "order": 0, "intent": { "action": "", "component": { "packageName": "", "className": "" } }, "label": "" }, { "id": "", "order": 1, "intent": { "action": "", "component": { "packageName": "", "className": "" } }, "label": "" }, { "id": "", "order": 2, "intent": { "action": "", "component": { "packageName": "", "className": "" } }, "label": "" }, { "id": "", "order": 3, "intent": { "action": "", "component": { "packageName": "", "className": "" } }, "label": "" }], "version": "" },
        audio: { volume: { "min": 0, "current": 17, "muted": false, "max": 0 } },
        channeldb: { tv: { "channelList": { "id": "init", "version": "60" }, "channel": { "name": "NPO init HD", "preset": 1, "ccid": 1 } } },
        context: { "data": "", "level2": "", "level3": "", "level1": "" },
        input: {
            key: { "key": "init" }, pointer: { "???": "???" }
        },
        network: { devices: [{ "wake-on-lan": "Disabled", "type": "Wifi", "id": "wifi0", "mac": "" }, { "wake-on-lan": "Enabled", "id": "eth0", "mac": "00:00:00:00:00:00", "type": "Ethernet", "ip": "0.0.0.0" }] },
        system: {
            serialnumber_encrypted: "нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу",
            nettvversion: "init",
            country: "init",
            deviceid_encrypted: "нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу",
            epgsource: "init",
            menulanguage: "init",
            model_encrypted: "нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу",
            name: "wlan tv",
            timestamp: { "timestamp": "0" },
            softwareversion_encrypted: "нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу"
        },
        powerstate: { "powerstate": "On" }
    },
};
async function do_Object_GetOrSet(objPos, objVal) {
    switch (objPos) {
        case 0: if (objVal) SmartTV.Data = objVal; return SmartTV.Data || {};
        case 1: if (objVal) SmartTV.Data.activities.tv = objVal; return SmartTV.Data.activities.tv || {};
        case 2: if (objVal) SmartTV.Data.ambilight.cached = objVal; return SmartTV.Data.ambilight.cached || {};
        case 3: if (objVal) SmartTV.Data.ambilight.lounge = objVal; return SmartTV.Data.ambilight.lounge || {};
        case 4: if (objVal) SmartTV.Data.ambilight.measured = objVal; return SmartTV.Data.ambilight.measured || {};
        case 5: if (objVal) SmartTV.Data.ambilight.mode = objVal; return SmartTV.Data.ambilight.mode || {};
        case 6: if (objVal) SmartTV.Data.ambilight.processed = objVal; return SmartTV.Data.ambilight.processed || {};
        case 7: if (objVal) SmartTV.Data.ambilight.topology = objVal; return SmartTV.Data.ambilight.topology || {};
        case 8: if (objVal) SmartTV.Data.applications = objVal; return SmartTV.Data.applications || {};
        case 9: if (objVal) SmartTV.Data.audio.volume = objVal; return SmartTV.Data.audio.volume || {};
        case 10: if (objVal) SmartTV.Data.channeldb.tv = objVal; return SmartTV.Data.channeldb.tv || {};
        case 11: if (objVal) SmartTV.Data.context = objVal; return SmartTV.Data.context || {};
        case 12: if (objVal) SmartTV.Data.input.key = objVal; return SmartTV.Data.input.key || {};
        case 13: if (objVal) SmartTV.Data.input.pointer = objVal; return SmartTV.Data.input.pointer || {};
        case 14: if (objVal) SmartTV.Data.network.devices = objVal; return SmartTV.Data.network.devices || {};
        case 15: if (objVal) SmartTV.Data.powerstate = objVal; return SmartTV.Data.powerstate || {};
        case 16: if (objVal) SmartTV.Data.system = objVal; return SmartTV.Data.system || {};
        case 17: if (objVal) SmartTV.Data.system.country = objVal; return SmartTV.Data.system.country || {};
        case 18: if (objVal) SmartTV.Data.system.deviceid_encrypted = objVal; return SmartTV.Data.system.deviceid_encrypted || {};
        case 19: if (objVal) SmartTV.Data.epgsource = objVal; return SmartTV.Data.epgsource || {};
        case 20: if (objVal) SmartTV.Data.system.menulanguage = objVal; return SmartTV.Data.system.menulanguage || {};
        case 21: if (objVal) SmartTV.Data.system.model_encrypted = objVal; return SmartTV.Data.system.model_encrypted || {};
        case 22: if (objVal) SmartTV.Data.system.name = objVal; return SmartTV.Data.system.name || {};
        case 23: if (objVal) SmartTV.Data.system.serialnumber_encrypted = objVal; return SmartTV.Data.system.serialnumber_encrypted || {};
        case 24: if (objVal) SmartTV.Data.timestamp = objVal; return SmartTV.Data.timestamp || {};
    };
};
async function do_ObjectSet(objPos, objVal) {
    return await do_Object_GetOrSet(objPos, objVal);
};
async function do_ObjectGet(objPos) {
    return await (aItem[objPos].bGET) ? await do_Object_GetOrSet(objPos) : {};
};
async function doSmartTV_Set(tvIP, tvPath, payload) {
    return await http.httpPost(tvIP, SmartTV.Config.Port, tvPath, payload);
};
async function doSmartTV_Get(tvIP, tvPath) {
    return await http.jsonGet(tvIP, SmartTV.Config.Port, tvPath);
};
async function do_SmartTV_Fetch_Update_One(objPos) {
    process.stdout.write(`[${objPos}]`);
    return await doSmartTV_Get(SmartTV.Config.IP, aItem[objPos].sPath)
        .then(async (result) => { return await do_ObjectSet(objPos, result) });
};
var updateCycle = 1;
var smartTVUpdateNext = 0;
async function do_SmartTV_Fetch_Update_All() {
    var millisNow = await TimeMillisOnline();
    if (smartTVUpdateNext < millisNow) {
        updateCycle++;
        var millisSinceLast = millisNow - (smartTVUpdateNext - (SmartTV.Config.AutoFetch.SmartTV.Interval.Cur));
        process.stdout.write(`\n[lastSmartTV:${millisSinceLast}]`);
        smartTVUpdateNext = millisNow + (SmartTV.Config.AutoFetch.SmartTV.Interval.Cur);
        doSmartTV_Set(SmartTV.Config.IP, '/5/audio/volume', { "min": 0, "current": updateCycle % 5, "muted": false, "max": 0 });
        for (var objPos = 1; objPos < 25; objPos++)
            if (aItem[objPos].bDyn && updateCycle % aItem[objPos].iPrio == 0)
                await do_SmartTV_Fetch_Update_One(objPos);
    };
    setTimeout(async () => { return await do_SmartTV_Fetch_Update_All(); }, await TimeMillisOnline() - smartTVUpdateNext || 0);
};
(async function () {
    doPushIntoArray(0, 100, false, false, true, '/5/');
    doPushIntoArray(1, 100, false, false, true, '/5/activities/tv');
    doPushIntoArray(2, 60, true, true, true, '/5/ambilight/cached');
    doPushIntoArray(3, 75, true, true, true, '/5/ambilight/lounge');
    doPushIntoArray(4, 50, true, false, true, '/5/ambilight/measured');
    doPushIntoArray(5, 74, true, true, true, '/5/ambilight/mode');
    doPushIntoArray(6, 1, true, false, true, '/5/ambilight/processed');
    doPushIntoArray(7, 100, false, false, true, '/5/ambilight/topology');
    doPushIntoArray(8, 100, false, false, true, '/5/applications');
    doPushIntoArray(9, 75, true, true, true, '/5/audio/volume');
    doPushIntoArray(10, 100, false, false, true, '/5/channeldb/tv');
    doPushIntoArray(11, 100, 0, false, true, '/5/context');
    doPushIntoArray(12, 100, false, true, false, '/5/input/key');
    doPushIntoArray(13, 100, false, true, false, '/5/input/pointer');
    doPushIntoArray(14, 100, false, false, true, '/5/network/devices');
    doPushIntoArray(15, 75, true, true, true, '/5/powerstate');
    doPushIntoArray(16, 100, false, false, true, '/5/system');
    doPushIntoArray(17, 100, false, false, true, '/5/system/country');
    doPushIntoArray(18, 100, false, false, true, '/5/system/deviceid_encrypted');
    doPushIntoArray(19, 100, 0, false, true, '/5/system/epgsource');
    doPushIntoArray(20, 100, false, false, true, '/5/system/menulanguage');
    doPushIntoArray(21, 100, false, false, true, '/5/system/model_encrypted');
    doPushIntoArray(22, 100, false, false, true, '/5/system/name');
    doPushIntoArray(23, 100, false, false, true, '/5/system/serialnumber_encrypted');
    doPushIntoArray(24, 75, true, false, true, '/5/system/timestamp');
    require('./lib_Fastify.js')(SmartTV.Config.fastifyIP,
        SmartTV.Config.Port,
        SmartTV.Config.fastifyLogger,
        SmartTV.Config.fastifyName
    );
    async function fastifySetRoute(pos) {
        this[`${SmartTV.Config.fastifyName}`].get(aItem[pos].sPath, async function (request, reply) {
            return await do_ObjectGet(pos);
        });
    };
    for (var pos = 0; pos < 25; pos++)
        if (aItem[pos].bGET)
            await fastifySetRoute(pos);
    return await do_SmartTV_Fetch_Update_All();
})();