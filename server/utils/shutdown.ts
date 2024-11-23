// server/utils/shutdown.ts
import prisma from '~/server/utils/prisma';

function handleShutdown() {
    prisma.$disconnect()
        .then(() => {
            console.log('Prisma disconnected');
            process.exit(0);
        })
        .catch((err) => {
            console.error('Error disconnecting Prisma:', err);
            process.exit(1);
        });
}

process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);
process.on('exit', handleShutdown);