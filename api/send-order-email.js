import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const order = req.body;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "pedromagri850@gmail.com",
      subject: `New Order #${order.id}`,
      html: `
        <h2>New Order</h2>

        <p><b>Name:</b> ${order.name}</p>
        <p><b>Phone:</b> ${order.phone}</p>
        <p><b>Total:</b> ${order.total}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);

    return res.status(500).json({ error: err.message });
  }
}