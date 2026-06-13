const express = require("express");

const app = express();
const PORT = 3000;

const users = [
    { id: 1, name: "Farha" },
    { id: 2, name: "Budi" },
    { id: 3, name: "Siti" }
];

const products = [
    { id: 1, name: "laptop", price: 1000 },
    { id: 2, name: "Mouse", price: 1000 },
    { id: 3, name: "keyboard", price: 1000 }
];

app.get("/", (req, res) => {
    res.send("Hello Backend!");
});

app.get("/users", (req, res) => {
    res.json(users);
});

app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User tidak ditemukan"
        });
    }

    res.json(user);
});

app.get("/products", (req, res) => {
    res.json(products)
});

app.get("/products/count", (req, res) => {
    res.json({
        total:products.length
    });
});

app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(user => user.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Produk tidak ditemukan2"
        });
    }

    res.json(product);
});



app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});