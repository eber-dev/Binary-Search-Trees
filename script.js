import { Tree } from './tree.js';

function randomArray(size = 10) {
    let array = [];

    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100));
    }

    return array;
}

const array = randomArray();

console.log('Array original:');
console.log(array);

const tree = new Tree(array);

console.log('¿Está balanceado?');
console.log(tree.isBalanced());

console.log('Level Order');
tree.levelOrder();

console.log('Pre Order');
tree.preOrder();

console.log('Post Order');
tree.postOrder();

console.log('In Order');
tree.inOrder();

tree.insert(120);
tree.insert(130);
tree.insert(140);
tree.insert(150);
tree.insert(160);

console.log('¿Está balanceado después de insertar?');
console.log(tree.isBalanced());

tree.rebalance();

console.log('¿Está balanceado después de rebalancear?');
console.log(tree.isBalanced());

console.log('Level Order');
tree.levelOrder();

console.log('Pre Order');
tree.preOrder();

console.log('Post Order');
tree.postOrder();

console.log('In Order');
tree.inOrder();
