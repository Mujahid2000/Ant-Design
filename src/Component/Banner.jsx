import { Button } from 'antd';


const Banner = () => {
    return (
        <div>
           <main className="top-9 bg-white relative overflow-hidden h-screen">
    <header className="h-24 sm:h-32 flex items-center z-30 w-full">
       
    </header>
    <div className="bg-white top-9 flex relative z-20 items-center overflow-hidden">
        <div className="container mx-auto px-6 flex relative py-16">
            <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
                <span className="w-20 h-2 top-9 bg-white mb-12">
                </span>
                <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none  text-gray-800">
                    Be on
                    <span className="text-5xl sm:text-7xl">
                        Time
                    </span>
                </h1>
                <p className="text-sm sm:text-base text-gray-700 ">
                    Dimension of reality that makes change possible and understandable. An indefinite and homogeneous environment in which natural events and human existence take place.
                </p>
                <div className="flex mt-8">
                    <Button  className="uppercase py-5 text-base px-4 rounded-lg bg-[#24a8ff] border-2 border-transparent text-white text-md mr-4 hover:bg-[#24a8ff]">
                        Get started
                    </Button>
                    <Button
                type="textHoverBg"
                className="uppercase py-5 px-7 text-base rounded-lg border-[#24a8ff] border-2 text-[#24a8ff] text-md mr-4 hover:bg-[#24a8ff] hover:text-white"
                >
                Read more
                </Button>
                </div>
            </div>
            <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
                <img src="https://www.tailwind-kit.com/images/object/10.png" className="max-w-xs md:max-w-sm m-auto"/>
            </div>
        </div>
    </div>
</main>
        </div>
    );
};

export default Banner;