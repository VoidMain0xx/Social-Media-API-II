import userModel from './user.Model.js'
import jwt from 'jsonwebtoken';
import UserRepository from './user.repository.js';
import bcrypt from 'bcrypt';
import { otp } from '../../Middleware/sendMail.js';

var generatedOtp = otp;
export default class userController{
    constructor(){
        this.UserRepository = new UserRepository();
    }

    async singUp(req , res){
        const {name , email , password} =  req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new userModel(name, email, hashedPassword); 
        await this.UserRepository.singUp(user);
        res.status(201).send(user);
    }

    async signIn(req, res, next) {
        try{
          // 1. Find user by email.
          const user = await this.UserRepository.findByEmail(req.body.email);
          if(!user){
            return res
            .status(400)
            .send('Incorrect Credentials');
          } else {
            // 2. Compare password password with hashed password.
            const result = await bcrypt.compare(req.body.password, user.password);
            if(result){
              // 3. Create token.
              const token = jwt.sign(
                {
                  userID: result.id,
                  email: result.email,
                },
                'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
                {
                  expiresIn: '7d',
                }
              );
          // 4. Send token.
          return res.status(200).send(token);
            } else {
              return res
            .status(400)
            .send('Incorrect Credentials');
            }
          }
      } catch(err){
          console.log(err);
        }
      }
    
      async getOtp(req , res){
         try {
          const email = req.body;
          const result = await this.UserRepository.getOtp(email);
          return res.status(201).send(result);
         } catch (error) {
          console.log(error);
         }
      }
    
      async verifyOtp(req , res ){
        try {
          const {email , otp} = req.body;
          // find vai email

          const user = await this.UserRepository.findByEmail(email);
          console.log(user);

          if(!user){
            res.status(404).send("User Not Found");
          }

          if( user.otp !== otp){
            res.status(404).send("Invalid Otp");
          }

          await this.UserRepository.verifyOtp(user._id, null);
          res.status(201).json({ message: 'OTP verified successfully' });

        } catch (error) {
          console.log(error);
        }
      }
    
      async newPassword(req , res){
        try {
          const { email, newPassword } = req.body;
      
          // Find the user by email
          const user = await this.UserRepository.findByEmail(email);
      
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          // Update the user's password
          const updatedUser = await this.UserRepository.resetPassword(user._id, newPassword);
      
          res.json({ message: 'Password reset successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    }


   