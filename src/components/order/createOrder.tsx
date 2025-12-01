export default function createOrder({ allOrders, setorderList, user, total }) {
  const id = allOrders.length + 1;
  const username = user.username;
  const date = new Date();
  const neworder = {
    id_order: id,
    id_user: username,
    date: date.toLocaleDateString(),
    state: "en preparacion",
    total: total,
  };
  const copylist = [...allOrders, neworder];
  setorderList(copylist);
  return neworder.id_order;
}
