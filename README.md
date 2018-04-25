
# Philips_SmartTV_API

<b>Info:</b>

   Created for Philips Smart Tv (55PFS8209/12)

</br></br>

<b>Todo's:</b>

          - Full Test
          - Merge oDb.system.timestamp and oDb.system.epgsource to oDb.system
          - values for pointer
          - return when counter is below some value
          - add config file
          - correct this readme :)

</br></br>

<b>Configure:</b>

   	     - .....Todo........................

 
<b>Include:</b>

   	     - require( path + './tv.js' );
         - tv = require( path + './tv.js' );

</br></br>

<b>Odb: (ObjectDataBase)</b>

         - OdbValue(pos,method,value)
         - OdbValueReset(pos,value)
         - OdbValueSet(pos,value)
         - OdbValueGet(pos)

</br></br>

<b>Get: (Puts value to Odb, without return)</b>

     - From Odb:
         - GetJSONObjAsync(path,position)
         - GetJSONObjAsync('/5/activities/tv',)  or  GetJSONObjAsync(,10)
         - OdbValue(pos,method,value)
         - OdbValueReset(pos,value)
         - OdbValueSet(pos,value){ 
         - OdbValueGet(pos)

     - With Async:

        - GetJSONObjAsync(path,position)
          .then(output => {console.log(output)};
          .catch(error => {console.log(error)};

        - GetJSONObjAsync('/5/activities/tv',)  or  GetJSONObjAsync(,10)
         .then(output => {console.log(output)};
         .catch(error => {console.log(error)};

<b>Post:</b>

     - .....Todo........................

<b>Json:</b>

    - .....Todo........................
    - Collect:
        tv.returnJSONObjAll());
    - Write to file:
        tv.returnJSONObjAllToDb();
    - Read from file:
        console.log(fs.readFileSync( pathprivate + "./db.json", 'UTF8'));

<b>Dependency:</b>

    - independent (only Node.js Built-in Modules)

<b>Other info:</b>

    - http://localip:1925/activities/tv
    - http://localip:1925/ambilight/cached
    - http://localip:1925/ambilight/lounge
    - http://localip:1925/ambilight/mode
    - http://localip:1925/ambilight/measured
    - http://localip:1925/ambilight/processed
    - http://localip:1925/ambilight/topology
    - http://localip:1925/applications
    - http://localip:1925/audio/volume
    - http://localip:1925/channeldb/tv
    - http://localip:1925/context
    - http://localip:1925/input/key
    - http://localip:1925/input/pointer
    - http://localip:1925/powerstate
    - http://localip:1925/system
    - http://localip:1925/system/country
    - http://localip:1925/system/deviceid_encrypted
    - http://localip:1925/system/epgsource
    - http://localip:1925/system/serialnumber_encrypted
    - http://localip:1925/system/model_encrypted
    - http://localip:1925/system/menulanguage
    - http://localip:1925/system/name
    - http://localip:1925/system/nettvversion
    - http://localip:1925/system/softwareversion_encrypted


