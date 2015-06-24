/*global jQuery, react, $*/
/*
 * react tree
 * An object-oriented tree-view based on react.js
 * Depends:
 *  jQuery
 *  react
 */

import TreeNode from './treenode'
import {
    nodeCollectionMixin,
    triggerEventMixin
    }
    from './mixin'

const Tree = React.createClass({
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

    mixins: [nodeCollectionMixin, triggerEventMixin],

    getDefaultProps() {
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

    getInitialState() {
        return {}
    },

    render() {
        return <div className="hui-tree">
            {this.renderChildren(this.props)}
        </div>;
    }

});

export default Tree