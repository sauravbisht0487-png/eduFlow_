import Stripe from 'stripe';
import Purchase from '../models/Purchase.js';
import User from '../models/User.js';
import Course from '../models/Course.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// API controller function to manage Stripe webhooks
const stripeWebhooks = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const { purchaseId, courseId, userId } = session.metadata;

      try {
        const purchase = await Purchase.findById(purchaseId);
        if (purchase && purchase.status === 'pending') {
          purchase.status = 'completed';
          await purchase.save();

          await User.findByIdAndUpdate(userId, {
            $addToSet: { enrolledCourses: courseId },
          });

          await Course.findByIdAndUpdate(courseId, {
            $addToSet: { enrolledStudents: userId },
          });
        }
        res.json({ success: true });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
      }
      break;
    }

    default:
      res.json({ success: true });
      break;
  }
};

export default stripeWebhooks;