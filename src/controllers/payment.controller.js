import {z} from "zod";

const PaymentSchema = z.object({
    data: z.string().datetime(),
   valor: z.number().positive(),
   numero: z.number().int().positive(),
   observacao: z.string().optional(),
});

const PaymentController = {
    async createPayment(req, res) {
        try {
            const {data, numerorecibo, usuarioID, valor, observacao} = req.body;
            PaymentSchema.parse({data, numerorecibo, usuarioID, valor, observacao});
            console.log({data, numerorecibo, usuarioID, valor, observacao });
            res.status(201).json({ message: "Payment created successfully" });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    menssage: "Erro de validação:",
                    errors: error.errors.map(
                     err => ({
                        atributo: err.path[0],
                        message: err.message,
                     })
                    )
                })
            }
            res.status(500).json({ message: error.message });
        }
    },

    async updatePayment(req, res) {
        try {
            const {id} = req.params;
            const {valor, numero, data, observacao} = req.body;
            PaymentSchema.parse({data, numero, valor, observacao});
            res.status(200).json({ message: `Payment updated successfully`, data: {id, valor, numero, data, observacao} });
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({message: "Validation error", details: error.errors});
            }
            res.status(500).json({ message: error.message });
        }
    },

    async deletePayment(req, res) {
        try {
            const {id} = req.params;
            // Logic to delete payment by id
            return res.status(200).json({ message: 'Payment deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

}


export default PaymentController;