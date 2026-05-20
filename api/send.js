export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, address, area } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone required' });
  }

  const msg = `🔨 Новая заявка с калькулятора!\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📍 Адрес: ${address || 'не указан'}\n📐 Площадь: ${area || 'не указана'} м²`;

  const response = await fetch(`https://api.telegram.org/bot7172987920:AAHQC2ffqMYYibATUxTZxPdGcBThZFWh5ZY/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: 623526573, text: msg })
  });

  const data = await response.json();

  if (data.ok) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(500).json({ error: data.description });
  }
}
