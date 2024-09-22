import { useState } from 'react';
import Reviews from '../../features-user/reviews/Reviews';
import Spinner from '../../ui/Spinner';
function MyReviews() {
  // nhung review ve tour da tham gia
  const [showReviews, setShowReviews] = useState(true);

  const handleReload = () => {
    // Unmount and remount the component by toggling the state
    setShowReviews(false);
    setTimeout(() => setShowReviews(true), 1000); // Re-mount after a delay
  };
  if(!showReviews) return <Spinner />
  return <>{showReviews && <Reviews onSetKey={handleReload} />}</>;
}

export default MyReviews;
