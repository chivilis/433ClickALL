module.exports = class Wave2Midi {
    constructor(fileURL) {
        // FIX THIS TO NOT NEEDED
        this.wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: 'grey',
            progressColor: 'purple'
        });

        this.wavesurfer.load('../assets/test.wav');
        self = this;
        this.wavesurfer.on('ready', function() {
            self._playAudioLikeBuffer();
            self.fTime = self.fullTime;

            // BUILD MIDI FILE 
            //console.log(self);
            //self.destroy();            
        });
    }
}