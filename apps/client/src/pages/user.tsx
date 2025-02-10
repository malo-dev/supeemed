import React, { useState, useEffect } from 'react';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import axios from 'axios';
import DefaultLayout from '../layout/adminLayout';

const url = 'http://localhost:3000/users/';

export default function UserManagement() {
  const [plannings, setPlannings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({ username: '', img: '', password: '', role: 'emp' });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredPlannings, setFilteredPlannings] = useState<any[]>([]);

  // Filter states
  const [usernameFilter, setUsernameFilter] = useState('');
  const [imgFilter, setImgFilter] = useState('');

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setPlannings(response.data);
        setFilteredPlannings(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = plannings;

    if (usernameFilter) {
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(usernameFilter.toLowerCase())
      );
    }

    if (imgFilter) {
      filtered = filtered.filter(user =>
        user.img.toLowerCase().includes(imgFilter.toLowerCase())
      );
    }

    setFilteredPlannings(filtered);
  }, [usernameFilter, imgFilter, plannings]);

  const handleDelete = (id: string) => {
    setIsDeleting(true);
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce user ?')) {
      axios
        .delete(`${url}${id}`)
        .then(() => {
          setPlannings(plannings.filter((planning) => planning.id !== id));
          setIsDeleting(false);
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression :', error);
          setIsDeleting(false);
        });
    } else {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (user: any) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    axios
      .put(`${url}${editingUser.id}`, editingUser)
      .then(() => {
        setPlannings(plannings.map((user) => (user.id === editingUser.id ? editingUser : user)));
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la modification:', error);
      });
  };

  const handleAddUser = () => {
    axios
      .post(url, newUser)
      .then((response) => {
        setPlannings([...plannings, response.data]);
        setShowAddModal(false);
        setNewUser({ username: '', img: '', password: '', role: 'emp' });
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout:', error);
      });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPlannings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPlannings.length / itemsPerPage);

  return (
    <DefaultLayout>
      <div className="space-y-4">
        {isLoading && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Chargement...</span>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            onClick={() => setShowAddModal(true)}
          >
            Ajouter un utilisateur
          </button>

          <div>
            <input
              type="text"
              placeholder="Filtrer par nom"
              value={usernameFilter}
              onChange={(e) => setUsernameFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg mr-2"
            />
            <input
              type="text"
              placeholder="Filtrer par image"
              value={imgFilter}
              onChange={(e) => setImgFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-blue-100 text-blue-600">
              <tr>
                <th className="px-6 py-4 text-left border-b">Nom d'utilisateur</th>
                <th className="px-6 py-4 text-left border-b">Role</th>
                <th className="px-6 py-4 text-left border-b">Email</th>
                <th className="px-6 py-4 text-left border-b">Mot de passe</th>
                <th className="px-6 py-4 text-left border-b">Image</th>
                <th className="px-6 py-4 text-left border-b">Date de création</th>
                <th className="px-6 py-4 text-left border-b">Date de mise à jour</th>
                <th className="px-6 py-4 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((planning) => (
                <tr key={planning.id} className="hover:bg-gray-100 transition duration-300">
                  <td className="px-6 py-4 border-b">{planning.username}</td>
                  <td className="px-6 py-4 border-b">{planning.role}</td>
                  <td className="px-6 py-4 border-b">{planning.email}</td>
                  <td className="px-6 py-4 border-b">{planning.password}</td>
                  <td className="px-6 py-4 border-b">{planning.img || 'Aucune image'}</td>
                  <td className="px-6 py-4 border-b">{new Date(planning.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4 border-b">{new Date(planning.updatedAt).toLocaleString()}</td>
                  <td className="px-6 py-4 border-b">
                    <button
                      className="text-blue-500 hover:text-blue-700 font-semibold mr-4"
                      onClick={() => handleEditClick(planning)}
                    >
                      <BsFillPencilFill className="inline-block mr-2" />
                      Modifier
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 font-semibold"
                      onClick={() => handleDelete(planning.id)}
                    >
                      <BsFillTrashFill className="inline-block mr-2" />
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          <span className="flex items-center text-gray-700">
            Page {currentPage} de {totalPages}
          </span>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>

        {/* Modal for Adding User */}
        {showAddModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl mb-4 font-semibold">Ajouter un utilisateur</h2>
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className="mb-4 p-3 border border-gray-300 rounded-lg w-full"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newUser.img}
                onChange={(e) => setNewUser({ ...newUser, img: e.target.value })}
                className="mb-4 p-3 border border-gray-300 rounded-lg w-full"
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="mb-4 p-3 border border-gray-300 rounded-lg w-full"
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="mb-4 p-3 border border-gray-300 rounded-lg w-full"
              >
                <option value="emp">Employé</option>
                <option value="admin">Administrateur</option>
                <option value="resident">Resident</option>
              </select>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                onClick={handleAddUser}
              >
                Ajouter
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg ml-4"
                onClick={() => setShowAddModal(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Modal for Editing User */}
        {showEditModal && editingUser && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 relative w-1/2 rounded-lg shadow-lg">
              <h2 className="text-xl mb-4 font-semibold">Modifier l'utilisateur</h2>
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={editingUser.username}
                onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                className="mb-4 p-3 border border-gray-300 rounded-lg w-full"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={editingUser.img}
                onChange={(e) => setEditingUser({ ...editingUser, img: e.target.value })}
                className="mb-4 p-3 border border-gray-300 rounded-lg w-full"
              />
               <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                className="mb-4 p-3 border border-gray-300 rounded-lg w-full"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={editingUser.role}
                onChange={(e) => setEditingUser({ ...editingUser, img: e.target.value })}
                className="mb-4 p-3 border border-gray-300 rounded-lg w-full"
              />
               <input
                type="text"
                placeholder="Image URL"
                value={editingUser.password}
                onChange={(e) => setEditingUser({ ...editingUser, img: e.target.value })}
                className="mb-4 p-3 border border-gray-300 rounded-lg w-full"
              />
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                onClick={handleSaveEdit}
              >
                Sauvegarder
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg ml-4"
                onClick={() => setShowEditModal(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
