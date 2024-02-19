import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51Ol9U6GRJOWh2mEmKYzNNcfW9yYtvCxcgTllRP26CIR7ml2xY0VmodDaBkpVHldO1ZC0rSleJ26T37tOaqFh1YdU00pHy7BPW9'
);

export default async function stripehandler(cartItems) {
  try {
    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      line_items: cartItems.map((item) => {
        const img = item.image[0].asset._ref;
        const newImage = img
          .replace(
            'image-',
            'https://cdn.sanity.io/images/vfxfwnaw/production/'
          )
          .replace('-webp', '.webp');

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${window.location.origin}/success`,
      cancel_url: `${window.location.origin}/failed`,
    };

    const session = await stripe.checkout.sessions.create(params);
    return session;
  } catch (err) {
    return err;
  }
}
