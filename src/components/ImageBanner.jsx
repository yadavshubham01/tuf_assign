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
   "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80",
   "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHw4fHxtb3VudGFpbnN8ZW58MHx8fHwxNzc1NzE0NTk1fDA&ixlib=rb-4.1.0&w=800&fit=max&q=80",
   "https://images.unsplash.com/photo-1434394354979-a235cd36269d?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxMXx8bW91bnRhaW5zfGVufDB8fHx8MTc3NTcxNDU5NXww&ixlib=rb-4.1.0&w=800&fit=max&q=80",
   "https://images.unsplash.com/photo-1566679056462-2075774c8c07?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxMnx8bW91bnRhaW5zfGVufDB8fHx8MTc3NTcxNDU5NXww&ixlib=rb-4.1.0&w=800&fit=max&q=80",
   "https://images.unsplash.com/photo-1530075288903-69b220251c3e?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHxzdHJlZXRzfGVufDB8fHx8MTc3NTcxNDczNXww&ixlib=rb-4.1.0&w=800&fit=max&q=80",
   "https://images.unsplash.com/photo-1525095182007-3874c4e2b38b?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxMHx8c3RyZWV0c3xlbnwwfHx8fDE3NzU3MTQ3MzZ8MA&ixlib=rb-4.1.0&w=800&fit=max&q=80",
   "https://images.unsplash.com/photo-1620563204920-ea65cb792533?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHxqYWlwdXIlMjBzdHJlZXRzfGVufDB8fHx8MTc3NTcxNDc3Nnww&ixlib=rb-4.1.0&w=800&fit=max&q=80",
   "https://images.unsplash.com/photo-1669825790379-13171c32735a?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxMnx8dWRhaXB1ciUyMHN0cmVldHN8ZW58MHx8fHwxNzc1NzE0ODEyfDA&ixlib=rb-4.1.0&w=800&fit=max&q=80",
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