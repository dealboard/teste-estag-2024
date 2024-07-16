"use client";

import { useEffect, useState } from "react";

const items = [
  {
    id: 1,
    name: "Ball",
    lang: "en",
    path: "/static/ball.jpg"
  },
  {
    id: 3,
    name: "Peão",
    lang: "pt",
    path: "/static/peao.jpg"
  },
  {
    id: 4,
    name: "Scissor",
    lang: "en",
    path: "/static/scissor.jpg"
  },
  {
    id: 5,
    name: "Caixa",
    lang: "en",
    path: "/static/caixa.jpg"
  },
  {
    id: 2,
    name: "Dado",
    lang: "pt",
    path: "/static/ball.jpg"
  },
];

const langs = [
  {
    code: "pt",
    tag: "Português"
  }, 
  {
    code: "en",
    tag: "English"
  }];

export default function Home() {
  const [filteredItems, setFilteredItems] = useState(items); // na prática: filteredItems = items
  const [filterLangs, setFilterLangs] = useState(langs.map(e => e.code)); // na prática: filterLangs = langs
  const [showMenu, setShowMenu] = useState(true); // na prática: showMenu = true

  useEffect(() => {
    // toda vez que a variável filterLangs for alterada, executa esse bloco de código
    setFilteredItems(items.filter((x) => showMenu && filterLangs.includes(x.lang))); 
    // na prática: filteredItems = items.filter((x) => showMenu && filterLangs.includes(x.lang))
  }, [filterLangs, showMenu]);

  const clickLang = (l: string) => {
    const newFilterLangs = filterLangs.includes(l)
      ? filterLangs.filter((x) => x !== l)
      : filterLangs.concat([l]);
    setFilterLangs([...newFilterLangs]); // na prática: filterLangs = [...newFilterLangs]
  };

  const clickMenu = () => {
    setShowMenu(showMenu); // na prática: showMenu = showMenu
  };

  return (
    <main>
      <nav className="relative flex items-center flex-col w-full bg-slate-600 py-3 h-16">
        <button className="absolute top-1/4 left-4 w-32 font-bold border-2" onClick={clickMenu}>
          {showMenu ? "Ver menu" : "Esconder menu"}
        </button>
        <h1 className="text-3xl font-bold">Objetos no quarto</h1>
      </nav>
      <div className="flex">
        {showMenu ? (
          <div className="pl-2 w-[20%] bg-slate-500 pt-2 fixed h-full">
            <h2 className="text-xl font-bold">FiItros</h2>
            <div className="ml-2">
              <p>ldioma</p>
              <div className="flex flex-col w-28">
                {langs.map((l, i) => {
                  return (
                    <button
                      key={i}
                      onClick={() => clickLang(l.code)}
                      className="mr-1 mt-1 bg-slate-500 py-1 px-2 rounded-sm border-2"
                    >
                      {l.tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={"w-full h-[calc(100vh-4rem)] " + (showMenu ? "ml-[21.5%]" : "ml-[1.5%]")} >
          <div className="grid grid-cols-3 gap-y-8 mt-5">
            {filteredItems.map((item) => {
              return (
                <div key={item.id} className="w-[300px] h-[240px] rounded-lg p-3 bg-contain" style={{backgroundImage: `url('${item.path}')`}}>
                  <p className="bg-gradient-to-r from-slate-500 to-transparent w-full px-3 py-[1px]">{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

