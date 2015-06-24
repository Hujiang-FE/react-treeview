import Tree from './treeview';
import TreeNode from './treenode';
require('./react-treeview.css');

let nodes = [];
const NUM = 50;

for (var i = 0; i < NUM; i++) {
    var l1node = {
        text: 'Root Node ' + i,
        nodes: []
    };

    if (i % 2 === 1) {
        l1node.expanded = true;
    }

    for (var j = 0; j < NUM; j++) {
        var l2node = {
            text: 'Node-' + i + '-' + j,
            value: 'Node-' + i + '-' + j,
            nodes: []
        }

        l1node.nodes.push(l2node);
    }

    nodes.push(l1node);
}

React.render(
    <Tree nodes={nodes} expandState={false}>
    </Tree>,
    document.body);