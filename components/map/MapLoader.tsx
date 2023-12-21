import Image from "next/image"

const MapLoader = () => {
  return (
    <div className="fixed left-2 md:left-1/2 -translate-x-0 md:-translate-x-1/2 bottom-2 md:bottom-auto md:top-5 p-2 md:p-4 border border-dark bg-light
    rounded-lg flex justify-center items-center gap-2 z-[10]">
      <Image src="/icons/loader.svg" alt="Loader" width={24} height={24} />
      <h2 className="text-sm md:text-lg font-bold">Loading Location...</h2>
    </div>
  )
}

export default MapLoader