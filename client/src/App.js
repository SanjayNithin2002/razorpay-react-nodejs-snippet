import logo from './logo.svg';
import './App.css';

function loadScript(src) {
  return new Promise(resolve => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

function App() {

  async function displayRazorpay() {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    if (!res) {
      alert("Razorpay SDK failed to load")
    }
    const data = (await fetch('http://localhost:1337/razorpay', { method: 'POST' }));
    const apiData = await data.json();
    const options = {
      "key": "rzp_test_73wohYapKBYpbR",
      "amount": apiData.amount,
      "currency": apiData.currency,
      "name": "10x Corp.",
      "description": "10x Developers",
      "image": "https://www.freepnglogos.com/uploads/black-logo-batman-png-1.png",
      "order_id": apiData.id,
      "handler": function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
      },
      "prefill": {
        "name": "Sanjay Nithin"
      },
      "theme" : {
        "color" : "#000000"
      }
    };
    console.log(options)
    var paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          onClick={displayRazorpay}
          target="_blank"
          rel="noopener noreferrer"
        >
          Donate 5 INR
        </a>
      </header>
    </div>
  );
}

export default App;
