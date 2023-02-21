const mongoose  = require('mongoose');

function countCommonElements(arr1, arr2) {
    let count = 0;
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i] === arr2[j]) {
          count++;
        }
      }
    }
    return count;
  }
async function recommendUsers(currentUser) {
    let max = 0;
    let sug = null;
    let mongoose = require('mongoose');
    mongoose.connect('mongodb+srv://uoft:uoft@database1.muiq2mi.mongodb.net/?retryWrites=true&w=majority').then(() => {
        const db = mongoose.connection.db;
        db.collection('profiles').find().toArray((courses, results) => {
            for (const result of results) {
                
                if(result.utorid!=currentUser.utorid)
                {
                    let numComC = 0;
                    let numComI = 0;
                    let numComT = 0;
                    numComC = countCommonElements(result.courses, currentUser.courses);
                    numComI = countCommonElements(result.interests, currentUser.interests);
                    numComT = numComC + numComI;

                    if(numComT>max)
                    {
                        max = numComT;
                        sug = result;
                        console.log(sug.name);
                        //console.log("???????????????????");
                    }
                }
            }
            console.log("*************************");
            console.log(currentUser.name);
            console.log("Recommended: ",sug.name);
            console.log("**************************");
            return sug;
        });
    }).catch(err => console.log(err.message))
  
}


mongoose.connect('mongodb+srv://uoft:uoft@database1.muiq2mi.mongodb.net/?retryWrites=true&w=majority').then(() => {
    const db = mongoose.connection.db;
    db.collection('profiles').find().toArray((courses, results) => {
        for (const result of results) {

            console.log((recommendUsers(result)));
            
        }
        
    });
}).catch(err => console.log(err.message))