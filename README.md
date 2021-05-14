# NodeJS_Philips-SmartTV-API
Remote control Philips SmartTv

&nbsp;<br>
[
    ![Open source](
        https://img.shields.io/badge/Open%20Source-Yes-green?style=plastic
    )
    ](
        https://github.com/dannyvanlierop/NodeJS_Philips-SmartTV-API
    )
[
    ![License: Mit](
        https://img.shields.io/badge/license-MIT-green.svg?style=plastic)
    ](
        https://en.wikipedia.org/wiki/MIT_License
    )
[
    ![Contributors](
        https://img.shields.io/github/contributors/dannyvanlierop/NodeJS_Philips-SmartTV-API?style=plastic)
    ](
        https://github.com/dannyvanlierop/NodeJS_Philips-SmartTV-API/graphs/contributors
    )
[
    ![Forks](
        https://img.shields.io/github/forks/dannyvanlierop/NodeJS_Philips-SmartTV-API?style=plastic)
    ](
        https://github.com/dannyvanlierop/NodeJS_Philips-SmartTV-API/network/members
	)
[
    ![Stars](
        https://img.shields.io/github/stars/dannyvanlierop/NodeJS_Philips-SmartTV-API?style=plastic)
  ](
        https://github.com/dannyvanlierop/NodeJS_Philips-SmartTV-API/stargazers
	)
[
    ![Issues](
        https://img.shields.io/github/issues/dannyvanlierop/NodeJS_Philips-SmartTV-API?style=plastic)
  ](
        https://github.com/dannyvanlierop/NodeJS_Philips-SmartTV-API/issues
	)

&nbsp;<br>
## Info:
<hr>


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


  Other info:

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

&nbsp;<br>
## License:
<hr>

For more details,
see the [LICENSES](https://github.com/dannyvanlierop/NodeJS_Philips-SmartTV-API/blob/master/LICENSE.md) file.

<br>&nbsp;
