export interface Planning {
    id: number;
    planning: string;
    date: string;
    shift: string;
    employee: string;
    residence: string;
}

export const planningsData: Planning[] = [
    {
        id: 1,
        planning: 'Planning A',
        date: '13/01/2025',
        shift: 'Matin',
        employee: 'Ariel Chiza',
        residence: 'Résidence A'
    },
    {
        id: 2,
        planning: 'Planning B',
        date: '14/01/2025',
        shift: 'Après-midi',
        employee: 'Leader Malo',
        residence: 'Résidence B'
    }
];
