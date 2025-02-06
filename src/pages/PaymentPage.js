import { React, useState } from 'react';
import TopBar from '../components/top-bar';
import Footer from '../components/Footer';
import { toast } from 'react-hot-toast';

const PaymentPage = () => {
    const [paymentMethods, setPaymentMethods] = useState([
      { id: 1, type: "Credit Card", last4: "1234", expiry: "12/25" },
      { id: 2, type: "PayPal", email: "nate@example.com" },
    ]);
  
    const [newPayment, setNewPayment] = useState({
      type: "",
      details: "",
    });
  
    const handleAddPayment = () => {
      setPaymentMethods([
        ...paymentMethods,
        { id: paymentMethods.length + 1, type: newPayment.type, ...newPayment.details },
      ]);
      setNewPayment({ type: "", details: "" });
    };
  
    const handleDeletePayment = (id) => {
      setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
    };
  
    const [cardDetails, setCardDetails] = useState({
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      cardholderName: '',
      country: 'Palestinian Territories',
      addressLine1: '',
      addressLine2: '',
      city: ''
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCardDetails({ ...cardDetails, [name]: value });
    };

    const validateCardDetails = (details) => {
      const errors = {};
      if (!details.cardNumber) errors.cardNumber = 'Card number is required';
      if (!details.cardholderName) errors.cardholderName = 'Cardholder name is required';
      // Add more validations
      return errors;
    };

    const handlePaymentSubmission = async (cardDetails) => {
      try {
        // Add payment processing logic here
        return true;
      } catch (error) {
        toast.error('Payment processing failed');
        return false;
      }
    };
  
    return (
      <div>
      <TopBar/>
      








      <div className="bg-white shadow-md rounded-lg p-6 my-6 mx-auto w-1/2">
        <h2 className="text-2xl font-bold mb-4">طرق الدفع</h2>
        
        {/* قائمة طرق الدفع */}
        <ul>
          {paymentMethods.map((method) => (
            <li key={method.id} className="flex justify-between items-center p-4 border-b">
              <div>
                <p className="font-semibold">{method.type}</p>
                {method.type === "Credit Card" && (
                  <p>Card ending in {method.last4} (Expiry: {method.expiry})</p>
                )}
                {method.type === "PayPal" && <p>Email: {method.email}</p>}
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleDeletePayment(method.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
  
        {/* إضافة طريقة دفع جديدة */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">أضف طريقة دفع</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
            <select
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={newPayment.type}
              onChange={(e) => setNewPayment({ ...newPayment, type: e.target.value })}
            >
              <option value="">Select a payment type</option>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>
  










          {/* إدخال تفاصيل بطاقة الائتمان */}
          {newPayment.type === "Credit Card" && (
           <div className="max-w-md  bg-white  p-6 my-4">
           <h2 className="text-xl font-bold mb-4">Payment Method</h2>
     
           {/* Card Information */}
           <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700">Card Information</label>
             <input
               type="text"
               name="cardNumber"
               placeholder="1234 1234 1234 1234"
               maxLength="19"
               className="block w-full mt-2 p-2 border rounded-md"
               value={cardDetails.cardNumber}
               onChange={handleInputChange}
             />
             <div className="flex space-x-2 mt-2">
               <input
                 type="text"
                 name="expiryDate"
                 placeholder="MM / YY"
                 maxLength="5"
                 className="w-1/2 p-2 border rounded-md"
                 value={cardDetails.expiryDate}
                 onChange={handleInputChange}
               />
               <input
                 type="text"
                 name="cvc"
                 placeholder="CVC"
                 maxLength="3"
                 className="w-1/2 p-2 border rounded-md"
                 value={cardDetails.cvc}
                 onChange={handleInputChange}
               />
             </div>
           </div>
     
           {/* Cardholder Name */}
           <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
             <input
               type="text"
               name="cardholderName"
               placeholder="Full name on card"
               className="block w-full mt-2 p-2 border rounded-md"
               value={cardDetails.cardholderName}
               onChange={handleInputChange}
             />
           </div>
     
           {/* Billing Address */}
           <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700">Billing Address</label>
             <select
               name="country"
               className="block w-full mt-2 p-2 border rounded-md"
               value={cardDetails.country}
               onChange={handleInputChange}
             >
               <option value="Palestinian Territories">Palestinian Territories</option>
               <option value="United States">United States</option>
               <option value="Canada">Canada</option>
               <option value="United Kingdom">United Kingdom</option>
               {/* Add more countries as needed */}
             </select>
             <input
               type="text"
               name="addressLine1"
               placeholder="Address line 1"
               className="block w-full mt-2 p-2 border rounded-md"
               value={cardDetails.addressLine1}
               onChange={handleInputChange}
             />
             <input
               type="text"
               name="addressLine2"
               placeholder="Address line 2"
               className="block w-full mt-2 p-2 border rounded-md"
               value={cardDetails.addressLine2}
               onChange={handleInputChange}
             />
             <input
               type="text"
               name="city"
               placeholder="City"
               className="block w-full mt-2 p-2 border rounded-md"
               value={cardDetails.city}
               onChange={handleInputChange}
             />
           </div>
     
           {/* Submit Button */}
           <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-4" 
           onChange={(e) => setNewPayment({ ...newPayment, details: { last4: newPayment.details.last4, expiry: e.target.value } })}
           >
             Confirm Payment
           </button>
         </div>
          )}
  










          {/* إدخال تفاصيل PayPal */}
          {newPayment.type === "PayPal" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">PayPal Email</label>
              <input
                type="email"
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="email@example.com"
                value={newPayment.details.email || ""}
                onChange={(e) => setNewPayment({ ...newPayment, details: { email: e.target.value } })}
              />
            </div>
          )}
  










          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleAddPayment}
          >
            Add Payment Method
          </button>
        </div>
      </div>








      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Footer/>
      </div>
    );
  };

 

  export default PaymentPage;