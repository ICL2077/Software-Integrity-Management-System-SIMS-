import type { NextConfig } from 'next';

// НАСТРОЙКА ПРОСТО ПРОВЕРИТЬ ЧТО КОНТЕЙНЕР СОБИРАЕТСЯ

const nextConfig: NextConfig = {
    // Для Docker-сборки используем standalone режим
    // Это создаёт минимальный bundle только с нужными файлами
    output: 'standalone',
    typescript: {
        // !! ВНИМАНИЕ !!
        // Позволяет успешно завершить сборку даже при наличии ошибок типов.
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
