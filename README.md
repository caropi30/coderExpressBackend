# coderExpressBackend

Este proyecto contiene la primeraq entrega para el curso de Curso de Programación Backend I: Desarrollo Avanzado de Backend, el cual contempla el incicio de la creación de un servidor que manejará un carrito de compras, a través de métodos nativos de Node y enrutamiento con Express.


## Rutas de la API

#### Productos
**Obtener productos.**
```http
  GET /api/products/
```

**Obtener producto por ID**
```http
  GET /api/products/:pid
```

**Agregar un nuevo producto**
```http
  POST /api/products/
```

```json
{
  "title": "Nombre del producto",
  "description": "Descripción del producto",
  "code": "Código del producto",
  "price": 10,
  "status": true,
  "stock": 100,
  "category": "Categoría del producto",
  "thumbnails": []
}
```

**Actualizar un producto**
```http
  PUT /api/products/:pid
```

**Eliminar un producto**
```http
  DELETE /api/products/:pid
```

#### Carritos
**Crear un nuevo carrito**
```http
  POST /api/carts/
```

**Obtener productos de un carrito**
```http
  GET /api/carts/:cid
```


**Agregar un producto al carrito**
```http
  POST /api/carts/:cid
```

### Producto
Cada producto tiene la siguiente estructura:

```json
{
  "id": Number,
  "title": String,
  "description": String,
  "code": String,
  "price": Number,
  "status": Boolean,
  "stock": Number,
  "category": String,
  "thumbnails": Array
}
```

### Carrito
Cada carrito tiene la siguiente estructura:

```json
{
  "id": Number,
  "products": [
    {
      "id": Number,
      "quantity": Number
    }
  ]
}
```
## Instalación

Para levantar este proyecto, se debe clonar el repositorio en tu local y luego: 

Ejecutar yarn install para descargar dependencias 
```bash
yarn install
```

y ejecutar el servidor
```bash
yarn run dev
```