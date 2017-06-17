module.exports = class Track {
        constructor(trackURL) {
            this.data = this.parseFileData(trackURL);
            this.URL = trackURL;
            this.ID = Math.trunc(Math.floor(Math.random()*1E16));
            if(!this.data) return false;
            return this;
        }  
        parseFileData(trackURL) {
            let _tempBuffer = fs.readFileSync(trackURL);
            let ext = trackURL.split('.').pop();
            switch(ext) {
                case 'mid':
                    let midiData = parseMidi(_tempBuffer);
                    if(midiData.header.numTracks > 1) {
                        console.log('please use single channel midi files!');
                        return false;
                    }
                    //midiData.duration = 
                    return midiData;
                case 'wav':
                        console.log('still dev!');
                    return false;//new Wave2Midi(trackURL);
                case 'smt':
                    console.log('still dev!');
                    return false;
                    let parser = new xml2js.Parser({
                        //trim: true,
                        //normalize: true,
                        //mergeAttrs: true
                    });
                    parser.parseString(_tempBuffer, function (err, result) {
                        console.log(result)
                    });
                    return _tempBuffer;
                    
                default: return false;
            }
        }
    }