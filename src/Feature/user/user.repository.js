import { getDb } from "../../config/connectToMongodb.js";
import generateOtp from "../../../utils/generate.otp.js";
import mailSent from "../../Middleware/sendMail.js";

class UserRepository {
    constructor() {
        this.collecction = "users"
    }


    async singUp(newUser) {
        try {
            const db = getDb();
            const collection = db.collection(this.collecction);
            await collection.insertOne(newUser);
            return newUser;
        } catch (error) {
            console.log(error);
        }
    }

    async signIn(email, password) {
        try {
            const db = getDb();
            const collecction = db.collection("users");
            return await collecction.findOne({ email, password });
        } catch (err) {
            console.log(err);
        }
    }

    async findByEmail(email) {
        try {
            const db = getDb();
            const collecction = db.collection(this.collecction);
            return await collecction.findOne({email});
        } catch (err) {
            console.log(err);
        }
    }

    async generateOtp() {
        console.log(generateOtp);
    }

    async getOtp(email) {
        const result = mailSent(email);
        return result;
    }

    async verifyOtp(email, otp) {
        return await this.findByIdAndUpdate(email, { $set: { otp } }, { new: true });
    }

    async resetPassword(userId , newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return await User.findByIdAndUpdate(userId, { $set: { password: hashedPassword } }, { new: true });
    }
}

export default UserRepository;