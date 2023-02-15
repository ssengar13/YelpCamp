const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length )];

const seedDB = async () => {
    await campground.deleteMany({});
    for(let i=0; i<50; i++) {
     const random1000 = Math.floor(Math.random() * 1000)
     const price = Math.floor(Math.random() * 20) + 10;
     const camp = new campground({
         author: '63e3a84a07737325e0e3dab0',
         location: `${cities[random1000].city}, ${cities[random1000].state}`,
         title: `${sample(descriptors)} ${sample(places)}`,
         image: 'https://source.unsplash.com/collection/483251',
         description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente magnam a iste omnis soluta blanditiis optio vel? Vitae architecto repudiandae ut voluptates minima! Modi atque delectus quisquam laborum officiis veniam?',
         price
     })
     await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close()
})