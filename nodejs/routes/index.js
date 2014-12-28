var mongodb = require('../data/mongodb');
var report = require('../data/report');
var reportSchema = report.Report;

exports.index = function(req, res) {
	console.log('user/index: ' + req.session.user);
	var hashid = req.url.substr(3);
	if (hashid === '') {
		res.render('index.ejs', {
			currPage : 'editor',
			hasHashKey : false,
			host : req.protocol + '://' + req.get('host'),
			userEmail : req.session.user ? req.session.user.email : null,
			username : req.session.user ? req.session.user.username : null,
			title : '',
			description : ''
		});
		return;
	}
	reportSchema.findOne({
		hashid : hashid
	}, function(err, doc) {
		if (err)
			throw err;
		if (doc === null) {
			res.send('404 Sorry, no such page...');
		} else {
			if (doc.qubeInfo == null)
				doc.qubeInfo = {
					dimensions : [],
					measures : []
				};
			if (doc.queryParam.filters == null)
				doc.queryParam.filters = {};
			if (doc.autoScale == null)
				doc.autoScale = false;
			if (doc.showLegend == null)
				doc.showLegend = true;
			res.render('index.ejs', {
				currPage : 'editor',
				hasHashKey : true,
				host : req.protocol + '://' + req.get('host'),
				hashid : doc.hashid,
				qubeInfo : JSON.stringify(doc.qubeInfo),
				queryParam : JSON.stringify(doc.queryParam),
				rptMode : doc.rptMode,
				chartMode : doc.chartMode,
				autoScale : JSON.stringify(doc.autoScale),
				showLegend : JSON.stringify(doc.showLegend),
				title : doc.title != null ? doc.title : '',
				description : doc.description != null ? doc.description : '',
				userEmail : req.session.user ? req.session.user.email : null,
				username : req.session.user ? req.session.user.username : null
			});
		}
	});
};

exports.newIndex = function(req, res) {
	reportSchema.find().select('-_id').sort({
		'creation_date' : -1
	}).limit(6).exec(function(err, reports) {
		if (err)
			console.log('Exception: ' + err);
		else {
			res.render('newIndex.ejs', {
				currPage : 'home',
				hasHashKey : false,
				host : req.protocol + '://' + req.get('host'),
				userEmail : req.session.user ? req.session.user.email : null,
				username : req.session.user ? req.session.user.username : null,
				reports : reports
			});
		}
	})
};

exports.helloworld = function(req, res) {
	res.send('Hello, World!');
};