const mongoose = require('mongoose');
const Collection = require('../models/Collection.model');

const collections = [
      {
      name: 'Gaming Gear Collection',
      description: 'A collection of gaming gear and accessories for the ultimate gaming setup.',
      category: 'Gaming'
      },
      
      {
      name: 'Gaming Essentials Collection',
      description: 'A collection of essential gaming items, including controllers, headsets, and charging docks.',
      category: 'Gaming'
      },
      
      {
      name: 'Gaming Upgrade Collection',
      description: 'A collection of gaming upgrades for enhancing your gaming experience.',
      category: 'Gaming'
      },
      
      {
      name: 'Gaming Decor Collection',
      description: 'A collection of gaming-themed decor and accessories for your gaming space.',
      category: 'Gaming'
      },
      
      {
      name: 'Gaming Performance Collection',
      description: 'A collection of performance-enhancing gaming peripherals and accessories.',
      category: 'Gaming'
      },
      
      {
      name: 'Gaming Maintenance Collection',
      description: 'A collection of maintenance items for keeping your gaming equipment in top condition.',
      category: 'Gaming'
      },
      
      {
      name: 'Gaming Setup Collection',
      description: 'A collection of items for setting up a complete gaming station.',
      category: 'Gaming'
      },
      
      {
      name: 'Gaming Bundles Collection',
      description: 'A collection of gaming bundles that include multiple items for a complete gaming experience.',
      category: 'Gaming'
      },
      
      {
      name: 'Gaming Gift Collection',
      description: 'A collection of gaming-related gifts for the gamer in your life.',
      category: 'Gaming'
      },
      
      {
      name: 'Gaming Tech Collection',
      description: 'A collection of gaming-related technology and accessories for gamers.',
      category: 'Gaming'
      },
      
      {
      name: 'Gaming Fun Collection',
      description: 'A collection of fun and entertaining gaming-related items.',
      category: 'Gaming'
      },
      
      {
      name: 'Gaming Necessities Collection',
      description: 'A collection of necessary gaming items for any gamer.',
      category: 'Gaming'
      },
      
      {
      name: 'Gaming Aesthetics Collection',
      description: 'A collection of aesthetically pleasing gaming accessories for your gaming setup.',
      category: 'Gaming'
      },
      
      {
      name: 'Gaming Innovation Collection',
      description: 'A collection of innovative and unique gaming-related items.',
      category: 'Gaming'
      },
      
      {
      name: 'Gaming Versatility Collection',
      description: 'A collection of versatile gaming peripherals and accessories.',
      category: 'Gaming'
      },
      
      {
      name: 'Gaming Storage Collection',
      description: 'A collection of gaming storage solutions for organizing your gaming equipment and accessories.',
      category: 'Gaming'
      },
      
      {
      name: 'Gaming Style Collection',
      description: 'A collection of stylish gaming peripherals and accessories.',
      category: 'Gaming'
      },
      
      {
      name: 'Gaming Experience Collection',
      description: 'A collection of items for enhancing your gaming experience.',
      category: 'Gaming'
      },
      
      {
      name: 'Gaming Add-Ons Collection',
      description: 'A collection of add-ons for your existing gaming setup.',
      category: 'Gaming'
      },
      
      {
      name: 'Gaming Value Collection',
      description: 'A collection of high-quality gaming items at a great value.',
      category: 'Gaming'
      },
      {
      name: 'Book Lover Collection',
      description: 'A collection of books for the avid reader and book enthusiast.',
      category: 'Books',
      },
      
      {
      name: 'Classics Collection',
      description: 'A collection of classic books from various genres and time periods.',
      category: 'Books',
      },
      
      {
      name: 'Essential Reading Collection',
      description: 'A collection of essential books for any well-rounded library.',
      category: 'Books',
      },
      
      {
      name: 'Personal Library Collection',
      description: 'A collection of books for building your own personal library.',
      category: 'Books',
      },
      
      {
      name: 'Top Rated Books Collection',
      description: 'A collection of highly rated books from various genres and authors.',
      category: 'Books',
      },
      
      {
      name: 'Reading Nook Collection',
      description: 'A collection of cozy and comfortable books for your reading nook.',
      category: 'Books',
      },
      
      {
      name: 'Book Club Collection',
      description: 'A collection of books for starting or joining a book club.',
      category: 'Books',
      },
      
      {
      name: 'Literary Classics Collection',
      description: 'A collection of classic books from the canon of English literature.',
      category: 'Books',
      },
      
      {
      name: 'Novel Collection',
      description: 'A collection of novels from various genres and authors.',
      category: 'Books',
      },
      
      {
      name: 'Travel Books Collection',
      description: 'A collection of books for armchair travel and exploration.',
      category: 'Books',
      },
      
      {
      name: 'Favorite Books Collection',
      description: 'A collection of favorite books from various genres and authors.',
      category: 'Books',
      },
      
      {
      name: 'Non-Fiction Collection',
      description: 'A collection of non-fiction books on various subjects and topics.',
      category: 'Books',
      },
      
      {
      name: 'Biography Collection',
      description: 'A collection of biographies and memoirs from various people and time periods.',
      category: 'Books',
      },
      
      {
      name: 'Historical Fiction Collection',
      description: 'A collection of historical fiction books from various authors and time periods.',
      category: 'Books',
      },
      
      {
      name: 'Poetry Collection',
      description: 'A collection of poetry books from various poets and time periods.',
      category: 'Books',
      },
      
      {
      name: 'Fantasy Collection',
      description: 'A collection of fantasy books from various authors and time periods.',
      category: 'Books',
      },
      
      {
      name: 'Mystery Collection',
      description: 'A collection of mystery books from various authors and time periods.',
      category: 'Books',
      },
      
      {
      name: 'Science Fiction Collection',
      description: 'A collection of science fiction books from various authors and time periods.',
      category: 'Books',
      },
      
      {
      name: 'Young Adult Collection',
      description: 'A collection of young adult books from various authors and genres.',
      category: 'Books',
      },
      
      {
      name: 'Audio Books Collection',
      description: 'A collection of audio books for listening to your favorite books on-the-go.',
      category: 'Books',
      },
      {
      name: 'Music Lovers Collection',
      description: 'A collection of music for the avid listener and music enthusiast.',
      category: 'Music',
      },

      {
      name: 'Personal Music Library Collection',
      description: 'A collection of music for building your own personal music library.',
      category: 'Music',
      },

      {
      name: 'Top Rated Music Collection',
      description: 'A collection of highly rated music from various genres and artists.',
      category: 'Music',
      },

      {
      name: 'Essential Music Collection',
      description: 'A collection of essential music for any well-rounded music library.',
      category: 'Music',
      },

      {
      name: 'The Soundtrack Collection',
      description: 'A collection of music soundtracks from various movies and TV shows.',
      category: 'Music',
      },

      {
      name: 'Discovery Music Collection',
      description: 'A collection of new and upcoming music artists and releases.',
      category: 'Music',
      },

      {
      name: 'Musical Masterpieces Collection',
      description: 'A collection of musical masterpieces from various composers and performers.',
      category: 'Music',
      },

      {
      name: 'Party Time Collection',
      description: 'A collection of music for hosting a party or gathering.',
      category: 'Music',
      },

      {
      name: 'Global Beats Collection',
      description: 'A collection of music from various countries and cultures.',
      category: 'Music',
      },

      {
      name: 'Retrowave Collection',
      description: 'A collection of retro-inspired electronic music from various artists.',
      category: 'Music',
      },

      {
      name: 'Mood Music Collection',
      description: 'A collection of music for different moods and occasions.',
      category: 'Music',
      },

      {
      name: 'Musical Memories Collection',
      description: 'A collection of music from various decades and time periods.',
      category: 'Music',
      },

      {
      name: 'The Best of Collection',
      description: 'A collection of the best music from various artists and genres.',
      category: 'Music',
      },

      {
      name: 'The Classics Collection',
      description: 'A collection of classic music from various composers and time periods.',
      category: 'Music',
      },

      {
      name: 'New Wave Collection',
      description: 'A collection of new and emerging music artists and genres.',
      category: 'Music',
      },

      {
      name: 'Artists to Watch Collection',
      description: 'A collection of new and upcoming music artists to watch out for.',
      category: 'Music',
      },

      {
      name: 'Chill Out Collection',
      description: 'A collection of relaxing and soothing music for winding down and unwinding.',
      category: 'Music',
      },

      {
      name: 'Feel Good Collection',
      description: 'A collection of uplifting and positive music for boosting your mood.',
      category: 'Music',
      },

      {
      name: 'The Future of Music Collection',
      description: 'A collection of experimental and innovative music from various genres.',
      category: 'Music',
      },

      {
      name: 'Musical Journey Collection',
      description: 'A collection of music for taking you on a musical journey through different sounds and cultures.',
      category: 'Music',
      },
      {
      name: 'Home Recording Studio Collection',
      description: 'A collection of equipment and software for setting up a home recording studio.',
      category: 'Music Production',
      },

      {
      name: 'Beat Making Collection',
      description: 'A collection of tools and software for creating beats and producing music.',
      category: 'Music Production',
      },

      {
      name: 'Mixing and Mastering Collection',
      description: 'A collection of plugins and tools for mixing and mastering music tracks.',
      category: 'Music Production',
      },

      {
      name: 'Synthesizer Collection',
      description: 'A collection of hardware and software synthesizers for creating unique sounds.',
      category: 'Music Production',
      },

      {
      name: 'Sample Library Collection',
      description: 'A collection of high-quality sample libraries for adding unique sounds and textures to music productions.',
      category: 'Music Production',
      },

      {
      name: 'Sound Design Collection',
      description: 'A collection of tools and software for creating and editing sounds for music productions.',
      category: 'Music Production',
      },

      {
      name: 'Virtual Instruments Collection',
      description: 'A collection of virtual instruments for adding different types of sounds to music productions.',
      category: 'Music Production',
      },

      {
      name: 'Live Performance Collection',
      description: 'A collection of equipment and software for performing music live on stage.',
      category: 'Music Production',
      },

      {
      name: 'Recording Accessories Collection',
      description: 'A collection of various accessories for recording music, such as stands, cables, and headphones.',
      category: 'Music Production',
      },

      {
      name: 'DJ Tools Collection',
      description: 'A collection of tools and software for DJs to mix and play music in a live setting.',
      category: 'Music Production',
      },

      {
      name: 'Digital Art Collection',
      description: 'A collection of digital art pieces from various artists and styles.',
      category: 'Digital Illustration',
      },

      {
      name: 'Character Illustration Collection',
      description: 'A collection of character illustrations from various artists and styles.',
      category: 'Digital Illustration',
      },

      {
      name: 'Fantasy Illustration Collection',
      description: 'A collection of fantasy-themed illustrations from various artists and styles.',
      category: 'Digital Illustration',
      },

      {
      name: 'Concept Art Collection',
      description: 'A collection of concept art pieces from various artists and styles.',
      category: 'Digital Illustration',
      },

      {
      name: 'Nature Illustration Collection',
      description: 'A collection of nature-themed illustrations from various artists and styles.',
      category: 'Digital Illustration',
      },

      {
      name: 'Portrait Illustration Collection',
      description: 'A collection of portrait illustrations from various artists and styles.',
      category: 'Digital Illustration',
      },

      {
      name: 'Anime and Manga Illustration Collection',
      description: 'A collection of anime and manga-style illustrations from various artists.',
      category: 'Digital Illustration',
      },

      {
      name: 'Abstract Illustration Collection',
      description: 'A collection of abstract illustrations from various artists and styles.',
      category: 'Digital Illustration',
      },

      {
      name: 'Line Art Collection',
      description: 'A collection of line art illustrations from various artists and styles.',
      category: 'Digital Illustration',
      },

      {
      name: 'Digital Painting Collection',
      description: 'A collection of digital paintings from various artists and styles.',
      category: 'Digital Illustration',
      },
      {
      name: 'Camera Lenses Collection',
      description: 'A collection of camera lenses from various brands and types.',
      category: 'Photography Equipment',
      },

      {
      name: 'Tripods and Supports Collection',
      description: 'A collection of tripods, monopods, and other supports for cameras.',
      category: 'Photography Equipment',
      },

      {
      name: 'Camera Bags and Cases Collection',
      description: 'A collection of camera bags and cases for storing and transporting equipment.',
      category: 'Photography Equipment',
      },

      {
      name: 'Camera Straps Collection',
      description: 'A collection of camera straps for carrying cameras comfortably and securely.',
      category: 'Photography Equipment',
      },

      {
      name: 'Flash and Lighting Collection',
      description: 'A collection of flash units and lighting equipment for photography.',
      category: 'Photography Equipment',
      },

      {
      name: 'Camera Accessories Collection',
      description: 'A collection of accessories for cameras, such as lens filters and remote controls.',
      category: 'Photography Equipment',
      },

      {
      name: 'Camera Bodies Collection',
      description: 'A collection of camera bodies from various brands and models.',
      category: 'Photography Equipment',
      },

      {
      name: 'Camera Cleaning and Maintenance Collection',
      description: 'A collection of cleaning and maintenance products for cameras and lenses.',
      category: 'Photography Equipment',
      },

      {
      name: 'Studio Equipment Collection',
      description: 'A collection of studio equipment for photography, such as backdrops and lighting stands.',
      category: 'Photography Equipment',
      },

      {
      name: 'Drone and Aerial Photography Collection',
      description: 'A collection of drones and equipment for aerial photography and videography.',
      category: 'Photography Equipment',
      },
      {
      name: 'Gym Essentials Collection',
      description: 'A collection of essential gym items for workouts, including clothing, shoes, bags, and resistance bands.',
      category: 'Gym',
      },

      {
      name: 'Fitness Gear Collection',
      description: 'A collection of gym gear for workouts, including clothing, shoes, bags, and resistance bands.',
      category: 'Gym',
      },

      {
      name: 'Workout Accessories Collection',
      description: 'A collection of gym accessories for workouts, including resistance bands, workout gloves, and water bottles.',
      category: 'Gym',
      },

      {
      name: 'Athletic Wear Collection',
      description: 'A collection of athletic wear for gym workouts, including leggings, shorts, and tank tops.',
      category: 'Gym',
      },

      {
      name: 'Gym Fashion Collection',
      description: 'A collection of fashionable gym clothes for men and women, including leggings, tank tops, and gym bags.',
      category: 'Gym',
      },

      {
      name: 'Training Gear Collection',
      description: 'A collection of training gear for gym workouts, including resistance bands, dumbbells, and workout gloves.',
      category: 'Gym',
      },

      {
      name: 'Gym Apparel Collection',
      description: 'A collection of gym apparel for men and women, including shirts, shorts, and workout pants.',
      category: 'Gym',
      },

      {
      name: 'Fitness Equipment Collection',
      description: 'A collection of fitness equipment for gym workouts, including resistance bands, yoga mats, and foam rollers.',
      category: 'Gym',
      },

      {
      name: 'Athletic Shoes Collection',
      description: 'A collection of athletic shoes for gym workouts, including training shoes and running shoes.',
      category: 'Gym',
      },

      {
      name: 'Fitness Accessories Collection',
      description: 'A collection of fitness accessories for gym workouts, such as water bottles, gym towels, and workout headbands.',
      category: 'Gym',
      },

      {
      name: 'Football Essentials',
      description: 'A collection of essential items for any football player, including cleats, balls, cones, and training equipment.',
      category: 'Football'
      },
      
      {
      name: 'Football Gear Collection',
      description: 'A collection of various football gear including cleats, gloves, and compression clothing for the ultimate game-day experience.',
      category: 'Football'
      },
      
      {
      name: 'Football Training Collection',
      description: 'A collection of football training equipment including agility ladders, resistance bands, and cones to help take your game to the next level.',
      category: 'Football'
      },
      
      {
      name: 'Football Fan Collection',
      description: 'A collection of football-themed items including team jerseys, hats, and memorabilia for the ultimate fan.',
      category: 'Football'
      },

      {
        name: 'Basketball Essentials',
        description: 'A collection of essential items for any basketball player, including basketballs, training cones, and resistance bands.',
        category: 'Basketball'
      },
      
      {
        name: 'Basketball Training Collection',
        description: 'A collection of basketball training equipment including jump ropes, agility ladders, and resistance bands to help improve your skills on the court.',
        category: 'Basketball'
      },
      
      {
        name: 'Basketball Accessories Collection',
        description: 'A collection of basketball accessories including headbands, wristbands, and sweat towels for a complete game-day experience.',
        category: 'Basketball'
      },
      
      {
        name: 'Basketball Fan Collection',
        description: 'A collection of basketball-themed items including team jerseys, hats, and memorabilia for the ultimate fan.',
        category: 'Basketball'
      }, 

      {
        name: 'Programming Essentials',
        description: 'A collection of essential programming resources including textbooks, reference guides, and online courses for beginners.',
        category: 'Programming'
      },
      
      {
        name: 'Programming Language Collection',
        description: 'A collection of resources focused on a specific programming language, including books, courses, and video tutorials to help you master it.',
        category: 'Programming'
      },
      
      {
        name: 'Web Development Collection',
        description: 'A collection of resources focused on web development including front-end and back-end technologies, frameworks, and tools.',
        category: 'Programming'
      },
      
      {
        name: 'Software Development Collection',
        description: 'A collection of resources focused on software development including project management tools, version control systems, and software testing frameworks.',
        category: 'Programming'
      },

      {
        name: 'RGB Light Strips Collection',
        description: 'A collection of different RGB light strips to add color to any room or setting.',
        category: 'RGB Light'
      },
      
      {
        name: 'Smart RGB Light Collection',
        description: 'A collection of smart RGB lights that can be controlled with a smartphone or voice assistant, and can be customized to fit any mood or setting.',
        category: 'RGB Light'
      },
      
      {
        name: 'RGB Light Accessories Collection',
        description: 'A collection of accessories for RGB lights, including extension cables, connectors, and mounting brackets.',
        category: 'RGB Light'
      },
      
      {
        name: 'RGB Gaming Setup Collection',
        description: 'A collection of RGB lights and accessories for a complete RGB gaming setup.',
        category: 'RGB Light'
      },

  ];

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/association_server';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');

    Collection.create(collections)
      .then(() => console.log('Database seeded with collections'))
      .catch(error => console.error(error))
      .finally(() => mongoose.disconnect());
  })
  .catch(error => console.error(error));
