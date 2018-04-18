# Philips_SmartTV_API


   Info:

   Tested on Philips Smart Tv (55PFS8209/12)

  TODO's:
          - Full Test
          - DEBUG COPYPASTE: http://192.168.0.97:1925/5/audio/volume
          - Merge oDb.system.timestamp and oDb.system.epgsource to oDb.system
          - values for pointer

  INCLUDE:
   	     - tv = require( path + './tv.js' );

  GET:
    * returnJSONObj (path)
    * console.log(tv.getJSON('/5/activities/tv'));
    * console.log(tv.returnActivitiesTv().channelList);

  POST:
    * pushBufferobj (path, jObj, callback)
    * tv.pushBufferobjInputKeyVolumeDown();
    * tv.pushBufferobj('/5/input/key', { "key": "VolumeDown" });

  JSON:
    - Collect:
        tv.returnJSONObjAll());
    - Write to file:
        tv.returnJSONObjAllToDb();
    - Read from file:
        console.log(fs.readFileSync( pathprivate + "./db.json", 'UTF8'));

  DEPENDENCY:
    - independent (only Node.js Built-in Modules)



