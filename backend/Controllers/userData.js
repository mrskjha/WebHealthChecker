const userData = require('../model/userdata');
async function handleAddUserData(req,res) {
    const { email, username, phoneNo } = req.body;
    if (!email || !username || !phoneNo) {
        return res.status(422).json({ error: "Please provide all the required fields" });
    }
    try {
        const existingUser = await userData.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }
        const user = new userData({
            email,
            username,
            phoneNo
        });
        await user.save();

        res.status(201).json({ message: "User data added successfully!", success: true, user });

    }
    catch (err) {
        console.error("User data addition error:", err.message);
        res.status(500).json({ error: "User data addition failed, please try again." });
    }
}

module.exports = { handleAddUserData };