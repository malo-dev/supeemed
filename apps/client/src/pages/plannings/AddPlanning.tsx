import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layout/adminLayout';

const url = 'http://localhost:3000/plannings/';

export default function AddPlanning() {
  const navigate = useNavigate();

  // States pour gérer les entrées du formulaire
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [schedule, setSchedule] = useState([
    {
      date: '',
      startTime: '',
      endTime: '',
      breaks: [{ startTime: '', endTime: '' }],
      location: '',
      shiftType: '',
      status: '',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour ajouter un horaire au tableau
  const handleAddSchedule = () => {
    setSchedule([
      ...schedule,
      {
        date: '',
        startTime: '',
        endTime: '',
        breaks: [{ startTime: '', endTime: '' }],
        location: '',
        shiftType: '',
        status: '',
      },
    ]);
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPlanning = {
      employeeId,
      employeeName,
      department,
      position,
      schedule,
    };

    setIsLoading(true);

    axios
      .post(url, newPlanning)
      .then((response) => {
        setIsLoading(false);
        // Rediriger vers la liste des plannings
        navigate('/plannings');
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Erreur lors de l\'ajout du planning :', error);
      });
  };

  // Fonction pour mettre à jour les informations de chaque horaire
  const handleScheduleChange = (index: number, field: string, value: any) => {
    const newSchedule = [...schedule];
    if (field === 'breaks') {
      newSchedule[index].breaks = value;
    } else {
      newSchedule[index][field] = value;
    }
    setSchedule(newSchedule);
  };

  return (
    <DefaultLayout>

<div className="space-y-4 p-6">
      <h2 className="text-2xl font-bold">Ajouter un nouveau planning</h2>
      {isLoading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Chargement...</span>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">ID de l'employé</label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Nom de l'employé</label>
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Département</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Poste</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Section pour l'ajout d'horaires */}
        <div>
          <h3 className="text-lg font-medium">Horaires</h3>
          {schedule.map((shift, index) => (
            <div key={index} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Date</label>
                <input
                  type="date"
                  value={shift.date}
                  onChange={(e) =>
                    handleScheduleChange(index, 'date', e.target.value)
                  }
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex space-x-4">
                <div>
                  <label className="block text-sm font-medium">Heure Début</label>
                  <input
                    type="time"
                    value={shift.startTime}
                    onChange={(e) =>
                      handleScheduleChange(index, 'startTime', e.target.value)
                    }
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Heure Fin</label>
                  <input
                    type="time"
                    value={shift.endTime}
                    onChange={(e) =>
                      handleScheduleChange(index, 'endTime', e.target.value)
                    }
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Lieu</label>
                <input
                  type="text"
                  value={shift.location}
                  onChange={(e) =>
                    handleScheduleChange(index, 'location', e.target.value)
                  }
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Type de Shift</label>
                <input
                  type="text"
                  value={shift.shiftType}
                  onChange={(e) =>
                    handleScheduleChange(index, 'shiftType', e.target.value)
                  }
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Statut</label>
                <input
                  type="text"
                  value={shift.status}
                  onChange={(e) =>
                    handleScheduleChange(index, 'status', e.target.value)
                  }
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSchedule}
            className="bg-primary text-white py-2 px-4 rounded-md"
          >
            Ajouter un horaire
          </button>
        </div>

        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded-md"
        >
          Ajouter le planning
        </button>
      </form>
    </div>
    </DefaultLayout>

  );
}
