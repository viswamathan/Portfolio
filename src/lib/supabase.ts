import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for contact form
export interface ContactSubmission {
  id: string
  name: string
  email: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  ip_address?: string
  user_agent?: string
  created_at: string
  updated_at: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

// Enhanced contact form submission function with better error handling
export async function submitContactForm(data: ContactFormData) {
  try {
    // Validate input data
    if (!data.name?.trim()) {
      throw new Error('Name is required')
    }
    if (!data.email?.trim()) {
      throw new Error('Email is required')
    }
    if (!data.message?.trim()) {
      throw new Error('Message is required')
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email.trim())) {
      throw new Error('Please enter a valid email address')
    }

    // Call the edge function
    const response = await fetch(`${supabaseUrl}/functions/v1/contact-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        message: data.message.trim(),
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || result.details || 'Failed to submit form')
    }

    return {
      success: true,
      message: result.message || 'Thank you for your message! I\'ll get back to you soon.',
      submissionId: result.submissionId
    }
  } catch (error) {
    console.error('Contact form submission error:', error)
    
    // Return user-friendly error messages
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('Failed to send message. Please try again later.')
    }
  }
}

// Admin function to get all contact submissions (requires authentication)
export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching submissions:', error)
      throw new Error('Failed to fetch contact submissions')
    }

    return data || []
  } catch (error) {
    console.error('Error in getContactSubmissions:', error)
    throw error
  }
}

// Admin function to update submission status
export async function updateSubmissionStatus(id: string, status: ContactSubmission['status']): Promise<ContactSubmission> {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating submission status:', error)
      throw new Error('Failed to update submission status')
    }

    return data
  } catch (error) {
    console.error('Error in updateSubmissionStatus:', error)
    throw error
  }
}

// Function to get submission statistics
export async function getSubmissionStats() {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('status')

    if (error) {
      throw new Error('Failed to fetch submission statistics')
    }

    const stats = {
      total: data.length,
      new: data.filter(s => s.status === 'new').length,
      read: data.filter(s => s.status === 'read').length,
      replied: data.filter(s => s.status === 'replied').length,
      archived: data.filter(s => s.status === 'archived').length,
    }

    return stats
  } catch (error) {
    console.error('Error getting submission stats:', error)
    throw error
  }
}

// Function to delete a submission (admin only)
export async function deleteSubmission(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error('Failed to delete submission')
    }
  } catch (error) {
    console.error('Error deleting submission:', error)
    throw error
  }
}

// Function to test database connection
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('count')
      .limit(1)

    return !error
  } catch (error) {
    console.error('Database connection test failed:', error)
    return false
  }
}