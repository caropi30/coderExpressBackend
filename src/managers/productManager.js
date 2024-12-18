import { promises as fs } from "fs";

class ProductManager {
  static productId = 0;
  constructor(path) {
    this._products = [];
    this._path = path;
  }

  async addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;

    const arrProducts = await this.readProductFile();

    if (!title || !description || !price || !thumbnail || !code || !stock)
      return "Todos los campos son obligatorios, favor validar los datos ingresados.";

    if (arrProducts.some((item) => item.code === code))
      return "Error: El código que estás intentando integra y aexiste, favor validar el dato";

    const newProduct = {
      id: ++ProductManager.productId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    arrProducts.push(newProduct);

    await this.saveProductFile(arrProducts);
  }

  async getProducts() {
    const arrProducts = await this.readProductFile();
    return arrProducts;
  }

  async getProductById(id) {
    const arrProducts = await this.readProductFile();
    const product = arrProducts.find((item) => item.id === id);

    if (!product) {
      console.error("No existe el producto que estás intentando encontrar");
      return;
    }

    return product;
  }

  async changeProductById(id, product) {
    const arrProducts = await this.readProductFile();
    const alteredProductIndex = arrProducts.findIndex(
      (product) => product.id === id,
    );

    if (alteredProductIndex !== -1) {
      arrProducts[alteredProductIndex].title = product.title;
      arrProducts[alteredProductIndex].description = product.description;
      arrProducts[alteredProductIndex].price = product.price;
      arrProducts[alteredProductIndex].thumbnail = product.thumbnail;
      arrProducts[alteredProductIndex].code = product.code;
      arrProducts[alteredProductIndex].stock = product.stock;
    }

    console.log(arrProducts);
    await this.saveProductFile(arrProducts);
    return;
  }

  async deteleProductById(id) {
    const arrProducts = await this.readProductFile();
    const newProductArr = arrProducts.filter((product) => product.id === id);

    await this.saveProductFile(newProductArr);
  }

  async saveProductFile(products) {
    try {
      await fs.writeFile(this._path, JSON.stringify(products, null, 2));
    } catch (error) {
      console.error("Error al guardar el archivo de productos");
    }
  }

  async readProductFile() {
    try {
      const response = await fs.readFile(this._path, "utf-8");
      const arrProducts = JSON.parse(response);
      return arrProducts;
    } catch (error) {
      console.error("Error al leer el archivo de productos", error);
    }
  }
}

export default ProductManager;
