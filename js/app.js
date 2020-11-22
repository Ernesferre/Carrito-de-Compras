// Variables
// 1ero selecciono los elementos en HTML (con los que voy a trabajar) y le asigo una variable //// para que trabaje con JS.

const carrito = $("#carrito");
const contenedorCarrito = $("#lista-carrito tbody");
const vaciarCarrito = $("#vaciar-carrito");
const listaProductos = $("#lista-productos");
let articulosCarrito = []; // array de elmentos

// Genero Evento Click

listaProductos.click(agregarProducto); // Llamo a la funcion al hacer click sobre el elemento Lista-Productos
carrito.click(eliminarProducto);
vaciarCarrito.click(vaciandoCarrito);

function vaciandoCarrito() {
  articulosCarrito = []; // Reseteamos el arreglo
  limpiarHTML(); // Limpiamos el Html
}

function agregarProducto(e) {
  e.preventDefault(); // evita que al darle Click me dirija hacia arriba
  if (e.target.classList.contains("agregar-carrito")) {
    const productoSeleccionado = e.target.parentElement.parentElement; // busco el 2do padre superior del elemento "Agragar Carrito" (que es: ) y se lo asigno a la variable "prductoSeleccionado"
    // si el click es sobre el boton "Agragar carrito" entonces me ejecuta el condicional
    leerDatosProducto(productoSeleccionado);
  }
}

// Elimina un producto del carrito
function eliminarProducto(e) {
  // La "e" va para identificar a qué le dimos click
  if (e.target.classList.contains("borrar-producto"));
  {
    const productoId = e.target.getAttribute("data-id");

    // Elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((producto) => producto.id !== productoId);
    carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
  }
}

// Lee el contenido del HTML al que le dimos click y extrae la informacion del producto
function leerDatosProducto(producto) {
  //   console.log(producto);

  // Crear un objeto con el contenido del producto actual
  const infoProducto = {
    imagen: producto.querySelector("img").src,
    titulo: producto.querySelector("h4").textContent, // Usamos "TextContent" para extraer el texto del "h4" 
    precio: producto.querySelector(".precio span").textContent,
    id: producto.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((producto) => producto.id === infoProducto.id);
  if (existe) {
    // Actualizamos la cantidad
    const productos = articulosCarrito.map((producto) => {
      // .map crea un nuevo arreglo
      if (producto.id === infoProducto.id) {
        // infoProducto.id es el producto que estamos tratando de agregar
        producto.cantidad++;
        return producto; // retorna el objeto actualizado
      } else {
        return producto; // retorna los objetos que no son los duplicados
      }
    });
    articulosCarrito = [...productos];
  } else {
    // Agregamos el producto al carrito
    articulosCarrito = [...articulosCarrito, infoProducto];
  }

  // Agrega elementos al arreglo de carrito

  console.log(articulosCarrito);
  carritoHTML();
}

// Muestra el carrito de compras en HTML

function carritoHTML() {
  // Limpiar el HTML
  limpiarHTML();
  // Recorre el carrito y genera el HTML
  for (const elemento of articulosCarrito) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
        <img src="${elemento.imagen}" width="100">
    </td>  
    <td>${elemento.titulo}</td>
    <td>${elemento.precio}</td>
    <td>${elemento.cantidad}</td>
    <td>
        <a href="#" class="borrar-producto" data-id="${elemento.id}" > X </a>
    </td>     
    `;
    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.append(row);
  }
}

// Elimina los productos del tbody

function limpiarHTML() {
  contenedorCarrito.empty(); // remove() para jquery
}
