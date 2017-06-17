module.exports = class Stack {
    constructor(options) {
        this.tracks = [];
        this.engines = [];
        this.duration = null;
        return this;
    }
    add2Stack(track) {
        this.tracks.push(track);

        //LOAD2ENGINE
        this.load2Engine(track);
    }
    destroyTrack(ID) {
        for(let tr in this.tracks) {
            if(this.tracks[tr].ID != ID){
                continue;
            }
            let index = this.tracks.indexOf(this.tracks[tr]);
                this.tracks.splice(index, 1);
                this.engines.splice(index, 1);
        }
        
          
    }
    load2Engine(_track) {

        let Player = new midiPlayer.Player(function(e) {
            console.log(e);
        });
        Player.loadFile(_track.URL);

        //SET STACK DURATION
        this.duration ? null : this.duration = Player.getSongTime();
        this.engines.push(Player);
    }
    getFromStack() {
        console.log(this)
    }
    removeSingle(el) {
        this.destroyTrack($(el)[0].parentNode.id);
        //UPDATE
        ui.drawStack(this);
    }
    actionWithChecked(action) {
        let self = this;
        let selectedEl = $('#tracks-container input:checked');
        
        switch(action) {
            case 'rm':    
                Array.prototype.forEach.call(selectedEl, function(e) {
                    self.destroyTrack(e.parentNode.id);
                });
                break;
            case 'group':    
                console.log('grouped')
                break;
        }
        //UPDATE
        ui.drawStack(self);
    }
}