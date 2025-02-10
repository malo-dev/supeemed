import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { Planning } from './data';
import { format } from 'date-fns';

export default function Calendar() {
    const navigate = useNavigate();
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [editMode, setEditMode] = useState(false);
    const [editFormData, setEditFormData] = useState<Planning | null>(null);

    // Récupérer les plannings du localStorage
    const savedPlannings = localStorage.getItem('plannings');
    const [plannings, setPlannings] = useState<Planning[]>(
        savedPlannings ? JSON.parse(savedPlannings) : []
    );

    // Convertir les plannings en événements pour le calendrier
    const events = plannings.map(planning => {
        // Définir la couleur en fonction du shift
        const getEventColor = (shift: string) => {
            switch (shift.toLowerCase()) {
                case 'matin':
                    return '#4CAF50';  // Vert
                case 'après-midi':
                    return '#2196F3';  // Bleu
                case 'nuit':
                    return '#9C27B0';  // Violet
                default:
                    return '#757575';  // Gris
            }
        };

        return {
            id: planning.id.toString(),
            title: `${planning.planning} - ${planning.employee}`,
            start: planning.date,
            backgroundColor: getEventColor(planning.shift),
            extendedProps: {
                planning: planning
            },
            editable: true,
            durationEditable: false
        };
    });

    const handleEventClick = (info: any) => {
        setSelectedEvent(info.event);
        setEditFormData(info.event.extendedProps.planning);
        setEditMode(false);
        setShowEventModal(true);
    };

    const handleEventDrop = (info: any) => {
        const updatedPlanning = {
            ...info.event.extendedProps.planning,
            date: format(info.event.start, 'yyyy-MM-dd')
        };

        const updatedPlannings = plannings.map(p =>
            p.id === updatedPlanning.id ? updatedPlanning : p
        );

        setPlannings(updatedPlannings);
        localStorage.setItem('plannings', JSON.stringify(updatedPlannings));
    };

    const handleEventModalClose = () => {
        setShowEventModal(false);
        setSelectedEvent(null);
        setEditMode(false);
        setEditFormData(null);
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditFormData(prev => prev ? {
            ...prev,
            [name]: value
        } : null);
    };

    const handleEditSubmit = () => {
        if (editFormData) {
            const updatedPlannings = plannings.map(p =>
                p.id === editFormData.id ? editFormData : p
            );
            setPlannings(updatedPlannings);
            localStorage.setItem('plannings', JSON.stringify(updatedPlannings));
            setEditMode(false);
        }
    };

    const handleEventDelete = () => {
        if (selectedEvent && window.confirm('Êtes-vous sûr de vouloir supprimer ce planning ?')) {
            const updatedPlannings = plannings.filter(
                p => p.id !== parseInt(selectedEvent.id)
            );
            setPlannings(updatedPlannings);
            localStorage.setItem('plannings', JSON.stringify(updatedPlannings));
            handleEventModalClose();
        }
    };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark flex justify-between items-center">
                <h3 className="font-medium text-black dark:text-white">
                    Calendrier des plannings
                </h3>
                <button
                    onClick={() => navigate('/plannings')}
                    className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-6 text-center font-medium text-primary hover:bg-opacity-90 hover:bg-primary hover:text-white"
                >
                    Retour aux plannings
                </button>
            </div>
            <div className="p-4 md:p-6 xl:p-9">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    locale={frLocale}
                    events={events}
                    eventClick={handleEventClick}
                    height="auto"
                    editable={true}
                    droppable={true}
                    eventDrop={handleEventDrop}
                    eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        meridiem: false
                    }}
                    slotMinTime="06:00:00"
                    slotMaxTime="23:00:00"
                    allDaySlot={false}
                    slotDuration="01:00:00"
                    dayMaxEvents={true}
                    nowIndicator={true}
                />
            </div>

            {/* Modal pour afficher/modifier les détails du planning */}
            {showEventModal && selectedEvent && editFormData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-boxdark p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">
                            {editMode ? 'Modifier le planning' : 'Détails du planning'}
                        </h2>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">Planning:</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="planning"
                                        value={editFormData.planning}
                                        onChange={handleEditChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-meta-4 dark:text-white"
                                    />
                                ) : (
                                    <p className="dark:text-gray-300">{editFormData.planning}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">Date:</label>
                                {editMode ? (
                                    <input
                                        type="date"
                                        name="date"
                                        value={editFormData.date}
                                        onChange={handleEditChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-meta-4 dark:text-white"
                                    />
                                ) : (
                                    <p className="dark:text-gray-300">{editFormData.date}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">Shift:</label>
                                {editMode ? (
                                    <select
                                        name="shift"
                                        value={editFormData.shift}
                                        onChange={handleEditChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-meta-4 dark:text-white"
                                    >
                                        <option value="Matin">Matin</option>
                                        <option value="Après-midi">Après-midi</option>
                                        <option value="Nuit">Nuit</option>
                                    </select>
                                ) : (
                                    <p className="dark:text-gray-300">{editFormData.shift}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">Employé:</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="employee"
                                        value={editFormData.employee}
                                        onChange={handleEditChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-meta-4 dark:text-white"
                                    />
                                ) : (
                                    <p className="dark:text-gray-300">{editFormData.employee}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">Résidence:</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="residence"
                                        value={editFormData.residence}
                                        onChange={handleEditChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-meta-4 dark:text-white"
                                    />
                                ) : (
                                    <p className="dark:text-gray-300">{editFormData.residence}</p>
                                )}
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            {editMode ? (
                                <>
                                    <button
                                        onClick={handleEditSubmit}
                                        className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
                                    >
                                        Sauvegarder
                                    </button>
                                    <button
                                        onClick={() => setEditMode(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-meta-4 dark:text-white"
                                    >
                                        Annuler
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleEventDelete}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Supprimer
                                    </button>
                                    <button
                                        onClick={handleEditClick}
                                        className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={handleEventModalClose}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-meta-4 dark:text-white"
                                    >
                                        Fermer
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
