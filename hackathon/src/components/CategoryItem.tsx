export const CategoryItem = ({ name, id }: { name: string; id: number }) => (
  <li className="flex justify-between border p-3 rounded-lg">
    <span className="font-medium">{name}</span>
    <span className="text-sm text-gray-300">ID: {id}</span>
  </li>
);