import { useState } from "react";

const categories = [
  {
    id: 1,
    label: "Electronics",
    children: [
      {
        id: 2,
        label: "Mobile Phones",
        children: [
          { id: 3, label: "Android" },
          { id: 4, label: "iOS" },
        ],
      },
      {
        id: 5,
        label: "Laptops",
        children: [
          { id: 6, label: "Gaming" },
          { id: 7, label: "Business" },
          { id: 8, label: "Student" },
        ],
      },
    ],
  },
  {
    id: 9,
    label: "Clothing",
    children: [
      {
        id: 10,
        label: "Men",
        children: [
          { id: 11, label: "Shirts" },
          { id: 12, label: "Pants" },
          { id: 13, label: "Shoes" },
        ],
      },
      {
        id: 14,
        label: "Women",
        children: [
          { id: 15, label: "Dresses" },
          { id: 16, label: "Tops" },
          { id: 17, label: "Heels" },
        ],
      },
    ],
  },
  {
    id: 18,
    label: "Books",
    children: [
      { id: 19, label: "Fiction" },
      { id: 20, label: "Non-Fiction" },
      {
        id: 21,
        label: "Educational",
        children: [
          { id: 22, label: "Science" },
          { id: 23, label: "Mathematics" },
          { id: 24, label: "History" },
        ],
      },
    ],
  },
];

function App() {
  const initializeTree = (nodes) => {
    return nodes.map((node) => ({
      ...node,
      checked: false,
      children: node.children ? initializeTree(node.children) : [],
    }));
  };
  const [treeData, setTreeData] = useState(initializeTree(categories));

  const updateChildren = (node, isChecked) => {
    node.checked = isChecked;
    if (node.children) {
      node.children = node.children.map((child) =>
        updateChildren(child, isChecked)
      );
    }
    return node;
  };

  const updateParent = (node) => {
    if (node.children && node.children.length > 0) {
      const allChecked = node.children.every((child) => child.checked);
      const someChecked = node.children.some((child) => child.checked);
      node.checked = allChecked;
    }
    return node;
  };

  const updateTree = (nodes, id, isChecked) => {
    return nodes.map((node) => {
      if (node.id === id) {
        return updateChildren({ ...node }, isChecked);
      }
      if (node.children) {
        const updatedChildren = updateTree(node.children, id, isChecked);
        const updatedNodes = { ...node, children: updatedChildren };
        return updateParent(updatedNodes);
      }
      return node;
    });
  };

  const handleCheckboxChange = (id, isChecked) => {
    setTreeData((prev) => updateTree(prev, id, isChecked));
  };

  const renderTree = (nodes, level = 0) => {
    return nodes.map((node) => {
      return (
        <div
          key={node.id}
          className={`mt-2 rounded-sm border py-2 pr-4 pl-2`}
          style={{ marginLeft: `${level * 8}px` }}
        >
          <label className="my-1 flex cursor-pointer items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={node.checked}
              onChange={(e) => handleCheckboxChange(node.id, e.target.checked)}
            />
            <span className="text-gray-700">{node.label}</span>
          </label>
          {node.children &&
            node.children.length > 0 &&
            renderTree(node.children, level + 1)}
        </div>
      );
    });
  };
  return (
    <>
      <form
        action="#"
        className="mx-auto flex max-w-5xl flex-col gap-5 text-center"
      >
        {renderTree(treeData)}
      </form>
    </>
  );
}

export default App;
