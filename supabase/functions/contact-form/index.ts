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
        JSON.stringify({ 
          error: 'Method not allowed',
          details: 'Only POST requests are allowed'
        }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Parse request body
    let requestData: ContactFormData;
    try {
      requestData = await req.json()
    } catch (parseError) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid JSON',
          details: 'Request body must be valid JSON'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const { name, email, message } = requestData

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields',
          details: 'Name, email, and message are required and cannot be empty'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate field lengths
    if (name.trim().length > 100) {
      return new Response(
        JSON.stringify({ 
          error: 'Name too long',
          details: 'Name must be 100 characters or less'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (email.trim().length > 255) {
      return new Response(
        JSON.stringify({ 
          error: 'Email too long',
          details: 'Email must be 255 characters or less'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (message.trim().length > 5000) {
      return new Response(
        JSON.stringify({ 
          error: 'Message too long',
          details: 'Message must be 5000 characters or less'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
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

    // Get client information for security/analytics
    const clientIP = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    req.headers.get('cf-connecting-ip') ||
                    'unknown'
    const userAgent = req.headers.get('user-agent') || 'unknown'

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables')
      return new Response(
        JSON.stringify({ 
          error: 'Server configuration error',
          details: 'Please try again later'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Check for rate limiting (optional - prevent spam)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { data: recentSubmissions } = await supabase
      .from('contact_submissions')
      .select('id')
      .eq('ip_address', clientIP)
      .gte('created_at', oneHourAgo)

    if (recentSubmissions && recentSubmissions.length >= 5) {
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded',
          details: 'Too many submissions from this IP. Please try again later.'
        }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

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

    // Send email notification (optional)
    try {
      await sendEmailNotification({ 
        name: name.trim(), 
        email: email.trim(), 
        message: message.trim(), 
        submissionId: data.id 
      })
    } catch (emailError) {
      console.error('Email notification failed:', emailError)
      // Don't fail the request if email fails
    }

    // Log successful submission
    console.log(`New contact submission: ${data.id} from ${email.trim()}`)

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

// Email notification function
async function sendEmailNotification(data: ContactFormData & { submissionId: string }) {
  try {
    // Log the submission details
    console.log('New contact form submission received:', {
      id: data.submissionId,
      name: data.name,
      email: data.email,
      messagePreview: data.message.substring(0, 100) + (data.message.length > 100 ? '...' : ''),
      timestamp: new Date().toISOString()
    })
    
    // Optional: Send webhook notification (e.g., to Slack, Discord, etc.)
    const webhookUrl = Deno.env.get('CONTACT_WEBHOOK_URL')
    if (webhookUrl) {
      const webhookPayload = {
        text: `🔔 New Contact Form Submission`,
        attachments: [
          {
            color: '#8b5cf6',
            fields: [
              {
                title: 'Name',
                value: data.name,
                short: true
              },
              {
                title: 'Email',
                value: data.email,
                short: true
              },
              {
                title: 'Message',
                value: data.message.length > 300 ? data.message.substring(0, 300) + '...' : data.message,
                short: false
              },
              {
                title: 'Submission ID',
                value: data.submissionId,
                short: true
              },
              {
                title: 'Time',
                value: new Date().toLocaleString(),
                short: true
              }
            ]
          }
        ]
      }

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookPayload)
      })
    }

    // Optional: Send email using a service like Resend, SendGrid, etc.
    // You can implement this based on your preferred email service
    
  } catch (error) {
    console.error('Notification sending failed:', error)
    // Don't throw error to avoid failing the main request
  }
}