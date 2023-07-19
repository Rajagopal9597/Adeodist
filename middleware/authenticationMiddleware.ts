
import jwt from 'jsonwebtoken';



export const authenticate = function (req: any, res: any, next: any) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ status: "failure", message:"token missing"  });
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, 'secret-key');

 // if (!decoded || !decoded.userData) {
   // return res.status(401).json({ status: config.api.message.failure, message: config.api.message.tokenError });
  //}

 
    next();
    
    

};