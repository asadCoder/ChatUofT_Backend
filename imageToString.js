function convertImage(image, utorid){
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
        profilesCollection.updateOne({ utorid: utorid }, { $set: { profile_pic: imageBuffer } }, function(err, result) {
        if (err) throw err;
        
        console.log(imageBuffer);
        console.log(`Image added to the profile with utorid ${utorid}.`);

        // Close the database connection
        client.close();
        });
    });
    });
}

convertImage("a.png", "helloid");
