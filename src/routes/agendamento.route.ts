import { Router } from 'express';
import isBetween from 'dayjs/plugin/isBetween';
import dayjs from 'dayjs';

dayjs.extend(isBetween);

interface IPad {
    id: number;
    agendamentos: {
        dataInicial: number;
        dataFinal: number;
        professor: string;
    }[];
}

const ipads: IPad[] = [
    {
        id: 1,
        agendamentos: [
            {
                dataInicial: 1638194400, // 14 horas
                dataFinal: 1638198000, // 15 horas
                professor: 'José',
            }
        ]
    }
];

const agendamentoRouter = Router();

agendamentoRouter.post('/ipads', (req, res) => {
    const { dataInicial, dataFinal } = req.body;

    const ipadsFiltrados = ipads.filter(ipad => {
        const existeAgendamentoNoPeriodo = ipad.agendamentos.some(agendamento => {
            return dayjs(dataInicial).isBetween(agendamento.dataInicial, agendamento.dataFinal)
                || dayjs(dataFinal).isBetween(agendamento.dataInicial, agendamento.dataFinal);
        });

        return !existeAgendamentoNoPeriodo;
    });

    res.send(ipadsFiltrados);
})

export { agendamentoRouter };