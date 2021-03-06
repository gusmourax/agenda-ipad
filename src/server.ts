import express from 'express';
import { agendamentoRouter } from './routes/agendamento.route';

const app = express();

app.use(express.json());
app.use('/agendamentos', agendamentoRouter);

app.listen(3333, () => console.log('Server started on port 3333'));