# Optional backend

The frontend intentionally runs without a backend.

For production, create a Node.js API with endpoints such as:

- POST /api/orders
- POST /api/reservations
- POST /api/payments/create
- POST /api/payments/webhook
- GET /api/menu

Keep payment secrets and database credentials server-side. Verify payment webhook signatures before marking orders paid.
