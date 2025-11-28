export default function SelectProduct({
  productfilter,
  setpage,
  setproductfilter,
}) {
  function handleClicknew(event) {
    let value = event.target.value;
    const copyfilter = [...productfilter];
    if (value == "") {
      value = "viejo a nuevo";
    }
    switch (value) {
      case "alfabeticamente":
        setproductfilter(
          copyfilter.sort((a, b) => a.name.localeCompare(b.name))
        );
        break;
      case "viejo a nuevo":
        setproductfilter(
          copyfilter.sort((a, b) => a.id_product - b.id_product)
        );
        break;
      case "mas nuevo a mas viejo":
        setproductfilter(
          copyfilter.sort((a, b) => b.id_product - a.id_product)
        );
        break;
      case "precio mayor menor":
        setproductfilter(copyfilter.sort((a, b) => b.price - a.price));
        break;
      case "precio menor mayor":
        setproductfilter(copyfilter.sort((a, b) => a.price - b.price));
        break;
    }
    setpage(1);
  }
  return (
    <select onChange={handleClicknew}>
      <option value={""}> Ordenar por</option>
      <option value={"precio mayor menor"}>Precio de mayor a menor </option>
      <option value={"precio menor mayor"}>Precio de menor a mayor </option>
      <option value={"viejo a nuevo"}> Mas viejo a mas nuevo</option>
      <option value={"alfabeticamente"}>Alfatebeticamente </option>
      <option value={"mas nuevo a mas viejo"}> Mas nuevo a mas viejo</option>
    </select>
  );
}
