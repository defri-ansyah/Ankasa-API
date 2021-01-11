require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = process.env.DB_PORT || 3000
const bodyParser = require('body-parser')
var cors = require('cors')
const routes = require('./src/routes/index')
const response = require('./src/helpers/response');
const cron = require('node-cron');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/images', express.static('./uploads'))

// routes
app.use('/api', routes)

// error handling
app.use((err, req, res, next) => {
  response(res, null, { status: err.status || 'Failed', statusCode: err.statusCode || 400 }, { message: err.message })
})

const ticketingController = require('./src/controllers/ticketingControllers');
const midtransClient = require('midtrans-client');
// Create Core API instance
const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

let parameter = {
  "payment_type": "bank_transfer",
  "transaction_details": {
    "gross_amount": 44000,
    "order_id": "order-101c-{{$timestamp}}"
  },
  "customer_details": {
    "email": "noreply@example.com",
    "first_name": "budi",
    "last_name": "utomo",
    "phone": "+6281 1234 1234"
  },
  "item_details": [
    {
      "id": "item01",
      "price": 21000,
      "quantity": 1,
      "name": "Ayam Zozozo"
    },
    {
      "id": "item02",
      "price": 23000,
      "quantity": 1,
      "name": "Ayam Xoxoxo"
    }
  ],
  "bank_transfer": {
    "bank": "bca",
    "va_number": "12345678901",
    "free_text": {
      "inquiry": [
        {
          "id": "Your Custom Text in ID language",
          "en": "Your Custom Text in EN language"
        }
      ],
      "payment": [
        {
          "id": "Your Custom Text in ID language",
          "en": "Your Custom Text in EN language"
        }
      ]
    }
  }
};

// charge transaction
// coreApi.charge(parameter)
//   .then((chargeResponse) => {
//     console.log('chargeResponse:');
//     console.log(chargeResponse);
//   });

cron.schedule('* * * * *', () => {
  console.log('background process running')
  ticketingController.confrimPayment(coreApi)

}).start()

app.listen(PORT, () => console.log(`server is running port ${PORT}
http://localhost:${PORT}`))
