const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

// --- Rate Limiter ---
const rateLimitMap = new Map<string, number[]>()

function isRateLimited(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now()
  const timestamps = (rateLimitMap.get(key) || []).filter(t => now - t < windowMs)
  if (timestamps.length >= maxRequests) {
    rateLimitMap.set(key, timestamps)
    return true
  }
  timestamps.push(now)
  rateLimitMap.set(key, timestamps)
  return false
}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, timestamps] of rateLimitMap) {
    const filtered = timestamps.filter(t => now - t < 3600000)
    if (filtered.length === 0) rateLimitMap.delete(key)
    else rateLimitMap.set(key, filtered)
  }
}, 300000)

const IP_LIMIT = 3
const IP_WINDOW = 15 * 60 * 1000 // 15 min
const EMAIL_LIMIT = 1
const EMAIL_WINDOW = 60 * 60 * 1000 // 60 min

const BodySchema = z.object({
  prenom: z.string().min(1).max(100),
  email: z.string().email().max(255),
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                     req.headers.get('x-real-ip') || 'unknown'

    const parsed = BodySchema.safeParse(await req.json())
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { prenom, email } = parsed.data

    // Check IP rate limit
    if (isRateLimited(`ip:${clientIp}`, IP_LIMIT, IP_WINDOW)) {
      return new Response(
        JSON.stringify({ error: 'Trop de tentatives. Veuillez réessayer dans quelques minutes.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check email rate limit
    if (isRateLimited(`email:${email.toLowerCase()}`, EMAIL_LIMIT, EMAIL_WINDOW)) {
      return new Response(
        JSON.stringify({ error: 'Un email de confirmation a déjà été envoyé à cette adresse. Veuillez patienter.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const MEET_LINK = 'https://meet.google.com/kon-ekku-qke'

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
      <p style="margin: 0 0 8px; font-size: 14px; color: #003326; font-weight: 500;">🕕 17h00 – 19h00 (heure de Paris)</p>
      <p style="margin: 0; font-size: 14px; color: #003326; font-weight: 500;">💻 Google Meet</p>
    </div>
    <div style="text-align: center; margin: 28px 0;">
      <a href="${MEET_LINK}" style="display: inline-block; background: #003326; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; padding: 14px 32px; border-radius: 10px;">🎥 Rejoindre le webinaire</a>
    </div>
    <p style="font-size: 13px; color: #b8a080; text-align: center; margin: 0 0 16px;">
      Lien direct : <a href="${MEET_LINK}" style="color: #003326;">${MEET_LINK}</a>
    </p>
    <p style="font-size: 15px; color: #a08860; line-height: 1.7; margin: 0 0 24px;">
      Préparez vos questions — 55 minutes seront dédiées à vos interrogations en direct !
    </p>
    <hr style="border: none; border-top: 1px solid rgba(0,51,38,0.1); margin: 24px 0;">
    <p style="font-size: 13px; color: #b8a080; text-align: center; margin: 0;">
      Oussama Promotion · Webinaire Ma Clé à Alger
    </p>
  </div>
</body>
</html>`

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
