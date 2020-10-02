//hof ?
// callback func ?

// High Order functions => functions which takes functions as an argument
// Callback functions => functions which are passed as an argument in a function

// callback
function getFirstName(fullName){
    // "Steve Rogers"
    fullName = fullName.split(" ");
    // [ "Steve" , "Rogers" ];
    return fullName[0];
}

// callback
function getLastName(fullName){
    fullName = fullName.split(" ");
    return fullName[1];
}

// hof
function saysHi( fullName , fun ){

    let name = fun(fullName);
    console.log(name);

}

saysHi("Steve Rogers" , getFirstName);
saysHi("Tony Stark" , getLastName);