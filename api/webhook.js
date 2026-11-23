export default async function handler(req, res) {
    // Permite apenas requisições POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    try {
        // INSIRA AQUI O IP DO SEU N8N
        const n8nUrl = 'http://137.131.215.18:5678/webhook/fastfit-lead';

        // O Vercel repassa os dados para o n8n
        const response = await fetch(n8nUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body) // Repassa exatamente o que o HTML enviou
        });

        if (!response.ok) {
            const errorText = await response.text(); // Pega a fofoca toda do n8n
            console.error(`O n8n recusou. Status: ${response.status} - Motivo: ${errorText}`);
            throw new Error('Falha na comunicação com o n8n');
        }

        // Retorna sucesso para o site
        return res.status(200).json({ success: true });

    } catch (error) {
        console.error('Erro na API do Vercel:', error);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
}