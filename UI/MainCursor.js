module.exports = class MainCursor {
    constructor(args) {
        if(!args) {
            console.log('noTracks!');
            return;
        }
        // if updating status only
        else if(args.played) {
            this.updateUICursor(args.played);
        }
        else {
            this.createUICursor(args);
        }
        
    }
    createUICursor(args) {
        let properties = {
                height: 0,
                width: 1,
                x: args.x || 0,
                y: null
            }
            
            for(let track in args) {
                properties.height += $(args[track]).outerHeight();
            }
            
            $('#main-cursor').length ? this.updateUICursor() : this.buildUICursor(properties);
    }
    updateUICursor(timeUnit) {
        try {
            $('#main-cursor').css({'left': timeUnit * $('#tracks-wrap-m-cursor').width() / 100 + 'px'});
        }
        catch(err) {
            console.log('doesn`t exist MainCursor!');
        }
                    
    }
    destroyUICursor() {
        $('#main-cursor').remove();
    }
    
    buildUICursor(props) {
        $('<div/>', {
            id: 'main-cursor',
            rel: 'external',
            text: ''
        }).css({
            height: props.height || 0,
            width: props.width || 2,
            backgroundColor: '#191919',
            position: 'absolute',
            top: '0px'
        }).appendTo('#tracks-wrap-m-cursor');
    }
}