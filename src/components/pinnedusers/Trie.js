class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false; 
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.isEndOfWord = true;
  }

  insertList(wordList) {
    for (let i = 0; i < wordList.length; i++) {
      this.insert(wordList[i]);
    }
  }

  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char);
    }
    console.log(node.isEndOfWord);
    return node.isEndOfWord;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) {
        return [];
      }
      node = node.children.get(char);
    }
    var res = [];
    this.dfs(node, prefix, res);
    console.log(res);
    return res;
  }

  dfs(node, word, res) {
    if (node.isEndOfWord === true) {
      res.push(word);
    }
    for (const key of node.children.keys()) {
      this.dfs(node.children.get(key), word + key, res);
    }
  }

  delete(word) {
    var nodes = [];
    var keys = [];
    var curr = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!curr.children.has(word[i])) {
        return;
      }
      curr = curr.children.get(word[i]);
      keys.push(word[i]);
      nodes.push(curr);
    }
    curr.isEndOfWord = false;
    while (nodes.length > 0) {
      curr = nodes.pop();
      var currKey = keys.pop();
      if (curr.children.size > 0 || curr.isEndOfWord) {
        break;
      }
      if (curr.length === 0) {
        this.root.children.delete(currKey);
      } else {
        nodes[nodes.length - 1].children.delete(currKey);
      }
    }
  }

  deepPrint() {
    var res = [];
    this.dfs(this.root, "", res);
    console.log("deep print: ")
    console.log(res);
    return res;
  }

  clear() {
    this.root = new TrieNode();
  }
}

export default Trie;
