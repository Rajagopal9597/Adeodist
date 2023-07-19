import { Router, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../schemas/user';
import { authenticate } from '../middleware/authenticationMiddleware';

const SignInRouter = Router();

SignInRouter.post('/signin', async (req: Request, res: Response) => {
  const { email, password } = req.body;
if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
 try {
       const user = await User.findOne({ where: { email } });
      if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.get('password'));
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const token = jwt.sign({ userId: user.get('id'), email: user.get('email'), role:user.get('role') }, 'secret-key');
    res.json({ token });
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ message: 'An error occurred during sign-in.' });
  }
});


SignInRouter.post('/signup', async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role ) {
      return res.status(400).json({ message: 'Name, email,role and password are required.' });
    }
  
    try {
      const existingUser = await User.findOne({ where: { email } });
  
      if (existingUser) {
        return res.status(409).json({ message: 'A user with this email already exists.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword, role });
      await newUser.save();
      const token = jwt.sign({ userId: newUser.get('id'), email: newUser.get('email') }, 'your-secret-key');
      res.json({ token });
    } catch (error) {
      console.error('Error during sign-up:', error);
      res.status(500).json({ message: 'An error occurred during sign-up.' });
    }
  });



  SignInRouter.post('/protected',authenticate, async (req: Request, res: Response) => {
      return res.status(200).json({message:"Accessed protected route"})
     
  });


/*SignInRouter.post('/createadmin', authenticate, (req: CustomRequest, res: Response) => {
    // console.log(req.user)
     try{
         if(req.user?.role !== "superAdmin"){
             return res.status(420).json({ status:"failed",message: "You are not authorized to create admin" });
         }
         const { name,role,email, password } = req.body;
         let emailExists = false
         db.query(findUser, [email], (err: Error | null, results: any) => {
             if (err) {
               console.error('Error executing the query:', err);
               return res.status(500).json({ error: 'Internal server error' });
             }
         
             if (results.length !== 0) {
                 emailExists = true
               return res.status(404).json({ status:"failure",message: 'User Already exists' });
             }if(role !== "superAdmin" && !emailExists){
                 db.query(createUser, [name,role,email,password], (err: Error | null, results: any) => {
                     if (err) {
                       console.error('Error executing the query:', err);
                       return res.status(500).json({ error: 'Internal server error' });
                     }else{
                         return res.status(200).json({ status:"success",message: 'user added successfully' });
                     }
                 })
             }else{
                 return res.status(420).json({ status:"failed",message: "You are not authorized to create superAdmin" });
             }
             })
 
     }catch(err){
         return res.status(500).json({ status:"failed",message: err });
     }
    
   });*/

export default SignInRouter;
