export default function ChangePassword() {
  return (
    <form action="/changePassword" method="Put">
      <label htmlFor="password">Contraseña</label>
      <input type="password" name="password" required />
      <label htmlFor="newPassword">Nueva Contraseña</label>
      <input type="password" name="newPassword" required />p
      <button type="submit"> Cambiar Contraseña</button>
    </form>
  );
}
