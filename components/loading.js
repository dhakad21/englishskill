export default function Loading(){
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="relative w-20 h-20">

    <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>


    <div className="absolute top-2 left-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] border-4 border-transparent border-t-purple-500 rounded-full animate-spin-reverse"></div>


    <div className="absolute top-4 left-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] border-4 border-transparent border-t-green-500 rounded-full animate-spin-slow"></div>
  </div>
</div>
    )
}