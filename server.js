const db = require('./src/config/db');
const app = require('./src/app');

process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    process.exit(1);
});

async function startDatabase() {
    const rows = await db.query('SELECT NOW() as now');
    console.log('✅ Banco conectado em:', rows[0].now);
}

async function startServer() {
    const PORT = process.env.PORT || 3001;

    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
}

async function bootstrap() {
    try {
        await startDatabase();
        await startServer();
    } catch (err) {
        console.error('❌ Falha ao iniciar aplicação:', err);
        process.exit(1);
    }
}

bootstrap();