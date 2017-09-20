var person = function(firstName, lastName){
    
    this.firstName = firstName
    this.lastName = lastName

    this.getInfo = function(){
        return (this.firstName + " " + this.lastName)
    }
}

p1 = new person('ahmad', 'siddiqi')
console.log(p1.getInfo())
//ghdgh