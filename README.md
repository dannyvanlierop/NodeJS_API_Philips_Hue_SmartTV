
# Philips_SmartTV_API


   Info:


   Tested on Philips Smart Tv (55PFS8209/12)


  Todo's:

          - Full Test
          - Merge oDb.system.timestamp and oDb.system.epgsource to oDb.system
          - values for pointer


  Include:

   	     - tv = require( path + './tv.js' );


  Get:

    * returnJSONObj (path)
    * console.log(tv.getJSON('/5/activities/tv'));
    * console.log(tv.returnActivitiesTv().channelList);


  Post:

    * pushBufferobj (path, jObj, callback)
    * tv.pushBufferobjInputKeyVolumeDown();
    * tv.pushBufferobj('/5/input/key', { "key": "VolumeDown" });


  Json:

    - Collect:
        tv.returnJSONObjAll());
    - Write to file:
        tv.returnJSONObjAllToDb();
    - Read from file:
        console.log(fs.readFileSync( pathprivate + "./db.json", 'UTF8'));


  Dependency:

    - independent (only Node.js Built-in Modules)



