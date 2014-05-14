//>>excludeStart("release", pragmas.release);
if (typeof define !== 'function' && typeof module != 'undefined') {
    var define = require('amdefine')(module);
}
//>>excludeEnd("release");
define(function (Instance) {

    function Empty ( ) { }

    function ctor( ref ){
        var bases = [];
        var argsHolder;

        var ret = function() {
            var me = this, based = false, args;

            args = argsHolder || arguments;
            argsHolder = null;

            if ( !( me instanceof ret ) ) {
                argsHolder = arguments;
                return new ret();
            }

            me.base = function () {
                
                for( var i = 0 ; i < bases.length; i++ ) {
                    bases[i].apply( me, arguments );
                }

                based = true;
            };

            ref.apply( me, args );

            if ( based === false ) {
                me.base.apply( me , args );
            }

            delete me.base;
        };

        ret.inherit = function( ) {
            var cur, type, key;

            for( var i = 0 ; i < arguments.length; i++ ) {
                cur = arguments[i];
                type = typeof cur;

                if ( type == 'function' ) {

                    if ( bases.length == 0 ) {
                        Empty.prototype = cur.prototype;
                        ret.prototype = new Empty();
                        ret.prototype.constructor == ret;
                    }
                    else {
                        for( key in cur.prototype ) {
                            ret.prototype[ key ] = cur.prototype[ key ];
                        }
                    }

                    bases.push( cur );

                }
                else if ( type == 'object' ) {

                    if ( bases.length == 0 ) {
                        ret.prototype.constructor == cur;
                    }
                    else {
                        for( key in cur ) {
                            ret.prototype[ key ] = cur.prototype[ key ];
                        }
                    }

                }
                else {
                    throw new Error('Cannot inherit from a ' + type);
                }

            }

            return ret;
        };
        ret.from = ret.inherit;
        ret.mixin = ret.inherit;

        return ret;
    }

    return ctor;
});