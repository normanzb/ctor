Ctor.JS
=======

The constructor's constructor for Javascript.

Usage
----------------------

[Everybody talks](https://www.youtube.com/watch?v=X5G9tIe84lE&feature=kp)


    var Animal = ctor(function( name ){
        this.name = name;
    });
    Animal.prototype.talk = function() {
        throw new Error("I don't know how to talk.");
    };

    var Dog = ctor(function( name ){
        // if you do not call base constructor, it will call automatically
    }).inherit(Animal);
    Dog.prototype.talk = function() {
        return 'woof';
    };

    var Elephant = ctor(function( name ){
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
    
    var dog = new Dog('Hachiko');
    var elephant = new Elephant('Hajime');
    var human = new Human('Norman', 'Xu');
    
    console.log( dog.name + ': ' + dog.talk() );
    console.log( elephant.name + ': ' + elephant.talk() );
    console.log( human.name + ': ' + human.talk() );
    
[What does fox say?](https://www.youtube.com/watch?v=jofNR_WkoCE)

    var Fox = ctor(function( name ){
    }).inherit(Animal);
    
    var fox = new Fox('McCloud');


    console.log( fox.name + ': ' + fox.talk() );


