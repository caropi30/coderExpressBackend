import { promises as fs } from 'fs'
import ProductManager from './productManager'

class CartManager extends ProductManager{
    static cartId = 0
    constructor(path){
        this._cart = [],
        this._path = path
    }

    async addCart() {
        const id = ++CartManager.cartId
        
        const arrCart = await this.readProductFile()

        const arrProducts = await this.readProductFile()

        if (arrCart.some((item) => item.id === id))
            return 'Error: El código que estás intentando integra y aexiste, favor validar el dato'

        const newCart = {
            id, 
            product: [...arrProducts]
        }

        arrCart.push(newCart)

        await saveCart(arrCart)
    }


    async saveCart(cart) {
        try {
            await fs.writeFile(this._path, JSON.stringify(cart, null, 2))
        } catch (error) {
            console.error('Error al guardar el archivo de carrito')
        }
    }

}

export default CartManager