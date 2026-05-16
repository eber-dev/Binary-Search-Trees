import { Nodo } from './nodo.js';

class Tree {
    constructor(root) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        let ordenado = array.sort((a, b) => a - b);
        let sinduplicado = [...new Set(ordenado)];
    }
}
