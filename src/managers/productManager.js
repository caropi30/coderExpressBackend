import { promises as fs } from "fs";

class ProductManager {
  static productId = 0;

  constructor(path) {
    this._products = [];
    this._path = path;
  }

  async addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;

    // Validación de campos obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log('title --->', title)
      console.log('description --->', description)
      console.log('price --->', price)
      console.log('thumbnail --->', thumbnail)
      console.log('code --->', code)
      console.log('stock --->', stock)
      throw new Error("Todos los campos son obligatorios. Verifica los datos.");
    }

    const arrProducts = await this.readProductFile();

    // Verifica que el código no esté duplicado
    if (arrProducts.some((item) => item.code === code)) {
      throw new Error("El código ya existe. Por favor, utiliza un código único.");
    }

    const newProduct = {
      id: ++ProductManager.productId, // Incrementa y asigna un ID único
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    arrProducts.push(newProduct);

    await this.saveProductFile(arrProducts);
    return newProduct; // Devuelve el producto agregado
  }

  async getProducts() {
    const arrProducts = await this.readProductFile();
    return arrProducts;
  }

  async getProductById(id) {
    const arrProducts = await this.readProductFile();
    const product = arrProducts.find((item) => item.id === id);

    if (!product) {
      throw new Error(`No existe un producto con ID ${id}.`);
    }

    return product;
  }

  async changeProductById(id, product) {
    const arrProducts = await this.readProductFile();
    const alteredProductIndex = arrProducts.findIndex((item) => item.id === id);

    if (alteredProductIndex === -1) {
      throw new Error(`No se encontró un producto con ID ${id} para actualizar.`);
    }

    // Actualiza los campos del producto
    arrProducts[alteredProductIndex] = {
      ...arrProducts[alteredProductIndex],
      ...product,
    };

    await this.saveProductFile(arrProducts);
    return arrProducts[alteredProductIndex]; // Devuelve el producto actualizado
  }

  async deteleProductById(id) {
    const arrProducts = await this.readProductFile();
    const newProductArr = arrProducts.filter((product) => product.id !== id);

    if (newProductArr.length === arrProducts.length) {
      throw new Error(`No se encontró un producto con ID ${id} para eliminar.`);
    }

    await this.saveProductFile(newProductArr);
    console.log(`Producto con ID ${id} eliminado exitosamente.`);
  }

  async saveProductFile(products) {
    try {
      await fs.writeFile(this._path, JSON.stringify(products, null, 2));
    } catch (error) {
      console.error("Error al guardar el archivo de productos:", error);
      throw new Error("No se pudo guardar el archivo de productos.");
    }
  }

  async readProductFile() {
    try {
      const response = await fs.readFile(this._path, "utf-8");
      const arrProducts = JSON.parse(response);

      // Sincroniza el ID basado en el producto con el ID más alto
      if (arrProducts.length > 0) {
        ProductManager.productId = Math.max(...arrProducts.map((p) => p.id));
      }

      return arrProducts;
    } catch (error) {
      console.error("Error al leer el archivo de productos:", error);

      // Devuelve un arreglo vacío si el archivo no existe o hay un error
      return [];
    }
  }
}

export default ProductManager;
