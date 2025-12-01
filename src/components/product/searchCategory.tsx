export default function SearchCategory({
  productFilt,
  setproductfilter,
  category,
  label,
}) {
  function searchCategory(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("search");
    const result = productFilt.filter((p) => {
      const value = p[category];
      return value.toLowerCase().includes(name);
    });
    setproductfilter(result);
  }
  return (
    <form onSubmit={searchCategory} className="form-Product">
      <input type="search" name="search" id="search" placeholder={label} />
      <button id="botton-search">🔍</button>
    </form>
  );
}
