
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
        className="w-full h-full object-cover"
      />

      {/* BLUE SHAPE OVERLAY */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-[var(--primary)] clip-shape"></div>

      {/* TEXT */}
      <div className="absolute bottom-6 right-6 text-white text-right">
        <p className="text-sm">{currentDate.year}</p>
        <h2 className="text-xl font-bold">
          {months[currentDate.month]}
        </h2>
      </div>
    </div>
  );
};

export default ImageBanner;