const UersModels = require('../../models/users/users_models');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;

        // Check if email already exists
        const checkPhone = await UersModels.findOne({ phone: phone });
        if (checkPhone) {
            return res.status(400).json({
                status: 400,
                message: 'ເບີໂທນີ້ມີໃນລະບົບແລ້ວ',
                data: phone
            });
        }

       

        // Create a new user
        let newUser = new UersModels();
        newUser.username = username;
        newUser.email = email;
        newUser.password = await newUser.encryptPassword(password);
        newUser.phone = phone;

        // Save the user to the database
        const saveUser = await newUser.save();

        // Respond with success
        res.status(201).json({
            status: 201,
            message: 'ສະໝັກສະມາຊິກສຳເລັດ',
            data: saveUser
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            status: false,
            message: 'Server error',
        });
    }
};

exports.login = async(req,res)=>{
    try {
        const {phone, password} = req.body;
        const checkPhone = await UersModels.findOne({ phone: phone });
        if (!checkPhone) {
            return res.status(404).json({
                status: 404,
                message: 'ອີເມວບໍ່ຖືກຕ້ອງ',
                data: email
            });
        }
        const checkPassword = await checkPhone.checkPassword(password);
        if (!checkPassword) {
            return res.status(404).json({
                status: 404,
                message: 'ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ',
                data: password
            });

        }
        const token = await jwt.sign({id:checkPhone._id, role:checkPhone.role},process.env.JWT_TOKEN,{expiresIn:"1 day"})
        const tokenExpire = jwt.decode(token);
        res.status(201).json({
            status:true,
            message:"ລັອກອິນສຳເລັດແລ້ວ",
            access_token:token,
            expire_token:tokenExpire
        })

    } catch (error) {
        console.log("Error Login==",error);
        
    }
}
