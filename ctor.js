(function() { 
var global = new Function('return this')();var myDefine = (function(factory){ var ret = factory();typeof module != 'undefined' && (module.exports = ret);global.define && global.define(function(){return ret;});global.ctor = ret; });var require, define;
(function (undef) {
    var mod = {}, g = this;
    function resolvePath(base, relative){
        var ret, upCount = 0, l;

        base = base.split('/');
        relative = relative.split('/');
        if ( relative[0] == '.' || relative[0] == '..' ) {
            base.pop();
            ret = base.concat(relative);
        }
        else {
            ret = relative;
        }

        for(l = ret.length ; l--; ){
            if ( ret[l] == '.' ) {
                ret.splice( l, 1 );
            }
            else if ( ret[l] == '..' ) {
                upCount++;
            }
            else {
                if ( upCount > 0 ) {
                    ret.splice( l, 2 );
                    upCount--;
                }
            }
        }
        return ret.join('/');
    }
    define = function( id, deps, factory ){
        mod[id] = {
            p: id,
            d: deps,
            f: factory
        };
    };
    define.amd = true;
    require = function(deps, factory){
        var module = this;
        var resolved = [], cur, relative, absolute;

        if ( module == null || module === g ) {
            module = { p: '_NE_' };
        }

        if ( typeof deps == 'string' && factory == null ) {
            deps = [deps];
        }

        for(var i = 0; i < deps.length; i++) {
            relative = deps[i];
            absolute = resolvePath( module.p, relative );
            if ( absolute == "require" ) {
                cur = {
                    p: '_NE_',
                    d: [],
                    f: function(){ return require }
                };
            }
            else {
                cur = mod[absolute];
            }
            if ( !cur ) {throw "module not found"}
            resolved.push( require.call( cur, cur.d, cur.f ) );
        }

        resolved.push(require, {});
        if ( factory ) {
            return factory.apply(g, resolved);
        }
        else {
            return resolved[0];
        }
    };
}());
define("../lib/amdshim/amdshim", function(){});

define('ctor',['require'],function (Instance) {

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

            inheritedBase = me.base;

            me.base = function () {

                if ( based ) {
                    throw new Error("Base constructor is called or be called after constructed.");
                }
                
                for( var i = 0 ; i < bases.length; i++ ) {
                    bases[i].apply( me, arguments );
                }

                based = true;
            };

            ref.apply( me, args );

            if ( based === false ) {
                me.base.apply( me , args );
            }

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
myDefine(function() { return require('ctor'); }); 
}());