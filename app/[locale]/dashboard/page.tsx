"use client";
import { useState } from "react";
import { mutate } from "swr";
import LogoutButton from "../components/log-out-button";
import { useUsers } from "../../../hooks/use-users";
import { createUser, updateUser, deleteUser } from "../../../services/user-service";
import { userRoutes } from "../../../lib/routes/user";

export default function DashboardPage() {
  const { users, isLoading, isError } = useUsers();
  const [form, setForm] = useState({ name: "", email: "", id: "" });
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Erreur lors du chargement des utilisateurs</p>;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await updateUser({ id: form.id, name: form.name, email: form.email });
      setIsEditing(false);
    } else {
      await createUser({ name: form.name, email: form.email });
    }
    mutate(userRoutes.getAllUsers.url);
    setForm({ name: "", email: "", id: "" });
  };

  const handleEdit = (user: any) => {
    setForm({ name: user.name, email: user.email, id: user.id });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      await deleteUser(id);
      mutate(userRoutes.getAllUsers.url);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-bold">Bienvenue</h1>
        <LogoutButton />
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Liste utilisateurs</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Nom"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {isEditing ? "Modifier" : "Ajouter"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setForm({ name: "", email: "", id: "" });
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Annuler
          </button>
        )}
      </form>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Nom</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user: any) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
