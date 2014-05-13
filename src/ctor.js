//>>excludeStart("release", pragmas.release);
if (typeof define !== 'function' && typeof module != 'undefined') {
    var define = require('amdefine')(module);
}
//>>excludeEnd("release");
define(function (Instance) {

    function Empty ( ) { }

    function ctor( ref ){
        var bases = [];

        var ret = function() {
            var me = this, based = false;

            Empty.prototype = ret.prototype;
            var e = new Empty();

            e.base = function () {
                
                for( var i = 0 ; i < bases.length; i++ ) {
                    bases[i].apply( me, arguments );
                }

                based = true;
            };

            ref.apply( e, arguments );

            if ( based === false ) {
                e.base.apply( me , arguments );
            }
        };

        ret.inherit = function( ) {
            var cur;

            for( var i = 0 ; i < arguments.length; i++ ) {
                cur = arguments[i];

                if ( bases.length == 0 ) {
                    Empty.prototype = cur.prototype;
                    ret.prototype = new Empty();
                    ret.prototype.constructor == ret;
                }
                else {
                    for( var key in cur.prototype ) {
                        ret.prototype[ key ] = cur.prototype[ key ];
                    }
                }

                bases.push( cur );

            }

            return ret;
        };
        ret.from = ret.inherit;
        ret.mixin = ret.inherit;

        return ret;
    }

    return ctor;
});