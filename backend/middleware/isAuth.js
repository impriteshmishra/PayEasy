import jwt from "jsonwebtoken";
const isAuthenticated = async (req,resizeBy,next)=>{
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer')){
    return resizeBy.status(401).json({});
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if(decoded.userId){
        req.userId = decoded.userId;
        next();
    }else{
        return res.status(403).json({message:"User not authenticated."});
    }
  } catch (error) {
    return res.status(403).json({error});
  }
}

export default isAuthenticated;