const express = require("express");
const app = express();
app.use(express.json());
let users = [
    { id: 1, name: "Priyanshu", email: "Priyanshuraj@gmail.com" }
];
app.get("/", (req, res) => {
    res.send("Server Running");
});
app.get("/users", (req, res) => {
    res.json(users);
});
app.post("/users", (req, res) => {
    const { name, email } = req.body;
if (!name || !email) {
        return res.json({ message: "Name and email are required" });
    }
const exists = users.find(u => u.email === email);
    if (exists) {
        return res.json({ message: "Email already exists" });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);
    res.json({ message: "User added", user: newUser });
});

app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const exists = users.find(user => user.id === id);
    if (!exists) {
        return res.json({ message: "User not found" });
    }

    users = users.filter(user => user.id !== id);
    res.json({ message: "User deleted" });
});

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});