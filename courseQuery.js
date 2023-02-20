async function query() {
    const MongoClient = require('mongodb').MongoClient;
  
    // Connection URL and database name
    const url = 'mongodb+srv://minjun:minjun1@database1.muiq2mi.mongodb.net/?retryWrites=true&w=majority';
    const dbName = 'test';
  
    // Define the utorid of the profile to find
    const utorid = '333';
  
    // Connect to the database and find the profile by utorid
    const client = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
    const db = client.db(dbName);
    const profilesCollection = db.collection('profiles');
    const profile = await profilesCollection.findOne({ utorid: utorid });
  
    // Check if the profile exists
    if (!profile) {
      console.log(`Profile with utorid ${utorid} not found.`);
      client.close();
      return;
    }
  
    console.log(`Profile with utorid ${utorid} found:`, profile);
  
    const coursesToAdd = profile.courses;
  
    // Iterate over the current courses and add them to the courses collection
    for (const courseCode of coursesToAdd) {
      const coursesCollection = db.collection('courses');
      const query = { code: courseCode };
      const result = await coursesCollection.find(query).toArray();
  
      if (result.length > 0) {
        console.log(`Course with code ${courseCode} already exists:`, result[0]);
  
        // Update the chat_ids field of the corresponding profile item
        const updateQuery = { utorid: utorid };
        const updateValues = { $addToSet: { chat_ids: courseCode } };
        await profilesCollection.updateOne(updateQuery, updateValues);
        console.log(`Course with code ${courseCode} added to chat_ids field of profile with utorid ${utorid}.`);
      } else {
        // Add the course to the courses collection
        const courseToAdd = { code: courseCode };
        await coursesCollection.insertOne(courseToAdd);
        console.log(`Course with code ${courseCode} added to the courses collection.`);
  
        // Update the chat_ids field of the corresponding profile item
        const updateQuery = { utorid: utorid };
        const updateValues = { $addToSet: { chat_ids: courseCode } };
        await profilesCollection.updateOne(updateQuery, updateValues);
        console.log(`Course with code ${courseCode} added to chat_ids field of profile with utorid ${utorid}.`);
      }
    }
  
    client.close();
  }
  
  async function main() {
    try {
      await query();
      console.log('Query completed successfully.');
    } catch (error) {
      console.error(error);
    }
  }
  
  main();
  