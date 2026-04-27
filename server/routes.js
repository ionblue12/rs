const express = require('express');
const { getRecipes, getRecipeId, showIngredientsId, newUser, deleteRecipeId, recipeById } = require('./serverFunctions');
const router = express.Router();
const { requireAuth } = require('./middleware');
const passport = require('passport');


router.get('/profile', requireAuth, (req, res) =>{
    res.json({profile: req.user});
});


/*router.post('/login', (req, res , next) =>{
    passport.authenticate('local', (err, user, info) =>{
        if(err) return next(err);
        if(!user) return res.status(401).json({error: info?.message || 'Login failde'});

        req.logIn(user, (err2) =>{
            if(err2) return next(err2);
            return res.json({ok: true, user: req.user});
        });
    })(req, res, next);
});*/
router.get("/me", (req, res) => {
  res.json({ user: req.user || null });
});

/*router.post("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(() => res.json({ ok: true }));
  });
});*/


router.get('/recipes/mine', requireAuth, getRecipes);
router.get('/recipes/recipesteps/:recipe_id', requireAuth, getRecipeId);
router.get('/recipes/ingredients/:recipe_id',requireAuth, showIngredientsId);
router.post('/register', newUser);
router.delete('/recipes/:id',requireAuth, deleteRecipeId);
router.get('/recipes/:id', requireAuth, recipeById);




module.exports = router;