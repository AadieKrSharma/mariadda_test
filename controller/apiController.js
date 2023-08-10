import UserModel from '../model/User.Model.js'
import bcrypt from 'bcrypt';

export async function register(req, res) {
    console.log('triggered');
    try {
        const { username, email, gender, password, dob } = req.body;

        const existingUser = new Promise((resolve, reject) => {
            console.log("checking existing user!!")
            UserModel.findOne({
                $or: [{ username: username }, { email: email }],
            }).then((user, mail) => {
                if (user || mail) {
                    reject({
                        error: "User already exists with the provided username or email.",
                    });
                } else {
                    resolve();
                }
            });
        });
        Promise.all([existingUser])
            .then(() => {
                if (password) {
                    bcrypt
                        .hash(password, 10)
                        .then((hashedPassword) => {
                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                email,
                                gender:gender,
                                dob:dob,
                            });
                            user
                                .save()
                                .then((result) =>
                                    res.status(201).send({ msg: "User Registered Successfully" })
                                )
                                .catch((error) => {
                                    return res.status(500).send({ error });
                                });
                        })
                        .catch((error) => {
                            return res.status(500).send({ error: "Enable to Hash Password" });
                        });
                }
            })
            .catch((error) => {
                return res.status(500).send({ error: "User Exists" });
            });
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function login(req, res) {
    const { username, password } = req.body;

    try {
        UserModel.findOne({
            username,
        })
            .then((user) => {
                bcrypt
                    .compare(password, user.password)
                    .then((passwordCheck) => {
                        if (!passwordCheck)
                            return res.status(400).send({ error: "Password Empty" });


                        res.status(200).send({
                            msg: "Login Successful!",
                            username: user.username,
                        });
                    })
                    .catch((error) => {
                        res.status(400).send({ error: "Password doesn't match" });
                    });
            })
            .catch((error) => {
                return res.status(404).send({ error: "Username not found" });
            });
    } catch (error) {
        return res.status(500).send({ error });
    }
}
