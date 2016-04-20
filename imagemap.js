$('img[usemap]').each(function(){
    var usemap = $(this).attr('usemap').match(/#(.+)/);
    var src = $(this).attr('src');
    var width = $(this).attr('width');
    var height = $(this).attr('height');
    console.log(usemap);
    $('map[name="'+usemap[1]+'"]').children('area').each(function(){
        var coord = $(this).attr('coords');
        var coords = coord.split(",");
        var h=w=x=y=m=n=0;
        switch($(this).attr('shape')){
            case 'poly':
                if(coords.length%2 == 1){
                    break;
                }
                x=m=parseInt(coords[0]);
                y=n=parseInt(coords[1]);
                for(var i=0;i<coords.length/2;i++){
                    var cx=parseInt(coords[i*2]);
                    var cy=parseInt(coords[i*2+1]);
                    if(x>cx){x=cx;}
                    if(y>cy){ y=cy;}
                    if(m<cx){ m=cx;}
                    if(n<cy){ n=cy;}
                }
                w=m-x;
                h=n-y;
                //$('body').append('<svg width="'+w+'" height="'+h+'"><image x="-'+x+'" y="-'+y+'" width="'+width+'" height="'+height+'" xlink:href="'+src+'"></image></svg>');
		var points = '';
                for(var i=0;i<coords.length/2;i++){
                    var cx=parseInt(coords[i*2]);
                    var cy=parseInt(coords[i*2+1]);
		    points +=(cx-x)+','+(cy-y)+' ';
                }
                /*$('body').append('<svg viewBox="0 0 '+w
                +' '+h
                +'" preserveAspectRatio="none"><defs><pattern id="image" height="'+height
		+'" width="'+width
		+'" patternUnits="userSpaceOnUse" ><image x="-'+x
                +'" y="-'+y
                +'" width="'+width
                +'" height="'+height
                +'" xlink:href="'+src
                +'"></image></pattern></defs><polygon points="'+points
		+'" fill="url(#image)"/></svg>');*/
		
                var svgimage = '<svg  version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 '+w
                +' '+h
                +'" xml:space="preserve"  height="'+h
		        +'" width="'+w
		        +'"><defs><pattern id="image" height="'+height
		        +'" width="'+width
		        +'" patternUnits="userSpaceOnUse" ><image x="-'+x
                +'" y="-'+y
                +'" width="'+width
                +'" height="'+height
                +'" xlink:href="'+src
                +'"></image></pattern></defs><polygon points="'+points
		        +'" fill="url(#image)"/></svg>';
$('body').append(svgimage);
		        //$('body').append('<img src="data:image/svg+xml;utf8;base64,'+btoa(svgimage)+'"/>');
            break;
            case 'rect':
                if(coords.length != 4){
                    break;
                }
            break;
            case 'circle':
                if(coords.length != 3){
                    break;
                }
            break;
                
        }
    });
});
