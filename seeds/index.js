const mongoose = require("mongoose");
const Campground = require("../models/campground");
const Users = require("../models/user");
const cities = require("./cities");
const {places, descriptors} = require("./seedHelpers")
mongoose.connect("mongodb+srv://vercel-airCamp-admin-user:KhtDdqHOKuFSAMNH@store.hzgmd.mongodb.net/airCamp?retryWrites=true&w=majority&appName=store")

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Databse connected")
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    const user = new Users({ email: "test@test.test", username: "airCamp" });
    const registeredUser = await Users.register(user, "password");
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10
        const camp = new Campground({
            author: registeredUser._id,
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            price 
        })
        await camp.save();
    }
}

seedDB().then(() =>{
    mongoose.connection.close()
})