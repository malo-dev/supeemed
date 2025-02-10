import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Importer les styles de calendrier
import DefaultLayout from "../../layout/residentLayout";

const MapresenceResidence = () => {
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDay, setCurrentDay] = useState(null);

  // Récupérer les données de présence depuis localStorage au démarrage
  useEffect(() => {
    const storedAttendance = JSON.parse(localStorage.getItem("attendance") || "[]");
    setAttendance(storedAttendance);

    // Récupérer le jour actuel (1: Lundi, 7: Dimanche)
    const today = new Date().getDay();
    setCurrentDay(today === 0 ? 7 : today); // Ajustement pour Dimanche (0) qui doit être 7
  }, []);

  // Enregistrer les données de présence dans localStorage à chaque modification
 

  const handleCheckboxChange = (day) => {
    // Vérifier si c'est bien le jour actuel
    if (day === currentDay) {
      const newAttendance = [...attendance];
      const existingEntry = newAttendance.find((entry) => entry.day === day);
      if (existingEntry) {
        existingEntry.present = !existingEntry.present;
        existingEntry.time = new Date().toLocaleTimeString(); // Mettre à jour l'heure
      } else {
        newAttendance.push({ day, present: true, time: new Date().toLocaleTimeString() });
      }
      setAttendance(newAttendance);
      localStorage.setItem("attendance", JSON.stringify(newAttendance));
    } else {
      alert(`Aujourd'hui c'est ${["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"][currentDay - 1]}, vous ne pouvez cocher que ce jour-là.`);
    }
  };

  const checkPresence = (day) => {
    const entry = attendance.find((entry) => entry.day === day);
    return entry ? entry.present : false;
  };

  const checkAbsence = (day) => {
    const entry = attendance.find((entry) => entry.day === day);
    return entry ? !entry.present : false;
  };

  const getTimeChecked = (day) => {
    const entry = attendance.find((entry) => entry.day === day);
    return entry ? entry.time : "";
  };

  const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <DefaultLayout>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-teal-600 mb-5">Vérification de Présence</h1>
      <div className="mb-8">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="shadow-lg rounded-lg"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold text-teal-600 mb-4">Présence pour aujourd'hui ({daysOfWeek[currentDay - 1]})</h2>
        {daysOfWeek.map((day, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <label className="text-lg">{day}</label>
            <input
              type="checkbox"
              checked={checkPresence(index + 1)}
              onChange={() => handleCheckboxChange(index + 1)}
              disabled={currentDay !== index + 1} // Désactiver les cases à cocher sauf pour aujourd'hui
              className={`checkbox ${currentDay !== index + 1 ? 'bg-gray-300 cursor-not-allowed' : ''}`}
            />
            <span className={`text-sm ${checkAbsence(index + 1) ? 'text-red-500' : 'text-green-500'}`}>
              {checkAbsence(index + 1) ? "Absent" : `Présent à ${getTimeChecked(index + 1)}`}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-10 w-full max-w-md">
        <h2 className="text-xl font-semibold text-teal-600 mb-4">Liste des Présences</h2>
        <ul className="list-none">
          {attendance
            .filter((entry) => entry.present)
            .map((entry, index) => (
              <li key={index} className="bg-teal-200 p-3 mb-2 rounded-md shadow-sm">
                {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"][entry.day - 1]} : Présent à {entry.time}
              </li>
            ))}
        </ul>

        <h2 className="text-xl font-semibold text-teal-600 mt-6 mb-4">Liste des Absences</h2>
        <ul className="list-none">
          {attendance
            .filter((entry) => !entry.present)
            .map((entry, index) => (
              <li key={index} className="bg-red-200 p-3 mb-2 rounded-md shadow-sm">
                {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"][entry.day - 1]} : Absent
              </li>
            ))}
        </ul>
      </div>
    </div>
    </DefaultLayout>

  );
};

export default MapresenceResidence;
