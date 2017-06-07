    //CUSTOM CODE
            //get all peak indexes
            this._tempBuffer = [];
            this._tempPeakIndexes = [];
            self = this;
            for(self.i = 0; self.i < this.backend.buffer.numberOfChannels; self.i++) {
                this._tempBuffer[self.i] = this.backend.buffer.getChannelData(self.i); 
                self._tempPeakIndexes[self.i] = [];
                peaks.forEach(function(peak) {
                    // peak detection treshold
                    peak > 0.1 ? self._tempPeakIndexes[self.i].push(Array.prototype.indexOf.call(self._tempBuffer[self.i], peak)) : null
                });
                
            }
            
            //this._tempPeakIndexes = self._tempPeakIndexes.remove;
            self = null;
            
            //make single array of peak indexes
            //if record is stereo
            if(this._tempPeakIndexes.length > 1) {
                for(var index in this._tempPeakIndexes[0]) {
                    this._tempPeakIndexes[0][index] <= 0 ? 
                        this._tempPeakIndexes[0][index] = this._tempPeakIndexes[1][index] : null
                }
            }
            this._tempPeakIndexes = this._tempPeakIndexes[0];
            
            //if(this.DEBUG) console.log(this._tempPeakIndexes);
            // DONE SORTING PEAKS ARR
            
            this.makeAudioLikeArr();
            
            
            this._playAudioLikeBuffer = function() {
                
                var start = window.performance.now();
                //var end = start + duration;
                
                var step = this.getStepToReduceBuffer();
                
                //console.log('step: ' + step)
                
                var start = window.performance.now();
                var end = this.backend.buffer.duration;
                var fullTime = start + end;
                
                console.log('fulltime: ' + fullTime);
                console.log('start: ' + start);
                console.log('duration: ' + end);
                console.log('samples: ' + this.backend.buffer.length)
                console.log('peaks: ' + this._tempPeakIndexes.length)
                
                //peak place in whole of %
                var peakPerc = [];
                this.e2blink = [];
                this.e2blink.push(document.getElementById('test_blinker') );
                this.e2blink.push(document.getElementById('test_blinker2') );
                for(var sample in this._tempPeakIndexes) {
                    peakPerc.push(this._tempPeakIndexes[sample]*100/this.backend.buffer.length);
                }
                
                var durationMilli = end*1000;
                var tickTimeLine = [];
                for(var i in peakPerc) {
                    //make time values
                    tickTimeLine.push(durationMilli*peakPerc[i]/100);
                }
                //console.log(tickTimeLine)
                //PLAY
                for(var i in tickTimeLine) {
                    if(this._audioLikeBuffer){
                        for(var track in this._loadedClickTracks){
                            setTimeout(function() {
                                self.blinkTestWindow(track);
                            }, tickTimeLine[i])     
                        }
                         
                    }
                        
                }
                
                
               
                
                /*
                
                // MAKE COLOR ON TRUE
                this.blinkTestWindow = function(track){
                    self = this;
                    self.min = Math.ceil(0);
                    self.max = Math.floor(255);
                    self.r = 0;
                    self.g = 0;
                    self.b = 0;
                    //self.e2blink = [];
                    //if(track == this._loadedClickTracks[0])
                    //console.log(track)
                    //console.log(self._loadedClickTracks[0])
                    
                    // fire color on true
                    function flashRGB(){
                                 //function getRandomIntInclusive(min, max) {
                            self.r = parseInt( Math.floor(Math.random() * (self.max - self.min + 1)) + min );
                            self.g = parseInt( Math.floor(Math.random() * (self.max - self.min + 1)) + min );
                            self.b = parseInt( Math.floor(Math.random() * (self.max - self.min + 1)) + min );
                        return 'rgb('+self.r+','+self.g+','+self.b+')';
                    }
                    
                        if(self._loadedClickTracks[0].filename == 'click.wav') {
                            self.e2blink[0].style.backgroundColor = 'red';
                        } 
                        if(self._loadedClickTracks[0].filename != 'test.wav')
                        {
                            self.e2blink[1].style.backgroundColor = flashRGB();
                        }
                        //console.log(self._loadedClickTracks[0].filename) 
                        //console.log(self._loadedClickTracks[0].filename) 
                }
                console.log(self._loadedClickTracks)
                */
                
                /*
                self = this;
                //sampRate / duration
                var i = 0;
                var playInterval = 1000 / this.backend.buffer.sampleRate / this.backend.buffer.duration; 
                
                var play = setInterval(function() {
                    if(self._audioLikeBuffer[i] === true) {
                        console.log(self._audioLikeBuffer[i])
                    }
                    i++;
                    //console.log(self._audioLikeBuffer[i])
                }, 0);
                
                //console.log(this.backend.play)
                */
                
            }
            //console.log(self._audioLikeBuffer)
            //console.log(self._tempPeakIndexes)
            
            this._playAudioLikeBuffer();
            //console.log(this._playInterval)
            this.fireEvent('redraw', peaks, width);
        }
    },
    
   
    // MAKE ARR LIKE-AUDIO_BUFFER
    makeAudioLikeArr: function() {
        
        self = this;
        this._audioLikeBuffer = [];
        for(var i = 0; i < this.backend.buffer.length; i++) {
            //this._audioLikeBuffer.push(12);
            this._audioLikeBuffer.push(false);
        }
        for(var i = 0; i < this._tempPeakIndexes.length; i++) {
            //this._audioLikeBuffer[this._tempPeakIndexes[i]] = 55;
            this._audioLikeBuffer[this._tempPeakIndexes[i]] = true;
        }
        // this._audioLikeBuffer READY!
        /*
        if(this.DEBUG) {
            for(var i in this._audioLikeBuffer) {
                if(this._audioLikeBuffer[i] === true) {
                    console.log(this._audioLikeBuffer.indexOf((this._audioLikeBuffer[i])) );
                }
            }
            //console.log(this._audioLikeBuffer)
        }
        */
    },