const mongoose = require('mongoose');
const Item = require('../models/Item.model');


    // create some sample items
    const items = [
      {
        name: 'Nintendo Switch',
        description: 'A hybrid gaming console that you can use at home or on the go.',
        category: 'Gaming',
      },
      {
        name: 'PlayStation 5',
        description: 'The latest gaming console from Sony with powerful hardware and exclusive games.',
        category: 'Gaming',
      },
      {
        name: 'Xbox Series X',
        description: 'Microsoft\'s flagship gaming console with 4K gaming and high-speed performance.',
        category: 'Gaming',
      },
      {
        name: 'Gaming Keyboard',
        description: 'A mechanical keyboard designed for gaming with customizable RGB lighting.',
        category: 'Gaming',
      },
      {
        name: 'Gaming Mouse',
        description: 'A high-precision gaming mouse with programmable buttons and adjustable DPI.',
        category: 'Gaming',
      },
      {
        name: 'Gaming Headset',
        description: 'An immersive gaming headset with 7.1 surround sound and a noise-cancelling microphone.',
        category: 'Gaming',
        },
        {
        name: 'Gaming Laptop',
        description: 'A high-performance gaming laptop with a fast refresh rate display and a powerful graphics card.',
        category: 'Gaming',
        },
        {
        name: 'Gaming Chair',
        description: 'An ergonomic gaming chair designed for comfort during long gaming sessions.',
        category: 'Gaming',
        },
        {
        name: 'Gaming Monitor',
        description: 'A high-resolution gaming monitor with a fast response time and a high refresh rate.',
        category: 'Gaming',
        },
        {
        name: 'Gaming Desk',
        description: 'A spacious gaming desk with adjustable height and built-in cable management.',
        category: 'Gaming',
        },
        {
        name: 'Gaming Controller',
        description: 'A wireless gaming controller with customizable buttons and a textured grip.',
        category: 'Gaming',
        },
        {
        name: 'VR Headset',
        description: 'An immersive virtual reality headset that transports you into your favorite games.',
        category: 'Gaming',
        },
        {
        name: 'Gaming Microphone',
        description: 'A high-quality gaming microphone with noise reduction and adjustable sensitivity.',
        category: 'Gaming',
        },
        {
        name: 'Gaming Backpack',
        description: 'A durable backpack with multiple compartments designed to hold your gaming gear.',
        category: 'Gaming',
        },
        {
        name: 'Gaming Console Stand',
        description: 'A stand designed to hold your gaming console and keep it cool during long gaming sessions.',
        category: 'Gaming',
        },
        {
        name: 'Gaming Glasses',
        description: 'Specialized glasses designed to reduce eye strain during long gaming sessions.',
        category: 'Gaming',
        },
        {
        name: 'Gaming Mouse Pad',
        description: 'A large gaming mouse pad with a smooth surface for precise mouse movements.',
        category: 'Gaming',
        },
        {
        name: 'Gaming Speakers',
        description: 'High-quality speakers designed to enhance your gaming experience with immersive sound.',
        category: 'Gaming',
        },
        {
        name: 'Gaming Router',
        description: 'A high-performance router with advanced features designed for online gaming.',
        category: 'Gaming',
        },
        {
        name: 'Gaming External Hard Drive',
        description: 'A high-capacity external hard drive to store all your favorite games and media.',
        category: 'Gaming',
        },
        {
        name: 'Gaming Capture Card',
        description: 'A device that allows you to capture and stream your gameplay in high quality.',
        category: 'Gaming',
        },
        {
            name: 'The Elements of Style',
            description: 'A timeless guide to English grammar and writing style.',
            category: 'Writing & Journalism',
          },
          {
            name: 'On Writing: A Memoir of the Craft',
            description: 'Stephen King\'s memoir and guide on the craft of writing.',
            category: 'Writing & Journalism',
          },
          {
            name: 'The AP Stylebook',
            description: 'The Associated Press\' guide to grammar, usage, and style for journalists.',
            category: 'Writing & Journalism',
          },
          {
            name: 'The Chicago Manual of Style',
            description: 'A comprehensive guide to grammar, punctuation, and style for writers and editors.',
            category: 'Writing & Journalism',
          },
          {
            name: 'The New York Times Manual of Style and Usage',
            description: 'The style guide used by journalists at The New York Times.',
            category: 'Writing & Journalism',
          },
          {
            name: 'The Art of Fiction',
            description: 'A collection of essays on the craft of writing fiction by prominent authors.',
            category: 'Writing & Journalism',
          },
          {
            name: 'The War of Art',
            description: 'A guide to overcoming creative blocks and achieving artistic success.',
            category: 'Writing & Journalism',
          },
          {
            name: 'Bird by Bird: Some Instructions on Writing and Life',
            description: 'Anne Lamott\'s memoir and guide to the writing process.',
            category: 'Writing & Journalism',
          },
          {
            name: 'The Best American Essays',
            description: 'An annual collection of the best essays published in American periodicals.',
            category: 'Writing & Journalism',
          },
          {
            name: 'The New Journalism',
            description: 'A collection of influential articles that helped define the "New Journalism" movement in the 1960s and 1970s.',
            category: 'Writing & Journalism',
          },
          {
            name: 'The Gonzo Papers',
            description: 'A collection of essays and articles by Hunter S. Thompson, one of the pioneers of "Gonzo journalism."',
            category: 'Writing & Journalism',
          },
          {
            name: 'Fear and Loathing on the Campaign Trail \'72',
            description: 'Hunter S. Thompson\'s account of the 1972 U.S. presidential election.',
            category: 'Writing & Journalism',
          },
          {
            name: 'All the President\'s Men',
            description: 'The story of the Watergate scandal by Washington Post reporters Bob Woodward and Carl Bernstein.',
            category: 'Writing & Journalism',
          },
          {
            name: 'The Devil and Sherlock Holmes',
            description: 'A collection of true crime stories by journalist David Grann.',
            category: 'Writing & Journalism',
          },
          {
            name: 'The Electric Kool-Aid Acid Test',
            description: 'Tom Wolfe\'s account of the psychedelic counterculture in the 1960s.',
            category: 'Writing & Journalism',
          },
          {
            name: 'The Right Stuff',
            description: 'Tom Wolfe\'s book about the early years of the U.S. space program and the test pilots who became astronauts.',
            category: 'Writing & Journalism',
          },
          {
            name: 'A Room of One\'s Own',
            description: 'Virginia Woolf\'s feminist essay on the need for women to have their own space and resources to pursue creative work.',
            category: 'Writing & Journalism',
          },
          {
            name: 'The Paris Review Interviews',
            description: 'A series of interviews with prominent writers published in The Paris Review literary magazine.',
            category: 'Writing & Journalism',
          },
          {
            name: 'Focusrite Scarlett 2i2',
            description: 'A 2-in, 2-out USB audio interface for recording music and podcasts.',
            category: 'Audio engineering',
            },
            {
            name: 'Shure SM7B',
            description: 'A classic microphone that is popular among podcasters and broadcasters.',
            category: 'Audio engineering',
            },
            {
            name: 'KRK Rokit RP5 G4',
            description: 'A pair of active studio monitors with a 5" woofer and a 1" tweeter.',
            category: 'Audio engineering',
            },
            {
            name: 'Avid Pro Tools',
            description: 'A digital audio workstation used for music and sound production.',
            category: 'Audio engineering',
            },
            {
            name: 'Ableton Live',
            description: 'A digital audio workstation used for music production and live performance.',
            category: 'Audio engineering',
            },
            {
            name: 'Universal Audio Apollo Twin',
            description: 'A high-quality audio interface with onboard processing for DSP plugins.',
            category: 'Audio engineering',
            },
            {
            name: 'Sennheiser HD 600',
            description: 'A pair of open-back headphones that are popular among audiophiles and mixing engineers.',
            category: 'Audio engineering',
            },
            {
            name: 'Neumann TLM 103',
            description: 'A large-diaphragm condenser microphone that is often used for vocals and acoustic instruments.',
            category: 'Audio engineering',
            },
            {
            name: 'Audacity',
            description: 'A free, open-source audio editing software for recording and mixing.',
            category: 'Audio engineering',
            },
            {
            name: 'iZotope RX 8',
            description: 'A software suite for audio restoration and repair, used by engineers and post-production professionals.',
            category: 'Audio engineering',
            },
            {
            name: 'Soundtoys 5',
            description: 'A bundle of creative audio effects plugins used for sound design and music production.',
            category: 'Audio engineering',
            },
            {
            name: 'Focal Shape 65',
            description: 'A pair of active studio monitors with a 6.5" woofer and a 1" tweeter.',
            category: 'Audio engineering',
            },
            {
            name: 'Waves SSL E-Channel',
            description: 'A plugin that emulates the SSL E-Series console channel strip, used in many recording studios.',
            category: 'Audio engineering',
            },
            {
            name: 'Shure SM57',
            description: 'A dynamic microphone that is commonly used for recording guitars and drums.',
            category: 'Audio engineering',
            },
            {
            name: 'Neutrik XLR connectors',
            description: 'High-quality XLR connectors used for professional audio cabling.',
            category: 'Audio engineering',
            },
            {
            name: 'PreSonus Studio One',
            description: 'A digital audio workstation used for music production, mixing, and mastering.',
            category: 'Audio engineering',
            },
            {
            name: 'dbx 286s',
            description: 'A microphone preamp and channel strip with a built-in compressor and de-esser.',
            category: 'Audio engineering',
            },
            {
            name: 'AKG K240 Studio',
            description: 'A pair of semi-open headphones that are often used for mixing and mastering.',
            category: 'Audio engineering',
            },
            {
            name: 'Steinberg Cubase',
            description: 'A digital audio workstation used for music production, mixing, and scoring.',
            category: 'Audio engineering',
            },
            {
                name: 'Canon EOS R5',
                description: 'A high-end mirrorless camera from Canon with 45 megapixels and 8K video capability.',
                category: 'Photography & Video',
              },
              {
                name: 'DJI Mavic 2 Pro',
                description: 'A powerful drone with a 4K camera and 3-axis gimbal for stable video footage.',
                category: 'Photography & Video',
              },
              {
                name: 'Adobe Premiere Pro',
                description: 'A professional video editing software with advanced features and intuitive interface.',
                category: 'Photography & Video',
              },
              {
                name: 'Fujifilm X-T4',
                description: 'A compact mirrorless camera from Fujifilm with 26 megapixels and 4K video capability.',
                category: 'Photography & Video',
              },
              {
                name: 'Rode VideoMic Pro',
                description: 'A high-quality shotgun microphone for cameras and audio recorders.',
                category: 'Photography & Video',
              },
              {
                name: 'GoPro HERO9 Black',
                description: 'A rugged action camera with 5K video capability and built-in stabilization.',
                category: 'Photography & Video',
              },
              {
                name: 'Manfrotto MT055CXPRO4',
                description: 'A versatile carbon fiber tripod for photography and videography.',
                category: 'Photography & Video',
              },
              {
                name: 'Sigma 35mm f/1.4 DG HSM Art',
                description: 'A fast and sharp prime lens for portrait and landscape photography.',
                category: 'Photography & Video',
              },
              {
                name: 'Blackmagic Pocket Cinema Camera 6K Pro',
                description: 'A professional cinema camera with 6K resolution and advanced features.',
                category: 'Photography & Video',
              },
              {
                name: 'DJI Ronin-S',
                description: 'A 3-axis gimbal for smooth video footage with DSLR and mirrorless cameras.',
                category: 'Photography & Video',
              },
              {
                name: 'Godox SL-60W',
                description: 'A powerful LED video light with adjustable brightness and color temperature.',
                category: 'Photography & Video',
              },
              {
                name: 'DxO PhotoLab',
                description: 'A comprehensive photo editing software with advanced features and noise reduction.',
                category: 'Photography & Video',
              },
              {
                name: 'Sony A7 III',
                description: 'A full-frame mirrorless camera with 24 megapixels and 4K video capability.',
                category: 'Photography & Video',
              },
              {
                name: 'Zhiyun Crane 2',
                description: 'A 3-axis gimbal for smooth video footage with DSLR and mirrorless cameras.',
                category: 'Photography & Video',
              },
              {
                name: 'SanDisk Extreme Pro',
                description: 'A high-speed and reliable memory card for photography and videography.',
                category: 'Photography & Video',
              },
              {
                name: 'Luminar AI',
                description: 'A revolutionary photo editing software with artificial intelligence and creative tools.',
                category: 'Photography & Video',
              },
              {
                name: 'Atomos Ninja V',
                description: 'A portable monitor and recorder for high-quality video footage.',
                category: 'Photography & Video',
              },
              {
                name: 'Manfrotto 502HD',
                description: 'A fluid video head with smooth panning and tilting for video cameras.',
                category: 'Photography & Video',
              },
              {
                name: 'Yoga Mat',
                description: 'A durable and non-slip mat for yoga practice.',
                category: 'Sport & Fitness'
              },
              {
                name: 'Running Shoes',
                description: 'High-performance shoes designed for running with cushioned soles and breathable uppers.',
                category: 'Sport & Fitness'
              },
              {
                name: 'Fitness Tracker',
                description: 'A device that tracks your activity, heart rate, and calories burned.',
                category: 'Sport & Fitness'
              },
              {
                name: 'Dumbbell Set',
                description: 'A set of adjustable dumbbells for strength training at home.',
                category: 'Sport & Fitness'
              },
              {
                name: 'Jump Rope',
                description: 'A durable and adjustable jump rope for cardio workouts.',
                category: 'Sport & Fitness'
              },
              {
                name: 'Foam Roller',
                description: 'A tool used for self-myofascial release to alleviate muscle soreness and tightness.',
                category: 'Sport & Fitness'
              },
              {
                name: 'Resistance Bands',
                description: 'A set of bands for resistance training and stretching.',
                category: 'Sport & Fitness'
              },
              {
                name: 'Exercise Ball',
                description: 'A large and sturdy ball used for core and balance exercises.',
                category: 'Sport & Fitness'
              },
              {
                name: 'Weighted Vest',
                description: 'A vest with adjustable weights for adding resistance to bodyweight exercises.',
                category: 'Sport & Fitness'
              },
              {
                name: 'Kettlebell',
                description: 'A cast-iron ball with a handle used for strength and conditioning exercises.',
                category: 'Sport & Fitness'
              },
              {
                name: 'Compression Socks',
                description: 'Socks designed to improve blood circulation and reduce muscle fatigue during workouts.',
                category: 'Sport & Fitness'
              },
              {
                name: 'Exercise Bike',
                description: 'An indoor bike for cardiovascular workouts.',
                category: 'Sport & Fitness'
              },
              {
                name: 'Pull-Up Bar',
                description: 'A bar that can be mounted on a doorframe for upper body and core exercises.',
                category: 'Sport & Fitness'
              },
              {
                name: 'Treadmill',
                description: 'A machine for walking, jogging, and running indoors.',
                category: 'Sport & Fitness'
              },
              {
                name: 'Gym Bag',
                description: 'A spacious bag for carrying gym clothes and equipment.',
                category: 'Sport & Fitness'
              },
              {
                name: 'Hand Grippers',
                description: 'A tool for strengthening grip and hand muscles.',
                category: 'Sport & Fitness'
              },
              {
                name: 'Yoga Block',
                description: 'A block used for support and alignment in yoga poses.',
                category: 'Sport & Fitness'
              },
              {
                name: 'Ab Roller',
                description: 'A device for core exercises that targets the abs and obliques.',
                category: 'Sport & Fitness'
              },
              {
                name: 'Gymnastic Rings',
                description: 'A pair of rings for suspension training and bodyweight exercises.',
                category: 'Sport & Fitness'
              },
              {
                name: 'MacBook Pro',
                description: 'A powerful laptop for programming and development work.',
                category: 'Programming',
              },
              {
                name: 'VS Code',
                description: 'A lightweight and highly customizable code editor.',
                category: 'Programming',
              },
              {
                name: 'Github',
                description: 'A web-based platform for version control and collaborative software development.',
                category: 'Programming',
              },
              {
                name: 'Docker',
                description: 'A containerization platform for building, shipping, and running applications.',
                category: 'Programming',
              },
              {
                name: 'AWS',
                description: 'A cloud computing platform for hosting and scaling web applications.',
                category: 'Programming',
              },
              {
                name: 'React',
                description: 'A popular JavaScript library for building user interfaces.',
                category: 'Programming',
              },
              {
                name: 'Node.js',
                description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
                category: 'Programming',
              },
              {
                name: 'Python',
                description: 'A high-level programming language for general-purpose programming.',
                category: 'Programming',
              },
              {
                name: 'Ruby on Rails',
                description: 'A web application framework written in the Ruby programming language.',
                category: 'Programming',
              },
              {
                name: 'MySQL',
                description: 'An open-source relational database management system.',
                category: 'Programming',
              },
              {
                name: 'PostgreSQL',
                description: 'An open-source object-relational database management system.',
                category: 'Programming',
              },
              {
                name: 'GitLab',
                description: 'A web-based Git repository manager that provides continuous integration and deployment.',
                category: 'Programming',
              },
              {
                name: 'Jupyter Notebook',
                description: 'An open-source web application for creating and sharing documents that contain live code, equations, visualizations, and narrative text.',
                category: 'Programming',
              },
              {
                name: 'TensorFlow',
                description: 'An open-source software library for dataflow and differentiable programming across a range of tasks.',
                category: 'Programming',
              },
              {
                name: 'PyTorch',
                description: 'An open-source machine learning library based on the Torch library.',
                category: 'Programming',
              },
              {
                name: 'Java',
                description: 'A class-based, object-oriented programming language.',
                category: 'Programming',
              },
              {
                name: 'Scala',
                description: 'A general-purpose programming language providing support for functional programming and a strong static type system.',
                category: 'Programming',
              },
              {
                name: 'Kubernetes',
                description: 'An open-source container orchestration platform for automating deployment, scaling, and management of containerized applications.',
                category: 'Programming',
              },
              {
                name: 'Elasticsearch',
                description: 'A search engine based on the Lucene library, with support for full-text search and structured search.',
                category: 'Programming',
              },
              {
                name: 'Redis',
                description: 'An open-source, in-memory data structure store, used as a database, cache, and message broker.',
                category: 'Programming',
              },
                    
            
    ];

    const MONGO_URI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/association_server"
  
  mongoose
  .connect(MONGO_URI)
  .then(() => {
      // loop through categories array and create category documents in the database
      Item.create(items)
        .then(() => console.log('Database seeded with categories'))
        .catch(error => console.error(error))
        .finally(() => mongoose.disconnect());
    })
    .catch(error => console.error(error));