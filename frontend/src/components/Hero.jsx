
function Hero () {

    return (
    <>
        <div className="wrapper mx-8">
            <div className="container_1 grid grid-cols-12 grid-rows-4 gap-y-2">
                <div className="row-span-1 md:row-span-2 col-span-9">
                    <p className="text-green-400 text-[2rem] sm:text-[4rem] py-7">
                        Smart Spending Starts Here - Manage, Save, and Grow!
                    </p>
                </div>
                <div className="row-start-3 col-start-4 col-span-9">
                    <p className="text-purple-400 text-[2rem] sm:text-[3rem]">
                        Get clear insights into your spending habits 
                        and make smarter financial decisions.
                    </p>
                </div>
                <div className="mt-4 col-span-9">
                    <p className="text-green-400 text-md sm:text-5xl">
                        Get started it's
                        <span className="pl-2 text-white text-6xl font-medium italic underline decoration-green-600 underline-offset-4">
                             FREE..
                        </span>
                    </p>
                </div>
                <div className="min-h-[100px] col-start-8 col-span-6">
                    <p className="px-8 text-end text-xl sm:text-4xl">
                        You'r <span className="italic bg-green-400 rounded-lg px-2 bg-opacity-50 indent-4">$</span> is here
                    </p>
                </div>
            </div>
        </div>
    </>
    );
}

export default Hero;