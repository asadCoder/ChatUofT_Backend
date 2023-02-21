const mongodb = require('mongodb');
const fs = require('fs');

function convertImage(image, utorid, callback) {
    const fs = require('fs');
    const mongodb = require('mongodb');

    // Load the image into a buffer
    const imageBuffer = fs.readFileSync(image);

    const url = 'mongodb+srv://minjun:minjun1@database1.muiq2mi.mongodb.net/test?retryWrites=true&w=majority';
    const dbName = 'test';

    const client = new mongodb.MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });

    // Connect to the database and update the profile with the matching utorid
    client.connect(function(err) {
        if (err) throw err;

        const db = client.db(dbName);
        const profilesCollection = db.collection('profiles');

        // Find the profile with the matching utorid
        profilesCollection.findOne({ utorid: utorid }, function(err, profile) {
            if (err) throw err;

            // Update the profile with the image buffer
            profilesCollection.updateOne({ utorid: utorid }, { $set: { image: imageBuffer } }, function(err, result) {
                if (err) throw err;

                // Pass the image buffer to the callback function
                callback(imageBuffer);

                console.log(`Image added to the profile with utorid ${utorid}.`);

                // Close the database connection
                client.close();
            });
        });
    });
}

function convertBack(bufferString){
    const fs = require('fs');

    // binary buffer string from the database

    // write the buffer data to a new file
    fs.writeFile('newImage.jpg', bufferString, 'binary', function(err) {
    if (err) throw err;
    console.log('Image file created from buffer data');
    });

}


function getImageFromDatabase(utorid, callback) {
  const url = 'mongodb+srv://minjun:minjun1@database1.muiq2mi.mongodb.net/test?retryWrites=true&w=majority';
  const dbName = 'test';

  const client = new mongodb.MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });

  client.connect(function(err) {
    if (err) throw err;

    const db = client.db(dbName);
    const profilesCollection = db.collection('profiles');
    
    profilesCollection.findOne({ utorid: utorid }, function(err, profile) {
      if (err) throw err;

      if (!profile || !profile.image) {
        return callback(new Error('No image found for the given utorid.'));
      }

      const imageBuffer = profile.image.buffer;
      client.close();
      return callback(null, imageBuffer);
    });
  });
}

convertImage("ron.jpg", "user2", function(imageBuffer) {
    console.log(`Image buffer length: ${imageBuffer.length}`);
    //convertBack(imageBuffer)
});

// getImageFromDatabase("user2", function(err, imageBuffer) {
//     if (err) {
//       console.error(err);
//       return;
//     }
  
//     // Write the image buffer to a file
//     console.log("image.jpg created");
//     fs.writeFileSync('image.jpg', imageBuffer);
// });
