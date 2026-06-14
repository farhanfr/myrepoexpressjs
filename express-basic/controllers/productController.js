const products = require("../data/products");

let nextId = 4;

function getProducts(req, res) {
    res.json(products);
}

function getProductById(req, res) {
    const id = Number(req.params.id);

    const product = products.find(
        product => product.id === id
    );

    if (!product) {
        return res.status(404).json({
            message: "Produk tidak ditemukan"
        });
    }

    res.json(product);
}

function createProduct(req, res) {
    const { name, price } = req.body;

    if (
        typeof name !== "string" ||
        name.trim() === "" ||
        typeof price !== "number"
    ) {
        return res.status(400).json({
            message: "Data tidak valid"
        });
    }

    const newProduct = {
        id: nextId++,
        name,
        price
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Produk berhasil ditambahkan",
        data: newProduct
    });
}

function updateProduct(req, res) {
    const id = Number(req.params.id);

    const { name, price } = req.body;

    const product = products.find(
        product => product.id === id
    );

    if (!product) {
        return res.status(404).json({
            message: "Produk tidak ditemukan"
        });
    }

    if (
        typeof name !== "string" ||
        name.trim() === "" ||
        typeof price !== "number"
    ) {
        return res.status(400).json({
            message: "Data tidak valid"
        });
    }

    product.name = name;
    product.price = price;

    return res.json({
        message: "Produk berhasil diperbarui",
        data: product
    });
}

function deleteProduct(req, res) {
    const id = Number(req.params.id);

    const index = products.findIndex(
        product => product.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Produk tidak ditemukan"
        });
    }

    const deletedProduct = products[index];

    products.splice(index, 1);

    return res.json({
        message: "Produk berhasil dihapus",
        data: deletedProduct
    });
}

function crash(req, res, next) {
    next(new Error("Server meledak"));
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    crash
};