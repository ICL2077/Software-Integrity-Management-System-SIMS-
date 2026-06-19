import { CATEGORIES } from '@/generated/prisma/enums';

export interface categoryTypes {
    name: string;
    type: CATEGORIES;
}

export const categories: categoryTypes[] = [
    { name: 'Графика', type: CATEGORIES.GRAPHIC },
    { name: 'Вычисления', type: CATEGORIES.CALCULATION },
    { name: 'Статистика', type: CATEGORIES.STATISTICKS },
];
