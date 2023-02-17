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
         author: '63ed103e6f1f4b442d811824',
         location: `${cities[random1000].city}, ${cities[random1000].state}`,
         title: `${sample(descriptors)} ${sample(places)}`,
         description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente magnam a iste omnis soluta blanditiis optio vel? Vitae architecto repudiandae ut voluptates minima! Modi atque delectus quisquam laborum officiis veniam?',
         price,
         images: [
            {
                url: 'https://res.cloudinary.com/dsqmxw57a/image/upload/v1676477781/YelpCamp/ayfk13symwtkjytybhtz.jpg',
                filename: 'YelpCamp/ayfk13symwtkjytybhtz'
            },
            {
                url: 'https://res.cloudinary.com/dsqmxw57a/image/upload/v1676476819/YelpCamp/kpvkwevforjrjkr6ebb9.jpg',
                filename: 'YelpCamp/kpvkwevforjrjkr6ebb9'
            }
        ]
     })
     await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close()
})