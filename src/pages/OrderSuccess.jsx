import { useLocation } from "react-router-dom";


export default function OrderSuccess(){

const location = useLocation();

const orderNumber =
location.state?.orderNumber;


return (

<div className="min-h-screen flex items-center justify-center">

<div className="text-center">

<h1 className="text-4xl font-bold">
Thank You 🎉
</h1>


<p className="mt-4">
Your order has been received.
</p>


{
orderNumber &&
<p className="mt-2">
Order Number: {orderNumber}
</p>
}


</div>

</div>

);

}