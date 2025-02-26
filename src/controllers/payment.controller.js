import {z} from "zod";

const PaymentSchema = z.object({
    data: z.string(),
    numerorecibo: z.number().int().positive({message: "Número do recibo inválido"}),
    usuarioID: z.number().int().positive({message: "Id do usuário inválido"}),
    valor: z.number().positive({message: "Valor inválido"}),
    observacao: z.string().max(100,{message: "Observação inválida"})

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
    }

}

export default PaymentController;