import React from "react";
// import { useLocation } from 'react-dom';

function MainSection() {
  // const location = useLocation();
  return (
    <>
      <div className="relative row-start-1 grid grid-cols-subgrid lg:col-start-3">
        <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-10 xl:max-w-5xl xl:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="px-4 pt-10 pb-24 sm:px-6 xl:pr-0">
            <p className="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase">
              Layout
            </p>
            <h1 className="mt-2 text-3xl font-medium tracking-tight text-white">
              Isolation
            </h1>
            <p className="mt-6 text-base/7 text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              tempus rhoncus lectus ac cursus. Praesent tempus lectus massa. Sed
              finibus sit amet eros et pretium. Nam eget mattis mi. Nunc in quam
              quis sem lacinia interdum nec et tortor. Aliquam vel tortor quis
              nulla rhoncus pellentesque. Phasellus aliquam fringilla nisi, sed
              sagittis lectus tempor eu. Morbi dignissim molestie ex, eget
              imperdiet tellus convallis egestas. Etiam tincidunt mattis cursus.
              Suspendisse et elementum turpis. Vestibulum ut imperdiet nisi, nec
              fringilla risus. Sed eget justo libero. Vestibulum elit odio,
              congue non sagittis in, scelerisque vel quam. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. In hac habitasse platea
              dictumst.
            </p>
            <div className="prose mt-10">
              <div
                id="quick-reference"
                className="not-prose relative isolate scroll-mt-16"
              >
                <div className="w-full overflow-x-auto whitespace-nowrap">
                  <table className="grid w-full grid-cols-[auto_auto] border-b border-white/10">
                    <thead className="col-span-2 grid grid-cols-subgrid">
                      <tr className="col-span-2 grid grid-cols-subgrid">
                        <th className="px-2 py-3 text-left text-sm/7 font-semibold text-white">
                          Class
                        </th>
                        <th className="px-2 py-3 text-left text-sm/7 font-semibold text-white">
                          Styles
                        </th>
                      </tr>
                    </thead>
                    <tbody className="col-span-2 grid grid-cols-subgrid border-t border-white/10">
                      <tr className="col-span-2 grid grid-cols-subgrid not-last:border-b not-last:border-white/10 text-white">
                        <td className="p-2 align-top font-mono text-xs/6 font-medium text-sky-400">
                          <code>z-index</code>
                        </td>
                        <td className="p-2 align-top font-mono text-xs/6 font-medium text-violet-400">
                          <div className="*:whitespace-pre!">
                            <code>
                              {"z-index: "}
                              <var classname="font-normal italic opacity-100">
                                {"<number>"}
                              </var>
                              {";"}
                            </code>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* Right Side bar */}
          <div className="max-xl:hidden text-white">
            <div className="sticky top-14 max-h-[calc(100svh-3.5rem)] overflow-x-hidden px-6 pt-10 pb-24">
              <div className="flex flex-col gap-3">
                <h3 className="font-moon text-sm/6 font-medium tracking-widest text-gray-400 uppercase sm:text-xs/6">
                  on this page
                </h3>
                <ul className="flex flex-col gap-2 border-l border-[color-mix(in_oklab,var(--color-gray-950),white_20%)]">
                  <li className="-ml-px flex flex-col items-start gap-2">
                    <p
                      className={`inline-block border-l border-transparent text-base/8 sm:text-sm/6 text-gray-300 hover:border-white/25 hover:text-white aria-[current=location]:text-blue-400 aria-[current=location]:font-semibold pl-5 sm:pl-4 aria-[current=location]:border-white`}
                      aria-current="location"
                    >
                      Jasmeet
                    </p>
                  </li>
                  <li className="-ml-px flex flex-col items-start gap-2">
                    <p
                      className={`inline-block border-l border-transparent text-base/8 sm:text-sm/6 text-gray-300 hover:border-white/25 hover:text-white aria-[current=location]:text-blue-400 aria-[current=location]:font-semibold pl-5 sm:pl-4 aria-[current=location]:border-white`}
                      aria-current="none"
                    >
                      Singh
                    </p>
                  </li>
                  <li className="-ml-px flex flex-col items-start gap-2">
                    <p
                      className={`inline-block border-l border-transparent text-base/8 sm:text-sm/6 text-gray-300 hover:border-white/25 hover:text-white aria-[current=location]:text-blue-400 aria-[current=location]:font-semibold pl-5 sm:pl-4 aria-[current=location]:border-white`}
                      aria-current="none"
                    >
                      Khalsa
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainSection;
