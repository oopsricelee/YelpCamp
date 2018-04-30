// Middleware
var middlewareObj = {};
var Campground = require('../models/campground'),
    Comment = require('../models/comment');

middlewareObj.checkOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash('error', 'Campground not found');
                res.redirect('back');
            }
            else{
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash('error', "You don't have permission to do that");
                    res.redirect('back');
                }
            }
        });
    }
    else{
        req.flash('error', 'You need to login to do that');
        res.redirect('back');
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.commentId, function(err, foundComment){
            if(err){
                req.flash('error', 'Comment not found');
                res.redirect('back');
            }
            else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash('error', "You don't have permission to do that");
                    res.redirect('back');
                }
            }
        });
    }
    else{
        req.flash('error', 'You need to login to do that');
        res.redirect('back');
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'Please Login First');
    res.redirect('/login');
};

module.exports = middlewareObj;