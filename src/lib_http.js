/**
 * @author Danny van Lierop (https://github.com/DannyVanLierop)
 * @contributors Schmitzenbergh (https://github.com/Schmitzenbergh)
 * @description Mirror hue bridge values to external source to offload bridge requests or make them available to other networks
 * @license MIT
 * @dependencies fastify, follow-redirects
 */
const { http, https } = require('follow-redirects').wrap({
    http: require('follow-redirects/http'),
    https: require('follow-redirects/https'),
});
module.exports = {
    httpPost: doPost,
    httpGet: doGet,
    jsonGet: doJsonGet
};
async function doGet(host, port, path) {
    return await _doRequest(
        {
            "host": host,
            "port": port,
            "path": path
        });
};
async function doJsonGet(host, port, path) {
    return await _doJsonRequest(
        {
            "host": host,
            "port": port,
            "path": path
        });
};
async function doPost(host, port, path, payload) {
    return await _doJsonRequest(
        {
            "host": host,
            "port": port,
            "path": path,
            "method": "POST",
            "payload": payload
        });
};
async function _doJsonRequest(parameters) {
    return await _doRequest(parameters);
};
async function _buildOptions(parameters) {
    var options = {};
    for (var i in parameters.payload) {
        if ((parameters.payload).hasOwnProperty(i)) {
            if (i == 'name' || i == 'id') {
                delete parameters.payload[i];
            };
        };
    };
    if (parameters.host)
        options.host = parameters.host;
    else
        throw new Error("A host name must be provided in the parameters");
    options.method = parameters.method || "GET";
    if (parameters.path)
        options.path = parameters.path;
    if (parameters.payload)
        options.body = JSON.stringify(parameters.payload);
    options.headers = {
        accept: '*/*',
        connection: 'keep-alive'
    };
    options.maxRedirects = 3;
    if (parameters.port)
        options.port = parameters.port;
    return options;
};
async function _doRequest(parameters) {
    parameters = await _buildOptions(parameters);
    var content = '';
    var promise_request = new Promise(async function (resolve, reject) {
        var request = http.request(parameters, async function (response) {
            if (response.statusCode != 200) return _parseJsonResult(content);
            response.setEncoding('utf8');
            response.on("data", async function (chunk) {
                content += chunk;
            });
            response.on('end', async function () {
                resolve(await _parseJsonResult(content));
            });
        });
        request.on('error', async function (e) {
            reject(e)
        });
        if (parameters.method == "POST" || parameters.method == "PUT")
            request.write(parameters.body);
        request.end();
    });
    return await promise_request.then(async function () {
        return _parseJsonResult(content);
    })
};
async function _parseJsonResult(result) {
    try {
        return JSON.parse(result.toString());
    } catch (err) {
        if (err instanceof TypeError) {
        } else if (err instanceof RangeError) {
        } else if (err instanceof EvalError) {
        } else if (!result.length) {
            return result;
        } else if (typeof (result) !== {}) {
            return result = { result: JSON.stringify() };
        } else {
            return result;
        };
    };
};