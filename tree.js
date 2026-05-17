import { Nodo } from './nodo.js';

export class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        let ordenado = array.sort((a, b) => a - b);
        const arrayfinal = [...new Set(ordenado)];

        if (arrayfinal.length === 0) {
            return null;
        }

        const medio = Math.floor(arrayfinal.length / 2);

        const root = new Nodo(arrayfinal[medio]);

        root.izquierda = this.buildTree(arrayfinal.slice(0, medio));

        root.derecha = this.buildTree(arrayfinal.slice(medio + 1));

        return root;
    }

    includes(value, node = this.root) {
        if (node === null) {
            return false;
        }

        if (value === node.valor) {
            return true;
        }

        if (value < node.valor) {
            return this.includes(value, node.izquierda);
        }

        if (value > node.valor) {
            return this.includes(value, node.derecha);
        }
    }

    insert(value, node = this.root) {
        if (node === null) {
            return new Nodo(value);
        }

        if (value < node.valor) {
            node.izquierda = this.insert(value, node.izquierda);
        } else if (value > node.valor) {
            node.derecha = this.insert(value, node.derecha);
        }

        return node;
    }

    getMin(node) {
        while (node.izquierda !== null) {
            node = node.izquierda;
        }

        return node;
    }

    deleteItem(value, node = this.root) {
        if (node === null) {
            return null;
        }

        if (value < node.valor) {
            node.izquierda = this.deleteItem(value, node.izquierda);
        } else if (value > node.valor) {
            node.derecha = this.deleteItem(value, node.derecha);
        } else {
            if (node.izquierda === null && node.derecha === null) {
                return null;
            }

            if (node.izquierda === null) {
                return node.derecha;
            }

            if (node.derecha === null) {
                return node.izquierda;
            }

            let temp = this.getMin(node.derecha);

            node.valor = temp.valor;

            node.derecha = this.deleteItem(temp.valor, node.derecha);
        }

        return node;
    }

    preOrder(node = this.root) {
        if (node === null) {
            return;
        }

        console.log(node.valor);

        this.preOrder(node.izquierda);

        this.preOrder(node.derecha);
    }

    inOrder(node = this.root) {
        if (node === null) {
            return;
        }

        this.inOrder(node.izquierda);

        console.log(node.valor);

        this.inOrder(node.derecha);
    }

    postOrder(node = this.root) {
        if (node === null) {
            return;
        }

        this.postOrder(node.izquierda);

        this.postOrder(node.derecha);

        console.log(node.valor);
    }

    levelOrder() {
        let queue = [];

        queue.push(this.root);

        while (queue.length > 0) {
            let current = queue.shift();

            console.log(current.valor);

            if (current.izquierda) {
                queue.push(current.izquierda);
            }

            if (current.derecha) {
                queue.push(current.derecha);
            }
        }
    }

    find(value, node = this.root) {
        if (node === null) {
            return null;
        }

        if (value === node.valor) {
            return node;
        }

        if (value < node.valor) {
            return this.find(value, node.izquierda);
        }

        if (value > node.valor) {
            return this.find(value, node.derecha);
        }
    }

    getHeight(node) {
        if (node === null) {
            return -1;
        }

        let left = this.getHeight(node.izquierda);
        let right = this.getHeight(node.derecha);

        return Math.max(left, right) + 1;
    }

    height(value) {
        const node = this.find(value);

        if (node === null) {
            return undefined;
        }

        return this.getHeight(node);
    }

    depth(value, node = this.root, edges = 0) {
        if (node === null) {
            return undefined;
        }

        if (value === node.valor) {
            return edges;
        }

        if (value < node.valor) {
            return this.depth(value, node.izquierda, edges + 1);
        }

        if (value > node.valor) {
            return this.depth(value, node.derecha, edges + 1);
        }
    }

    isBalanced(node = this.root) {
        if (node === null) {
            return true;
        }

        let leftHeight = this.getHeight(node.izquierda);

        let rightHeight = this.getHeight(node.derecha);

        let difference = Math.abs(leftHeight - rightHeight);

        if (difference > 1) {
            return false;
        }

        return this.isBalanced(node.izquierda) && this.isBalanced(node.derecha);
    }

    rebalance() {
        let values = [];

        function inOrder(node) {
            if (node === null) {
                return;
            }

            inOrder(node.izquierda);

            values.push(node.valor);

            inOrder(node.derecha);
        }

        inOrder(this.root);

        this.root = this.buildTree(values);
    }
}
