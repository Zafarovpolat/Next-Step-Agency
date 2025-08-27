
'use server';

import * as admin from 'firebase-admin';

// --- Firebase Admin Initialization ---
// This ensures we only initialize the app once.
if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const databaseURL = process.env.FIREBASE_DATABASE_URL;

  if (!privateKey || !clientEmail || !projectId || !databaseURL) {
    console.error('CRITICAL: Firebase environment variables are not set. Please check your .env.local file.');
    if (!privateKey) console.error('FIREBASE_PRIVATE_KEY is missing.');
    if (!clientEmail) console.error('FIREBASE_CLIENT_EMAIL is missing.');
    if (!projectId) console.error('FIREBASE_PROJECT_ID is missing.');
    if (!databaseURL) console.error('FIREBASE_DATABASE_URL is missing.');
  } else {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: projectId,
          clientEmail: clientEmail,
          privateKey: privateKey,
        }),
        databaseURL: databaseURL
      });
      console.log('Firebase Admin SDK initialized successfully.');
    } catch (error: any) {
      console.error('Firebase Admin Initialization Error:', error.message);
    }
  }
}

// --- Lead Submission Logic ---
export async function submitLead(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const company = formData.get('company') as string || 'Not provided';

  console.log('Received lead submission:', { name, phone, email, company });

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

  let telegramSuccess = false;
  let firebaseSuccess = false;
  let submissionError: string | null = null;

  // 1. Send data to Telegram
  try {
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
        ${new Date().toLocaleString()}
      `;
      
      const telegramApiUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
      
      const response = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(`Telegram API Error: ${responseData.description || 'Unknown error'}`);
      }

      console.log('Lead successfully sent to Telegram.');
      telegramSuccess = true;
    } else {
      console.warn('Telegram environment variables are not set. Skipping Telegram notification.');
    }
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    submissionError = error instanceof Error ? error.message : 'Failed to send to Telegram.';
  }

  // 2. Save data to Firebase Realtime Database
  try {
    if (admin.apps.length > 0) {
      const db = admin.database();
      const leadsRef = db.ref('leads');
      await leadsRef.push(leadData);
      console.log('Lead successfully saved to Firebase Realtime Database.');
      firebaseSuccess = true;
    } else {
      console.error('Skipping Firebase write because admin SDK is not initialized.');
      if (!submissionError) {
          submissionError = "Server configuration error: Could not connect to the database.";
      }
    }
  } catch (error) {
    console.error('Error saving to Firebase:', error);
    if (!submissionError) {
      submissionError = error instanceof Error ? error.message : 'Failed to save to database.';
    }
  }

  if (telegramSuccess || firebaseSuccess) {
    return { success: true };
  } else {
    return { success: false, error: submissionError || 'An unexpected error occurred.' };
  }
}
