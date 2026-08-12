import React, { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "react-toastify";

const Rating = ({ courseId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    if (review.trim() === "") {
      toast.error("Please write a review");
      return;
    }

    // TODO: replace with your API call
    console.log("Submitting rating:", { courseId, rating, review });

    toast.success("Rating submitted");
    setRating(0);
    setReview("");
  };

  return (
    <div className="border rounded p-4 mt-6 max-w-xl">
      <h3 className="text-lg font-medium mb-3">Rate this course</h3>

      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={24}
            className="cursor-pointer"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            fill={(hover || rating) >= star ? "#f5c518" : "none"}
            color={(hover || rating) >= star ? "#f5c518" : "#9ca3af"}
          />
        ))}
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
        rows={4}
        className="w-full border rounded p-2 text-sm mb-3"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
};

export default Rating;