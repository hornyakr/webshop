import { Schema } from "mongoose";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type Admin<User> = {

}

const admin: Admin = ;

const userSchema = new Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
});