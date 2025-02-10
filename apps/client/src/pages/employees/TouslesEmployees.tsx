import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import DefaultLayout from '../../layout/adminLayout';

const url = 'http://localhost:3000/employees';

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any | null>(null);
  const [newEmployee, setNewEmployee] = useState({ nom: '', prenom: '', department: '', position: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setEmployees(response.data.result || []);
        setFilteredEmployees(response.data.result || []);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des employés:', error);
      });
  }, []);

  useEffect(() => {
    setFilteredEmployees(
      employees.filter((employee) =>
        `${employee.nom} ${employee.prenom}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, employees]);

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleCreateEmployee = () => {
    axios
      .post(url, newEmployee)
      .then((response) => {
        setEmployees([...employees, response.data]);
        setNewEmployee({ nom: '', prenom: '', department: '', position: '' });
        setIsAdding(false);
        location.href = 'http://localhost:5173/employees'
      })
      .catch((error) => {
        console.error('Erreur lors de la création de l\'employé:', error);
      });
  };

  const handleEditEmployee = () => {
    if (!editingEmployee) return;
    axios
      .put(`${url}/${editingEmployee.id}`, editingEmployee)
      .then((response) => {
        setEmployees(
          employees.map((emp) => (emp.id === editingEmployee.id ? response.data : emp))
        );
        setIsEditing(false);
        setEditingEmployee(null);
        location.href='http://localhost:5173/employees'
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de l\'employé:', error);
      });
  };

  const handleDeleteEmployee = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      axios
        .delete(`${url}/${id}`)
        .then(() => {
          setEmployees(employees.filter((employee) => employee.id !== id));
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression de l\'employé:', error);
        });
    }
  };

  return (
    <DefaultLayout>
      <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      {/* Barre de recherche */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Rechercher un employé..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-96 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {isAdding ? 'Annuler' : 'Ajouter un employé'}
        </button>
      </div>

      {/* Formulaire d'ajout */}
      {isAdding && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-100 dark:bg-gray-700">
          <h3 className="text-xl font-semibold mb-4">Créer un nouvel employé</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Nom"
              value={newEmployee.nom}
              onChange={(e) => setNewEmployee({ ...newEmployee, nom: e.target.value })}
              className="p-3 border rounded-md"
            />
            <input
              type="text"
              placeholder="Prénom"
              value={newEmployee.prenom}
              onChange={(e) => setNewEmployee({ ...newEmployee, prenom: e.target.value })}
              className="p-3 border rounded-md"
            />
            <input
              type="text"
              placeholder="Département"
              value={newEmployee.department}
              onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
              className="p-3 border rounded-md"
            />
            <input
              type="text"
              placeholder="Poste"
              value={newEmployee.position}
              onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
              className="p-3 border rounded-md"
            />
          </div>
          <button
            onClick={handleCreateEmployee}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Créer un employé
          </button>
        </div>
      )}

      {/* Tableau des employés */}
      <div className="overflow-x-auto bg-white dark:bg-gray-700 shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-600 text-left">
              <th className="py-3 px-4 font-semibold text-sm">ID</th>
              <th className="py-3 px-4 font-semibold text-sm">Nom</th>
              <th className="py-3 px-4 font-semibold text-sm">Département</th>
              <th className="py-3 px-4 font-semibold text-sm">Poste</th>
              <th className="py-3 px-4 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map((employee) => (
              <tr key={employee.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="py-3 px-4 text-sm">{employee.id}</td>
                <td className="py-3 px-4 text-sm">{employee.nom} {employee.prenom}</td>
                <td className="py-3 px-4 text-sm">{employee.department}</td>
                <td className="py-3 px-4 text-sm">{employee.position}</td>
                <td className="py-3 px-4 text-sm">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setEditingEmployee(employee);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                    aria-label="Modifier"
                  >
                    <BsFillPencilFill />
                  </button>
                  <button
                    onClick={() => handleDeleteEmployee(employee.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                    aria-label="Supprimer"
                  >
                    <BsFillTrashFill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: Math.ceil(filteredEmployees.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-md ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200'}`}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Modification de l'employé */}
      {isEditing && editingEmployee && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-xl font-semibold mb-4">Modifier l'employé</h3>
            <input
              type="text"
              value={editingEmployee.nom}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, nom: e.target.value })}
              className="p-3 border mb-4 rounded-md w-full"
              placeholder="Nom"
            />
            <input
              type="text"
              value={editingEmployee.prenom}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, prenom: e.target.value })}
              className="p-3 border mb-4 rounded-md w-full"
              placeholder="Prénom"
            />
            <input
              type="text"
              value={editingEmployee.department}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, department: e.target.value })}
              className="p-3 border mb-4 rounded-md w-full"
              placeholder="Département"
            />
            <input
              type="text"
              value={editingEmployee.position}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, position: e.target.value })}
              className="p-3 border mb-4 rounded-md w-full"
              placeholder="Poste"
            />
            <div className="flex justify-end">
              <button
                onClick={handleEditEmployee}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Enregistrer
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </DefaultLayout>
    
  );
}
