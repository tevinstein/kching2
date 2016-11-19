  const Model = require('../models/datas')

  module.exports = {
      addTheData: addTheData,
      showDatas: showDatas,
      showData: showData,
      showAdd: showAdd,
      processAdd: processAdd,
      showEdit: showEdit,
      processEdit: processEdit,
      deleteData: deleteData
  }

  function addTheData(req,res) {
      //validate information
      req.checkBody('salary', 'Salary is required').notEmpty()
      req.checkBody('balance', 'Balance is required').notEmpty()

      //if there's errors, redirect and save errors to flash
      const errors = req.validationErrors()
      if (errors) {
          req.flash('errors', errors.map(err => err.msg))
          return res.redirect('/')
      }

      //create a new data
      var data = new Model.Data({
          salary: req.body.salary,
          pay_date: req.body.pay_date,
          balance: req.body.balance,
          total_expenses: 0
      })

      data.save((err) => {
          if (err)
              throw err

          //set successful flash message
          req.flash('success', 'Add successful! Start by adding your daily expenses below!')

          //redirect to url, not ejs file!
          res.redirect(`/datas/${data._id}`)
      })
  }

  //show all datas
  function showDatas(req, res) {
      //get all datas
      Model.Data.findOne({ _id: req.params.id }, (err, datas) => {
          if (err) {
              res.status(404)
              res.send('Datas not found!')
          }

          for(var i=0; i<datas.expenses.length;i++){
            datas.balance -= datas.expenses[i].cost
            datas.total_expenses += datas.expenses[i].cost  
          }

          if(datas.balance < 0) {
            datas.balance = 0
          }
          
          //return a view with data
          res.render('pages/datas', {
              datas: datas,
              success: req.flash('success')
          })
      })
  }

  //add data
  function showAdd(req, res) {
      var currentid = req.params.id

      res.render('pages/add', {
          errors: req.flash('errors'),
          currentid: currentid
      })
  }

  function processAdd(req, res) {
      //validate information
      req.checkBody('category', 'Category is required').notEmpty()
      req.checkBody('date', 'Date is required').notEmpty()
      req.checkBody('cost', 'Cost is required').notEmpty()

      //if there's errors, redirect and save errors to flash
      const errors = req.validationErrors()
      if (errors) {
          req.flash('errors', errors.map(err => err.msg))
          return res.redirect(`/datas/${req.params.id}/add`)
      }

      Model.Data.findOne({ _id: req.params.id }, (err, data) => {
        if(req.file){
          data.expenses.push({
              category: req.body.category,
              date: req.body.date,
              cost: req.body.cost,
              image: req.file.filename
          })
        } else {
          data.expenses.push({
              category: req.body.category,
              date: req.body.date,
              cost: req.body.cost
          })
        }
          

          data.save((err) => {
              if (err)
                  throw err;

              req.flash('success', 'Successfully added an expense')
              res.redirect(`/datas/${data._id}/${data.expenses[data.expenses.length-1]._id}`)

          })
      })
  }

  //show single data
  function showData(req, res) {
      //get a single data
      Model.Data.findOne({ _id: req.params.id } ,(err, datas) => {
          if (err) {
              res.status(404)
              res.send('Data not found!')
          }

          var data = datas.expenses.id(req.params.expensesid)

          res.render('pages/single', {
              data: data,
              datas: datas,
              success: req.flash('success')
          })
        })
  }

  //delete data
  function deleteData(req, res) {
      Model.Data.findOne({ _id: req.params.id }, (err,datas) => {

        var data = datas.expenses.id(req.params.expensesid)
        data.remove()
        datas.save((err) => {
              if (err)
                  throw err;

              req.flash('success', 'Data is deleted!')
              res.redirect(`/datas/${datas.id}`)
          })
      })
  }

  //edit data
  function showEdit(req, res) {
      Model.Data.findOne({ _id: req.params.id }, (err, datas) => {

          var data = datas.expenses.id(req.params.expensesid)

          res.render('pages/edit', {
              datas: datas,
              data: data,
              errors: req.flash('errors')
          })
      })
  }

  function processEdit(req, res) {
      //validate information
      req.checkBody('category', 'Category is required').notEmpty()
      req.checkBody('date', 'Date is required').notEmpty()
      req.checkBody('cost', 'Cost is required').notEmpty()

      //if there's errors, redirect and save errors to flash
      const errors = req.validationErrors()
      if (errors) {
          req.flash('errors', errors.map(err => err.msg))
          return res.redirect(`/datas/${req.params.id}/${req.params.expensesid}/edit`)
      }

      //finding a current data
      Model.Data.findOne({ _id: req.params.id }, (err, datas) => {
          //update the data
          var data = datas.expenses.id(req.params.expensesid)

          data.category = req.body.category
          data.date = req.body.date
          data.cost = req.body.cost
          
          if(req.file){
            data.image = req.file.filename
          } 
        
          datas.save((err) => {
              if (err)
                  throw err;

              req.flash('success', 'Successfully updated data')
              res.redirect(`/datas/${datas._id}/${data._id}`)
          })
      })
  }

  
