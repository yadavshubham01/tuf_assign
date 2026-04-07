/**
 * ImageBanner Component - Dynamic Calendar Hero Section
 *
 * Displays a contextual image based on the current month and the calendar dynamically.
 *
 * Features:
 * - Dynamic image selection per month
 * - Overlay styling with gradient and month/year display
 * - Smooth image scaling animation on hover
 *
 * Props:
 * @param {Object} currentDate - Contains { month, year }
 *
 */

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const images = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
];

const ImageBanner = ({ currentDate }) => {
  const imageIdx = currentDate.month % images.length;
  const selectedImage = images[imageIdx];

  return (
    <div className="relative h-60 overflow-hidden">

      <img
        src={selectedImage}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />

      {/* BLUE SHAPE OVERLAY */}
     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

      {/* TEXT */}
      <div className="absolute bottom-6 right-6 text-white text-right drop-shadow-lg">
        <p className="text-sm">{currentDate.year}</p>
        <h2 className="text-xl font-bold">
          {months[currentDate.month]}
        </h2>
      </div>
    </div>
  );
};

export default ImageBanner;