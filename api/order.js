import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";



const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export default async function handler(req, res) {


  if (req.method !== "POST") {

    return res.status(405).json({
      success:false,
      message:"Method not allowed"
    });

  }


  try {


    const {
      customer,
      items,
      totals
    } = req.body;



    if (!customer || !items || !totals) {

      return res.status(400).json({

        success:false,

        message:"Invalid order data"

      });

    }



    const orderNumber =
      "ORD-" + Date.now();



    const { data, error } = await supabase

      .from("orders")

      .insert([

        {

          order_number: orderNumber,

          customer_name: customer.name,

          email: customer.email,

          phone: customer.phone,

          address: customer.address,

          items: items,

          total: totals.total,

          status:"Pending"

        }

      ])

      .select()

      .single();



    if(error){

      throw error;

    }
    console.log("Gmail exists:", !!process.env.GMAIL_USER);
try {

  await transporter.sendMail({

    from: process.env.GMAIL_USER,

    to: "joandarczienagebriel@gmail.com",

    subject: `New Order ${orderNumber}`,

    html: `
      <h2>New Order Received</h2>

      <p>
      Order Number:
      ${orderNumber}
      </p>

      <p>
      Customer:
      ${customer.name}
      </p>

      <p>
      Phone:
      ${customer.phone}
      </p>

      <p>
      Address:
      ${customer.address}
      </p>

      <p>
      Total:
      €${totals.total}
      </p>
    `

  });


  console.log("Email sent");


} catch(error){

  console.error("Email error:", error);

}

// 👇 THEN return the response
return res.status(200).json({
  success: true,
  order: data,
});





  } catch(error){


    console.error(error);


    return res.status(500).json({

      success:false,

      message:"Failed to create order"

    });


  }

}