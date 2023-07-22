const StorageController = (function () {

    const storeProduct = (product) => {
        let products = getProducts();
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
    }

    const getProducts = () => {
        let products = null;
        if (localStorage.getItem("products") === null) {
            products = [];

        } else {
            products = JSON.parse(localStorage.getItem("products"));
        }
        return products;
    }

    const updateProduct = (product) => {
        const products = getProducts();
        const id = products.findIndex(item => item.id === product.id);
        products[id] = product;
        localStorage.setItem("products", JSON.stringify(products));
    }

    const deleteProduct = (product) => {
        const products = getProducts();
        const newProducts = products.filter(item => {
            return item.id !== product.id;
        });
        localStorage.setItem("products", JSON.stringify(newProducts));
    }

    return {
        storeProduct,
        getProducts,
        updateProduct,
        deleteProduct,
    }

})();



const ProductController = (function () {

    class Product {
        constructor(id, name, price) {
            this.id = id;
            this.name = name;
            this.price = price;
        }
    }

    const data = {
        products: StorageController.getProducts(),
        selectedProduct: null,
        totalPrice: 0,
    };

    const addProduct = (productName, productPrice) => {
        let id;
        if (data.products.length > 0) {
            id = data.products[data.products.length - 1].id + 1;
        } else {
            id = 0;
        }

        const newProduct = new Product(id, productName, productPrice);
        data.products.push(newProduct);
        return newProduct;
    };

    const getTotal = () => {
        let total = 0;
        data.products.map((product) => {
            total += product.price;
        });
        data.totalPrice = total;
        return data.totalPrice;
    };

    const getProductById = (id) => {
        return data.products.find((product) => product.id == id);
    }

    const setSelectedProduct = (product) => {
        data.selectedProduct = product;
    }

    const getSelectedProduct = () => {
        return data.selectedProduct;
    }

    const updateProduct = (name, price) => {
        let selectedProduct = getSelectedProduct();
        let id = data.products.findIndex(product => product.id === selectedProduct.id);
        selectedProduct.name = name;
        selectedProduct.price = parseFloat(price);

        data.products[id] = selectedProduct;
        return selectedProduct;
    }

    const deleteProduct = (product) => {
        let index = data.products.findIndex(item => item.id === product.id);
        if (index !== -1) {
            data.products.splice(index, 1);
        }
    }




    return {
        getProducts: function () {
            return data.products;
        },
        getData: function () {
            return data;
        },
        addProduct,
        getTotal,
        getProductById,
        setSelectedProduct,
        getSelectedProduct,
        updateProduct,
        deleteProduct
    }

})();



