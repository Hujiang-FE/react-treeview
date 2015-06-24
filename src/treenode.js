import {nodeCollectionMixin, triggerEventMixin} from './mixin'

const checkedValue = {
    'checked': 1,
    'unchecked': 0,
    'tristate': 0.5
};

const TreeNode = React.createClass({
    displayName: 'TreeNode',
    propTypes: {
        expanded: React.PropTypes.bool,
        selected: React.PropTypes.bool,
        checked: React.PropTypes.bool,
        text: React.PropTypes.string.isRequired
    },

    mixins: [nodeCollectionMixin, triggerEventMixin],

    getDefaultProps() {
        return {
            checked: false
        };
    },

    getInitialState() {
        let checked = this.props.checked !== undefined ? this.props.checked : false,
            count = 0,
            self = this,
            expanded;
        this.checkedCount = 0; // ugly implement.
        React.Children.map(this.props.children, (node) => {
            if (node.props.checked) self.checkedCount++;
        });

        count = (this.props.nodes && this.props.nodes.length) ||
            React.Children.count(this.props.children);

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

    componentWillReceiveProps(nextProps) {
        if (this.props.treeProps.autoCheckNodes &&
            nextProps.parentChecked !== 'tristate') {
            this.setState({
                checked: nextProps.parentChecked
            });
        }
    },

    updateCheckNum(oldState, newState) {
        let increment = checkedValue[newState] - checkedValue[oldState]
        this.checkedCount += increment;
    },

    checkChildrenCheckedState(oldState, newState) {

        let poldState = this.state.checked;

        this.updateCheckNum(oldState, newState);

        if (this.checkedCount === this.state.count) {
            newState = 'checked';
        } else if (this.checkedCount === 0) {
            newState = 'unchecked';
        } else {
            newState = 'tristate';
        }

        this.setState({checked: newState});

        if (this.props.listenFromParent) //set parent check state
            this.props.listenFromParent.call(this, poldState, newState);
    },

    renderToggle() {
        let icons = this.props.treeProps.icons, props;

        props = {
            onClick: this.handleToggle,
            className: "hui-treenode-toggle hui-icon " +
            (this.state.expanded ? icons.expand : icons.collapse)
        }

        return <span {...props}></span>;
    },

    renderCheck() {
        let icons = this.props.treeProps.icons,
            props,
            icon;

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
        }

        return <span {...props}></span>
    },

    render() {
        let nodeContent,
            element, toggle, check, nodeIcon, text, childs,
            treeProps = this.props.treeProps;

        if (this.state.count) {
            toggle = this.renderToggle();
        }

        if (treeProps.showCheckboxes) {
            check = this.renderCheck();
        }

        if (this.props.icon) {
            nodeIcon = <span className='hui-icon {this.props.icon}'></span>;
        }

        text = <span className='hui-treenode-text' onClick={this.handleSelect}>
                    {this.props.text}
                </span>;

        childs = this.renderChildren(this.props.treeProps, this.state.expanded);

        return <li className='hui-treenode'>
            <div className='hui-treenode-content'>
                {toggle}
                {check}
                {nodeIcon}
                {text}
            </div>
            {childs}
        </li>;
    },

    handleToggle(event) {
        let state = !this.state.expanded;
        this.setState({expanded: state});
        this._trigger(state ? 'nodeExpanded' : 'nodeCollapsed', state);
        event.stopPropagation();
    },

    handleSelect(event) {
        this.setState({selected: !this.state.selected});
        event.stopPropagation();
    },

    handleCheck(event) {
        let self = this,
            oldState = this.state.checked,
            newState = oldState !== 'checked' ? 'checked' : 'unchecked';

        this.setState({checked: newState});

        if (this.props.treeProps.autoCheckNodes) {
            this.checkedCount =
                newState === 'checked' ? this.state.count : 0;
        }

        if (self.props.listenFromParent) //set parent check state
            self.props.listenFromParent.call(this, oldState, newState);

        this._trigger('nodeChecked', newState);
        event.stopPropagation();
    }
});

export default TreeNode