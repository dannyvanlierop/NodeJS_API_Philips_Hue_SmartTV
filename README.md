EDIT LATER :)
# ~~NodeJS_Philips-SmartTV-API~~

(rebuilding readme) - *A totally new rebuild compared to the previous versions.*


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
# TODO: 

    - Add auto-set function
    - Complete this readme
    - Archive this repository

<br>

## Dependency:

*- needs to be installed before first launch*

    fastify, follow-redirects

<br>

## Values local-SmartTV-Object

*- access local-SmartTV-Object values. (``set`` or ``get``)*
    
    - ObjectSet(Position,objVal);  (Automatically Updates the SmartTV values, from the values set to the  )
    - ObjectGet(Position);

<br>

## Values SmartTV

*- access the values from tv, and updates the local object*

    - SmartTV_Set(IP_ADDRESS, '/5/audio/volume', {"min":0,"current":10,"muted":false,"max":0});
    - SmartTV_Fetch_Update_All();           (fetch and saves all values to the local-SmartTV-Object)
    - SmartTV_Fetch_Update_One(Position);   (fetch and save one item to the local-SmartTV-Object)

<br>

### Fastify HTTP-Routes:

*- access values locally by use of a http-client of your own flavour*

&nbsp;&nbsp;&nbsp;ht<span>tp://</span>127.0.0.1/``5 <-`` *SmartTV joinSPACE version, (1~6)*


            - http://127.0.0.1/5/ (Retrieving the full local-SmartTV-Object)
            - http://127.0.0.1/5/activities/tv
            - http://127.0.0.1/5/ambilight/cached
            - http://127.0.0.1/5/ambilight/lounge
            - http://127.0.0.1/5/ambilight/measured
            - http://127.0.0.1/5/ambilight/mode
            - http://127.0.0.1/5/ambilight/processed
            - http://127.0.0.1/5/ambilight/topology
            - http://127.0.0.1/5/applications
            - http://127.0.0.1/5/audio/volume
            - http://127.0.0.1/5/channeldb/tv
            - http://127.0.0.1/5/context
            - http://127.0.0.1/5/input/key
            - http://127.0.0.1/5/input/pointer
            - http://127.0.0.1/5/network/devices
            - http://127.0.0.1/5/powerstate
            - http://127.0.0.1/5/system
            - http://127.0.0.1/5/system/country
            - http://127.0.0.1/5/system/deviceid_encrypted
            - http://127.0.0.1/5/system/epgsource
            - http://127.0.0.1/5/system/menulanguage
            - http://127.0.0.1/5/system/model_encrypted
            - http://127.0.0.1/5/system/name
            - http://127.0.0.1/5/system/serialnumber_encrypted
            - http://127.0.0.1/5/system/timestamp
<br>
<br>

# jointSPACE info:

*SPACE is a Software Architecture developed by Philips for its range of TV displays.
It is based on Linux and DirectFB technologies.
JointSPACE opens the TV APIs to let you develop new applications and run them on the TV.*
<br>

* [JointSpace                              ](https://jointspace.sourceforge.net/)
* [JointSpace files                        ](https://sourceforge.net/projects/jointspace/files/)
* [JointSpace API Documentation            ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API.html) (saved in the repository)
* [Getting Started                         ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-gettingstarted.html)

<br>

# REST API Methods:
<br>

### Ambilight methods

* [Introduction to the ambilight interface ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-ambilight.html)
* [GET ambilight/topology                  ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-ambilight-topology-GET.html)
* [GET ambilight/mode                      ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-ambilight-mode-GET.html)
* [POST ambilight/mode                     ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-ambilight-mode-POST.html)
* [GET ambilight/measured                  ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-ambilight-measured-GET.html)
* [GET ambilight/processed                 ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-ambilight-processed-GET.html)
* [GET ambilight/cached                    ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-ambilight-cached-GET.html)
* [POST ambilight/cached                   ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-ambilight-cached-POST.html)

<br>

### Audio methods

* [GET audio/volume                        ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-audio-volume-GET.html)
* [POST audio/volume                       ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-audio-volume-POST.html)

<br>

### Channel list methods

* [GET channellists                        ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-channellists-GET.html)
* [GET channellists/id                     ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-channellists-id-GET.html)

<br>

### Channel methods

* [GET channels                            ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-channels-GET.html)
* [GET channels/current                    ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-channels-current-GET.html)
* [POST channels/current                   ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-channels-current-POST.html)
* [GET channels/id                         ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-channels-id-GET.html)

<br>

### Input methods

* [POST input/key                          ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-input-key-POST.html)

<br>

### Source methods

* [GET sources                             ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-sources-GET.html)
* [GET sources/current                     ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-sources-current-GET.html)
* [POST sources/current                    ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-sources-current-POST.html)

<br>

### System methods

* [GET system                              ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-system-GET.html)
* [GET system/country                      ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-system-country-GET.html)
* [GET system/name                         ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-system-name-GET.html)
* [GET system/menulanguage                 ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-system-menulanguage-GET.html)
* [GET system/model                        ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-system-model-GET.html)
* [GET system/serialnumber                 ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-system-serialnumber-GET.html)
* [GET system/softwareversion              ](https://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API-Method-system-softwareversion-GET.html)

<br>

## License:
<hr>

For more details,
see the [LICENSES](https://github.com/dannyvanlierop/NodeJS_Philips-SmartTV-API/blob/master/LICENSE.md) file.

<br>&nbsp;
