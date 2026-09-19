# VIMA Restaurant Demo

A responsive React + Vite + TypeScript demonstration website for VIMA, an Indian restaurant concept in Sikar, Rajasthan.

## Important demo status

This project intentionally uses illustrative content. The supplied specification identifies the address, menu, reviews, Google link and business details as demo/placeholder information. Replace and verify all production details before launch.

### Works locally
- Responsive navigation
- Hero, About, Menu, Gallery, Reviews, Contact
- Menu search and category filtering
- Add/remove cart quantities
- Demo checkout with delivery/takeaway selection
- Demo payment state
- Reservation form validation and WhatsApp message preparation
- WhatsApp links
- Google Maps search/directions link
- Gallery lightbox
- Dynamic footer year

### Simulated / not live
- Payment processing is simulated. No card details are collected.
- Orders are not actually created or accepted.
- Reservations do not check live availability and are not confirmed.
- Google link is a search link, not a verified VIMA listing.
- Reviews are fictional demo testimonials.
- Restaurant address is an illustrative demo location.
- Images are illustrative web images in this starter. Replace them with generated/licensed assets before production.

## Run

```bash
npm install
npm run dev
```

Then open the Vite local URL shown in the terminal.

For a production build:

```bash
npm run build
npm run preview
```

## AI image prompts

Use these prompts with an image generator and save the resulting files under `public/assets/`:

1. **Hero:** "Premium Indian restaurant interior in Rajasthan, warm amber lighting, carved sandstone arches, subtle jaali patterns, ivory walls, deep maroon textiles, elegant dining tables, cinematic food photography, photorealistic, no text, no logos, 16:9."
2. **Paneer:** "Indian paneer tikka on a refined brass serving plate, charcoal grill marks, coriander garnish, warm restaurant lighting, premium food photography, photorealistic, no text, no logos."
3. **Biryani:** "Fragrant vegetable biryani in a traditional copper handi, saffron rice, herbs, elegant Indian table setting, warm natural light, premium food photography, no text, no logos."
4. **Interior:** "Traditional Rajasthani-inspired Indian restaurant dining room, arches, subtle geometric jaali, warm cream and maroon palette, brass accents, welcoming premium ambience, photorealistic, no people, no text."

## Production backend proposal

For a real deployment:
- Node.js + Express/Fastify API
- PostgreSQL for menu, customers, orders and reservations
- Server-side payment integration such as Stripe/Razorpay test mode first
- Payment webhooks to verify payment status server-side
- Restaurant admin dashboard
- Rate limiting, validation, CSRF/CORS policy and audit logging
- WhatsApp Business API if automated messaging is required

Never expose secret payment keys in the browser. Use environment variables on the server.

## Production checklist

1. Replace demo address, phone and hours with verified business details.
2. Replace sample menu and prices with the real menu.
3. Replace all demo reviews with verified reviews or remove them.
4. Replace Google Maps search with the verified business listing URL when available.
5. Add verified social accounts and email.
6. Replace illustrative images with generated/licensed restaurant assets.
7. Add a real backend for orders/reservations.
8. Configure payment provider test mode and webhooks.
9. Add a real sitemap domain.
10. Replace Restaurant structured data only with verified facts; do not add aggregateRating unless based on eligible, verifiable data.
