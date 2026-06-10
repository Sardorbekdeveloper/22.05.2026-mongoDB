const CustomErrorHandler = require("../error/error");
const AuthSchema = require("../schema/auth.schema");
const sendEmail = require("../utils/email-sender");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const { access_token, refresh_token } = require("../utils/token-generator");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const foundedUser = await AuthSchema.findOne({email})

        if(foundedUser) {
            throw CustomErrorHandler.UnAuthorized("User already exists")
        }

        const randomCode = Array.from({length: 6}, () => Math.floor(Math.random() * 9)).join("")

        const dateNow = Date.now() + 120000

        const hashPassword = await bcrypt.hash(password, 12)

        await sendEmail(email, randomCode)

        await AuthSchema.create({
            username,
            email,
            password: hashPassword,
            otp: randomCode,
            otpTime: dateNow
        })

        res.status(201).json({
            message: "Registered"
        })


    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const verify = async (req, res) => {
  try {
    const { email, code } = req.body

    const foundedUser = await AuthSchema.findOne({email})

    if(!foundedUser) {
      throw CustomErrorHandler.UnAuthorized("User not found")
    }

    if(foundedUser.otpTime < Date.now()) {
      throw CustomErrorHandler.UnAuthorized("code expired")
    }

    if(foundedUser.otp !== code) {
      throw CustomErrorHandler.UnAuthorized("Wrong code")
    }
 

  const payload = {
  id: foundedUser._id,
  email: foundedUser.email,
  role: foundedUser.role
}

console.log("SECRET_KEY:", process.env.SECRET_KEY)

const access = access_token(payload)
const refresh = refresh_token(payload)

res.cookie("accessToken", access, {httpOnly: true, maxAge: 60 * 1000 *15})
res.cookie("refreshToken", refresh, {httpOnly:true, maxAge: 60*1000*60*24*7})


await AuthSchema.findByIdAndUpdate(
  foundedUser._id,
  { otp: "", otpTime: 0 }
)

res.status(200).json({
  message: "Success",
  token: access
})

  }
     catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

      
        const foundedUser = await AuthSchema.findOne({ email });

        if (!foundedUser) {
            throw CustomErrorHandler.UnAuthorized("User not found");
        }

        
        const decode = await bcrypt.compare(password, foundedUser.password);

        if (decode) {
       
            const randomCode = Array.from({ length: 6 }, () => Math.floor(Math.random() * 9)).join("");

           
            const dateNow = Date.now() + 120000;

   
            await sendEmail(email, randomCode);

            
            await AuthSchema.findByIdAndUpdate(foundedUser._id, { 
                otp: randomCode, 
                otpTime: dateNow 
            });

            res.status(200).json({
                message: "Please check your email"
            });
        } else {
            throw CustomErrorHandler.UnAuthorized("Wrong password");
        }

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};




// logout
const logout = async (req, res) => {
   try{
    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")
   
    res.status(200).json({
        message: "ok"
    })

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};







const refreshToken = async (req, res) => {
    try {
        const token = req.cookies?.refreshToken || req.body.refreshToken;

        if (!token) {
            return res.status(401).json({ message: "Refresh token topilmadi" });
        }

            const decoded = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

        const payload = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };

        const newAccessToken = access_token(payload);

        res.status(200).json({
            message: "Token muvaffaqiyatli yangilandi",
            accessToken: newAccessToken
        });
    } catch (error) {
        res.status(401).json({ message: "Yaroqsiz yoki muddati o'tgan refresh token" });
    }
};



module.exports = {
    register,
    verify,
    login,
    refreshToken,
    logout
};