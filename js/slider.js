const reviewImages = [
  "images/reviews/ReviewS1.jpeg",
  "images/reviews/ReviewS2.jpeg",
  "images/reviews/ReviewS3.jpeg",
  "images/reviews/ReviewS4.jpeg"
];

let currentReview = 0;

const reviewImage = document.getElementById("reviewImage");
const prevReview = document.getElementById("prevReview");
const nextReview = document.getElementById("nextReview");
const reviewDots = document.getElementById("reviewDots");

function showReview(index) {
  if (!reviewImage) return;

  currentReview = index;

  if (currentReview < 0) currentReview = reviewImages.length - 1;
  if (currentReview >= reviewImages.length) currentReview = 0;

  reviewImage.src = reviewImages[currentReview];

  if (reviewDots) {
    reviewDots.innerHTML = "";

    reviewImages.forEach((img, i) => {
      const dot = document.createElement("span");
      dot.className = "review-dot" + (i === currentReview ? " active" : "");
      dot.onclick = () => showReview(i);
      reviewDots.appendChild(dot);
    });
  }
}

if (prevReview && nextReview) {
  prevReview.onclick = () => showReview(currentReview - 1);
  nextReview.onclick = () => showReview(currentReview + 1);
}

showReview(0);

setInterval(() => {
  showReview(currentReview + 1);
}, 4000);
