const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const ContactModel = require('../models/contactModel');
const cors = require('cors');

router.use(cors());




router.post('/email', async (req, res) => {
    try {
        // Lógica para enviar email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.PASS
            },
            tls: {
                rejectUnauthorized: false // Desabilitando a verificação do certificado
            }
        });

        const mailOptions = {
            from: "",
            to: "erickrodovalhosilveira@gmail.com",
            subject: "ERS",
            text: "Coisas do formulário"
        };
        const emailText = `Novo formulário submetido!\n\nNome: ${req.body.name}\nEmail: ${req.body.email}\nOpções: ${req.body.options}\nTempo: ${req.body.time}\nDescrição: ${req.body.description}`;
mailOptions.text = emailText;

        transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).json({ success: false, error: error.message });
            } else {
                console.log("Email sent:", info);

                // Salvar os dados no banco de dados usando o modelo ContactModel
                const newContact = new ContactModel({
                    name: req.body.name,
                    email: req.body.email,
                    options: req.body.options,
                    time: req.body.time,
                    description: req.body.description
                });

                await newContact.save();

                res.json({ success: true, message: 'Email enviado com sucesso!' });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});


module.exports = router;
