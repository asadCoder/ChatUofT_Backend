
const userSchema = new mongoose.Schema({
    utorid:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true, 
    },
    password:{
        type: String, 
        required: true
    }

})

mongoose.model("User", userSchema)

