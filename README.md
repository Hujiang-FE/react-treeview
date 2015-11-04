# react-treeview

An implement of treeview component with react.js


## Snapshot
![snapshot](http://7xlsqt.com1.z0.glb.clouddn.com/treeview.png)

* support ie8+,chrome,firefox,safari


## Example

http://localhost:8008/examples/


## Usage

```js
import Tree from './treeview';
import TreeNode from './treenode';
React.render(
  <Tree autoCheckNodes={true}>
    <TreeNode text="Movies">
      <TreeNode text="The Shawshank Redemption"/>
      <TreeNode text="The Godfather" />
      <TreeNode text="The Dark Knight" />
    </TreeNode>
  </Tree>,
  document.querySelector('body'));
```

## API

### props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>enableTriState</td>
          <td>bool</td>
          <td></td>
          <td>Enable triple-state of checkboxes</td>
        </tr>
        <tr>
          <td>autoCheckNodes</td>
          <td>bool</td>
          <td></td>
          <td>whether expand the tree node</td>
        </tr>
        <tr>
          <td>showCheckboxes</td>
          <td>bool</td>
          <td></td>
          <td>Determines if checkbox shown on node</td>
        </tr>
        <tr>
          <td>expandState</td>
          <td>bool</td>
          <td>true</td>
          <td>Set default expand state of each node.</td>
        </tr>
        <tr>
          <td>nodeExpanded</td>
          <td>function</td>
          <td></td>
          <td>Fired when node expanded</td>
        </tr>
        <tr>
          <td>nodeCollapsed</td>
          <td>function</td>
          <td></td>
          <td>Fired when node collapsed</td>
        </tr>
          <tr>
          <td>nodeChecked</td>
          <td>function</td>
          <td></td>
          <td>Fired when node checked</td>
        </tr>
    </tbody>
</table>

## License

react-treeview is released under the MIT license.
