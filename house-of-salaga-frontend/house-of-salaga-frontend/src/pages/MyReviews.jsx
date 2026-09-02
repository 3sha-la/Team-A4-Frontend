import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let active = true;
    apiFetch('/reviews/my-reviews', { auth: true })
      .then((data) => {
        if (active) setReviews(data.reviews || []);
      })
      .catch(() => {
        if (active) setReviews([]);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="flex-1 bg-[#f6f3ee] px-5 py-7 sm:px-8 sm:py-10 lg:px-12">
      <div className="border-b border-[#e7e0d5] pb-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a8780c]">Your feedback</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-[#28231d] sm:text-4xl">Reviews & Ratings</h1>
        <p className="mt-2 text-sm leading-6 text-[#81796d]">View the product reviews you have submitted.</p>
      </div>

      <div className="mt-8 space-y-4">
        {reviews.length === 0 ? (
          <div className="border border-dashed border-[#d8cdbd] bg-white/40 px-6 py-14 text-center text-sm text-[#81796d]">
            You have not submitted any reviews yet.
          </div>
        ) : (
          reviews.map((item) => (
            <div key={item._id} className="rounded-lg border border-[#d8d5cf] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a09483]">{item.product?.name || 'Product'}</p>
                  <p className="mt-1 font-serif text-lg text-[#28231d]">{'★'.repeat(item.rating || 0)}{'☆'.repeat(Math.max(0, 5 - (item.rating || 0)))}</p>
                  <p className="mt-2 text-sm text-[#6c675e]">{item.review}</p>
                </div>
                <span className="rounded-full border border-[#d8cdbd] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#6c675e]">{item.status}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
