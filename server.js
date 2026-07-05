    const express = require('express')
    const mongoose = require('mongoose')
    const productModel = require('./Models/Product')
    const cors = require('cors')
    const cartModel = require('./Models/Cart')
    const userModel = require('./Models/userModel')
    const { default: userValidationFn } = require('./utils/authUtils')
    const session = require('express-session')
    const isAuth = require('./Middlewares/isAuthMiddleware')
    const Razorpay = require('razorpay')
    const mongodbSession = require('connect-mongodb-session')(session)
    const nodemailer = require('nodemailer')

    require('dotenv').config()

    const MONGO_URI = process.env.MONGO_URI
    mongoose.connect(MONGO_URI)
    .then(()=>{console.log("Connected to Database")})
    .catch((e)=>{console.log(e)})

    const store = new mongodbSession({
        uri : process.env.MONGO_URI,
        collection : 'session'
    })



    const app = express()
    //----------
    //claude suggestion
    app.set('trust proxy', 1)   // 👈 add this line
    // ---------

  app.use(cors({
  origin: ["http://localhost:5173", "https://trend-wear-test-z9so.vercel.app","https://trend-wear-frontend-test.vercel.app"],
  credentials: true
}));

    // ----------

    app.use(express.json())

    // -------------

    app.use(session({
        secret : process.env.SECRET_KEY,
        store : store,
        resave : false,
        saveUninitialized : false,
        cookie: {
        httpOnly: true,
        secure: true,        // required on Vercel (HTTPS)
        sameSite: "none",    // allow cross-site cookies
        maxAge: 1000 * 60 * 60
    }
    }))

    // ---------

    app.get('/',(req,res)=>{
        console.log("Home page")
        return res.status(200).json("Home Page")
    })

    app.use(express.json())
    app.use(express.urlencoded({extended:true}))

    app.get('/api/product/:category', isAuth, async(req,res)=>{
        try {
            const category = req.params.category
            console.log(category)
        const products = await productModel.find({category})
        res.send(products)
        
        } catch (error) {
            res.status(500).json("Server Error")    
        }

    })
    //--------
    app.get('/Cart', isAuth, async(req,res)=> {
    try {
        const items = await cartModel.find()
        console.log(items)
        return res.status(200).json(items)
    } catch (error) {
        return res.status(500).json('Server Error')
    }   
    })

    //--------
    app.post('/Cart',isAuth, async(req,res)=>{
        console.log('CartRoute')
        // console.log(req)
        console.log(req.body)
        const {_id, name, price, image, category} = req.body

    
    try {
        let existingProduct = await cartModel.findOne({_id : _id})
        if(existingProduct){
            existingProduct.quantity += 1;
            await existingProduct.save()
        }
        else{
    const cartObj = new cartModel({
            _id : _id,
            name : name,
            price : price,
            image : image,
            category : category,

        })

        const cartDB = await cartObj.save()
        return res.status(201).json('Cart Data saved Successfully', cartDB)
    } 
    }
    catch (error) {
        return res.status(500).json('Server Error',error)
    }

    })

    //-------------
    app.delete('/Cart/:id', isAuth, async(req,res)=>{

        const id = req.params.id
        console.log(id)
        try {
            const deletedItem = await cartModel.findOneAndDelete({_id : id})
            return res.status(200).json('Item deleted successfully',deletedItem)
        } catch (error) {
            return res.status(500).json('Server Error',error)
        }

    })

    //----
    app.put('/Cart/updateQuantity/:id', isAuth, async(req,res)=>{
        
        let {action} = req.body
        try {
            let item = await cartModel.findOne({_id : req.params.id})
            if(action == 'inc'){
                item.quantity += 1;
                await item.save();
            return res.status(200).json("Quantity updated successfully")
            }
            else if(action == 'dec'){
                if(item.quantity > 1){
                    item.quantity -= 1;
                    await item.save();
                    return res.status(200).json('Quantity Updated Successfully')
                }
                else{
                    await cartModel.findOneAndDelete({_id : req.params.id})
                    return res.status(200).json('Item deleted successfully')
                }
            }

        } catch (error) {
            return res.send(500).json("Server Error",error)
        }
    })

    //----
    // --------
    app.get('/filterItem', isAuth, async(req,res)=>{
        console.log(productModel)
        try {
            const filterProduct = await productModel.find() 
            console.log(filterProduct)
        return res.send(filterProduct)
        } catch (error) {
            return res.status(500).json('Server Error')
        }
    } )
    // -----------

    //----------
    //Register-form
    app.post('/register-form',async(req,res)=>{
        const {name, username, email, password, cpassword} = req.body
    console.log(name, username, email, password, cpassword);
    console.log(req.body)
        try {
            await userValidationFn({name,username,email,password,cpassword})
        } catch (error) {
            return res.status(400).json(error)
        }


        const userObj = userModel({
            name : name,
            username : username,
            email : email,
            password : password,
        })

            try {
                const userDb = await userObj.save()
                return res.status(201).json({ message: "User registered successfully", user: userDb })
            } catch (error) {
                return res.status(500).json('Internal Server Error')
            }


    

    })
    //----------
    //---------
    //login-form
    app.post('/login-form', async(req,res)=>{
        const {usernameOrEmail:userId, password} = req.body

        console.log(userId, password,req.body)
        let userData;
    try {
        if(userId.includes('@')){
        userData = await userModel.findOne({email : userId})
        
        }
        else{
            userData = await userModel.findOne({username:userId})
            
        }

        if(!userData){
            return res.status(400).json(`user not found`)

        }

        if(userData.password !== password){
            return res.status(400).json('Invalid Credentials')
        }
    req.session.isAuth = true;

    req.session.user = {
        userId : userData._id.toString(),
        username : userData.username,
        email : userData.email 
    }
    
        return res.status(200).json({ message: "Login successful", user: req.session.user });
        
    } catch (error) {
        return res.status(500).json(error, 'server error')
    }

    

    })
    //-------
    //RazorPay integration 
    app.post('/order',async(req,res)=>{

        const razorpay = new Razorpay({
            key_id : process.env.RAZORPAY_KEY_ID,
            key_secret : process.env.RAZORPAY_KEY_SECRET
        })

    if(!req.body){
    res.status(400).json('Bad Request')
    }

    const option = req.body
    const order = await razorpay.orders.create(option)

    if(!option){
    res.status(400).json('Bad Request')
    }

    res.json(order)

    })

    //-------
    // contactus-form

    app.post('/contactus', async(req,res)=>{
        console.log(req.body)
        const {name, email, message} = req.body
        console.log(name, email, message)

    
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                    },
            })
        
            try {
                const mailOption = await transporter.sendMail({
                from : `mohammedanismultani@gmail.com`,
                to : `mohammedanismultani@gmail.com`,
                subject: `New Contact Form Submission from ${name}`,
                text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
                html: `<p><b>Name:</b> ${name}<br><b>Email:</b> ${email}<br><b>Message:</b> ${message}</p>`, // HTML body
                replyTo: email // lets you reply directly to the user

            })
            res.status(200).json({
        status: "success",
        message: "Message delivered successfully!"
        });
            } catch (error) {
            console.log(error,'error')  
            }
        
    })


    //---------

    // app.listen(5000, (req,res)=> {
    //     console.log("Server is up and running at port 5000")
    // })

    // -----for vercel-----
    module.exports = app