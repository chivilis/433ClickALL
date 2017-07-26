const UI_Track = require('./uiTrack');
const MainCursor = require('./MainCursor');

module.exports = class UI {
    constructor() {
        return this;
    }
    
    drawStack(_stack) {
        let htmlTracks = [];
        let tracksContainer = $('#tracks-wrap-m-cursor');
        
        // MAKE UI TRACKS
        for(let track in _stack.tracks) {
            htmlTracks.push(new UI_Track({
                ID:_stack.tracks[track].ID,
                name: function() {
                        for(let midiObj in _stack.tracks[track].data.tracks[0]) {
                            if(_stack.tracks[track].data.tracks[0][midiObj].type === 'trackName') {
                                //RETURN TRACKNAME
                                return _stack.tracks[track].data.tracks[0][midiObj].text;
                            }
                        }
                    }
            }));
        }

        tracksContainer[0].innerHTML = '';
        let htmlString = '';
        for(let el in htmlTracks) {
            htmlTracks[el].appendTo(tracksContainer);
            
            //DEBUG
            //console.log(htmlTracks[el])
        }
        
        //BUILD MAIN CURSOR
        new MainCursor(htmlTracks);
        
        //DEV
        console.log(_stack)
    }
}