const UserSchema = require("../../Model/UserSchema");
const bcrypt = require("bcryptjs");

const RegisterUser = async (req, res) => {
  try {
    const { email, password, phone, userName } = req.body;
    if (!email || !phone || !password || !userName) {
      return res
        .status(500)
        .json({ error: true, message: `Please fill all the required fields` });
    }
    const user = await UserSchema.findOne({ email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserSchema({
        userName,
        email,
        password: hashedPassword,
        phone,
      });
      await newUser.save();
      return res
        .status(200)
        .json({ success: true, message: "Profile Registerd" });
    }
    return res
      .status(404)
      .json({ error: true, message: "User allready exist" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: `some internal error ${error}` });
  }
};

const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(200).json({ error: true, message: "Wrong Email Id" });
    }
    const compairePassword = await bcrypt.compare(password, user.password);

    if (!compairePassword) {
      return res.status(200).json({ error: true, message: "Wrong Password" });
    }
    {
       
      return res
        .status(200)
        .json({ success: true, token: user.id, message:user });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ error: true, message: `Some Internal Error \n ${error}` });
  }
};


const PostPDF = async(req,res)=>{
    try {
        const {pdf,userId , address} = req.body
        const user =  await UserSchema.findById(userId)
        if(!user){
            return res
            .status(401)
            .json({ error: true, message: `User not registerd` }); 
        }
        
        await UserSchema.findByIdAndUpdate(userId,{$set:{address,pdf}})
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
        const {address} = req.body
        
        if(!address){
          return res
        .status(500)
        .json({ error: true, message: `Please fill all the required fields` });
        }
        const user =  await UserSchema.findOne({address})
        if(!user){
            return res
            .status(401)
            .json({ error: true, message: `User not registerd` }); 
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
module.exports = { RegisterUser, LoginUser,PostPDF,GetPDF };
