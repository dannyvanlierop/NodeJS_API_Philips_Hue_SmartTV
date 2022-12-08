/**
 * @author Danny van Lierop (https://github.com/DannyVanLierop)
 * @contributors Schmitzenbergh (https://github.com/Schmitzenbergh)
 * @description Mirror hue bridge values to external source to offload bridge requests or make them available to other networks
 * @license MIT
 * @dependencies fastify, follow-redirects
 */
module.exports = function (fastifyIP, fastifyPort, fastifyLogger, fastifyInstanceName) {
    this[fastifyInstanceName] = require('fastify')({
        logger: fastifyLogger
    }),
    this[fastifyInstanceName].get('/', async (request, reply) => {
        reply.send(fastifyInstanceName + " response with Hello World3!");
    }),
    this[fastifyInstanceName].setErrorHandler((error, reply) => {
        error.message = JSON.parse(error.message);
        reply.send(error);
    }),
    FastifyServerStart = async () => {
        try {
            await this[fastifyInstanceName].listen({ port: fastifyPort, host: fastifyIP }, (err, address) => {
                console.log(`HTTP-Server is now listening on ${address}\t [${fastifyInstanceName}]`);
            });
        } catch (err) {
            this[fastifyInstanceName].log.error(err);
            process.exit(1);
        };
    },
FastifyServerStart();
};