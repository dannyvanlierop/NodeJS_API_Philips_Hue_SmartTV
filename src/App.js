/**
 * @author Danny van Lierop (https://github.com/DannyVanLierop)
 * @contributors Schmitzenbergh (https://github.com/Schmitzenbergh)
 * @description Mirror hue bridge values to external source to offload bridge requests or make them available to other networks
 * @license MIT
 * @dependencies fastify, follow-redirects
 */
'use strict';
global.timeMillisEpoch = new Date().getTime();
global.TimeMillisOnline = async function TimeMillisOnline() { return new Date().getTime() - timeMillisEpoch; };
require('./resources_Hue_TV.js');