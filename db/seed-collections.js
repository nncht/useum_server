const mongoose = require('mongoose');
const Collection = require('../models/Collection.model');

const collections = [
      {
      name: 'Gaming Gear Collection',
      description: 'A collection of gaming gear and accessories for the ultimate gaming setup.',
      },

      {
      name: 'Gaming Essentials Collection',
      description: 'A collection of essential gaming items, including controllers, headsets, and charging docks.',
      },

      {
      name: 'Gaming Upgrade Collection',
      description: 'A collection of gaming upgrades for enhancing your gaming experience.',
      },

      {
      name: 'Gaming Decor Collection',
      description: 'A collection of gaming-themed decor and accessories for your gaming space.',
      },

      {
      name: 'Gaming Performance Collection',
      description: 'A collection of performance-enhancing gaming peripherals and accessories.',
      },

      {
      name: 'Gaming Maintenance Collection',
      description: 'A collection of maintenance items for keeping your gaming equipment in top condition.',
      },

      {
      name: 'Gaming Setup Collection',
      description: 'A collection of items for setting up a complete gaming station.',
      },

      {
      name: 'Gaming Bundles Collection',
      description: 'A collection of gaming bundles that include multiple items for a complete gaming experience.',
      },

      {
      name: 'Gaming Gift Collection',
      description: 'A collection of gaming-related gifts for the gamer in your life.',
      },

      {
      name: 'Gaming Tech Collection',
      description: 'A collection of gaming-related technology and accessories for gamers.',
      },

      {
      name: 'Gaming Fun Collection',
      description: 'A collection of fun and entertaining gaming-related items.',
      },

      {
      name: 'Gaming Necessities Collection',
      description: 'A collection of necessary gaming items for any gamer.',
      },

      {
      name: 'Gaming Aesthetics Collection',
      description: 'A collection of aesthetically pleasing gaming accessories for your gaming setup.',
      },

      {
      name: 'Gaming Innovation Collection',
      description: 'A collection of innovative and unique gaming-related items.',
      },

      {
      name: 'Gaming Versatility Collection',
      description: 'A collection of versatile gaming peripherals and accessories.',
      },

      {
      name: 'Gaming Storage Collection',
      description: 'A collection of gaming storage solutions for organizing your gaming equipment and accessories.',
      },

      {
      name: 'Gaming Style Collection',
      description: 'A collection of stylish gaming peripherals and accessories.',
      },

      {
      name: 'Gaming Experience Collection',
      description: 'A collection of items for enhancing your gaming experience.',
      },

      {
      name: 'Gaming Add-Ons Collection',
      description: 'A collection of add-ons for your existing gaming setup.',
      },

      {
      name: 'Gaming Value Collection',
      description: 'A collection of high-quality gaming items at a great value.',
      },
      {
      name: 'Book Lover Collection',
      description: 'A collection of books for the avid reader and book enthusiast.',
      },

      {
      name: 'Classics Collection',
      description: 'A collection of classic books from various genres and time periods.',
      },

      {
      name: 'Essential Reading Collection',
      description: 'A collection of essential books for any well-rounded library.',
      },

      {
      name: 'Personal Library Collection',
      description: 'A collection of books for building your own personal library.',
      },

      {
      name: 'Top Rated Books Collection',
      description: 'A collection of highly rated books from various genres and authors.',
      },

      {
      name: 'Reading Nook Collection',
      description: 'A collection of cozy and comfortable books for your reading nook.',
      },

      {
      name: 'Book Club Collection',
      description: 'A collection of books for starting or joining a book club.',
      },

      {
      name: 'Literary Classics Collection',
      description: 'A collection of classic books from the canon of English literature.',
      },

      {
      name: 'Novel Collection',
      description: 'A collection of novels from various genres and authors.',
      },

      {
      name: 'Travel Books Collection',
      description: 'A collection of books for armchair travel and exploration.',
      },

      {
      name: 'Favorite Books Collection',
      description: 'A collection of favorite books from various genres and authors.',
      },

      {
      name: 'Non-Fiction Collection',
      description: 'A collection of non-fiction books on various subjects and topics.',
      },

      {
      name: 'Biography Collection',
      description: 'A collection of biographies and memoirs from various people and time periods.',
      },

      {
      name: 'Historical Fiction Collection',
      description: 'A collection of historical fiction books from various authors and time periods.',
      },

      {
      name: 'Poetry Collection',
      description: 'A collection of poetry books from various poets and time periods.',
      },

      {
      name: 'Fantasy Collection',
      description: 'A collection of fantasy books from various authors and time periods.',
      },

      {
      name: 'Mystery Collection',
      description: 'A collection of mystery books from various authors and time periods.',
      },

      {
      name: 'Science Fiction Collection',
      description: 'A collection of science fiction books from various authors and time periods.',
      },

      {
      name: 'Young Adult Collection',
      description: 'A collection of young adult books from various authors and genres.',
      },

      {
      name: 'Audio Books Collection',
      description: 'A collection of audio books for listening to your favorite books on-the-go.',
      },

      {
      name: 'Home Recording Studio Collection',
      description: 'A collection of equipment and software for setting up a home recording studio.',
      },

      {
      name: 'Beat Making Collection',
      description: 'A collection of tools and software for creating beats and producing music.',
      },

      {
      name: 'Mixing and Mastering Collection',
      description: 'A collection of plugins and tools for mixing and mastering music tracks.',
      },

      {
      name: 'Synthesizer Collection',
      description: 'A collection of hardware and software synthesizers for creating unique sounds.',
      },

      {
      name: 'Sample Library Collection',
      description: 'A collection of high-quality sample libraries for adding unique sounds and textures to music productions.',
      },

      {
      name: 'Sound Design Collection',
      description: 'A collection of tools and software for creating and editing sounds for music productions.',
      },

      {
      name: 'Virtual Instruments Collection',
      description: 'A collection of virtual instruments for adding different types of sounds to music productions.',
      },

      {
      name: 'Live Performance Collection',
      description: 'A collection of equipment and software for performing music live on stage.',
      },

      {
      name: 'Recording Accessories Collection',
      description: 'A collection of various accessories for recording music, such as stands, cables, and headphones.',
      },

      {
      name: 'DJ Tools Collection',
      description: 'A collection of tools and software for DJs to mix and play music in a live setting.',
      },

      {
      name: 'Digital Art Collection',
      description: 'A collection of digital art pieces from various artists and styles.',
      },

      {
      name: 'Character Illustration Collection',
      description: 'A collection of character illustrations from various artists and styles.',
      },

      {
      name: 'Fantasy Illustration Collection',
      description: 'A collection of fantasy-themed illustrations from various artists and styles.',
      },

      {
      name: 'Concept Art Collection',
      description: 'A collection of concept art pieces from various artists and styles.',
      },

      {
      name: 'Nature Illustration Collection',
      description: 'A collection of nature-themed illustrations from various artists and styles.',
      },

      {
      name: 'Portrait Illustration Collection',
      description: 'A collection of portrait illustrations from various artists and styles.',
      },

      {
      name: 'Anime and Manga Illustration Collection',
      description: 'A collection of anime and manga-style illustrations from various artists.',
      },

      {
      name: 'Abstract Illustration Collection',
      description: 'A collection of abstract illustrations from various artists and styles.',
      },

      {
      name: 'Line Art Collection',
      description: 'A collection of line art illustrations from various artists and styles.',
      },

      {
      name: 'Digital Painting Collection',
      description: 'A collection of digital paintings from various artists and styles.',
      },
      {
      name: 'Camera Lenses Collection',
      description: 'A collection of camera lenses from various brands and types.',
      },

      {
      name: 'Tripods and Supports Collection',
      description: 'A collection of tripods, monopods, and other supports for cameras.',
      },

      {
      name: 'Camera Bags and Cases Collection',
      description: 'A collection of camera bags and cases for storing and transporting equipment.',
      },

      {
      name: 'Camera Straps Collection',
      description: 'A collection of camera straps for carrying cameras comfortably and securely.',
      },

      {
      name: 'Flash and Lighting Collection',
      description: 'A collection of flash units and lighting equipment for photography.',
      },

      {
      name: 'Camera Accessories Collection',
      description: 'A collection of accessories for cameras, such as lens filters and remote controls.',
      },

      {
      name: 'Camera Bodies Collection',
      description: 'A collection of camera bodies from various brands and models.',
      },

      {
      name: 'Camera Cleaning and Maintenance Collection',
      description: 'A collection of cleaning and maintenance products for cameras and lenses.',
      },

      {
      name: 'Studio Equipment Collection',
      description: 'A collection of studio equipment for photography, such as backdrops and lighting stands.',
      },

      {
      name: 'Drone and Aerial Photography Collection',
      description: 'A collection of drones and equipment for aerial photography and videography.',
      },
      {
      name: 'Gym Essentials Collection',
      description: 'A collection of essential gym items for workouts, including clothing, shoes, bags, and resistance bands.',

      },

      {
      name: 'Fitness Gear Collection',
      description: 'A collection of gym gear for workouts, including clothing, shoes, bags, and resistance bands.',

      },

      {
      name: 'Workout Accessories Collection',
      description: 'A collection of gym accessories for workouts, including resistance bands, workout gloves, and water bottles.',

      },

      {
      name: 'Athletic Wear Collection',
      description: 'A collection of athletic wear for gym workouts, including leggings, shorts, and tank tops.',

      },

      {
      name: 'Gym Fashion Collection',
      description: 'A collection of fashionable gym clothes for men and women, including leggings, tank tops, and gym bags.',

      },

      {
      name: 'Training Gear Collection',
      description: 'A collection of training gear for gym workouts, including resistance bands, dumbbells, and workout gloves.',

      },

      {
      name: 'Gym Apparel Collection',
      description: 'A collection of gym apparel for men and women, including shirts, shorts, and workout pants.',

      },

      {
      name: 'Fitness Equipment Collection',
      description: 'A collection of fitness equipment for gym workouts, including resistance bands, yoga mats, and foam rollers.',

      },

      {
      name: 'Athletic Shoes Collection',
      description: 'A collection of athletic shoes for gym workouts, including training shoes and running shoes.',

      },

      {
      name: 'Fitness Accessories Collection',
      description: 'A collection of fitness accessories for gym workouts, such as water bottles, gym towels, and workout headbands.',

      },

      {
      name: 'Football Essentials',
      description: 'A collection of essential items for any football player, including cleats, balls, cones, and training equipment.',
      },

      {
      name: 'Football Gear Collection',
      description: 'A collection of various football gear including cleats, gloves, and compression clothing for the ultimate game-day experience.',
      },

      {
      name: 'Football Training Collection',
      description: 'A collection of football training equipment including agility ladders, resistance bands, and cones to help take your game to the next level.',
      },

      {
      name: 'Football Fan Collection',
      description: 'A collection of football-themed items including team jerseys, hats, and memorabilia for the ultimate fan.',
      },

      {
        name: 'Basketball Essentials',
        description: 'A collection of essential items for any basketball player, including basketballs, training cones, and resistance bands.',

      },

      {
        name: 'Basketball Training Collection',
        description: 'A collection of basketball training equipment including jump ropes, agility ladders, and resistance bands to help improve your skills on the court.',

      },

      {
        name: 'Basketball Accessories Collection',
        description: 'A collection of basketball accessories including headbands, wristbands, and sweat towels for a complete game-day experience.',

      },

      {
        name: 'Basketball Fan Collection',
        description: 'A collection of basketball-themed items including team jerseys, hats, and memorabilia for the ultimate fan.',

      },

      {
        name: 'Programming Essentials',
        description: 'A collection of essential programming resources including textbooks, reference guides, and online courses for beginners.',
      },

      {
        name: 'Programming Language Collection',
        description: 'A collection of resources focused on a specific programming language, including books, courses, and video tutorials to help you master it.',
      },

      {
        name: 'Web Development Collection',
        description: 'A collection of resources focused on web development including front-end and back-end technologies, frameworks, and tools.',
      },

      {
        name: 'Software Development Collection',
        description: 'A collection of resources focused on software development including project management tools, version control systems, and software testing frameworks.',
      },

      {
        name: 'RGB Light Strips Collection',
        description: 'A collection of different RGB light strips to add color to any room or setting.',
      },

      {
        name: 'Smart RGB Light Collection',
        description: 'A collection of smart RGB lights that can be controlled with a smartphone or voice assistant, and can be customized to fit any mood or setting.',
      },

      {
        name: 'RGB Light Accessories Collection',
        description: 'A collection of accessories for RGB lights, including extension cables, connectors, and mounting brackets.',
      },

      {
        name: 'RGB Gaming Setup Collection',
        description: 'A collection of RGB lights and accessories for a complete RGB gaming setup.',
      },

  ];




mongoose.connect('mongodb+srv://jchorzempa:Wl4xl6L2F11Yk8Mx@useumcluster.wevpu44.mongodb.net/?retryWrites=true&w=majority'
, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');

    Collection.create(collections)
      .then(() => console.log('Database seeded with collections'))
      .catch(error => console.error(error))
      .finally(() => mongoose.disconnect());
  })
  .catch(error => console.error(error));