const UIController = (function () {

    const Selectors = {
        productList: "#item-list",
        productListItems: "#item-list tr",
        addButton: "#add-btn",
        productName: "#productName",
        productPrice: "#productPrice",
        productCard: "#productCard",
        totalTL: "#totalTL",
        totalUSD: "#totalUSD",
        addBtn: "#addBtn",
        deleteBtn: "#deleteBtn",
        updateBtn: "#updateBtn",
        cancelBtn: "#cancelBtn",
    }

    const createProductList = (products) => {
        let html = "";

        products.map((product) => {
            html += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.price} $</td>
                    <td class="text-right">
                        <i data-id="${product.id}" class="fas fa-edit edit-product"></i>
                     </td>
                </tr>
            `
        });

        document.querySelector(Selectors.productList).innerHTML = html;
    }

    const addProduct = (product) => {
        document.querySelector(Selectors.productCard).style.display = "block";
        let html = `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price} $</td>
            <td class="text-right">
                <i data-id="${product.id}" class="fas fa-edit edit-product"></i>
             </td>
        </tr>
    `;

        document.querySelector(Selectors.productList).innerHTML += html;
    }

    const clearInputs = () => {
        document.querySelector(Selectors.productName).value = "";
        document.querySelector(Selectors.productPrice).value = "";
    }

    const hideCard = () => {
        document.querySelector(Selectors.productCard).style.display = "none";

    }

    const showSelectedProduct = () => {
        const product = ProductController.getSelectedProduct();
        document.querySelector(Selectors.productName).value = product.name;
        document.querySelector(Selectors.productPrice).value = product.price;

    }

    const showTotal = (total) => {
        document.querySelector(Selectors.totalUSD).textContent = total;
        document.querySelector(Selectors.totalTL).textContent = total * 27;
    }

    const stateAdd = () => {
        UIController.clearInputs();
        document.querySelector(Selectors.addButton).style.display = "inline";
        document.querySelector(Selectors.updateBtn).style.display = "none";
        document.querySelector(Selectors.cancelBtn).style.display = "none";
        document.querySelector(Selectors.deleteBtn).style.display = "none";
    }

    const stateEdit = (tr) => {
        clearSelectedBG();
        tr.classList.add("bg-warning");
        document.querySelector(Selectors.addButton).style.display = "none";
        document.querySelector(Selectors.updateBtn).style.display = "inline";
        document.querySelector(Selectors.cancelBtn).style.display = "inline";
        document.querySelector(Selectors.deleteBtn).style.display = "inline";
    }

    const clearSelectedBG = () => {
        const items = document.querySelectorAll(Selectors.productListItems);
        for (const child of items) {
            if (child.nodeType === Node.ELEMENT_NODE && child.classList.contains("bg-warning")) {
                child.classList.remove("bg-warning");
            }
        }
    }

    const updateProduct = (product) => {
        let items = document.querySelectorAll(Selectors.productListItems);

        items.forEach(function (item) {
            if (item.classList.contains("bg-warning")) {
                item.children[1].textContent = product.name;
                item.children[2].textContent = parseFloat(product.price);
                item.classList.remove("bg-warning");
                stateAdd();
            }
        });
    }

    const deleteProduct = () => {
        let items = document.querySelectorAll(Selectors.productListItems);
        items.forEach(function (item) {
            if (item.classList.contains("bg-warning")) {
                item.remove();
            }
        });
    }

    return {
        createProductList,
        getSelectors: function () {
            return Selectors;
        },
        addProduct,
        clearInputs,
        hideCard,
        showTotal,
        showSelectedProduct,
        stateAdd,
        stateEdit,
        updateProduct,
        clearSelectedBG,
        deleteProduct
    }
})();



const App = (function (ProductCtrl, UICtrl, StorageCtrl) {

    const UISelectors = UICtrl.getSelectors();

    const loadEventListeners = function () {
        document.querySelector(UISelectors.addButton).addEventListener("click", productAddSubmit);
        document.querySelector(UISelectors.productList).addEventListener("click", productEditClick);
        document.querySelector(UISelectors.updateBtn).addEventListener("click", productEditSubmit);
        document.querySelector(UISelectors.cancelBtn).addEventListener("click", productEditCancel);
        document.querySelector(UISelectors.deleteBtn).addEventListener("click", deleteProduct);
    };

    const deleteProduct = function (e) {
        ProductCtrl.deleteProduct(ProductCtrl.getSelectedProduct());
        StorageCtrl.deleteProduct(ProductCtrl.getSelectedProduct());
        UICtrl.deleteProduct();
        UICtrl.stateAdd();
        const total = ProductCtrl.getTotal();
        UICtrl.showTotal(total);
        if (total == 0) {
            UICtrl.hideCard();
        }
        e.preventDefault();
    };

    const productEditCancel = function (e) {
        UICtrl.stateAdd();
        UICtrl.clearSelectedBG();
        e.preventDefault();
    };

    const productEditSubmit = function (e) {

        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;
        if (productName !== "" && productPrice !== "") {
            const updatedProduct = ProductCtrl.updateProduct(productName, productPrice);
            StorageCtrl.updateProduct(updatedProduct);
            UICtrl.updateProduct(updatedProduct);
            const total = ProductCtrl.getTotal();
            UICtrl.showTotal(total);

        }

        e.preventDefault();
    };

    const productEditClick = function (e) {
        let id = -1;
        if (e.target.classList.contains("edit-product")) {
            id = e.target.getAttribute("data-id");
        }

        if (id !== -1) {
            const editProduct = ProductCtrl.getProductById(id);
            ProductCtrl.setSelectedProduct(editProduct);
            UICtrl.showSelectedProduct();
            UICtrl.stateEdit(e.target.parentNode.parentNode);
        }

        e.preventDefault();
    };

    const productAddSubmit = function (e) {
        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;

        if (productName !== "" && productPrice !== "") {
            const newProduct = ProductCtrl.addProduct(productName, parseFloat(productPrice));
            UICtrl.addProduct(newProduct);
            StorageCtrl.storeProduct(newProduct);
            const total = ProductCtrl.getTotal();
            UICtrl.showTotal(total);
            UICtrl.clearInputs();
        }
        e.preventDefault();
    };

    return {
        init: function () {
            UICtrl.stateAdd();
            const products = ProductCtrl.getProducts();
            const total = ProductCtrl.getTotal();
            UICtrl.showTotal(total);
            if (products.length <= 0) {
                UICtrl.hideCard();
            } else {
                UICtrl.createProductList(products);
            }
            loadEventListeners();
        }
    }

})(ProductController, UIController, StorageController);

App.init();