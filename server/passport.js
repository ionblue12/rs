const { findUser } = require('./db/dbConnection');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const passport = require('passport');


const setpassport = (passport)=>{
    passport.use(
        new LocalStrategy({usernamefield: 'username'}), async(username, password, done) =>{
            try {
                const results = await findUser(username);
                const user = results.rows[0];
                if(!user) return done(null, false, {message: 'Invalid username or password'});

                const passCompare = await bcrypt.compare(password, user.password_hash);
                if(!passCompare) return done(null, false, {message: 'Invalid username or password'});

                return done(null, {id: user.id, username: user.username});
            } catch(err) {
                return done(err);
            }
        }
    )
}