const mongoose = require('mongoose');
const Comment = require('../models/Comment.model');

const comments = [
    {
      title: 'Better than the competition',
      body: 'I really like this product, it works well and is very useful.',
    },
    {
      title: 'Disagree with some points',
      body: 'I have tried other products similar to this one, but this one is by far the best. I highly recommend it.',
    },
    {
      title: 'Impressive performance',
      body: 'This product exceeded my expectations. It works fast and efficiently.',
    },
    {
      title: 'Great for everyday use',
      body: 'I use this product almost every day and it has never failed me. Highly recommend it to anyone looking for a reliable product.',
    },
    {
      title: 'Easy to use',
      body: 'This product is very easy to use and saves me a lot of time. I love it!',
    },
    {
      title: 'Perfect for my needs',
      body: 'I was looking for a product like this for a long time and finally found it. It fits all my needs and I am very satisfied with my purchase.',
    },
    {
      title: 'Excellent value for money',
      body: 'This product is very affordable and has all the features I need. Definitely recommend it to anyone on a budget.',
    },
    {
      title: 'Beautiful design',
      body: 'Not only is this product functional, but it also looks great. I love the design and how it fits with my other electronics.',
    },
    {
      title: 'Long-lasting durability',
      body: 'I have been using this product for years and it still works just as well as the day I bought it. Definitely a high-quality product.',
    },
    {
    title: 'Life-changing product!',
    body: 'I can\'t believe how much easier this product has made my life. I wish I had discovered it sooner!',
    },
    {
    title: 'Works like a charm',
    body: 'I was skeptical at first, but after using this product for a few days, I am blown away by how well it works.',
    },
    {
    title: 'My go-to product',
    body: 'Whenever I need something to help me with [task], I always turn to this product. It never disappoints!',
    },
    {
    title: 'Great for beginners',
    body: 'I was intimidated by [task], but this product made it so much easier for me to get started. Highly recommend it to anyone new to [task]!',
    },
    {
    title: 'Makes me feel like a pro',
    body: 'I\'m not an expert at [task], but this product makes me feel like one. I\'m able to accomplish so much more with it!',
    },
    {
    title: 'Impressive quality',
    body: 'The build quality of this product is impressive. I can tell it was made with care and attention to detail.',
    },
    {
    title: 'Worth the investment',
    body: 'I was hesitant to spend so much money on a [product type], but after using this one, I can say with confidence that it was worth every penny.',
    },
    {
    title: 'So much better than the old one',
    body: 'I had been using an old [product type] for years, but this one blows it out of the water. I wish I had upgraded sooner!',
    },
    {
    title: 'Helps me stay organized',
    body: 'I have a busy schedule, but this product helps me keep everything in order. It\'s a lifesaver!',
    },
    {
    title: 'Saves me so much time',
    body: 'Before using this product, [task] used to take me forever. Now, I can get it done in no time. Thanks, [product name]!',
    },
    {
    title: 'A must-have for [task]',
    body: 'If you\'re serious about [task], you need to get this product. It will make your life so much easier.',
    },
    {
    title: 'Easy to use',
    body: 'Even though I\'m not very tech-savvy, I found this product to be very easy to use. The instructions were clear and easy to follow.',
    },
    {
    title: 'Fun and functional',
    body: 'Not only is this product incredibly useful, it\'s also a lot of fun to use. I actually look forward to [task] now!',
    },
    {
    title: 'Looks great on my desk',
    body: 'I know looks aren\'t everything, but this product looks amazing on my desk. It\'s definitely a conversation starter!',
    },
    {
    title: 'This thing is wilder than a raccoon in a dumpster fire!',
    body: 'I swear this product changed my life. I mean, I was living in my van for a while there, and this thing made it feel like a luxury RV. Highly recommend for all my nomadic bros out there.',
    },
    {
    title: 'I love this thing more than my momma!',
    body: 'This product is the bees knees, the cat\'s pajamas, the whole enchilada! I don\'t know what I would do without it. It\'s like having a personal assistant, therapist, and lover all in one.',
    },
    {
    title: 'This product is a real panty dropper!',
    body: 'I ain\'t saying this thing got me laid, but it definitely didn\'t hurt my chances. Every time I whip this bad boy out, the ladies can\'t resist. Maybe it\'s the sleek design or the impressive features, who knows. All I know is, it works.',
    },
    {
    title: 'This product is the real MVP!',
    body: 'I can\'t believe I ever lived without this thing. It\'s like the Swiss Army knife of products - it can do anything and everything. I use it to make my morning coffee, take notes, and even entertain my cat. It\'s a true game-changer.',
    },
    {
    title: 'This product is the truth',
    body: 'I was skeptical at first, but this product has changed my life. I even used it to shave my beard, and now I look like a baby bird with alopecia.',
    },
    {
    title: 'Better than a bologna sandwich',
    body: 'I\'ve been using this product for a month now and it\'s amazing. It\'s like a warm hug from a long-lost uncle, but without the questionable touching.',
    },
    {
    title: 'It\'s a game-changer, ya\'ll',
    body: 'I don\'t know what kind of voodoo magic they put in this product, but it\'s legit. It\'s like the lovechild of Dolly Parton and Harry Potter - unexpected, but delightful.',
    },
    {
    title: 'My new best friend',
    body: 'I\'m not saying this product is the only reason I wake up in the morning, but it\'s definitely up there. It\'s like having a loyal sidekick, but without the awkward spandex outfits.',
    },
    {
    title: 'I didn\'t know I needed this, but I did',
    body: 'I thought I had my life together until I discovered this product. Now, it\'s like the missing puzzle piece that completes the picture. It\'s like finding out you have a secret talent for yodeling - unexpected, but kinda cool.',
    }
  ];

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/association_server';

mongoose.connect(MONGO_URI)
  .then(() => {
    // loop through comments array and create comment documents in the database
    Comment.create(comments)
      .then(() => console.log('Database seeded with comments.'))
      .catch(error => console.error(error))
      .finally(() => mongoose.disconnect());
  })
  .catch(error => console.error(error));