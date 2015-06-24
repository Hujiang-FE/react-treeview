import TreeNode from './treenode';

exports.nodeCollectionMixin = {

    renderChildren(treeProps, visibility){
        let self = this,
            nodes = this.props.nodes,
            children, props;

        if (nodes) {
            children = [];
            nodes.forEach((node) => {
                children.push(<TreeNode {...node}
                    level={ self.props.level + 1 }
                    treeProps={treeProps}
                    listenFromParent={self.checkChildrenCheckedState}
                    parentChecked={self.state.checked}/>);
            });
        } else {
            children = React.Children.map(this.props.children, (node) => {
                let props = {
                    treeProps: treeProps,
                    level: self.props.level + 1,
                    listenFromParent: self.checkChildrenCheckedState,
                    parentChecked: self.state.checked
                };
                return React.cloneElement(node, props);
            });
        }

        props = {
            className: "hui-treenodes"
        }

        if (typeof visibility !== 'undefined') {
            props.style = {display: visibility ? 'block' : 'none'};
        }

        return <ul {...props}>
            { children }
        </ul>
    }
}

exports.triggerEventMixin = {
    _trigger: function (eventName, args) {
        if (this.props.treeProps[eventName]) {
            this.props.treeProps[eventName].call(this, args);
        }
    }
}
