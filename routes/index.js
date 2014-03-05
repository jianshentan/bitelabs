
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index');
};

exports.legal = function(req, res){
    res.render('legal');
};

exports.process = function(req, res){
    res.render('process');
};
