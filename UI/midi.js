     var parseMidi = require('midi-file').parseMidi
     var MidiTrack = function(buffer){
        filteredMidi = {
            trackName: [],
            notes: []
        };        
        
        buffer.tracks[buffer.tracks.length-1].map(function(ev) {
            console.log(ev);
        try {
            if(ev.type === 'trackName') {
                filteredMidi.trackName.push(ev.text)
            } else if(ev.type === 'noteOn') {
                filteredMidi.notes.push(
                    {
                        'note': ev.noteNumber,
                        'velocity': ev.velocity,
                        'deltaTime': ev.deltaTime
                        // FIXME -> MAKING MIDI INFO TRACKS
                    }
                    
                );
            }
        }
        catch(err) {
            console.log('no property type')
        }
    })
        
        return filteredMidi;
    }
    
    
    // load midi buffer
    //lunch midiAnalyseR
    var input = fs.readFileSync('./assets/test1.mid');
    var parsedMidi = parseMidi(input);
    
    var filteredMidi = new MidiTrack(parsedMidi)
    console.log(filteredMidi)
    
    
    console.log(parsedMidi)
        
    // filter note events    
    var targetTrack = parsedMidi.tracks.length -1;
    //console.log(targetTrack)
   
    var trackName = null;
    
    parsedMidi.tracks[targetTrack].map(function(ev) {
        try {
            if(ev.type === 'trackName') trackName = ev.text
            else if(ev.type === 'noteOn') console.log(ev.noteNumber)
            
        }
        catch(err) {
            console.log('no property type')
        }
    })
    console.log(trackName)