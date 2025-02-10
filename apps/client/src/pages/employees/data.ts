export interface Employee {
    id: number;
    name: string;
    phone: string;
    service: string;
    residence: string;
    status: 'actif' | 'inactif';
}

export const employeesData: Employee[] = [
    {
        id: 1,
        name: 'John Doe',
        phone: '0123456789',
        service: 'Médecine',
        residence: 'Résidence A',
        status: 'actif'
    },
    {
        id: 2,
        name: 'Jane Smith',
        phone: '0987654321',
        service: 'Chirurgie',
        residence: 'Résidence B',
        status: 'actif'
    }
];
