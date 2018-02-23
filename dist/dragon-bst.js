(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["DragonBST"] = factory();
	else
		root["DragonBST"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class TreeError extends Error {
    constructor(message, metadata) {
        super(message);
        this.metadata = {};
        if (metadata != null) {
            Object.keys(metadata).forEach(key => {
                this.metadata[key] = metadata[key];
            });
        }
    }
}
exports.TreeError = TreeError;
function gerRandomInteger(n) {
    return Math.floor(Math.random() * n);
}
exports.gerRandomInteger = gerRandomInteger;
function getRandomArray(n) {
    const toReturn = [];
    for (let i = 0; i < n; ++i) {
        toReturn.push(i);
    }
    for (let i = toReturn.length - 1; i >= 0; --i) {
        const j = gerRandomInteger(i);
        const v = toReturn[i];
        toReturn[i] = toReturn[j];
        toReturn[j] = v;
    }
    return toReturn;
}
exports.getRandomArray = getRandomArray;
function defaultCompareKeys(a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    if (a === b) {
        return 0;
    }
    throw new TreeError(`Couldn't compare elements (${a} - ${b})`, { a: a, b: b });
}
exports.defaultCompareKeys = defaultCompareKeys;
function defaultCheckValueEquality(a, b) {
    return a === b;
}
exports.defaultCheckValueEquality = defaultCheckValueEquality;
function append(array, arrayToAppend) {
    for (const toAppend of arrayToAppend) {
        array.push(toAppend);
    }
}
exports.append = append;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const avl_tree_1 = __webpack_require__(2);
exports.AVLTree = avl_tree_1.AVLTree;
const custom_utils_1 = __webpack_require__(0);
exports.TreeError = custom_utils_1.TreeError;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const custom_utils_1 = __webpack_require__(0);
class AVLTree {
    constructor(options) {
        this.avl = new AVLTreeInternal(options || {});
    }
    validateTree() {
        this.avl.validateTree();
    }
    getNumberOfKeys() {
        return this.avl.getNumberOfKeys();
    }
    getHeight() {
        return this.avl.getHeight();
    }
    insert(key, value) {
        if (key === void 0) {
            throw new custom_utils_1.TreeError(`Cannot insert an undefined key.`);
        }
        const avl = this.avl.insert(key, value);
        if (avl) {
            this.avl = avl;
        }
    }
    delete(key, value) {
        if (key === void 0) {
            throw new custom_utils_1.TreeError(`Cannot delete undefined key.`);
        }
        const avl = this.avl.delete(key, value);
        if (avl) {
            this.avl = avl;
        }
    }
    search(key) {
        if (key === void 0) {
            throw new custom_utils_1.TreeError(`Cannot search undefined key.`);
        }
        return this.avl.search(key);
    }
    betweenBounds(query) {
        return this.avl.betweenBounds(query);
    }
    executeOnEveryNode(action) {
        this.avl.executeOnEveryNode(action);
    }
}
exports.AVLTree = AVLTree;
class AVLTreeInternal {
    constructor(options) {
        this.parent = null;
        this.left = null;
        this.right = null;
        if (options.initial != null) {
            if (options.initial.key === void 0 || options.initial.value === void 0) {
                throw new custom_utils_1.TreeError('If initial value is provided key and value cannot be undefined');
            }
            this.key = options.initial.key;
            this.data = [options.initial.value];
            this.height = 1;
        }
        else {
            this.key = void 0;
            this.data = [];
            this.height = null;
        }
        this.unique = options.unique != null ? options.unique : false;
        this.compareKeys = options.compareKeys || custom_utils_1.defaultCompareKeys;
        this.checkValueEquality = options.checkValueEquality || custom_utils_1.defaultCheckValueEquality;
    }
    validateTree() {
        if (this.key === void 0) {
            return;
        }
        if (this.parent != null) {
            throw new custom_utils_1.TreeError(`The root shouldn't have a parent`);
        }
        this.validateNode();
    }
    getNumberOfKeys() {
        if (this.key === void 0) {
            return 0;
        }
        let toReturn = 1;
        if (this.left) {
            toReturn += this.left.getNumberOfKeys();
        }
        if (this.right) {
            toReturn += this.right.getNumberOfKeys();
        }
        return toReturn;
    }
    getHeight() {
        return this.height;
    }
    insert(key, value) {
        if (this.key === void 0) {
            this.key = key;
            this.data = [value];
            this.height = 1;
            return this;
        }
        const insertPath = [];
        let currentNode = this;
        while (true) {
            const compared = this.compareKeys(key, currentNode.key);
            if (compared === 0) {
                if (this.unique) {
                    throw new custom_utils_1.TreeError(`Can't insert key '${key}', it violates the unique constraint`, { key: String(key), errorType: 'uniqueViolated' });
                }
                else {
                    const presentIdx = currentNode.data.findIndex(d => this.checkValueEquality(d, value));
                    if (presentIdx >= 0) {
                        currentNode.data[presentIdx] = value;
                    }
                    else {
                        currentNode.data.push(value);
                    }
                }
                return this;
            }
            insertPath.push(currentNode);
            if (compared < 0) {
                if (!currentNode.left) {
                    insertPath.push(currentNode.createLeftChild({ initial: { key: key, value: value } }));
                    break;
                }
                else {
                    currentNode = currentNode.left;
                }
            }
            else {
                if (!currentNode.right) {
                    insertPath.push(currentNode.createRightChild({ initial: { key: key, value: value } }));
                    break;
                }
                else {
                    currentNode = currentNode.right;
                }
            }
        }
        return this.rebalanceAlongPath(insertPath);
    }
    delete(key, value) {
        if (this.key === void 0) {
            return this;
        }
        const deletePath = [];
        let currentNode = this;
        while (true) {
            if (!currentNode) {
                return this;
            }
            const compared = this.compareKeys(key, currentNode.key);
            if (compared === 0) {
                break;
            }
            deletePath.push(currentNode);
            if (compared < 0) {
                currentNode = currentNode.left;
            }
            else {
                currentNode = currentNode.right;
            }
        }
        if (value !== void 0 && currentNode.data.length > 0) {
            currentNode.data = currentNode.data.filter(d => !this.checkValueEquality(d, value));
            if (currentNode.data.length > 0) {
                return this;
            }
        }
        if (!currentNode.left && !currentNode.right) {
            if (currentNode === this) {
                currentNode.key = void 0;
                currentNode.data = [];
                currentNode.height = null;
                return this;
            }
            else {
                if (currentNode.parent.left === currentNode) {
                    currentNode.parent.left = null;
                }
                else {
                    currentNode.parent.right = null;
                }
                return this.rebalanceAlongPath(deletePath);
            }
        }
        if (!currentNode.left || !currentNode.right) {
            const replaceWith = currentNode.left ? currentNode.left : currentNode.right;
            if (currentNode === this) {
                replaceWith.parent = null;
                return replaceWith;
            }
            else {
                if (currentNode.parent.left === currentNode) {
                    currentNode.parent.left = replaceWith;
                    replaceWith.parent = currentNode.parent;
                }
                else {
                    currentNode.parent.right = replaceWith;
                    replaceWith.parent = currentNode.parent;
                }
                return this.rebalanceAlongPath(deletePath);
            }
        }
        deletePath.push(currentNode);
        let replaceWith = currentNode.left;
        if (!replaceWith.right) {
            currentNode.key = replaceWith.key;
            currentNode.data = replaceWith.data;
            currentNode.left = replaceWith.left;
            if (replaceWith.left) {
                replaceWith.left.parent = currentNode;
            }
            return this.rebalanceAlongPath(deletePath);
        }
        while (true) {
            if (replaceWith.right) {
                deletePath.push(replaceWith);
                replaceWith = replaceWith.right;
            }
            else {
                break;
            }
        }
        currentNode.key = replaceWith.key;
        currentNode.data = replaceWith.data;
        replaceWith.parent.right = replaceWith.left;
        if (replaceWith.left) {
            replaceWith.left.parent = replaceWith.parent;
        }
        return this.rebalanceAlongPath(deletePath);
    }
    search(key) {
        if (this.key !== void 0) {
            let currentNode = this;
            while (true) {
                const compared = this.compareKeys(key, currentNode.key);
                if (compared === 0) {
                    return currentNode.data;
                }
                else if (compared > 0) {
                    if (!currentNode.right) {
                        break;
                    }
                    currentNode = currentNode.right;
                }
                else {
                    if (!currentNode.left) {
                        break;
                    }
                    currentNode = currentNode.left;
                }
            }
        }
        return [];
    }
    betweenBounds(query, lbMatcher, ubMatcher) {
        if (this.key === void 0) {
            return [];
        }
        lbMatcher = lbMatcher || this.getLowerBoundMatcher(query);
        ubMatcher = ubMatcher || this.getUpperBoundMatcher(query);
        const lMatch = lbMatcher(this.key);
        const uMatch = ubMatcher(this.key);
        const toReturn = [];
        if (lMatch && this.left) {
            custom_utils_1.append(toReturn, this.left.betweenBounds(query, lbMatcher, ubMatcher));
        }
        if (lMatch && uMatch) {
            custom_utils_1.append(toReturn, this.data);
        }
        if (uMatch && this.right) {
            custom_utils_1.append(toReturn, this.right.betweenBounds(query, lbMatcher, ubMatcher));
        }
        return toReturn;
    }
    executeOnEveryNode(action) {
        if (this.left) {
            this.left.executeOnEveryNode(action);
        }
        action(this.key, this.data);
        if (this.right) {
            this.right.executeOnEveryNode(action);
        }
    }
    getLowerBoundMatcher(query) {
        if (query.$gt == null && query.$gte == null) {
            return () => true;
        }
        if (query.$gt != null && query.$gte != null) {
            const compared = this.compareKeys(query.$gte, query.$gt);
            if (compared === 0) {
                return (key) => this.compareKeys(key, query.$gt) > 0;
            }
            if (compared > 0) {
                return (key) => this.compareKeys(key, query.$gte) >= 0;
            }
            else {
                return (key) => this.compareKeys(key, query.$gt) > 0;
            }
        }
        if (query.$gt != null) {
            return (key) => this.compareKeys(key, query.$gt) > 0;
        }
        else {
            return (key) => this.compareKeys(key, query.$gte) >= 0;
        }
    }
    getUpperBoundMatcher(query) {
        if (query.$lt == null && query.$lte == null) {
            return () => true;
        }
        if (query.$lt != null && query.$lte != null) {
            const compared = this.compareKeys(query.$lte, query.$lt);
            if (compared === 0) {
                return (key) => this.compareKeys(key, query.$lt) < 0;
            }
            if (compared > 0) {
                return (key) => this.compareKeys(key, query.$lt) < 0;
            }
            else {
                return (key) => this.compareKeys(key, query.$lte) <= 0;
            }
        }
        if (query.$lt != null) {
            return (key) => this.compareKeys(key, query.$lt) < 0;
        }
        else {
            return (key) => this.compareKeys(key, query.$lte) <= 0;
        }
    }
    rebalanceAlongPath(path) {
        if (this.key === void 0) {
            this.height = null;
            return this;
        }
        let newRoot = this;
        let rotated;
        for (let i = path.length - 1; i >= 0; --i) {
            const p = path[i];
            p.height = 1 + Math.max(p.left ? p.left.height : 0, p.right ? p.right.height : 0);
            if (p.balanceFactor() > 1) {
                rotated = p.rightTooSmall();
                if (i === 0) {
                    newRoot = rotated;
                }
            }
            if (p.balanceFactor() < -1) {
                rotated = p.leftTooSmall();
                if (i === 0) {
                    newRoot = rotated;
                }
            }
        }
        return newRoot;
    }
    rightTooSmall() {
        if (this.balanceFactor() <= 1) {
            return this;
        }
        if (this.left.balanceFactor() < 0) {
            this.left.leftRotation();
        }
        return this.rightRotation();
    }
    leftTooSmall() {
        if (this.balanceFactor() >= -1) {
            return this;
        }
        if (this.right.balanceFactor() > 0) {
            this.right.rightRotation();
        }
        return this.leftRotation();
    }
    rightRotation() {
        if (!this.left) {
            return this;
        }
        const q = this;
        const p = this.left;
        const b = p.right;
        if (q.parent) {
            p.parent = q.parent;
            if (q.parent.left === q) {
                q.parent.left = p;
            }
            else {
                q.parent.right = p;
            }
        }
        else {
            p.parent = null;
        }
        p.right = q;
        q.parent = p;
        q.left = b;
        if (b) {
            b.parent = q;
        }
        const ah = p.left ? p.left.height : 0;
        const bh = b ? b.height : 0;
        const ch = q.right ? q.right.height : 0;
        q.height = Math.max(bh, ch) + 1;
        p.height = Math.max(ah, q.height) + 1;
        return p;
    }
    leftRotation() {
        if (!this.right) {
            return this;
        }
        const p = this;
        const q = this.right;
        const b = q.left;
        if (p.parent) {
            q.parent = p.parent;
            if (p.parent.left === p) {
                p.parent.left = q;
            }
            else {
                p.parent.right = q;
            }
        }
        else {
            q.parent = null;
        }
        q.left = p;
        p.parent = q;
        p.right = b;
        if (b) {
            b.parent = p;
        }
        const ah = p.left ? p.left.height : 0;
        const bh = b ? b.height : 0;
        const ch = q.right ? q.right.height : 0;
        p.height = Math.max(ah, bh) + 1;
        q.height = Math.max(ch, p.height) + 1;
        return q;
    }
    validateNode() {
        if (this.left) {
            if (this.left.parent !== this) {
                throw new custom_utils_1.TreeError('Parent pointer broken for key ' + this.key);
            }
            if (this.left.height == null) {
                throw new custom_utils_1.TreeError(`Undefined height for node '${this.left.key}'`);
            }
            if (this.compareKeys(this.left.key, this.key) >= 0) {
                throw new custom_utils_1.TreeError(`Tree with root '${this.key}' is not a binary search tree`);
            }
        }
        if (this.right) {
            if (this.right.parent !== this) {
                throw new custom_utils_1.TreeError('Parent pointer broken for key ' + this.key);
            }
            if (this.right.height == null) {
                throw new custom_utils_1.TreeError(`Undefined height for node '${this.left.key}'`);
            }
            if (this.compareKeys(this.right.key, this.key) <= 0) {
                throw new custom_utils_1.TreeError(`Tree with root '${this.key}' is not a binary search tree`);
            }
        }
        if (this.height == null) {
            throw new custom_utils_1.TreeError(`Undefined height for node '${this.left.key}'`);
        }
        const heightL = this.left ? this.left.height : 0;
        const heightR = this.right ? this.right.height : 0;
        if (this.height !== 1 + Math.max(heightL, heightR)) {
            throw new custom_utils_1.TreeError(`Height constraint failed for node '${this.key}'`);
        }
        if (Math.abs(this.balanceFactor()) > 1) {
            throw new custom_utils_1.TreeError(`Tree is unbalanced at node '${this.key}'`);
        }
        if (this.left) {
            this.left.validateNode();
        }
        if (this.right) {
            this.right.validateNode();
        }
    }
    balanceFactor() {
        const heightL = this.left ? this.left.height : 0;
        const heightR = this.right ? this.right.height : 0;
        return heightL - heightR;
    }
    createLeftChild(options) {
        this.left = this.createSimilar(options);
        this.left.parent = this;
        return this.left;
    }
    createRightChild(options) {
        this.right = this.createSimilar(options);
        this.right.parent = this;
        return this.right;
    }
    createSimilar(options) {
        options.unique = this.unique;
        options.compareKeys = this.compareKeys;
        options.checkValueEquality = this.checkValueEquality;
        return new AVLTreeInternal(options);
    }
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmYmY4ZjgxMDNkMzQ3NWNmZDYzNyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jdXN0b20tdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RyYWdvbi1ic3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYXZsLXRyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQSxlQUF1QixTQUFRLEtBQUs7SUFLbEMsWUFBWSxPQUFlLEVBQUUsUUFBdUQ7UUFDbEYsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWYsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFFbkIsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxR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QU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM3QixPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDdkMsT0FBTyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUVyRCxNQUFNLENBQUMsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUNGIiwiZmlsZSI6ImRyYWdvbi1ic3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEcmFnb25CU1RcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiRHJhZ29uQlNUXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmYmY4ZjgxMDNkMzQ3NWNmZDYzNyIsImV4cG9ydCBjbGFzcyBUcmVlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIHB1YmxpYyBtZXRhZGF0YTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIH07XG5cbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKVxuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIG1ldGFkYXRhOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfSlcbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nLCBtZXRhZGF0YT86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB9KSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG5cbiAgICB0aGlzLm1ldGFkYXRhID0ge307XG5cbiAgICBpZiAobWV0YWRhdGEgIT0gbnVsbCkge1xuICAgICAgT2JqZWN0LmtleXMobWV0YWRhdGEpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgdGhpcy5tZXRhZGF0YVtrZXldID0gbWV0YWRhdGFba2V5XTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgdHlwZSBLZXlNYXRjaGVyPEs+ID0gKGtleTogSykgPT4gYm9vbGVhbjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlclJhbmRvbUludGVnZXIobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG4pO1xufVxuXG4vKipcbiAqIFJldHVybiBhbiBhcnJheSB3aXRoIHRoZSBudW1iZXJzIGZyb20gMCB0byBuLTEsIGluIGEgcmFuZG9tIG9yZGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb21BcnJheShuOiBudW1iZXIpOiBudW1iZXJbXSB7XG4gIGNvbnN0IHRvUmV0dXJuOiBudW1iZXJbXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgIHRvUmV0dXJuLnB1c2goaSk7XG4gIH1cblxuICBmb3IgKGxldCBpID0gdG9SZXR1cm4ubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICBjb25zdCBqID0gZ2VyUmFuZG9tSW50ZWdlcihpKTtcblxuICAgIGNvbnN0IHYgPSB0b1JldHVybltpXTtcbiAgICB0b1JldHVybltpXSA9IHRvUmV0dXJuW2pdO1xuICAgIHRvUmV0dXJuW2pdID0gdjtcblxuICB9XG5cbiAgcmV0dXJuIHRvUmV0dXJuO1xufVxuXG4vKlxuICogRGVmYXVsdCBjb21wYXJlS2V5cyBmdW5jdGlvbiB3aWxsIHdvcmsgZm9yIG51bWJlcnMsIHN0cmluZ3MgYW5kIGRhdGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0Q29tcGFyZUtleXMoYTogYW55LCBiOiBhbnkpOiAtMSB8IDAgfCAxIHtcbiAgaWYgKGEgPCBiKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIGlmIChhID4gYikge1xuICAgIHJldHVybiAxO1xuICB9XG4gIGlmIChhID09PSBiKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB0aHJvdyBuZXcgVHJlZUVycm9yKGBDb3VsZG4ndCBjb21wYXJlIGVsZW1lbnRzICgke2F9IC0gJHtifSlgLCB7YTogYSwgYjogYn0pO1xufVxuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgdHdvIHZhbHVlcyBhcmUgZXF1YWwgKHVzZWQgaW4gbm9uLXVuaXF1ZSBkZWxldGlvbilcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRDaGVja1ZhbHVlRXF1YWxpdHkoYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIGEgPT09IGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmQoYXJyYXk6IGFueVtdLCBhcnJheVRvQXBwZW5kOiBhbnlbXSk6IHZvaWQge1xuICBmb3IgKGNvbnN0IHRvQXBwZW5kIG9mIGFycmF5VG9BcHBlbmQpIHtcbiAgICBhcnJheS5wdXNoKHRvQXBwZW5kKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvY3VzdG9tLXV0aWxzLnRzIiwiaW1wb3J0IHtBVkxUcmVlLCBBVkxUcmVlT3B0aW9ucywgQVZMVHJlZVF1ZXJ5fSBmcm9tICcuL2NvbXBvbmVudHMvYXZsLXRyZWUnO1xuaW1wb3J0IHtUcmVlRXJyb3J9IGZyb20gJy4vY29tcG9uZW50cy9jdXN0b20tdXRpbHMnO1xuXG5leHBvcnQge0FWTFRyZWUsIEFWTFRyZWVPcHRpb25zLCBBVkxUcmVlUXVlcnksIFRyZWVFcnJvcn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZHJhZ29uLWJzdC50cyIsImltcG9ydCB7YXBwZW5kLCBkZWZhdWx0Q2hlY2tWYWx1ZUVxdWFsaXR5LCBkZWZhdWx0Q29tcGFyZUtleXMsIEtleU1hdGNoZXIsIFRyZWVFcnJvcn0gZnJvbSAnLi9jdXN0b20tdXRpbHMnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQVZMVHJlZVF1ZXJ5PEs+IHtcbiAgJGd0PzogSztcbiAgJGd0ZT86IEs7XG4gICRsdD86IEs7XG4gICRsdGU/OiBLO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFWTFRyZWVPcHRpb25zPEssIFYgZXh0ZW5kcyBhbnk+IHtcbiAgLyoqXG4gICAqIFRoZSBpbml0aWFsIGtleS12YWx1ZSBwYWlyIHdpdGggd2hpY2ggaW5pdGlhbGl6ZSB0cmVlLlxuICAgKi9cbiAgaW5pdGlhbD86IHsga2V5OiBLLCB2YWx1ZTogViB9LFxuXG4gIC8qKlxuICAgKiBJZiB0cnVlIHRyeWluZyB0byBpbnNlcnQgYSBrZXkgYWxyZWFkeSBwcmVzZW50IGluIHRoZSB0cmVlIHdpbGwgcmVzdWx0IGluIGFuIGV4Y2VwdGlvbi5cbiAgICovXG4gIHVuaXF1ZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgYSBjdXN0b20gZnVuY3Rpb24gdG8gY29tcGFyZSBrZXlzLlxuICAgKiBJdCBtdXN0IGFjY2VwdHMgdHdvIGFyZ3VtZW50cyBhbmQgcmV0dXJuIG9uZSBiZXR3ZWVuIC0xLCAwLCAxLlxuICAgKi9cbiAgY29tcGFyZUtleXM/OiAoYTogSywgYjogSykgPT4gLTEgfCAwIHwgMTtcblxuICAvKipcbiAgICogU3BlY2lmeSBhIGN1c3RvbSBmdW5jdGlvbiB0byBjaGVjayB2YWx1ZXMgZXF1YWxpdHkuXG4gICAqIEl0IG11c3QgYWNjZXB0cyB0d28gYXJndW1lbnRzIGFuZCByZXR1cm4gdHJ1ZSBvciBmYWxzZS5cbiAgICovXG4gIGNoZWNrVmFsdWVFcXVhbGl0eT86IChhOiBWLCBiOiBWKSA9PiBib29sZWFuO1xufVxuXG4vKipcbiAqIFNlbGYtYmFsYW5jaW5nIGJpbmFyeSBzZWFyY2ggdHJlZSB1c2luZyB0aGUgQVZMIGltcGxlbWVudGF0aW9uXG4gKi9cbmV4cG9ydCBjbGFzcyBBVkxUcmVlPEssIFYgZXh0ZW5kcyBhbnk+IHtcbiAgcHJpdmF0ZSBhdmw6IEFWTFRyZWVJbnRlcm5hbDxLLCBWPjtcblxuICAvKipcbiAgICogQVZMVHJlZSBjb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQHBhcmFtIHtBVkxUcmVlT3B0aW9uc30gb3B0aW9ucyBPcHRpb25hbC4gVHJlZSBjb25maWd1cmF0aW9uIG9wdGlvbnMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogQVZMVHJlZU9wdGlvbnM8SywgVj4pIHtcbiAgICB0aGlzLmF2bCA9IG5ldyBBVkxUcmVlSW50ZXJuYWwob3B0aW9ucyB8fCB7fSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgYWxsIGNvbmRpdGlvbnMgb2YgdGhpcyBBVkwgU2VhcmNoIHRyZWU6XG4gICAqICAtIEludGVybmFsIHJlZmVyZW5jZXNcbiAgICogIC0gTm9kZXMgb3JkZXJpbmcgYW5kIGhlaWdodHNcbiAgICogIC0gQmFsYW5jZSBGYWN0b3JzXG4gICAqL1xuICBwdWJsaWMgdmFsaWRhdGVUcmVlKCk6IHZvaWQge1xuICAgIHRoaXMuYXZsLnZhbGlkYXRlVHJlZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBudW1iZXIgb2YgaW5zZXJ0ZWQga2V5cy5cbiAgICovXG4gIHB1YmxpYyBnZXROdW1iZXJPZktleXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5hdmwuZ2V0TnVtYmVyT2ZLZXlzKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRyZWUgaGVpZ2h0LlxuICAgKi9cbiAgcHVibGljIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmF2bC5nZXRIZWlnaHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnQgYSBuZXcgZWxlbWVudC5cbiAgICovXG4gIHB1YmxpYyBpbnNlcnQoa2V5OiBLLCB2YWx1ZTogVik6IHZvaWQge1xuICAgIGlmIChrZXkgPT09IHZvaWQgMCkge1xuICAgICAgdGhyb3cgbmV3IFRyZWVFcnJvcihgQ2Fubm90IGluc2VydCBhbiB1bmRlZmluZWQga2V5LmApO1xuICAgIH1cblxuICAgIGNvbnN0IGF2bCA9IHRoaXMuYXZsLmluc2VydChrZXksIHZhbHVlKTtcbiAgICBpZiAoYXZsKSB7XG4gICAgICB0aGlzLmF2bCA9IGF2bDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEga2V5IG9yIGp1c3QgYSB2YWx1ZSBhc3NvY2lhdGVkIHRvIHRoYXQga2V5LlxuICAgKlxuICAgKiBAcGFyYW0ga2V5ICAgVGhlIHRhcmdldCBrZXkuXG4gICAqIEBwYXJhbSB2YWx1ZSBPcHRpb25hbC4gSWYgcHJvdnZpZGVkIGRlbGV0ZSBvbmx5IHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHRvIHRoYXQga2V5IHRoYXQgbWF0Y2hlcyB0aGlzIHBhcmFuZXRlci5cbiAgICovXG4gIHB1YmxpYyBkZWxldGUoa2V5OiBLLCB2YWx1ZT86IFYpOiB2b2lkIHtcbiAgICBpZiAoa2V5ID09PSB2b2lkIDApIHtcbiAgICAgIHRocm93IG5ldyBUcmVlRXJyb3IoYENhbm5vdCBkZWxldGUgdW5kZWZpbmVkIGtleS5gKTtcbiAgICB9XG5cbiAgICBjb25zdCBhdmwgPSB0aGlzLmF2bC5kZWxldGUoa2V5LCB2YWx1ZSk7XG4gICAgaWYgKGF2bCkge1xuICAgICAgdGhpcy5hdmwgPSBhdmw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCBmb3IgYWxsIGRhdGEgY29ycmVzcG9uZGluZyB0byBhIGtleS5cbiAgICovXG4gIHB1YmxpYyBzZWFyY2goa2V5OiBLKTogVltdIHtcbiAgICBpZiAoa2V5ID09PSB2b2lkIDApIHtcbiAgICAgIHRocm93IG5ldyBUcmVlRXJyb3IoYENhbm5vdCBzZWFyY2ggdW5kZWZpbmVkIGtleS5gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hdmwuc2VhcmNoKGtleSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCBkYXRhIGZvciBhIGtleSBiZXR3ZWVuIGJvdW5kcy5cbiAgICogUmV0dXJuIGl0IGluIGtleSBvcmRlci5cbiAgICpcbiAgICogQHBhcmFtIHtBVkxUcmVlUXVlcnl9IHF1ZXJ5IEEgcXVlcnkgdXNlZCB0byBzZWFyY2ggdGhlIHRyZWUsIHRvIHJldHJpZXZlIGFsbCBkYXRhIGluIHRoZSB0cmVlIHVzZSB7fS5cbiAgICogQHJldHVybnMge1tdfSBBbiBhcnJheSBvZiBmb3VuZCBlbGVtZW50c1xuICAgKi9cbiAgcHVibGljIGJldHdlZW5Cb3VuZHMocXVlcnk6IEFWTFRyZWVRdWVyeTxLPik6IFZbXSB7XG4gICAgcmV0dXJuIHRoaXMuYXZsLmJldHdlZW5Cb3VuZHMocXVlcnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGUgYSBmdW5jdGlvbiBvbiBldmVyeSBub2RlIG9mIHRoZSB0cmVlLCBpbiBrZXkgb3JkZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7KGtleTogSywgZGF0YTogVltdKSA9PiB2b2lkfSBhY3Rpb25cbiAgICovXG4gIHB1YmxpYyBleGVjdXRlT25FdmVyeU5vZGUoYWN0aW9uOiAoa2V5OiBLLCBkYXRhOiBWW10pID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLmF2bC5leGVjdXRlT25FdmVyeU5vZGUoYWN0aW9uKTtcbiAgfVxufVxuXG5jbGFzcyBBVkxUcmVlSW50ZXJuYWw8SywgViBleHRlbmRzIGFueT4ge1xuICBwcml2YXRlIGtleTogSztcbiAgcHJpdmF0ZSBkYXRhOiBWW107XG4gIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBwYXJlbnQ6IEFWTFRyZWVJbnRlcm5hbDxLLCBWPjtcbiAgcHJpdmF0ZSBsZWZ0OiBBVkxUcmVlSW50ZXJuYWw8SywgVj47XG4gIHByaXZhdGUgcmlnaHQ6IEFWTFRyZWVJbnRlcm5hbDxLLCBWPjtcblxuICBwcml2YXRlIHVuaXF1ZTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBjb21wYXJlS2V5czogKGE6IEssIGI6IEspID0+IC0xIHwgMCB8IDE7XG4gIHByaXZhdGUgY2hlY2tWYWx1ZUVxdWFsaXR5OiAoYTogYW55LCBiOiBhbnkpID0+IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogQVZMVHJlZU9wdGlvbnM8SywgVj4pIHtcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgdGhpcy5sZWZ0ID0gbnVsbDtcbiAgICB0aGlzLnJpZ2h0ID0gbnVsbDtcblxuICAgIGlmIChvcHRpb25zLmluaXRpYWwgIT0gbnVsbCkge1xuICAgICAgaWYgKG9wdGlvbnMuaW5pdGlhbC5rZXkgPT09IHZvaWQgMCB8fCBvcHRpb25zLmluaXRpYWwudmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgICB0aHJvdyBuZXcgVHJlZUVycm9yKCdJZiBpbml0aWFsIHZhbHVlIGlzIHByb3ZpZGVkIGtleSBhbmQgdmFsdWUgY2Fubm90IGJlIHVuZGVmaW5lZCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5rZXkgPSBvcHRpb25zLmluaXRpYWwua2V5O1xuICAgICAgdGhpcy5kYXRhID0gW29wdGlvbnMuaW5pdGlhbC52YWx1ZV07XG4gICAgICB0aGlzLmhlaWdodCA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMua2V5ID0gdm9pZCAwO1xuICAgICAgdGhpcy5kYXRhID0gW107XG4gICAgICB0aGlzLmhlaWdodCA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy51bmlxdWUgPSBvcHRpb25zLnVuaXF1ZSAhPSBudWxsID8gb3B0aW9ucy51bmlxdWUgOiBmYWxzZTtcbiAgICB0aGlzLmNvbXBhcmVLZXlzID0gb3B0aW9ucy5jb21wYXJlS2V5cyB8fCBkZWZhdWx0Q29tcGFyZUtleXM7XG4gICAgdGhpcy5jaGVja1ZhbHVlRXF1YWxpdHkgPSBvcHRpb25zLmNoZWNrVmFsdWVFcXVhbGl0eSB8fCBkZWZhdWx0Q2hlY2tWYWx1ZUVxdWFsaXR5O1xuICB9XG5cbiAgcHVibGljIHZhbGlkYXRlVHJlZSgpOiB2b2lkIHtcbiAgICAvLyBFbXB0eSB0cmVlXG4gICAgaWYgKHRoaXMua2V5ID09PSB2b2lkIDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXJlbnQgIT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFRyZWVFcnJvcihgVGhlIHJvb3Qgc2hvdWxkbid0IGhhdmUgYSBwYXJlbnRgKTtcbiAgICB9XG4gICAgdGhpcy52YWxpZGF0ZU5vZGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXROdW1iZXJPZktleXMoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5rZXkgPT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgbGV0IHRvUmV0dXJuID0gMTtcbiAgICBpZiAodGhpcy5sZWZ0KSB7XG4gICAgICB0b1JldHVybiArPSB0aGlzLmxlZnQuZ2V0TnVtYmVyT2ZLZXlzKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnJpZ2h0KSB7XG4gICAgICB0b1JldHVybiArPSB0aGlzLnJpZ2h0LmdldE51bWJlck9mS2V5cygpO1xuICAgIH1cbiAgICByZXR1cm4gdG9SZXR1cm47XG4gIH1cblxuICBwdWJsaWMgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xuICB9XG5cbiAgcHVibGljIGluc2VydChrZXk6IEssIHZhbHVlOiBWKTogQVZMVHJlZUludGVybmFsPEssIFY+IHtcbiAgICAvLyBFbXB0eSB0cmVlLCBpbnNlcnQgYXMgcm9vdFxuICAgIGlmICh0aGlzLmtleSA9PT0gdm9pZCAwKSB7XG4gICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgIHRoaXMuZGF0YSA9IFt2YWx1ZV07XG4gICAgICB0aGlzLmhlaWdodCA9IDE7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb25zdCBpbnNlcnRQYXRoOiBBVkxUcmVlSW50ZXJuYWw8SywgVj5bXSA9IFtdO1xuICAgIGxldCBjdXJyZW50Tm9kZTogQVZMVHJlZUludGVybmFsPEssIFY+ID0gdGhpcztcblxuICAgIC8vIEluc2VydCBuZXcgbGVhZiBhdCB0aGUgcmlnaHQgcGxhY2VcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY29uc3QgY29tcGFyZWQgPSB0aGlzLmNvbXBhcmVLZXlzKGtleSwgY3VycmVudE5vZGUua2V5KTtcblxuICAgICAgLy8gU2FtZSBrZXk6IG5vIGNoYW5nZSBpbiB0aGUgdHJlZSBzdHJ1Y3R1cmVcbiAgICAgIGlmIChjb21wYXJlZCA9PT0gMCkge1xuICAgICAgICBpZiAodGhpcy51bmlxdWUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHJlZUVycm9yKGBDYW4ndCBpbnNlcnQga2V5ICcke2tleX0nLCBpdCB2aW9sYXRlcyB0aGUgdW5pcXVlIGNvbnN0cmFpbnRgLFxuICAgICAgICAgICAge2tleTogU3RyaW5nKGtleSksIGVycm9yVHlwZTogJ3VuaXF1ZVZpb2xhdGVkJ30pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHByZXNlbnRJZHggPSBjdXJyZW50Tm9kZS5kYXRhLmZpbmRJbmRleChkID0+IHRoaXMuY2hlY2tWYWx1ZUVxdWFsaXR5KGQsIHZhbHVlKSk7XG4gICAgICAgICAgaWYgKHByZXNlbnRJZHggPj0gMCkge1xuICAgICAgICAgICAgY3VycmVudE5vZGUuZGF0YVtwcmVzZW50SWR4XSA9IHZhbHVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZS5kYXRhLnB1c2godmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgaW5zZXJ0UGF0aC5wdXNoKGN1cnJlbnROb2RlKTtcblxuICAgICAgaWYgKGNvbXBhcmVkIDwgMCkge1xuICAgICAgICBpZiAoIWN1cnJlbnROb2RlLmxlZnQpIHtcbiAgICAgICAgICBpbnNlcnRQYXRoLnB1c2goY3VycmVudE5vZGUuY3JlYXRlTGVmdENoaWxkKHtpbml0aWFsOiB7a2V5OiBrZXksIHZhbHVlOiB2YWx1ZX19KSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5sZWZ0O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWN1cnJlbnROb2RlLnJpZ2h0KSB7XG4gICAgICAgICAgaW5zZXJ0UGF0aC5wdXNoKGN1cnJlbnROb2RlLmNyZWF0ZVJpZ2h0Q2hpbGQoe2luaXRpYWw6IHtrZXk6IGtleSwgdmFsdWU6IHZhbHVlfX0pKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLnJpZ2h0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmViYWxhbmNlQWxvbmdQYXRoKGluc2VydFBhdGgpO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZShrZXk6IEssIHZhbHVlPzogVik6IEFWTFRyZWVJbnRlcm5hbDxLLCBWPiB7XG4gICAgaWYgKHRoaXMua2V5ID09PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvbnN0IGRlbGV0ZVBhdGg6IEFWTFRyZWVJbnRlcm5hbDxLLCBWPltdID0gW107XG4gICAgbGV0IGN1cnJlbnROb2RlOiBBVkxUcmVlSW50ZXJuYWw8SywgVj4gPSB0aGlzO1xuXG4gICAgLy8gRWl0aGVyIG5vIG1hdGNoIGlzIGZvdW5kIGFuZCB0aGUgZnVuY3Rpb24gd2lsbCByZXR1cm4gZnJvbSB3aXRoaW4gdGhlIGxvb3BcbiAgICAvLyBPciBhIG1hdGNoIGlzIGZvdW5kIGFuZCBkZWxldGVQYXRoIHdpbGwgY29udGFpbiB0aGUgcGF0aCBmcm9tIHRoZSByb290IHRvIHRoZSBub2RlIHRvIGRlbGV0ZSBhZnRlciB0aGUgbG9vcFxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAvLyBLZXkgbm90IGZvdW5kLCBubyBtb2RpZmljYXRpb25cbiAgICAgIGlmICghY3VycmVudE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbXBhcmVkID0gdGhpcy5jb21wYXJlS2V5cyhrZXksIGN1cnJlbnROb2RlLmtleSk7XG4gICAgICBpZiAoY29tcGFyZWQgPT09IDApIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGRlbGV0ZVBhdGgucHVzaChjdXJyZW50Tm9kZSk7XG5cbiAgICAgIGlmIChjb21wYXJlZCA8IDApIHtcbiAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5sZWZ0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5yaWdodDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEZWxldGUgb25seSBhIHZhbHVlIChubyB0cmVlIG1vZGlmaWNhdGlvbilcbiAgICBpZiAodmFsdWUgIT09IHZvaWQgMCAmJiBjdXJyZW50Tm9kZS5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIGN1cnJlbnROb2RlLmRhdGEgPSBjdXJyZW50Tm9kZS5kYXRhLmZpbHRlcihkID0+ICF0aGlzLmNoZWNrVmFsdWVFcXVhbGl0eShkLCB2YWx1ZSkpO1xuICAgICAgaWYgKGN1cnJlbnROb2RlLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEZWxldGUgYSB3aG9sZSBub2RlXG5cbiAgICAvLyBMZWFmXG4gICAgaWYgKCFjdXJyZW50Tm9kZS5sZWZ0ICYmICFjdXJyZW50Tm9kZS5yaWdodCkge1xuICAgICAgaWYgKGN1cnJlbnROb2RlID09PSB0aGlzKSB7XG4gICAgICAgIC8vIFRoaXMgbGVhZiBpcyBhbHNvIHRoZSByb290XG4gICAgICAgIGN1cnJlbnROb2RlLmtleSA9IHZvaWQgMDtcbiAgICAgICAgY3VycmVudE5vZGUuZGF0YSA9IFtdO1xuICAgICAgICBjdXJyZW50Tm9kZS5oZWlnaHQgPSBudWxsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLnBhcmVudC5sZWZ0ID09PSBjdXJyZW50Tm9kZSkge1xuICAgICAgICAgIGN1cnJlbnROb2RlLnBhcmVudC5sZWZ0ID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdXJyZW50Tm9kZS5wYXJlbnQucmlnaHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlYmFsYW5jZUFsb25nUGF0aChkZWxldGVQYXRoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBOb2RlIHdpdGggb25seSBvbmUgY2hpbGRcbiAgICBpZiAoIWN1cnJlbnROb2RlLmxlZnQgfHwgIWN1cnJlbnROb2RlLnJpZ2h0KSB7XG4gICAgICBjb25zdCByZXBsYWNlV2l0aCA9IGN1cnJlbnROb2RlLmxlZnQgPyBjdXJyZW50Tm9kZS5sZWZ0IDogY3VycmVudE5vZGUucmlnaHQ7XG5cbiAgICAgIGlmIChjdXJyZW50Tm9kZSA9PT0gdGhpcykgeyAgIC8vIFRoaXMgbm9kZSBpcyBhbHNvIHRoZSByb290XG4gICAgICAgIHJlcGxhY2VXaXRoLnBhcmVudCA9IG51bGw7XG4gICAgICAgIHJldHVybiByZXBsYWNlV2l0aDsgICAvLyBoZWlnaHQgb2YgcmVwbGFjZVdpdGggaXMgbmVjZXNzYXJpbHkgMSBiZWNhdXNlIHRoZSB0cmVlIHdhcyBiYWxhbmNlZCBiZWZvcmUgZGVsZXRpb25cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjdXJyZW50Tm9kZS5wYXJlbnQubGVmdCA9PT0gY3VycmVudE5vZGUpIHtcbiAgICAgICAgICBjdXJyZW50Tm9kZS5wYXJlbnQubGVmdCA9IHJlcGxhY2VXaXRoO1xuICAgICAgICAgIHJlcGxhY2VXaXRoLnBhcmVudCA9IGN1cnJlbnROb2RlLnBhcmVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdXJyZW50Tm9kZS5wYXJlbnQucmlnaHQgPSByZXBsYWNlV2l0aDtcbiAgICAgICAgICByZXBsYWNlV2l0aC5wYXJlbnQgPSBjdXJyZW50Tm9kZS5wYXJlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5yZWJhbGFuY2VBbG9uZ1BhdGgoZGVsZXRlUGF0aCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTm9kZSB3aXRoIHR3byBjaGlsZHJlblxuICAgIC8vIFVzZSB0aGUgaW4tb3JkZXIgcHJlZGVjZXNzb3IgKG5vIG5lZWQgdG8gcmFuZG9taXplIHNpbmNlIHdlIGFjdGl2ZWx5IHJlYmFsYW5jZSlcbiAgICBkZWxldGVQYXRoLnB1c2goY3VycmVudE5vZGUpO1xuICAgIGxldCByZXBsYWNlV2l0aCA9IGN1cnJlbnROb2RlLmxlZnQ7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2U6IHRoZSBpbi1vcmRlciBwcmVkZWNlc3NvciBpcyByaWdodCBiZWxvdyB0aGUgbm9kZSB0byBkZWxldGVcbiAgICBpZiAoIXJlcGxhY2VXaXRoLnJpZ2h0KSB7XG4gICAgICBjdXJyZW50Tm9kZS5rZXkgPSByZXBsYWNlV2l0aC5rZXk7XG4gICAgICBjdXJyZW50Tm9kZS5kYXRhID0gcmVwbGFjZVdpdGguZGF0YTtcbiAgICAgIGN1cnJlbnROb2RlLmxlZnQgPSByZXBsYWNlV2l0aC5sZWZ0O1xuXG4gICAgICBpZiAocmVwbGFjZVdpdGgubGVmdCkge1xuICAgICAgICByZXBsYWNlV2l0aC5sZWZ0LnBhcmVudCA9IGN1cnJlbnROb2RlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucmViYWxhbmNlQWxvbmdQYXRoKGRlbGV0ZVBhdGgpO1xuICAgIH1cblxuICAgIC8vIEFmdGVyIHRoaXMgbG9vcCwgcmVwbGFjZVdpdGggaXMgdGhlIHJpZ2h0LW1vc3QgbGVhZiBpbiB0aGUgbGVmdCBzdWJ0cmVlXG4gICAgLy8gYW5kIGRlbGV0ZVBhdGggdGhlIHBhdGggZnJvbSB0aGUgcm9vdCAoaW5jbHVzaXZlKSB0byByZXBsYWNlV2l0aCAoZXhjbHVzaXZlKVxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAocmVwbGFjZVdpdGgucmlnaHQpIHtcbiAgICAgICAgZGVsZXRlUGF0aC5wdXNoKHJlcGxhY2VXaXRoKTtcbiAgICAgICAgcmVwbGFjZVdpdGggPSByZXBsYWNlV2l0aC5yaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGN1cnJlbnROb2RlLmtleSA9IHJlcGxhY2VXaXRoLmtleTtcbiAgICBjdXJyZW50Tm9kZS5kYXRhID0gcmVwbGFjZVdpdGguZGF0YTtcblxuICAgIHJlcGxhY2VXaXRoLnBhcmVudC5yaWdodCA9IHJlcGxhY2VXaXRoLmxlZnQ7XG4gICAgaWYgKHJlcGxhY2VXaXRoLmxlZnQpIHtcbiAgICAgIHJlcGxhY2VXaXRoLmxlZnQucGFyZW50ID0gcmVwbGFjZVdpdGgucGFyZW50O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlYmFsYW5jZUFsb25nUGF0aChkZWxldGVQYXRoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWFyY2goa2V5OiBLKTogVltdIHtcbiAgICBpZiAodGhpcy5rZXkgIT09IHZvaWQgMCkge1xuICAgICAgbGV0IGN1cnJlbnROb2RlOiBBVkxUcmVlSW50ZXJuYWw8SywgVj4gPSB0aGlzO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCBjb21wYXJlZCA9IHRoaXMuY29tcGFyZUtleXMoa2V5LCBjdXJyZW50Tm9kZS5rZXkpO1xuXG4gICAgICAgIGlmIChjb21wYXJlZCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBjdXJyZW50Tm9kZS5kYXRhO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbXBhcmVkID4gMCkge1xuICAgICAgICAgIGlmICghY3VycmVudE5vZGUucmlnaHQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLnJpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghY3VycmVudE5vZGUubGVmdCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubGVmdDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwdWJsaWMgYmV0d2VlbkJvdW5kcyhxdWVyeTogQVZMVHJlZVF1ZXJ5PEs+LCBsYk1hdGNoZXI/OiBLZXlNYXRjaGVyPEs+LCB1Yk1hdGNoZXI/OiBLZXlNYXRjaGVyPEs+KTogVltdIHtcbiAgICBpZiAodGhpcy5rZXkgPT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGxiTWF0Y2hlciA9IGxiTWF0Y2hlciB8fCB0aGlzLmdldExvd2VyQm91bmRNYXRjaGVyKHF1ZXJ5KTtcbiAgICB1Yk1hdGNoZXIgPSB1Yk1hdGNoZXIgfHwgdGhpcy5nZXRVcHBlckJvdW5kTWF0Y2hlcihxdWVyeSk7XG5cbiAgICBjb25zdCBsTWF0Y2ggPSBsYk1hdGNoZXIodGhpcy5rZXkpO1xuICAgIGNvbnN0IHVNYXRjaCA9IHViTWF0Y2hlcih0aGlzLmtleSk7XG5cbiAgICBjb25zdCB0b1JldHVybjogYW55W10gPSBbXTtcblxuICAgIGlmIChsTWF0Y2ggJiYgdGhpcy5sZWZ0KSB7XG4gICAgICBhcHBlbmQodG9SZXR1cm4sIHRoaXMubGVmdC5iZXR3ZWVuQm91bmRzKHF1ZXJ5LCBsYk1hdGNoZXIsIHViTWF0Y2hlcikpO1xuICAgIH1cbiAgICBpZiAobE1hdGNoICYmIHVNYXRjaCkge1xuICAgICAgYXBwZW5kKHRvUmV0dXJuLCB0aGlzLmRhdGEpO1xuICAgIH1cbiAgICBpZiAodU1hdGNoICYmIHRoaXMucmlnaHQpIHtcbiAgICAgIGFwcGVuZCh0b1JldHVybiwgdGhpcy5yaWdodC5iZXR3ZWVuQm91bmRzKHF1ZXJ5LCBsYk1hdGNoZXIsIHViTWF0Y2hlcikpO1xuICAgIH1cblxuICAgIHJldHVybiB0b1JldHVybjtcbiAgfVxuXG4gIHB1YmxpYyBleGVjdXRlT25FdmVyeU5vZGUoYWN0aW9uOiAoa2V5OiBLLCBkYXRhOiBWW10pID0+IHZvaWQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5sZWZ0KSB7XG4gICAgICB0aGlzLmxlZnQuZXhlY3V0ZU9uRXZlcnlOb2RlKGFjdGlvbik7XG4gICAgfVxuICAgIGFjdGlvbih0aGlzLmtleSwgdGhpcy5kYXRhKTtcbiAgICBpZiAodGhpcy5yaWdodCkge1xuICAgICAgdGhpcy5yaWdodC5leGVjdXRlT25FdmVyeU5vZGUoYWN0aW9uKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldExvd2VyQm91bmRNYXRjaGVyKHF1ZXJ5OiBBVkxUcmVlUXVlcnk8Sz4pOiBLZXlNYXRjaGVyPEs+IHtcbiAgICBpZiAocXVlcnkuJGd0ID09IG51bGwgJiYgcXVlcnkuJGd0ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gKCkgPT4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAocXVlcnkuJGd0ICE9IG51bGwgJiYgcXVlcnkuJGd0ZSAhPSBudWxsKSB7XG4gICAgICBjb25zdCBjb21wYXJlZCA9IHRoaXMuY29tcGFyZUtleXMocXVlcnkuJGd0ZSwgcXVlcnkuJGd0KTtcblxuICAgICAgaWYgKGNvbXBhcmVkID09PSAwKSB7XG4gICAgICAgIHJldHVybiAoa2V5KSA9PiB0aGlzLmNvbXBhcmVLZXlzKGtleSwgcXVlcnkuJGd0KSA+IDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wYXJlZCA+IDApIHtcbiAgICAgICAgcmV0dXJuIChrZXkpID0+IHRoaXMuY29tcGFyZUtleXMoa2V5LCBxdWVyeS4kZ3RlKSA+PSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIChrZXkpID0+IHRoaXMuY29tcGFyZUtleXMoa2V5LCBxdWVyeS4kZ3QpID4gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocXVlcnkuJGd0ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiAoa2V5KSA9PiB0aGlzLmNvbXBhcmVLZXlzKGtleSwgcXVlcnkuJGd0KSA+IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoa2V5KSA9PiB0aGlzLmNvbXBhcmVLZXlzKGtleSwgcXVlcnkuJGd0ZSkgPj0gMDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFVwcGVyQm91bmRNYXRjaGVyKHF1ZXJ5OiBBVkxUcmVlUXVlcnk8Sz4pOiBLZXlNYXRjaGVyPEs+IHtcbiAgICBpZiAocXVlcnkuJGx0ID09IG51bGwgJiYgcXVlcnkuJGx0ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gKCkgPT4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAocXVlcnkuJGx0ICE9IG51bGwgJiYgcXVlcnkuJGx0ZSAhPSBudWxsKSB7XG4gICAgICBjb25zdCBjb21wYXJlZCA9IHRoaXMuY29tcGFyZUtleXMocXVlcnkuJGx0ZSwgcXVlcnkuJGx0KTtcblxuICAgICAgaWYgKGNvbXBhcmVkID09PSAwKSB7XG4gICAgICAgIHJldHVybiAoa2V5KSA9PiB0aGlzLmNvbXBhcmVLZXlzKGtleSwgcXVlcnkuJGx0KSA8IDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wYXJlZCA+IDApIHtcbiAgICAgICAgcmV0dXJuIChrZXkpID0+IHRoaXMuY29tcGFyZUtleXMoa2V5LCBxdWVyeS4kbHQpIDwgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAoa2V5KSA9PiB0aGlzLmNvbXBhcmVLZXlzKGtleSwgcXVlcnkuJGx0ZSkgPD0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocXVlcnkuJGx0ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiAoa2V5KSA9PiB0aGlzLmNvbXBhcmVLZXlzKGtleSwgcXVlcnkuJGx0KSA8IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoa2V5KSA9PiB0aGlzLmNvbXBhcmVLZXlzKGtleSwgcXVlcnkuJGx0ZSkgPD0gMDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlYmFsYW5jZUFsb25nUGF0aChwYXRoOiBBVkxUcmVlSW50ZXJuYWw8SywgVj5bXSk6IEFWTFRyZWVJbnRlcm5hbDxLLCBWPiB7XG4gICAgLy8gRW1wdHkgdHJlZVxuICAgIGlmICh0aGlzLmtleSA9PT0gdm9pZCAwKSB7XG4gICAgICB0aGlzLmhlaWdodCA9IG51bGw7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBsZXQgbmV3Um9vdDogQVZMVHJlZUludGVybmFsPEssIFY+ID0gdGhpcztcbiAgICBsZXQgcm90YXRlZDogQVZMVHJlZUludGVybmFsPEssIFY+O1xuXG4gICAgLy8gUmViYWxhbmNlIHRoZSB0cmVlIGFuZCB1cGRhdGUgYWxsIGhlaWdodHNcbiAgICBmb3IgKGxldCBpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgY29uc3QgcCA9IHBhdGhbaV07XG5cbiAgICAgIHAuaGVpZ2h0ID0gMSArIE1hdGgubWF4KHAubGVmdCA/IHAubGVmdC5oZWlnaHQgOiAwLCBwLnJpZ2h0ID8gcC5yaWdodC5oZWlnaHQgOiAwKTtcbiAgICAgIGlmIChwLmJhbGFuY2VGYWN0b3IoKSA+IDEpIHtcbiAgICAgICAgcm90YXRlZCA9IHAucmlnaHRUb29TbWFsbCgpO1xuICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgIG5ld1Jvb3QgPSByb3RhdGVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocC5iYWxhbmNlRmFjdG9yKCkgPCAtMSkge1xuICAgICAgICByb3RhdGVkID0gcC5sZWZ0VG9vU21hbGwoKTtcbiAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICBuZXdSb290ID0gcm90YXRlZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXdSb290O1xuICB9XG5cbiAgcHJpdmF0ZSByaWdodFRvb1NtYWxsKCk6IEFWTFRyZWVJbnRlcm5hbDxLLCBWPiB7XG4gICAgLy8gUmlnaHQgaXMgbm90IHRvbyBzbWFsbCwgZG9uJ3QgY2hhbmdlXG4gICAgaWYgKHRoaXMuYmFsYW5jZUZhY3RvcigpIDw9IDEpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxlZnQuYmFsYW5jZUZhY3RvcigpIDwgMCkge1xuICAgICAgdGhpcy5sZWZ0LmxlZnRSb3RhdGlvbigpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yaWdodFJvdGF0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIGxlZnRUb29TbWFsbCgpOiBBVkxUcmVlSW50ZXJuYWw8SywgVj4ge1xuICAgIC8vIExlZnQgaXMgbm90IHRvbyBzbWFsbCwgZG9uJ3QgY2hhbmdlXG4gICAgaWYgKHRoaXMuYmFsYW5jZUZhY3RvcigpID49IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yaWdodC5iYWxhbmNlRmFjdG9yKCkgPiAwKSB7XG4gICAgICB0aGlzLnJpZ2h0LnJpZ2h0Um90YXRpb24oKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5sZWZ0Um90YXRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgcmlnaHRSb3RhdGlvbigpOiBBVkxUcmVlSW50ZXJuYWw8SywgVj4ge1xuICAgIC8vIE5vIGNoYW5nZXNcbiAgICBpZiAoIXRoaXMubGVmdCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY29uc3QgcTogQVZMVHJlZUludGVybmFsPEssIFY+ID0gdGhpcztcbiAgICBjb25zdCBwOiBBVkxUcmVlSW50ZXJuYWw8SywgVj4gPSB0aGlzLmxlZnQ7XG4gICAgY29uc3QgYjogQVZMVHJlZUludGVybmFsPEssIFY+ID0gcC5yaWdodDtcblxuICAgIC8vIEFsdGVyIHRyZWUgc3RydWN0dXJlXG4gICAgaWYgKHEucGFyZW50KSB7XG4gICAgICBwLnBhcmVudCA9IHEucGFyZW50O1xuICAgICAgaWYgKHEucGFyZW50LmxlZnQgPT09IHEpIHtcbiAgICAgICAgcS5wYXJlbnQubGVmdCA9IHA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxLnBhcmVudC5yaWdodCA9IHA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHAucGFyZW50ID0gbnVsbDtcbiAgICB9XG4gICAgcC5yaWdodCA9IHE7XG4gICAgcS5wYXJlbnQgPSBwO1xuICAgIHEubGVmdCA9IGI7XG4gICAgaWYgKGIpIHtcbiAgICAgIGIucGFyZW50ID0gcTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgaGVpZ2h0c1xuICAgIGNvbnN0IGFoID0gcC5sZWZ0ID8gcC5sZWZ0LmhlaWdodCA6IDA7XG4gICAgY29uc3QgYmggPSBiID8gYi5oZWlnaHQgOiAwO1xuICAgIGNvbnN0IGNoID0gcS5yaWdodCA/IHEucmlnaHQuaGVpZ2h0IDogMDtcbiAgICBxLmhlaWdodCA9IE1hdGgubWF4KGJoLCBjaCkgKyAxO1xuICAgIHAuaGVpZ2h0ID0gTWF0aC5tYXgoYWgsIHEuaGVpZ2h0KSArIDE7XG5cbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIHByaXZhdGUgbGVmdFJvdGF0aW9uKCk6IEFWTFRyZWVJbnRlcm5hbDxLLCBWPiB7XG4gICAgLy8gTm8gY2hhbmdlc1xuICAgIGlmICghdGhpcy5yaWdodCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY29uc3QgcDogQVZMVHJlZUludGVybmFsPEssIFY+ID0gdGhpcztcbiAgICBjb25zdCBxOiBBVkxUcmVlSW50ZXJuYWw8SywgVj4gPSB0aGlzLnJpZ2h0O1xuICAgIGNvbnN0IGI6IEFWTFRyZWVJbnRlcm5hbDxLLCBWPiA9IHEubGVmdDtcblxuICAgIC8vIEFsdGVyIHRyZWUgc3RydWN0dXJlXG4gICAgaWYgKHAucGFyZW50KSB7XG4gICAgICBxLnBhcmVudCA9IHAucGFyZW50O1xuICAgICAgaWYgKHAucGFyZW50LmxlZnQgPT09IHApIHtcbiAgICAgICAgcC5wYXJlbnQubGVmdCA9IHE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwLnBhcmVudC5yaWdodCA9IHE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHEucGFyZW50ID0gbnVsbDtcbiAgICB9XG4gICAgcS5sZWZ0ID0gcDtcbiAgICBwLnBhcmVudCA9IHE7XG4gICAgcC5yaWdodCA9IGI7XG4gICAgaWYgKGIpIHtcbiAgICAgIGIucGFyZW50ID0gcDtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgaGVpZ2h0c1xuICAgIGNvbnN0IGFoID0gcC5sZWZ0ID8gcC5sZWZ0LmhlaWdodCA6IDA7XG4gICAgY29uc3QgYmggPSBiID8gYi5oZWlnaHQgOiAwO1xuICAgIGNvbnN0IGNoID0gcS5yaWdodCA/IHEucmlnaHQuaGVpZ2h0IDogMDtcbiAgICBwLmhlaWdodCA9IE1hdGgubWF4KGFoLCBiaCkgKyAxO1xuICAgIHEuaGVpZ2h0ID0gTWF0aC5tYXgoY2gsIHAuaGVpZ2h0KSArIDE7XG5cbiAgICByZXR1cm4gcTtcbiAgfVxuXG4gIHByaXZhdGUgdmFsaWRhdGVOb2RlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxlZnQpIHtcbiAgICAgIGlmICh0aGlzLmxlZnQucGFyZW50ICE9PSB0aGlzKSB7XG4gICAgICAgIHRocm93IG5ldyBUcmVlRXJyb3IoJ1BhcmVudCBwb2ludGVyIGJyb2tlbiBmb3Iga2V5ICcgKyB0aGlzLmtleSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5sZWZ0LmhlaWdodCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUcmVlRXJyb3IoYFVuZGVmaW5lZCBoZWlnaHQgZm9yIG5vZGUgJyR7dGhpcy5sZWZ0LmtleX0nYCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jb21wYXJlS2V5cyh0aGlzLmxlZnQua2V5LCB0aGlzLmtleSkgPj0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgVHJlZUVycm9yKGBUcmVlIHdpdGggcm9vdCAnJHt0aGlzLmtleX0nIGlzIG5vdCBhIGJpbmFyeSBzZWFyY2ggdHJlZWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnJpZ2h0KSB7XG4gICAgICBpZiAodGhpcy5yaWdodC5wYXJlbnQgIT09IHRoaXMpIHtcbiAgICAgICAgdGhyb3cgbmV3IFRyZWVFcnJvcignUGFyZW50IHBvaW50ZXIgYnJva2VuIGZvciBrZXkgJyArIHRoaXMua2V5KTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnJpZ2h0LmhlaWdodCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUcmVlRXJyb3IoYFVuZGVmaW5lZCBoZWlnaHQgZm9yIG5vZGUgJyR7dGhpcy5sZWZ0LmtleX0nYCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jb21wYXJlS2V5cyh0aGlzLnJpZ2h0LmtleSwgdGhpcy5rZXkpIDw9IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IFRyZWVFcnJvcihgVHJlZSB3aXRoIHJvb3QgJyR7dGhpcy5rZXl9JyBpcyBub3QgYSBiaW5hcnkgc2VhcmNoIHRyZWVgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5oZWlnaHQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFRyZWVFcnJvcihgVW5kZWZpbmVkIGhlaWdodCBmb3Igbm9kZSAnJHt0aGlzLmxlZnQua2V5fSdgKTtcbiAgICB9XG5cbiAgICBjb25zdCBoZWlnaHRMID0gdGhpcy5sZWZ0ID8gdGhpcy5sZWZ0LmhlaWdodCA6IDA7XG4gICAgY29uc3QgaGVpZ2h0UiA9IHRoaXMucmlnaHQgPyB0aGlzLnJpZ2h0LmhlaWdodCA6IDA7XG4gICAgaWYgKHRoaXMuaGVpZ2h0ICE9PSAxICsgTWF0aC5tYXgoaGVpZ2h0TCwgaGVpZ2h0UikpIHtcbiAgICAgIHRocm93IG5ldyBUcmVlRXJyb3IoYEhlaWdodCBjb25zdHJhaW50IGZhaWxlZCBmb3Igbm9kZSAnJHt0aGlzLmtleX0nYCk7XG4gICAgfVxuXG4gICAgaWYgKE1hdGguYWJzKHRoaXMuYmFsYW5jZUZhY3RvcigpKSA+IDEpIHtcbiAgICAgIHRocm93IG5ldyBUcmVlRXJyb3IoYFRyZWUgaXMgdW5iYWxhbmNlZCBhdCBub2RlICcke3RoaXMua2V5fSdgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sZWZ0KSB7XG4gICAgICB0aGlzLmxlZnQudmFsaWRhdGVOb2RlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnJpZ2h0KSB7XG4gICAgICB0aGlzLnJpZ2h0LnZhbGlkYXRlTm9kZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYmFsYW5jZUZhY3RvcigpOiBudW1iZXIge1xuICAgIGNvbnN0IGhlaWdodEwgPSB0aGlzLmxlZnQgPyB0aGlzLmxlZnQuaGVpZ2h0IDogMDtcbiAgICBjb25zdCBoZWlnaHRSID0gdGhpcy5yaWdodCA/IHRoaXMucmlnaHQuaGVpZ2h0IDogMDtcblxuICAgIHJldHVybiBoZWlnaHRMIC0gaGVpZ2h0UjtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTGVmdENoaWxkKG9wdGlvbnM6IEFWTFRyZWVPcHRpb25zPEssIFY+KTogQVZMVHJlZUludGVybmFsPEssIFY+IHtcbiAgICB0aGlzLmxlZnQgPSB0aGlzLmNyZWF0ZVNpbWlsYXIob3B0aW9ucyk7XG4gICAgdGhpcy5sZWZ0LnBhcmVudCA9IHRoaXM7XG4gICAgcmV0dXJuIHRoaXMubGVmdDtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUmlnaHRDaGlsZChvcHRpb25zOiBBVkxUcmVlT3B0aW9uczxLLCBWPik6IEFWTFRyZWVJbnRlcm5hbDxLLCBWPiB7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMuY3JlYXRlU2ltaWxhcihvcHRpb25zKTtcbiAgICB0aGlzLnJpZ2h0LnBhcmVudCA9IHRoaXM7XG4gICAgcmV0dXJuIHRoaXMucmlnaHQ7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVNpbWlsYXIob3B0aW9uczogQVZMVHJlZU9wdGlvbnM8SywgVj4pOiBBVkxUcmVlSW50ZXJuYWw8SywgVj4ge1xuICAgIG9wdGlvbnMudW5pcXVlID0gdGhpcy51bmlxdWU7XG4gICAgb3B0aW9ucy5jb21wYXJlS2V5cyA9IHRoaXMuY29tcGFyZUtleXM7XG4gICAgb3B0aW9ucy5jaGVja1ZhbHVlRXF1YWxpdHkgPSB0aGlzLmNoZWNrVmFsdWVFcXVhbGl0eTtcblxuICAgIHJldHVybiBuZXcgQVZMVHJlZUludGVybmFsKG9wdGlvbnMpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9hdmwtdHJlZS50cyJdLCJzb3VyY2VSb290IjoiIn0=