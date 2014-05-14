var should = require('chai').should(),
    assert = require('chai').assert,
    requirejs = require('requirejs');


;!function (require, nodeRequire) {

require.config({
    nodeRequire: nodeRequire
});

var ctor = require('../src/ctor.js');

describe('ctor', function(){
    it('works', function(){
        var ex;
        var crap = {};

        var Animal = function( name ){
            this.name = name;
        };
        Animal.prototype.talk = function() {
            throw new Error("I don't know how to talk.");
        };
        Animal.prototype.poop = function() {
            return crap;
        };

        var Dog = ctor(function( name ){
        }).inherit(Animal);
        Dog.prototype.talk = function() {
            return 'woof';
        };

        var Elephant = ctor(function( name ){
            this.base( name );
            this.name += ' Toot';
        }).inherit(Animal);
        Elephant.prototype.talk = function() {
            return 'toot';
        };

        var Human = ctor(function( firstname, lastname ){
            // manually calling into base method
            this.base( firstname + ' ' + lastname );
        }).inherit(Animal);
        Human.prototype.talk = function() {
            return 'hello';
        };

        var Fox = ctor(function( name ){
        }).inherit(Animal);

        var dog = new Dog('Hachiko');
        var fox = Fox('McCloud');
        var elephant = new Elephant('Hajime');
        var human = new Human('Norman', 'Xu');

        assert.equal( dog.name + ': ' + dog.talk(), 'Hachiko: woof' );
        assert.equal( elephant.name + ': ' + elephant.talk(), 'Hajime Toot: toot' );
        assert.equal( human.name + ': ' + human.talk(), 'Norman Xu: hello' );

        try{
            fox.talk()   
        }
        catch(err) {
            ex = err;
        }

        assert.equal( ex.message, "I don't know how to talk." );
        assert.equal( elephant.poop(), crap );
    });
});
    
}(requirejs, require);