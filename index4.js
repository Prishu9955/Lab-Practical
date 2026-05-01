const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    const currentTime = new Date().toLocaleString();
    console.log(`Request received at: ${currentTime}`);
    console.log(`${req.method} ${req.url}`);
    next();
});

let users = [];

const response = (message, data = null) => {
    return {
        message: message,
        time: new Date().toLocaleString(),
        data: data
    };
};


app.get("/", (req, res) => {
    res.json(response("Yeah! It is working"));
});

app.get("/users", (req, res) => {
    res.json(response("Users fetched successfully", users));
});

app.post("/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.json(response("Name and email are required"));
    }
    const exists = users.find(u => u.email === email);
    if (exists) {
        return res.json(response("Email already exists"));
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);

    res.json(response("User added successfully", newUser));
});

app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.json(response("User not found"));
    }

    users.splice(index, 1);

    res.json(response("User deleted successfully"));
});


app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.json(response("User not found"));
    }

    res.json(response("User fetched successfully", user));
});


app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json(response("All fields required"));
    }

    if (email === "admin@gmail.com" && password === "1234") {
        return res.json(response("Login Success"));
    } else {
        return res.json(response("Invalid Credentials"));
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:3000`);
});