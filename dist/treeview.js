/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _treeview = __webpack_require__(1);

	var _treeview2 = _interopRequireDefault(_treeview);

	var _treenode = __webpack_require__(2);

	var _treenode2 = _interopRequireDefault(_treenode);

	window.Tree = _treeview2['default'];
	window.TreeNode = _treenode2['default'];

	exports['default'] = {
	  Tree: _treeview2['default'],
	  TreeNode: _treenode2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*global jQuery, react, $*/
	/*  
	 * react tree
	 * An object-oriented tree-view based on react.js
	 * Depends:
	 *  jQuery
	 *  react
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _treenode = __webpack_require__(2);

	var _treenode2 = _interopRequireDefault(_treenode);

	var _mixin = __webpack_require__(3);

	var Tree = React.createClass({
	  displayName: 'Tree',
	  propTypes: {
	    icons: React.PropTypes.object,
	    enableTriState: React.PropTypes.bool,
	    expandState: React.PropTypes.bool,
	    autoCheckNodes: React.PropTypes.bool,
	    showCheckboxes: React.PropTypes.bool,
	    nodes: React.PropTypes.array,
	    toggleTransition: React.PropTypes.bool,

	    nodeExpanded: React.PropTypes.func,
	    nodeCollapsed: React.PropTypes.func,
	    nodeChecked: React.PropTypes.func,
	    selectedChanged: React.PropTypes.func
	  },

	  mixins: [_mixin.nodeCollectionMixin, _mixin.triggerEventMixin],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      icons: {
	        nodeLoading: '',
	        expand: 'hui-icon-minus',
	        collapse: 'hui-icon-plus',
	        checked: 'hui-icon-check',
	        unchecked: 'hui-icon-check-empty',
	        tristate: 'hui-icon-minus-squared-alt'
	      },

	      nodes: null,
	      enableTriState: true,
	      autoCheckNodes: true,
	      showCheckboxes: true,
	      expandState: true,
	      level: -1,

	      /*Events*/
	      nodeExpanded: null,
	      nodeCollapsed: null,
	      nodeChecked: null,
	      selectedChanged: null
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {};
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'hui-tree' },
	      this.renderChildren(this.props)
	    );
	  }

	});

	exports['default'] = Tree;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixin = __webpack_require__(3);

	var checkedValue = {
	    'checked': 1,
	    'unchecked': 0,
	    'tristate': 0.5
	};

	var TreeNode = React.createClass({
	    displayName: 'TreeNode',
	    propTypes: {
	        expanded: React.PropTypes.bool,
	        selected: React.PropTypes.bool,
	        checked: React.PropTypes.bool,
	        text: React.PropTypes.string.isRequired
	    },

	    mixins: [_mixin.nodeCollectionMixin, _mixin.triggerEventMixin],

	    getDefaultProps: function getDefaultProps() {
	        return {
	            checked: false
	        };
	    },

	    getInitialState: function getInitialState() {
	        var checked = this.props.checked !== undefined ? this.props.checked : false,
	            count = 0,
	            self = this,
	            expanded = undefined;
	        this.checkedCount = 0; // ugly implement.
	        React.Children.map(this.props.children, function (node) {
	            if (node.props.checked) self.checkedCount++;
	        });

	        count = this.props.nodes && this.props.nodes.length || React.Children.count(this.props.children);

	        if (this.props.expanded !== undefined) {
	            expanded = this.props.expanded;
	        } else if (this.props.treeProps.expandState !== undefined) {
	            expanded = this.props.treeProps.expandState;
	        } else {
	            expanded = true;
	        }

	        return {
	            expanded: expanded,
	            selected: this.props.selected,
	            checked: this.props.parentChecked || 'unchecked',
	            count: count
	        };
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        if (this.props.treeProps.autoCheckNodes && nextProps.parentChecked !== 'tristate') {
	            this.setState({
	                checked: nextProps.parentChecked
	            });
	        }
	    },

	    updateCheckNum: function updateCheckNum(oldState, newState) {
	        var increment = checkedValue[newState] - checkedValue[oldState];
	        this.checkedCount += increment;
	    },

	    checkChildrenCheckedState: function checkChildrenCheckedState(oldState, newState) {

	        var poldState = this.state.checked;

	        this.updateCheckNum(oldState, newState);

	        if (this.checkedCount === this.state.count) {
	            newState = 'checked';
	        } else if (this.checkedCount === 0) {
	            newState = 'unchecked';
	        } else {
	            newState = 'tristate';
	        }

	        this.setState({ checked: newState });

	        if (this.props.listenFromParent) //set parent check state
	            this.props.listenFromParent.call(this, poldState, newState);
	    },

	    renderToggle: function renderToggle() {
	        var icons = this.props.treeProps.icons,
	            props = undefined;

	        props = {
	            onClick: this.handleToggle,
	            className: 'hui-treenode-toggle hui-icon ' + (this.state.expanded ? icons.expand : icons.collapse)
	        };

	        return React.createElement('span', props);
	    },

	    renderCheck: function renderCheck() {
	        var icons = this.props.treeProps.icons,
	            props = undefined,
	            icon = undefined;

	        if (this.state.checked === 'unchecked') {
	            icon = icons.unchecked;
	        } else if (this.state.checked === 'checked') {
	            icon = icons.checked;
	        } else {
	            icon = icons.tristate;
	        }

	        props = {
	            className: 'hui-treenode-check hui-icon ' + icon,
	            onClick: this.handleCheck
	        };

	        return React.createElement('span', props);
	    },

	    renderNodes: function renderNodes() {
	        return this.renderChildren(this.props.treeProps, this.state.expanded);
	    },

	    render: function render() {
	        var nodeContent = undefined,
	            element = undefined,
	            toggle = undefined,
	            check = undefined,
	            nodeIcon = undefined,
	            text = undefined,
	            childs = undefined,
	            treeProps = this.props.treeProps;

	        if (this.state.count) {
	            toggle = this.renderToggle();
	        }

	        if (treeProps.showCheckboxes) {
	            check = this.renderCheck();
	        }

	        if (this.props.icon) {
	            nodeIcon = React.createElement('span', { className: 'hui-icon {this.props.icon}' });
	        }

	        text = React.createElement(
	            'span',
	            { className: 'hui-treenode-text', onClick: this.handleSelect },
	            this.props.text
	        );

	        childs = this.renderNodes();

	        return React.createElement(
	            'li',
	            { className: 'hui-treenode' },
	            React.createElement(
	                'div',
	                { className: 'hui-treenode-content' },
	                toggle,
	                check,
	                nodeIcon,
	                text
	            ),
	            childs
	        );
	    },

	    handleToggle: function handleToggle(event) {
	        var state = !this.state.expanded;
	        this.setState({ expanded: state });
	        this._trigger(state ? 'nodeExpanded' : 'nodeCollapsed', state);
	        event.stopPropagation();
	    },

	    handleSelect: function handleSelect(event) {
	        this.setState({ selected: !this.state.selected });
	        event.stopPropagation();
	    },

	    handleCheck: function handleCheck(event) {
	        var self = this,
	            oldState = this.state.checked,
	            newState = oldState !== 'checked' ? 'checked' : 'unchecked';

	        this.setState({ checked: newState });

	        if (this.props.treeProps.autoCheckNodes) {
	            this.checkedCount = newState === 'checked' ? this.state.count : 0;
	        }

	        if (self.props.listenFromParent) //set parent check state
	            self.props.listenFromParent.call(this, oldState, newState);

	        this._trigger('nodeChecked', newState);
	        event.stopPropagation();
	    }
	});

	exports['default'] = TreeNode;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var nodeCollectionMixin = {

		renderChildren: function renderChildren(treeProps, visibility) {
			var self = this,
			    nodes = this.props.nodes,
			    children = undefined,
			    props = undefined;

			if (nodes) {
				children = [];
				nodes.forEach(function (node) {
					children.push(React.createElement(TreeNode, _extends({}, node, {
						level: self.props.level + 1,
						treeProps: treeProps,
						listenFromParent: self.checkChildrenCheckedState,
						parentChecked: self.state.checked })));
				});
			} else {
				children = React.Children.map(this.props.children, function (node) {
					var props = {
						treeProps: treeProps,
						level: self.props.level + 1,
						listenFromParent: self.checkChildrenCheckedState,
						parentChecked: self.state.checked
					};
					return React.cloneElement(node, props);
				});
			}

			props = {
				className: 'hui-treenodes'
			};

			if (typeof visibility !== 'undefined') {
				props.style = { display: visibility ? 'block' : 'none' };
			}

			return React.createElement(
				'ul',
				props,
				children
			);
		}
	};

	var triggerEventMixin = {
		_trigger: function _trigger(eventName, args) {
			if (this.props.treeProps[eventName]) {
				this.props.treeProps[eventName].call(this, args);
			}
		}
	};

	exports['default'] = {
		nodeCollectionMixin: nodeCollectionMixin,
		triggerEventMixin: triggerEventMixin
	};
	module.exports = exports['default'];

/***/ }
/******/ ]);