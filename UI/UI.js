const UI_Track = require('./uiTrack');

module.exports = class UI {
    constructor() {
        return this;
    }
    
    drawStack(_stack) {
        let htmlTracks = [];
        let tracksContainer = $('#tracks-container');
        
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
        }
        //DEV
        console.log(_stack)
    }
}