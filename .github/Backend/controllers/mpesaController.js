import Order from '../models/Order.js';

export const mpesaCallback = async (req, res) => {
  const body = req.body.Body.stkCallback;
  const status = body.ResultCode === 0;
  const amount = body.CallbackMetadata.Item.find(i => i.Name === 'Amount').Value;
  const phone = body.CallbackMetadata.Item.find(i => i.Name === 'PhoneNumber').Value;

  // Create order only on success
  if (status && req.pendingOrder) {
    const order = await Order.create({
      user: req.pendingOrder.user,
      items: req.pendingOrder.items,
      totalAmount: amount,
      isPaid: true,
      paidAt: new Date()
    });
    // Send confirmation email
    await sendEmail({ to: req.pendingOrder.email, subject: 'Payment Received', text: `Your order ${order._id} is confirmed.` });
  }
  res.sendStatus(200);
};
