/***************\
| POST Function |###############################################################################################################################################################################
|
| Added own post function to make this module independent, this function will return an object.
|
\***********************************************************************************************************************************************************************************************/
exports.pushBufferobj = function(path, jObj){

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



/***************************\
| PreDefined POST Functions |####################################################################################################################################################################
|
| Some predefined functions
|
\***********************************************************************************************************************************************************************************************/
exports.pushBufferobjAmbilightCached = function (){               _this.pushBufferobj(sArrayPaths[2] ,  jArrayValues[2]            )};                
exports.pushBufferobjAmbiLightLounge = function (){               _this.pushBufferobj(sArrayPaths[3] ,  jArrayValues[3]            )};                
exports.pushBufferobjAmbiLightMode = function (){                 _this.pushBufferobj(sArrayPaths[5] ,  jArrayValues[5]            )};                
exports.pushBufferobjAudioVolume = function (){                   _this.pushBufferobj(sArrayPaths[9] ,  jArrayValues[9]            )};                
exports.pushBufferobjInputPointer = function (){                  _this.pushBufferobj(sArrayPaths[11], jArrayValues[11]            )};                
exports.pushBufferobjInputKeyStandby = function (){               _this.pushBufferobj(sArrayPaths[12],{ "key": "Standby" }         )};                       
exports.pushBufferobjInputKeyBack = function (){                  _this.pushBufferobj(sArrayPaths[12],{ "key": "Back" }            )};                    
exports.pushBufferobjInputKeyFind = function (){                  _this.pushBufferobj(sArrayPaths[12],{ "key": "Find" }            )};                    
exports.pushBufferobjInputKeyRedColour = function (){             _this.pushBufferobj(sArrayPaths[12],{ "key": "RedColour" }       )};                         
exports.pushBufferobjInputKeyGreenColour = function (){           _this.pushBufferobj(sArrayPaths[12],{ "key": "GreenColour" }     )};                           
exports.pushBufferobjInputKeyYellowColour = function (){          _this.pushBufferobj(sArrayPaths[12],{ "key": "YellowColour" }    )};                            
exports.pushBufferobjInputKeyBlueColour = function (){            _this.pushBufferobj(sArrayPaths[12],{ "key": "BlueColour" }      )};                          
exports.pushBufferobjInputKeyHome = function (){                  _this.pushBufferobj(sArrayPaths[12],{ "key": "Home" }            )};                    
exports.pushBufferobjInputKeyVolumeUp = function (){              _this.pushBufferobj(sArrayPaths[12],{ "key": "VolumeUp" }        )};                        
exports.pushBufferobjInputKeyVolumeDown = function (){            _this.pushBufferobj(sArrayPaths[12],{ "key": "VolumeDown" }      )};                          
exports.pushBufferobjInputKeyMute = function (){                  _this.pushBufferobj(sArrayPaths[12],{ "key": "Mute"  }           )};                     
exports.pushBufferobjInputKeyOptions = function (){               _this.pushBufferobj(sArrayPaths[12],{ "key": "Options" }         )};                       
exports.pushBufferobjInputKeyDot = function (){                   _this.pushBufferobj(sArrayPaths[12],{ "key": "Dot"    }          )};                      
exports.pushBufferobjInputKeyDigit0 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit0" }          )};                      
exports.pushBufferobjInputKeyDigit1 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit1" }          )};                      
exports.pushBufferobjInputKeyDigit2 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit2" }          )};                      
exports.pushBufferobjInputKeyDigit3 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit3" }          )};                      
exports.pushBufferobjInputKeyDigit4 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit4" }          )};                      
exports.pushBufferobjInputKeyDigit5 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit5" }          )};                      
exports.pushBufferobjInputKeyDigit6 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit6" }          )};                      
exports.pushBufferobjInputKeyDigit7 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit7" }          )};                      
exports.pushBufferobjInputKeyDigit8 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit8" }          )};                      
exports.pushBufferobjInputKeyDigit9 = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Digit9" }          )};                      
exports.pushBufferobjInputKeyInfo = function (){                  _this.pushBufferobj(sArrayPaths[12],{ "key": "Info" }            )};                    
exports.pushBufferobjInputKeyCursorUp = function (){              _this.pushBufferobj(sArrayPaths[12],{ "key": "CursorUp" }        )};                        
exports.pushBufferobjInputKeyCursorDown = function (){            _this.pushBufferobj(sArrayPaths[12],{ "key": "CursorDown" }      )};                          
exports.pushBufferobjInputKeyCursorLeft = function (){            _this.pushBufferobj(sArrayPaths[12],{ "key": "CursorLeft" }      )};                          
exports.pushBufferobjInputKeyCursorRight = function (){           _this.pushBufferobj(sArrayPaths[12],{ "key": "CursorRight" }     )};                           
exports.pushBufferobjInputKeyConfirm = function (){               _this.pushBufferobj(sArrayPaths[12],{ "key": "Confirm" }         )};                       
exports.pushBufferobjInputKeyNext = function (){                  _this.pushBufferobj(sArrayPaths[12],{ "key": "Next" }            )};                    
exports.pushBufferobjInputKeyPrevious = function (){              _this.pushBufferobj(sArrayPaths[12],{ "key": "Previous" }        )};                        
exports.pushBufferobjInputKeyAdjust = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Adjust" }          )};                      
exports.pushBufferobjInputKeyWatchTV = function (){               _this.pushBufferobj(sArrayPaths[12],{ "key": "WatchTV" }         )};                       
exports.pushBufferobjInputKeyViewmode = function (){              _this.pushBufferobj(sArrayPaths[12],{ "key": "Viewmode" }        )};                        
exports.pushBufferobjInputKeyTeletext = function (){              _this.pushBufferobj(sArrayPaths[12],{ "key": "Teletext" }        )};                        
exports.pushBufferobjInputKeySubtitle = function (){              _this.pushBufferobj(sArrayPaths[12],{ "key": "Subtitle" }        )};                        
exports.pushBufferobjInputKeyChannelStepUp = function (){         _this.pushBufferobj(sArrayPaths[12],{ "key": "ChannelStepUp" }   )};                             
exports.pushBufferobjInputKeyChannelStepDown = function (){       _this.pushBufferobj(sArrayPaths[12],{ "key": "ChannelStepDown" } )};                               
exports.pushBufferobjInputKeySource = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Source" }          )};                      
exports.pushBufferobjInputKeyAmbilightOnOff = function (){        _this.pushBufferobj(sArrayPaths[12],{ "key": "AmbilightOnOff" }  )};                              
exports.pushBufferobjInputKeyPlayPause = function (){             _this.pushBufferobj(sArrayPaths[12],{ "key": "PlayPause" }       )};                         
exports.pushBufferobjInputKeyPause = function (){                 _this.pushBufferobj(sArrayPaths[12],{ "key": "Pause" }           )};                     
exports.pushBufferobjInputKeyFastForward = function (){           _this.pushBufferobj(sArrayPaths[12],{ "key": "FastForward" }     )};                           
exports.pushBufferobjInputKeyStop = function (){                  _this.pushBufferobj(sArrayPaths[12],{ "key": "Stop" }            )};                    
exports.pushBufferobjInputKeyRewind = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Rewind" }          )};                      
exports.pushBufferobjInputKeyRecord = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Record" }          )};                      
exports.pushBufferobjInputKeyOnline = function (){                _this.pushBufferobj(sArrayPaths[12],{ "key": "Online" }          )};                      
exports.pushBufferobjPowerstateOn = function (){                  _this.pushBufferobj(sArrayPaths[15],{ "powerstate":"On" }        )};                        
exports.pushBufferobjPowerstateStandby = function (){             _this.pushBufferobj(sArrayPaths[15],{ "powerstate":"Standby" }   )};      
























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






