import NotFound from "/NotFound.webp";

export default function Notfound() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black">
      <img src={NotFound} alt="Not Found" className="w-[50%] object-cover" />
    </div>
  );
}
