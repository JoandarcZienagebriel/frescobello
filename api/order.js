import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);



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
await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "pedromagri850@gmail.com",
  subject: `New Order ${orderNumber}`,
  html: `<h2>You have a new order!</h2>`,
});

// 👇 THEN return the response
return res.status(200).json({
  success: true,
  order: data,
});


    return res.status(200).json({

      success:true,

      order:data

    });



  } catch(error){


    console.error(error);


    return res.status(500).json({

      success:false,

      message:"Failed to create order"

    });


  }

}