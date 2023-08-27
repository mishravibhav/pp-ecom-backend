const userSchema = {
    _id: {
        type: String,
        required: [true, "UserId is required"]
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    password: {
        type: String,
        required: [true, 'The Password is required']
    },
    email: {
        type: String,
        validate: [
            (v)=> { return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(v)},
            '{VALUE} is not a valid email!'
        ],
        lowercase: true,
        required: true
    },
    role: {
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        default: ['user']
    },
    secretKey: String,
    status: String,
    access: Array,
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: Date
}

module.exports = {
    userSchema
}