// get request body when making request to graphql endpoint
// parse request body as an object
// map values with root query as the root node
// create children nodes for each resolver
// continue to children's resolvers
// how to handle nested queries where fields are redundantly visited?
// redundant visits imply the need for a dataloader(for batching + caching)
// how to handle arguments?
// maybe just use the AST parsed from goTrace function.. 

class AST {
  constructor(root: any) {
    this.root = root;
  }

  addChild(node: any) {
    if (this.children !== null) {
      this.children.push(node);
      node.parent = this;
    }
    this.children = [];
  }
}

class Node {
  constructor(val: string) {
    this.val = val;
    this.parent = this;
  }
}
