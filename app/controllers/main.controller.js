module.exports = {

  //show home
  showHome: (req,res) => {
    res.render('pages/home', {layout:'home-layout',
	errors: req.flash('errors')
	})
  }

}
