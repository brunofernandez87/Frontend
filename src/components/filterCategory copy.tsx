export default function FilterCategory({ products, category, filter, label }) {
  let totally = [];
  products.forEach((p) => {
    const value = p[category];
    if (!totally.includes(value)) {
      totally.push(value);
    }
  });
  return (
    <select onChange={filter}>
      <option value="">{label || "Seleccionar"}</option>
      {totally.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
