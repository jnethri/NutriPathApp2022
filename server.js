var express = require('express');
var app = express();

var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//Old connstring: mongodb://admin:password@ds115671.mlab.com:15671/npuserdatabase
//New connstring: mongodb+srv://npAdmin:<password>@maincluster-ne3rf.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://npAdmin:lol12345@maincluster-ne3rf.mongodb.net/test?retryWrites=true&w=majority',
{ useNewUrlParser: true,
useUnifiedTopology: true });

mongoose.set('useCreateIndex', true);
app.set('views', './server/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(session({secret: 'go herd', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride());

var Schema = mongoose.Schema;
var userModel = require('./server/models/User');
var User = mongoose.model('User');
var foodModel = require('./server/models/Food');
var Food = mongoose.model('Food');
var mealModel = require('./server/models/Meal');
var Meal = mongoose.model('Meal');
var dayModel = require('./server/models/Day');
var Day = mongoose.model('Day');

var auth = require('./server/auth');
var users = require('./server/controllers/users');
var foods = require('./server/controllers/foods');
var meals = require('./server/controllers/meals');
var days = require('./server/controllers/days');

passport.use(new LocalStrategy(
	function(username, password, done){
		User.findOne({username: username}).exec(function(err, user){
			if(user && user.authenticate(password)){
				return done(null, user);
			}
			else{
				return done(null, false);
			}
		})
	}
));

passport.serializeUser(function(user, done){
	if(user){
		done(null, user._id);
	}
});

passport.deserializeUser(function(id, done){
	User.findOne({_id:id}).exec(function(err, user){
		if(user){
			return done(null, user);
		}
		else{
			return done(null, false);
		}
	})
});

app.post('/login', auth.authenticate);

app.post('/logout', function(req, res){
	req.logout();
	res.end();
});

//app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
app.post('/api/users', users.createUser);
app.put('/api/users/:id', users.editGoals);

app.put('/api/foods/post/:id', foods.addFoodItem);
app.put('/api/foods/put/:id', foods.editFoodItem);
app.put('/api/foods/delete/:id', foods.deleteFoodItem);

app.put('/api/meals/post/:id', meals.addMeal);
app.put('/api/meals/delete/:id', meals.deleteMeal);
app.put('/api/meals/put/:id', meals.editMeal);

app.put('/api/days/post/:id', days.addDay);
app.put('/api/days/delete/:id', days.deleteDay);
app.put('/api/days/put/:id', days.editDay);

app.get('/api/users', function(req, res){
	User.find(function(err, users){
		if (err)
			res.send(err);
		res.json(users);
	});
});



app.get('/partials/*', function(req, res){
	res.render('../../public/app/' + req.params[0]);
});

app.all('/api/*', function(req,res){
	res.send(404);
});

app.get('*', function(req, res) {
	//res.sendfile('./public/app/index.html');
	res.render('index', {
		bootstrappedUser: req.user
	});
});

app.listen(process.env.PORT || 3000);
