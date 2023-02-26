const UserSchema = require("../../Model/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const RegisterUser = async (req, res) => {
  try {
    const {walletAddress, email } = req.body;
    if (!walletAddress || !email) {
      return res
        .status(500)
        .json({ error: true, message: `Please provide 'walletAddress' and 'email' ` });
    }
    const user = await UserSchema.findOne({ email });
    const token = jwt.sign({id:walletAddress},process.env.SECRET)
    if (!user) {
      const hashedwalletAddress = await bcrypt.hash(walletAddress, 10);
      const newUser = new UserSchema({
        walletAddress:hashedwalletAddress,
        email
      });
      await newUser.save();
      return res
      .status(200)
      .json({ success: true, message: "Profile Registerd",token });
    }
    const compairWalletAddress = await bcrypt.compare(walletAddress,user.walletAddress)
    if(compairWalletAddress){
        return res.status(200).json({success:true,message:"Login successfull",token })
      }
      return res.status(200).json({error:true,message:"Login failed : Wrong walletAddress" })
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: `some internal error ${error}` });
  }
};
 

const PostPDF = async(req,res)=>{
    try {
        const {pdf,email,pdfAddress} = req.body
        if (!pdf || !email) {
          return res
            .status(500)
            .json({ error: true, message: `Please provide 'pdf' and 'email' ` });
        }
        const user =  await UserSchema.findById(email)
        if(!user){
            return res
            .status(401)
            .json({ error: true, message: `User not registerd` }); 
        }
        
        await UserSchema.findOneAndUpdate({email},{$set:{pdf,pdfAddress}})
        return res
      .status(200)
      .json({ success: true, message: `Pdf Saved in Database` });
    } catch (error) {
        return res
      .status(401)
      .json({ error: true, message: `Some Internal Error \n ${error}` });
    }
}
const GetPDF = async(req,res)=>{
    try {
        const {pdfAddress} = req.body
        
        if(!pdfAddress){
          return res
        .status(500)
        .json({ error: true, message: `Please provide 'pdfAddress'` });
        }
        const user =  await UserSchema.findOne({pdfAddress})
        if(!user){
            return res
            .status(401)
            .json({ error: true, message: `Pdf note in database` }); 
        }
        
        return res
      .status(200)
      .json({ success: true, message: user });
    } catch (error) {
        return res
      .status(401)
      .json({ error: true, message: `Some Internal Error \n ${error}` });
    }
}
module.exports = { RegisterUser,PostPDF,GetPDF };
