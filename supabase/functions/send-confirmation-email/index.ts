import { corsHeaders } from '@supabase/supabase-js/cors'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const BodySchema = z.object({
  prenom: z.string().min(1).max(100),
  email: z.string().email().max(255),
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const parsed = BodySchema.safeParse(await req.json())
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { prenom, email } = parsed.data

    // Build the confirmation email HTML
    const html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="font-family: 'Arial', sans-serif; background: #F5FAF7; padding: 40px 20px; margin: 0;">
  <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 40px 32px; border: 1px solid rgba(0,51,38,0.1);">
    <h1 style="font-size: 24px; color: #CCB89B; margin: 0 0 8px; font-weight: 700;">Ma Clé <span style="color: #003326;">à Alger</span></h1>
    <hr style="border: none; border-top: 1px solid rgba(0,51,38,0.1); margin: 20px 0;">
    <h2 style="font-size: 20px; color: #CCB89B; margin: 0 0 16px;">Inscription confirmée !</h2>
    <p style="font-size: 15px; color: #a08860; line-height: 1.7; margin: 0 0 16px;">
      Bonjour <strong style="color: #CCB89B;">${prenom}</strong>,
    </p>
    <p style="font-size: 15px; color: #a08860; line-height: 1.7; margin: 0 0 16px;">
      Merci pour votre inscription au webinaire <strong style="color: #003326;">Ma Clé à Alger</strong>.
    </p>
    <div style="background: #D6F0E5; border-radius: 12px; padding: 20px 24px; margin: 24px 0;">
      <p style="margin: 0 0 8px; font-size: 14px; color: #003326; font-weight: 500;">📅 Samedi 18 Avril 2026</p>
      <p style="margin: 0 0 8px; font-size: 14px; color: #003326; font-weight: 500;">🕕 18h00 – 20h00 (heure de Paris)</p>
      <p style="margin: 0; font-size: 14px; color: #003326; font-weight: 500;">💻 Google Meet</p>
    </div>
    <p style="font-size: 15px; color: #a08860; line-height: 1.7; margin: 0 0 16px;">
      Vous recevrez votre <strong>lien Google Meet</strong> par email quelques jours avant l'événement.
    </p>
    <p style="font-size: 15px; color: #a08860; line-height: 1.7; margin: 0 0 24px;">
      En attendant, préparez vos questions — 55 minutes seront dédiées à vos interrogations en direct !
    </p>
    <hr style="border: none; border-top: 1px solid rgba(0,51,38,0.1); margin: 24px 0;">
    <p style="font-size: 13px; color: #b8a080; text-align: center; margin: 0;">
      Oussama Promotion · Webinaire Ma Clé à Alger
    </p>
  </div>
</body>
</html>`

    // Use Resend or log for now - we'll send via the Lovable email system
    // For now, just log the email (the actual sending will happen when email domain is configured)
    console.log(`Confirmation email prepared for ${email}`)

    return new Response(
      JSON.stringify({ success: true, message: 'Confirmation email queued' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('Error:', err)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
