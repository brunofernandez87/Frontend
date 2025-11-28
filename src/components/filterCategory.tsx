export default function FilterCategory({ products, categoryFilter }) {
  let totally = [];
  products.forEach((p) => {
    if (!totally.includes(p.category)) {
      totally.push(p.category);
    }
  });
  return (
    <select onChange={categoryFilter}>
      <option value="">Todas las categorías</option>
      {totally.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
