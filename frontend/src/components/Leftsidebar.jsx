import React from "react";

function LeftSideBar() {
  return (
    <>
      <div className="relative col-start-1 row-span-full row-start-1 max-lg:hidden">
        <div className="sticky top-14.25 bottom-0 left-0 h-full max-h-[calc(100dvh-3.5rem)] w-2xs overflow-y-auto p-6">
          <div>
            <nav className="flex flex-col gap-8">
              <ul className="flex flex-col gap-2 text-blue-300">
                <li>Document</li>
                <li>Component</li>
                <li>Template</li>
                <li>Community</li>
              </ul>
              <div className="flex flex-col gap-3">
                <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-lg/6">
                  Getting Started
                </h3>
                <ul className="flex flex-col gap-2 border-l border-gray-200/25 text-blue-400 text-sm/7">
                  <li className="-ml-px flex flex-col items-start gap-2">
                    <p className="inilne-block pl-5 border-l border-transparent hover:border-white/25">
                      Item-1
                    </p>
                  </li>
                  <li className="-ml-px flex flex-col items-start gap-2">
                    <p className="inilne-block pl-5 border-l border-transparent hover:border-white/25">
                      Item-2
                    </p>
                  </li>
                  <li className="-ml-px flex flex-col items-start gap-2">
                    <p className="inilne-block pl-5 border-l border-transparent hover:border-white/25">
                      Item-3
                    </p>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6">
                  Core Concepts
                </h3>
                <ul className="flex flex-col gap-2 border-l border-gray-200/25 text-blue-400 text-sm/7">
                  <li className="-ml-px flex flex-col items-start gap-2">
                    <p className="inilne-block pl-5 border-l border-transparent hover:border-white/25">
                      Item-1
                    </p>
                  </li>
                  <li className="-ml-px flex flex-col items-start gap-2">
                    <p className="inilne-block pl-5 border-l border-transparent hover:border-white/25">
                      Item-2
                    </p>
                  </li>
                  <li className="-ml-px flex flex-col items-start gap-2">
                    <p className="inilne-block pl-5 border-l border-transparent hover:border-white/25">
                      Item-3
                    </p>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftSideBar;
