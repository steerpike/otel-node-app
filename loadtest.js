import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 }, // ramp up to 10 users
    { duration: '4m', target: 20 },  // stay at 20 users
    { duration: '30s', target: 0 },  // ramp down to 0 users
  ],
};

let lastSpecial = 0;
let specialSentThisMinute = 0;

export default function () {
  const now = Math.floor(__ITER / __VU); // approximate minute bucket
  if (now !== lastSpecial) {
    // New minute, reset counter
    lastSpecial = now;
    specialSentThisMinute = 0;
  }

  // Send 1 or 2 requests with user_id=10 per minute
  if (specialSentThisMinute < 2 && Math.random() < 0.05) {
    http.get('http://localhost:3000/api?user_id=10');
    specialSentThisMinute++;
  } else {
    http.get('http://localhost:3000/api');
  }

  sleep(1);
}
