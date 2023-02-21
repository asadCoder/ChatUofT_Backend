const mongoose  = require('mongoose');

async function copyCoursesToChatId() {
//   mongoose .connect('mongodb+srv://uoft:uoft@database1.muiq2mi.mongodb.net/?retryWrites=true&w=majority');
//   const db = mongoose.connection.db;
  
//   const usersCollection = db.collection('test', 'testusers');
  
//   const documents = await usersCollection.find({});

//   for (const document of documents) {
//     const courses = document.courses || []; 
//     const chatId = courses.join(','); 
//     await usersCollection.update(document._id, {
//       chat_id: chatId
//     });
//   }

    let mongoose = require('mongoose');
    mongoose.connect('mongodb+srv://uoft:uoft@database1.muiq2mi.mongodb.net/?retryWrites=true&w=majority').then(() => {
        const db = mongoose.connection.db;
        db.collection('profiles').find().toArray((courses, results) => {
            for (const result of results) {

                const courses = result.courses || []; 
                const chatId = courses; 
                db.collection('profiles').updateOne({_id: result._id}, {$set: {chat_id: chatId}})

            }
            
        });
    }).catch(err => console.log(err.message))
}

async function main() {
  try {

    await copyCoursesToChatId();
    
    console.log('Courses copied to chat_id successfully.');
    return;
  } catch (error) {
    console.error(error);
  }
}

main();

