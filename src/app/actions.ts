
'use server';

import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
// This ensures we only initialize the app once
if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!privateKey || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_DATABASE_URL) {
    console.error("Firebase environment variables are not set.");
  } else {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
              projectId: process.env.FIREBASE_PROJECT_ID,
              clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
              privateKey: privateKey,
            }),
            databaseURL: process.env.FIREBASE_DATABASE_URL
        });
    } catch (error: any) {
        console.error('Firebase Admin Initialization Error:', error.message);
    }
  }
}


export async function submitLead(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const company = formData.get('company') as string || 'Not provided';

  if (!name || !phone || !email) {
    return { success: false, error: 'Please fill out all required fields.' };
  }

  const leadData = {
    name,
    phone,
    email,
    company,
    submittedAt: new Date().toISOString(),
  };

  try {
    // 1. Send data to Telegram
    const telegramToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

    if (telegramToken && telegramChatId) {
      const message = `
        <b>New Lead from Website</b>
        -------------------------
        <b>Name:</b> ${name}
        <b>Phone:</b> ${phone}
        <b>Email:</b> ${email}
        <b>Company:</b> ${company}
        -------------------------
        <sub>${new Date().toLocaleString()}</sub>
      `;
      
      const telegramApiUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
      
      await fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: message,
          parse_mode: 'HTML',
        }),
      });
    }

    // 2. Save data to Firebase Realtime Database
    if(admin.apps.length > 0) {
      const db = admin.database();
      const leadsRef = db.ref('leads');
      await leadsRef.push(leadData);
    } else {
        console.log("Skipping Firebase write because admin is not initialized.")
    }

    return { success: true };
  } catch (error) {
    console.error('Submission Error:', error);
    if (error instanceof Error) {
        return { success: false, error: error.message };
    }
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
