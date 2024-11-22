class nodo {
    constructor(dato) {
        this.dato = dato;
        this.izq = null;
        this.der = null;
    }

    agg(dato) {
        if (dato < this.dato) {
            this.aggIzq(dato);
        } else {
            this.aggDer(dato);
        }
    }

    aggIzq(dato) {
        if (this.izq) {
            this.izq.agg(dato);
        } else {
            this.izq = new nodo(dato);
        }
    }

    aggDer(dato) {
        if (this.der) {
            this.der.agg(dato);
        } else {
            this.der = new nodo(dato);
        }
    }
}

class ArbolBinario {
    constructor() {
        this.raiz = null;
    }

    insertar(dato) {
        if (this.raiz) {
            this.raiz.agg(dato);
        } else {
            this.raiz = new nodo(dato);
        }
    }

    eliminar(dato) {
        this.raiz = this.eliminarNodo(this.raiz, dato);
    }

    eliminarNodo(nodo, dato) {
        if (!nodo) {
            return null;
        }

        if (dato < nodo.dato) {
            nodo.izq = this.eliminarNodo(nodo.izq, dato);
        } else if (dato > nodo.dato) {
            nodo.der = this.eliminarNodo(nodo.der, dato);
        } else {
            if (!nodo.izq && !nodo.der) {
                return null;
            }
            if (!nodo.izq) {
                return nodo.der;
            } else if (!nodo.der) {
                return nodo.izq;
            }

            const sucesor = this.obtenerMinimo(nodo.der);
            nodo.dato = sucesor.dato;
            nodo.der = this.eliminarNodo(nodo.der, sucesor.dato);
        }

        return nodo;
    }

    obtenerMinimo(nodo) {
        while (nodo.izq) {
            nodo = nodo.izq;
        }
        return nodo;
    }

    buscar(dato) {
        return this.buscarNodo(this.raiz, dato);
    }

    buscarNodo(nodo, dato) {
        if (!nodo) {
            return false;
        }
        if (dato === nodo.dato) {
            return true;
        }
        if (dato < nodo.dato) {
            return this.buscarNodo(nodo.izq, dato);
        } else {
            return this.buscarNodo(nodo.der, dato);
        }
    }

    recInOrden(nodo, array) {
        if (!nodo) return;
        this.recInOrden(nodo.izq, array);
        array.push(nodo.dato);
        this.recInOrden(nodo.der, array);
    }

    recPreOrden(nodo, array) {
        if (!nodo) return;
        array.push(nodo.dato);
        this.recPreOrden(nodo.izq, array);
        this.recPreOrden(nodo.der, array);
    }

    recPostOrden(nodo, array) {
        if (!nodo) return;
        this.recPostOrden(nodo.izq, array);
        this.recPostOrden(nodo.der, array);
        array.push(nodo.dato);
    }
}

boton_agg.addEventListener("click", () => {
    nuevoDato = (document.getElementById("input_agg").value);
    const encontrado = arbol.buscar(nuevoDato);
    if (nuevoDato) {
        if (encontrado) {
            alert(`El dato ${nuevoDato} ya se encuentra en el árbol.`);
            return;
        } 
    }
    else {
        alert("Inserta un dato por agregar.");
        return;
    }
    arbol.insertar(nuevoDato);
    console.log(arbol);
});

boton_elim.addEventListener("click", () => {
    elimDato = (document.getElementById("input_elim").value);
    const encontrado = arbol.buscar(elimDato);
    if (elimDato) {
        if (!encontrado) {
            alert(`El dato ${elimDato} no se encuentra en el árbol.`);
            return;
        } 
    }
    else {
        alert("Inserta un dato por eliminar.");
        return;
    }
    arbol.eliminar(elimDato);
    console.log(arbol);
});

boton_buscar.addEventListener("click", () => {
    buscarDato = (document.getElementById("input_buscar").value);
    encontrado = arbol.buscar(buscarDato);
    if (buscarDato) {
        if (encontrado) {
            alert(`El dato ${buscarDato} fue encontrado en el árbol.`);
        } else {
            alert(`El dato ${buscarDato} no está en el árbol.`);
        }
    }
    else {
        alert("Inserta un dato por buscar.");
    }
});

boton_inorden.addEventListener("click", () => {
    array = [];
    arbol.recInOrden(arbol.raiz, array);
    if (array.length === 0) {
        alert("El árbol esta vacio.");
        return;
    }
    res.innerHTML = array;
});

boton_preorden.addEventListener("click", () => {
    array = [];
    arbol.recPreOrden(arbol.raiz, array);
    if (array.length === 0) {
        alert("El árbol esta vacio.");
        return;
    }
    res.innerHTML = array;
});

boton_postorden.addEventListener("click", () => {
    array = [];
    arbol.recPostOrden(arbol.raiz, array);
    if (array.length === 0) {
        alert("El árbol esta vacio.");
        return;
    }
    res.innerHTML = array;
});

let res = document.getElementById("parrafo_resultado");
const arbol = new ArbolBinario();