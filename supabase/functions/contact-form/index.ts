import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Parse request body
    const { name, email, message }: ContactFormData = await req.json()

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields',
          details: 'Name, email, and message are required'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid email format',
          details: 'Please provide a valid email address'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get client IP and User Agent for security/analytics
    const clientIP = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    'unknown'
    const userAgent = req.headers.get('user-agent') || 'unknown'

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Insert contact submission into database
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        message: message.trim(),
        ip_address: clientIP,
        user_agent: userAgent,
        status: 'new'
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to save submission',
          details: 'Please try again later'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Send email notification (optional - you can configure this later)
    try {
      await sendEmailNotification({ name, email, message, submissionId: data.id })
    } catch (emailError) {
      console.error('Email notification failed:', emailError)
      // Don't fail the request if email fails
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Thank you for your message! I\'ll get back to you soon.',
        submissionId: data.id
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: 'Something went wrong. Please try again later.'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

// Email notification function (you can customize this)
async function sendEmailNotification(data: ContactFormData & { submissionId: string }) {
  // You can integrate with services like:
  // - Resend
  // - SendGrid
  // - Mailgun
  // - Or use Supabase's built-in email service
  
  console.log('New contact form submission:', {
    id: data.submissionId,
    name: data.name,
    email: data.email,
    message: data.message.substring(0, 100) + '...'
  })
  
  // Example with a simple webhook notification
  // You can replace this with your preferred email service
  try {
    // This is just a placeholder - implement your email service here
    const webhookUrl = Deno.env.get('CONTACT_WEBHOOK_URL')
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `New contact form submission from ${data.name} (${data.email}): ${data.message}`,
          submissionId: data.submissionId
        })
      })
    }
  } catch (error) {
    console.error('Webhook notification failed:', error)
  }
}