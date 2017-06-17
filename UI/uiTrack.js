module.exports = class UI_Track {
    
    trackContent(trackName) {
        if(typeof trackName === 'undefined') trackName = 'no name...';
        let contentString = '<input type="checkbox">'+ `${trackName}` +
                            '<span onclick="stack.removeSingle(this)"'+
                            'class="glyphicon glyphicon-remove"></span>';
        return contentString;   
    }
    constructor(data) {
        
        let trackHTML = $('<div/>', {
                            'id': data.ID || 'err',
                            'class': 'row ui-track',
                            'style': 'border:1px solid black; background-color:burlywood;text-align:center;',
                            'html': this.trackContent(data.name()),
                            'mouseenter': function(){ $(this).css('color', 'red'); },
                            'mouseleave': function(){ $(this).css('color', 'black'); 
                                }
                        });
        
        return trackHTML;
    }

    
}