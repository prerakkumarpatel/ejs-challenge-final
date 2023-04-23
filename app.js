//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to our blog! Here, you'll find engaging and informative articles on a variety of topics, ranging from technology and lifestyle to health and wellness. Our expert writers strive to bring you the latest insights, tips, and trends in a captivating and easy-to-understand manner. Whether you're a tech enthusiast, a health-conscious individual, or someone looking for practical lifestyle advice, our blog has something for everyone. Join us on this exciting journey of knowledge and exploration, and let's learn and grow together!.";
const aboutContent = "Welcome to our blog! We are a team of passionate writers who are dedicated to creating engaging and informative content on a wide range of topics. Our goal is to provide our readers with valuable insights, tips, and trends that can help them navigate various aspects of life. From technology and lifestyle to health and wellness, our blog covers diverse subjects to cater to a diverse audience. Our team of experts brings a wealth of knowledge and experience to our blog, ensuring that you get the most accurate and up-to-date information. We are committed to providing high-quality content that is easy to understand and relevant to your needs. Thank you for visiting our blog, and we look forward to sharing our knowledge with you!.";
const contactContent = "We love hearing from our readers! If you have any questions, comments, or feedback, please don't hesitate to get in touch with us. Our dedicated team is always ready to assist you. You can reach us via the contact form on our website or by sending us an email. We value your opinions and suggestions, and we're committed to providing you with the best possible experience on our blog. Don't hesitate to contact us for any inquiries or collaborations – we're here to help!.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
