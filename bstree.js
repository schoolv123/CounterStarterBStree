
class Node {
  constructor(id, data= [], left = null, right = null) {
    this.id = id;
    this.left = left;
    this.right = right;
    this.data= data
  }
}

class BST {
  constructor(collection = null) {
    this.root = collection;
  }
  add(id) {
    const node = this.root;
    if (node === null) {
      this.root = new Node(id, [23,56]);
      return;
    } else {
      const searchTree = function (node) {
        if (id < node.id) {
          if (node.left === null) {
            node.left = new Node(id, [56,78]);
            return;
          } else if (node.left !== null) {
            return searchTree(node.left);
          }
        } else if (id > node.id) {
          if (node.right === null) {
            node.right = new Node(id, [5644, 345]);
            return;
          } else if (node.right !== null) {
            return searchTree(node.right);
          }
        } else {
          return null;
        }
      };
      return searchTree(node);
    }
  }
  findMin() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.id;
  }
findMax() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.id;
  }
  find(id) {
    let current = this.root;
    while (current.id !== id) {
      if (id < current.id) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current === null) {
        return null;
      }
    }
    return current;
  }
  isPresent(id) {
    let current = this.root;
    while (current) {
      if (id === current.id) {
        return true;
      }
      if (id < current.id) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }
  remove(id) {
    const removeNode = function (node, id) {
      if (node == null) {
        return null;
      }
      if (id == node.id) {
        // node has no children
        if (node.left == null && node.right == null) {
          return null;
        }
        // node has no left child
        if (node.left == null) {
          return node.right;
        }
        // node has no right child
        if (node.right == null) {
          return node.left;
        }
        // node has two children
        var tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.id = tempNode.id;
        node.right = removeNode(node.right, tempNode.id);
        return node;
      } else if (id < node.id) {
        node.left = removeNode(node.left, id);
        return node;
      } else {
        node.right = removeNode(node.right, id);
        return node;
      }
    };
    this.root = removeNode(this.root, id);
  }
  isBalanced() {
    return this.findMinHeight() >= this.findMaxHeight() - 1;
  }
  findMinHeight(node = this.root) {
    if (node == null) {
      return -1;
    }
    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);
    if (left < right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }
  findMaxHeight(node = this.root) {
    if (node == null) {
      return -1;
    }
    let left = this.findMaxHeight(node.left);
    let right = this.findMaxHeight(node.right);
    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }
  inOrder() {
    if (this.root == null) {
      return null;
    } else {
      var result = new Array();
      function traverseInOrder(node) {
        node.left && traverseInOrder(node.left);
        result.push(node.id);
        node.right && traverseInOrder(node.right);
      }
      traverseInOrder(this.root);
      return result;
    }
  }
  preOrder() {
    if (this.root == null) {
      return null;
    } else {
      var result = new Array();
      function traversePreOrder(node) {
        result.push(node.id);
        node.left && traversePreOrder(node.left);
        node.right && traversePreOrder(node.right);
      }
      traversePreOrder(this.root);
      return result;
    }
  }
 postOrder() {
    if (this.root == null) {
      return null;
    } else {
      var result = new Array();
      function traversePostOrder(node) {
        node.left && traversePostOrder(node.left);
        node.right && traversePostOrder(node.right);
        result.push(node.id);
      }
      traversePostOrder(this.root);
      return result;
    }
  }
 
 levelOrder() {
    let result = [];
    let Q = [];
    if (this.root != null) {
      Q.push(this.root);
      while (Q.length > 0) {
        let node = Q.shift();
        result.push(node.id);
        if (node.left != null) {
          Q.push(node.left);
        }
        if (node.right != null) {
          Q.push(node.right);
        }
      }
      return result;
    } else {
      return null;
    }
  }
 rand(){
   return Math.floor((Math.random() * 100) + 10);
  // return (Math.random() + 1).toString(36).substring(7);
 }
}

const bst = new BST();
bst.add(bst.rand());
bst.add(bst.rand());
bst.add(bst.rand());
bst.add(bst.rand());
bst.add(bst.rand());
bst.add(56);
bst.add(bst.rand());
bst.add(bst.rand());
bst.add(bst.rand());
bst.add(bst.rand());

console.log(bst.findMinHeight());
console.log(bst.findMaxHeight());
console.log(bst.isBalanced());
bst.add(bst.rand());
console.log(bst.findMinHeight());
console.log(bst.findMaxHeight());
console.log(bst.isBalanced());
console.log("inOrder: " + bst.inOrder());
bst.remove(23);
console.log("inOrder: " + bst.inOrder());
console.log("preOrder: " + bst.preOrder());
console.log("postOrder: " + bst.postOrder());

console.log("levelOrder: " + bst.levelOrder());
