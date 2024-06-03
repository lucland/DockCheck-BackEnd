const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'privacy-policy.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the privacy policy file');
            return;
        }

        const privacyPolicy = JSON.parse(data);

        // Detect language from query parameter, default to 'en-us'
        const lang = req.query.lang || 'en-us';

        // Ensure the requested language exists in the privacy policy
        if (!privacyPolicy[lang]) {
            res.status(404).send('Privacy policy not found for the requested language');
            return;
        }

        const policyContent = privacyPolicy[lang];

        const responseHtml = `
            <!DOCTYPE html>
            <html lang="${lang}">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${policyContent.title}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        margin: 20px;
                    }
                    h1 {
                        color: #333;
                    }
                    p {
                        margin-bottom: 20px;
                    }
                </style>
            </head>
            <body>
                <h1>${policyContent.title}</h1>
                <p><strong>${policyContent["Última atualização"] || policyContent["Last updated"]}:</strong> ${policyContent["Last updated"] || policyContent["Última atualização"]}</p>
                <h2>${policyContent["Introduction"] || policyContent["Introdução"]}</h2>
                <p>${policyContent["Introduction"] || policyContent["Introdução"]}</p>
                <h2>${policyContent["Information We Collect and Use"] || policyContent["Informações que coletamos e usamos"]}</h2>
                <p>${policyContent["Information We Collect and Use"] || policyContent["Informações que coletamos e usamos"]}</p>
                <h2>${policyContent["Camera Access"] || policyContent["Acesso à câmera"]}</h2>
                <p>${policyContent["Camera Access"] || policyContent["Acesso à câmera"]}</p>
                <h2>${policyContent["Cookies and Tracking Technologies"] || policyContent["Cookies e tecnologias de rastreamento"]}</h2>
                <p>${policyContent["Cookies and Tracking Technologies"] || policyContent["Cookies e tecnologias de rastreamento"]}</p>
                <h2>${policyContent["Third-Party Services"] || policyContent["Serviços terceirizados"]}</h2>
                <p>${policyContent["Third-Party Services"] || policyContent["Serviços terceirizados"]}</p>
                <h2>${policyContent["Security Measures"] || policyContent["Medidas de segurança"]}</h2>
                <p>${policyContent["Security Measures"] || policyContent["Medidas de segurança"]}</p>
                <h2>${policyContent["User Rights"] || policyContent["Direitos de uso"]}</h2>
                <p>${policyContent["User Rights"] || policyContent["Direitos de uso"]}</p>
                <h2>${policyContent["Data Retention"] || policyContent["Retenção de dados"]}</h2>
                <p>${policyContent["Data Retention"] || policyContent["Retenção de dados"]}</p>
                <h2>${policyContent["Children’s Privacy"] || policyContent["Privacidade infantil"]}</h2>
                <p>${policyContent["Children’s Privacy"] || policyContent["Privacidade infantil"]}</p>
                <h2>${policyContent["International Data Transfers"] || policyContent["Transferências Internacionais de Dados"]}</h2>
                <p>${policyContent["International Data Transfers"] || policyContent["Transferências Internacionais de Dados"]}</p>
                <h2>${policyContent["GDPR Compliance"] || policyContent["Conformidade com o GDPR"]}</h2>
                <p>${policyContent["GDPR Compliance"] || policyContent["Conformidade com o GDPR"]}</p>
                <h2>${policyContent["Target Audience"] || policyContent["Público-alvo"]}</h2>
                <p>${policyContent["Target Audience"] || policyContent["Público-alvo"]}</p>
                <h2>${policyContent["Contact Information"] || policyContent["Informações de contato"]}</h2>
                <p>${policyContent["Contact Information"] || policyContent["Informações de contato"]}</p>
                <h2>${policyContent["Changes to This Privacy Policy"] || policyContent["Alterações nesta Política de Privacidade"]}</h2>
                <p>${policyContent["Changes to This Privacy Policy"] || policyContent["Alterações nesta Política de Privacidade"]}</p>
                <h2>${policyContent["Acceptance of Terms"] || policyContent["Aceitação dos Termos"]}</h2>
                <p>${policyContent["Acceptance of Terms"] || policyContent["Aceitação dos Termos"]}</p>
            </body>
            </html>
        `;

        res.send(responseHtml);
    });
});

module.exports = router;
