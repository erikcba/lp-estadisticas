"use client";

import { useMemo, useState } from "react";

const TERMS_TEXT = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat libero vitae justo iaculis, et consequat lorem egestas. Mauris eget augue vel nibh pretium ultrices.

Suspendisse potenti. Curabitur vel posuere tellus. Integer faucibus semper dolor, sed tincidunt mauris volutpat in. Sed eu est non lorem blandit ultricies ut et lectus.

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.

Ut ut ultricies augue. Quisque viverra lorem in turpis volutpat, at varius nibh convallis. Morbi in sem in orci posuere vulputate. Integer lobortis suscipit odio, id facilisis massa efficitur nec.

Aliquam erat volutpat. Vivamus at vestibulum dolor. Mauris ac sem sed elit aliquet mattis. Nulla congue, felis id finibus porttitor, purus ipsum efficitur urna, et pretium lorem turpis et lorem.

Nam vitae sapien non risus laoreet suscipit. Nunc nec est lorem. Nulla facilisi. Integer feugiat ex et dolor pellentesque, in porta augue dictum. Duis eget nibh luctus, posuere mauris sit amet, pretium leo.

Sed luctus, massa sit amet eleifend pulvinar, mi mauris faucibus lectus, at pulvinar nunc ipsum sit amet dui. Etiam dictum risus in risus eleifend, vitae malesuada dui sodales.

In hac habitasse platea dictumst. Pellentesque iaculis, leo at varius vulputate, sapien arcu laoreet odio, vel vulputate mauris nunc in velit. Cras non lacus volutpat, sodales sapien id, varius lacus.

Fusce id risus eu dui mattis sagittis. Donec blandit augue id justo viverra varius. Curabitur egestas, justo non hendrerit luctus, lorem mauris interdum lorem, et malesuada est mi a est.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent posuere, diam sed pulvinar volutpat, turpis magna pharetra sapien, et maximus nisl sem non odio.
`;

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  const canCreateAccount = useMemo(() => {
    return (
      firstName.trim() &&
      lastName.trim() &&
      username.trim() &&
      password &&
      confirmPassword &&
      email &&
      confirmEmail &&
      birthDate &&
      termsAccepted
    );
  }, [firstName, lastName, username, password, confirmPassword, email, confirmEmail, birthDate, termsAccepted]);

  function openTermsModal() {
    setTermsModalOpen(true);
    setScrolledToBottom(false);
  }

  function closeTermsModal() {
    setTermsModalOpen(false);
  }

  function handleTermsScroll(event) {
    const element = event.currentTarget;
    const reachedBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 4;
    if (reachedBottom) {
      setScrolledToBottom(true);
    }
  }

  function handleAcceptTerms() {
    if (!scrolledToBottom) return;
    setTermsAccepted(true);
    setTermsModalOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const strongPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!strongPassword.test(password)) {
      alert("La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (email !== confirmEmail) {
      alert("Los emails no coinciden.");
      return;
    }

    if (!termsAccepted) {
      alert("Debés aceptar los términos y condiciones.");
      return;
    }

    console.log("Registro:", {
      firstName,
      lastName,
      username,
      password,
      email,
      birthDate,
      receiveUpdates,
      termsAccepted,
    });
  }

  return (
    <>
      <section className="w-full px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-2xl rounded-xl border border-zinc-700/40 bg-[#111318] p-6 shadow-xl">
          <h1 className="text-2xl font-bold text-[#b6c4ff] sm:text-3xl">Crear cuenta</h1>
          <p className="mt-1 text-sm text-zinc-400">Completá tus datos para registrarte</p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-zinc-300">Nombre</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white outline-none focus:border-blue-500"
                  placeholder="Ej: Juan"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-300">Apellido</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white outline-none focus:border-blue-500"
                  placeholder="Ej: Perez"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm text-zinc-300">Nombre de usuario</label>
              <input
                type="text"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white outline-none focus:border-blue-500"
                placeholder="Ej: juanperez10"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-zinc-300">Contraseña</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  pattern="^(?=.*[A-Z])(?=.*\d).{8,}$"
                  title="Debe tener mínimo 8 caracteres, una mayúscula y un número."
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white outline-none focus:border-blue-500"
                  placeholder="Mínimo 8, 1 mayúscula y 1 número"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-zinc-300">Repetir contraseña</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white outline-none focus:border-blue-500"
                  placeholder="Repetí la contraseña"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-zinc-300">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white outline-none focus:border-blue-500"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-zinc-300">Repetir email</label>
                <input
                  type="email"
                  required
                  value={confirmEmail}
                  onChange={(event) => setConfirmEmail(event.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white outline-none focus:border-blue-500"
                  placeholder="Repetí tu email"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm text-zinc-300">Fecha de nacimiento</label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value)}
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white outline-none focus:border-blue-500"
              />
            </div>

            <label className="mt-2 flex items-start gap-3 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={receiveUpdates}
                onChange={(event) => setReceiveUpdates(event.target.checked)}
                className="mt-0.5 h-4 w-4 accent-blue-600"
              />
              Recibir actualizaciones de partidos y novedades por email
            </label>

            <label className="flex items-start gap-3 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={termsAccepted}
                onClick={openTermsModal}
                readOnly
                className="mt-0.5 h-4 w-4 accent-blue-600"
              />
              Aceptar términos y condiciones
            </label>

            <button
              type="submit"
              disabled={!canCreateAccount}
              className="mt-2 rounded-md bg-[#05a32d] py-3 font-semibold text-[#030c33] transition hover:bg-[#0ac11f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Crear cuenta
            </button>
          </form>
        </div>
      </section>

      {termsModalOpen && (
        <div
          className="fixed inset-0 z-120 flex items-center justify-center bg-black/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Términos y condiciones"
        >
          <div className="w-full max-w-2xl rounded-xl border border-zinc-700 bg-[#111318] p-5 shadow-2xl">
            <h2 className="text-xl font-semibold text-[#b6c4ff]">Términos y condiciones</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Leé hasta el final para habilitar el botón de aceptar.
            </p>

            <div
              onScroll={handleTermsScroll}
              className="mt-4 h-72 overflow-y-auto whitespace-pre-line rounded-md border border-zinc-700 bg-zinc-900 p-4 text-sm text-zinc-200"
            >
              {TERMS_TEXT}
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeTermsModal}
                className="rounded-md border border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAcceptTerms}
                disabled={!scrolledToBottom}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
