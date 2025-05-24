import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const brevoApiKey = process.env.BREVO_API_KEY

    if (!brevoApiKey) {
      console.error("BREVO_API_KEY is not configured")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    // Send email using Brevo API
    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        sender: {
          name: "Portfolio Contact Form",
          email: "noreply@portfolio.com",
        },
        to: [
          {
            email: "adithyaj2910@gmail.com",
            name: "Adithya Parambil",
          },
        ],
        replyTo: {
          email: email,
          name: name,
        },
        subject: `New Contact Form Submission from ${name}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1e1b4b, #312e81); color: white; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #8b5cf6; margin: 0;">New Contact Form Submission</h1>
              <p style="color: #a78bfa; margin: 5px 0;">From your portfolio website</p>
            </div>
            
            <div style="background: rgba(139, 92, 246, 0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #8b5cf6; margin-bottom: 20px;">
              <h3 style="color: #8b5cf6; margin: 0 0 15px 0;">Contact Details</h3>
              <p style="margin: 8px 0;"><strong style="color: #a78bfa;">Name:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong style="color: #a78bfa;">Email:</strong> ${email}</p>
            </div>
            
            <div style="background: rgba(6, 182, 212, 0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #06b6d4;">
              <h3 style="color: #06b6d4; margin: 0 0 15px 0;">Message</h3>
              <p style="line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(139, 92, 246, 0.3);">
              <p style="color: #a78bfa; font-size: 14px; margin: 0;">
                This email was sent from your portfolio contact form.<br>
                Reply directly to this email to respond to ${name}.
              </p>
            </div>
          </div>
        `,
        textContent: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

---
This email was sent from your portfolio contact form.
Reply directly to this email to respond to ${name}.
        `,
      }),
    })

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.text()
      console.error("Brevo API error:", errorData)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
