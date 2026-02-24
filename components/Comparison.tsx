
import React, { useState, useRef, useCallback, useEffect } from 'react';

interface StyleOption {
  name: string;
  description: string;
  afterId: string;
}

interface LocationRoom {
  title: string;
  roomName: string;
  subtitle: string;
  location: string;
  beforeId: string;
  styles: StyleOption[];
  isPortrait?: boolean;
}

const hotelData: LocationRoom[] = [
  {
    title: "Spanish Switzerland",
    roomName: "Epicurean Hall / Ресторан",
    location: "Costa Brava, S'Agaró",
    subtitle: "Гастрономическая сцена",
    beforeId: "1FVao-OXMvJsSjtdHq3yOnjzuLXToZmMe",
    isPortrait: true,
    styles: [
      { 
        name: "Горный Шале", 
        description: "Архитектурная мощь: открытые балки из темного дерева, уют натуральных шкур и монументальный камин. Люстры из рогов создают атмосферу элитарного альпийского клуба.",
        afterId: "1IFeVRfY7QfLUVwoeF_TG-2HNLryonqhQ" 
      },
      { 
        name: "Йога Ретрит", 
        description: "Изысканный Бохо без лишнего шума. Благородное сочетание оливковых стеновых панелей и глубокой бордово-красной мебели. Пространство для внутренней тишины.",
        afterId: "118f7dQMM_gqyzawouo2kgRMtoMN2VgMs" 
      },
      { 
        name: "Пансионат", 
        description: "Легкий Прованс в современном прочтении. Природная симфония белого, голубого и зеленого. Свежесть морского бриза и уют загородного поместья.",
        afterId: "1v-Zh8qcULSqCplr99t3uIao9wy8gBNLJ" 
      }
    ]
  },
  {
    title: "Spanish Switzerland",
    roomName: "Oasis of Meetings / Оазис встреч",
    location: "Costa Brava, S'Agaró",
    subtitle: "Архитектура перспективы",
    beforeId: "1urtxpeI-HD7sMdJiDB7j4AjpBxZlvwiy",
    isPortrait: true,
    styles: [
      { 
        name: "Горный Шале", 
        description: "Масштаб потолочных конструкций и грубое дерево. Мягкий свет камина создает обволакивающее чувство защищенности и тепла высокогорных резиденций.",
        afterId: "1Pmy_8H_w_5UNZibiKoaEy5dnu8CvxtvU" 
      },
      { 
        name: "Йога Ретрит", 
        description: "Гармония в деталях. Бордовые акценты мебели на фоне оливковой перспективы задают ритм пространства, настраивая на спокойный диалог.",
        afterId: "1oaTUX169qb_OCZIc8DmBwGlEvQYXy4_f" 
      },
      { 
        name: "Пансионат", 
        description: "Воздушный объем главного зала. Чистота белых поверхностей и свежесть лазурных оттенков превращают пространство в залитую светом веранду.",
        afterId: "1Fxt_fUN1FB1wmy7e0rzRbxqvk2NaAZz4" 
      }
    ]
  },
  {
    title: "Spanish Switzerland",
    roomName: "Lobby / Welcome Zone",
    location: "Costa Brava, S'Agaró",
    subtitle: "Портал приветствия",
    beforeId: "1kOaE5MrdLV_dZssRDld0okC24FJLmwfZ",
    isPortrait: true,
    styles: [
      { 
        name: "Горный Шале", 
        description: "Встреча в стиле альпийской резиденции. Массивное дерево, каменные акценты и приглушенный теплый свет формируют статус объекта с первого шага.",
        afterId: "1n9_Em2KjrNhCA-wxtCRYs5WaBZwEsv86" 
      },
      { 
        name: "Йога Ретрит", 
        description: "Мягкий вход в пространство тишины. Солнечные и теплые оттенки, обилие зелени и чистота линий настраивают на моментальную релаксацию при заезде.",
        afterId: "16MYqopWWJAXvkscCzzDQxFYdDubbyrv4" 
      },
      { 
        name: "Пансионат", 
        description: "Аристократичное гостеприимство. Светлые стены, классический ритм и свежие лазурные акценты создают атмосферу легкости и безупречного сервиса.",
        afterId: "1KROV0f3hSnmsQA3C3C35t00h2Ii1XRTR" 
      }
    ]
  },
  {
    title: "Spanish Switzerland",
    roomName: "Soul Haven / Гостиная",
    location: "Costa Brava, S'Agaró",
    subtitle: "Сердце дома",
    beforeId: "1Wkk09tMegE_0VYC1Kkk3v74KaQbyoGpT",
    isPortrait: true,
    styles: [
      { 
        name: "Горный Шале", 
        description: "Благородная эстетика: светло-оливковая обшивка стен в тандеме с сияющими золотистыми балками. Кирпичные диваны и люстры в стиле шале создают атмосферу векового достоинства.",
        afterId:  "1WbN1MOYMdhppy5KBqbi1_guLWBnGOSju"
      },
      { 
        name: "Йога Ретрит", 
        description: "Бохо-свобода: тепло персиковых стен и балки из натурального дерева. Бирюзово-кирпичный декор и паркет «елочкой» наполняют гостиную живой энергией и солнцем.",
        afterId: "1uKxRlEl62DcnPUSb6BHqLqYvsEC1RSz2" 
      },
      { 
        name: "Пансионат", 
        description: "Легкий Прованс: нежно-оливковые стены и жемчужно-бежевые диваны. Белая люстра с розовыми цветами и светлое дерево на полу создают атмосферу весеннего сада.",
        afterId: "19qSyvxN-Sq8hg1qCF2UWqNuk3zqLeUx-" 
      }
    ]
  },
  {
    title: "Private Zone",
    roomName: "Grand Master Suite / Мастер-спальня",
    subtitle: "Обитель покоя",
    location: "Spanish Residence",
    beforeId: "1MPNhtTdc_baKyXaJxBPuEBPG27hXXYui",
    isPortrait: true,
    styles: [
      { 
        name: "Горный Шале", 
        description: "Архитектурная тишина: стены теплого жемчужно-серого оттенка в сочетании с мебелью из золотистого дерева. Благородная «елочка» паркета, люстры из рогов и мягкие шкуры создают атмосферу элитарного альпийского уединения.", 
        afterId: "1NFmsOb5Rt7geb9vQr1sA2lAZOCQmY0pE" 
      },
      { 
        name: "Йога Ретрит", 
        description: "Солнечная медитация: нежные персиковых стены наполняют комнату теплом, а бирюзово-кирпичные акценты в стиле Бохо добавляют живой энергии. Золотистое дерево мебели и паркета создают пространство для глубокой релаксации.", 
        afterId: "1uDkA39NMDRMEKAjbaCOLC-VqSYxCpYvs" 
      },
      { 
        name: "Пансионат", 
        description: "Утро в Провансе: изысканные лавандовые стены и небесно-голубая мебель дарят ощущение свежести. Белое изголовье кровати и изящная люстра подчеркивают легкость, а паркет «елочкой» завершает аристократичный образ.", 
        afterId: "1skQWkbjqGn079ML315X_0GBMUUVyI99Y" 
      }
    ]
  },
  {
    title: "Private Zone",
    roomName: "Private Quarters / Приватная спальня",
    subtitle: "Территория ясности",
    location: "Spanish Residence",
    beforeId: "1BhueUPzeXqKmxOIQNCMPyh9LfHy7GN4W",
    isPortrait: true,
    styles: [
      { 
        name: "Горный Шале", 
        description: "Архитектурный уют: стены благородного тепло-серого оттенка в тандеме с серо-оливковой мебелью. Массивное изголовье из золотистого дерева, люстры из рогов и мягкие шкуры создают атмосферу защищенного горного приюта.", 
        afterId: "1wDW1N5_bT6WMXkP91bI0uXdJSO6mbkCN" 
      },
      { 
        name: "Йога Ретрит", 
        description: "Энергия рассвета: стены в солнечных персиковых тонах наполняют пространство теплом. Золотистое дерево изголовья и светло-серая мебель гармонируют с декором Бохо, создавая оазис для внутренней гармонии.", 
        afterId: "1AqldqTguFMTeyTiNWQ7vl3yK2VqobKeg" 
      },
      { 
        name: "Пансионат", 
        description: "Оливковая свежесть: нежные оливковые стены и светло-серая мебель дарят ощущение аристократичного покоя. Изящная белая люстра наполняет комнату воздухом, а натуральная паркетная «елочка» подчеркивает чистоту стиля.", 
        afterId: "1E6SejgFH3Wgq5xvxGSSCejvRs9k5BtAe" 
      }
    ]
  },
  {
    title: "Private Zone",
    roomName: "Morning Suite / Утренняя спальня",
    subtitle: "Пробуждение красоты",
    location: "Spanish Residence",
    beforeId: "1iyACJv8ITqS0oa3HtuKRSpTdLCBvVHk5",
    isPortrait: true,
    styles: [
      { 
        name: "Горный Шале", 
        description: "Утро в вершинах: стены теплого светло-серого оттенка и массивная мебель из темного состаренного дерева создают чувство надежности. Люстры из рогов, фактурные шкуры и паркетная «елочка» превращают пробуждение в ритуал силы.", 
        afterId: "1CcEnsM-v-4EFZpr_ZNki16p0n-84Knet" 
      },
      { 
        name: "Йога Ретрит", 
        description: "Солнечный портал: стены в персиковых тонах аккумулируют свет, а натуральное дерево с природной текстурой дарит тактильное наслаждение. Декор Бохо в бирюзово-кирпичных тонах наполняет комнату энергией жизни.", 
        afterId: "1LZOjGhhVRqd65l1dvisMTF0jVPqZ45nS" 
      },
      { 
        name: "Пансионат", 
        description: "Розовый сад: нежные стены цвета пыльной розы и белоснежная мебель создают атмосферу абсолютной легкости. Бирюзово-оливковые акценты в текстиле и изящная белая люстра превращают спальню в воплощение романтичного Прованса.", 
        afterId: "1Oi87kgM_dg9Tew0AblfFs6WuVZiGkHuQ" 
      }
    ]
  },
  {
    title: "Wet Zone",
    roomName: "Prime Wellness / Главная ванная",
    subtitle: "Энергия воды",
    location: "Spanish Residence",
    beforeId: "1DSEBJ1AVI_EZz3TXFr7OcOeUaoSzOq3W",
    isPortrait: true,
    styles: [
      { 
        name: "Горный Шале", 
        description: "Альпийское спа: золотистое тепло дерева и фактурная стена из плитки под дуб гармонируют с благородной оливковой «елочкой». Медный светильник и живая зелень создают атмосферу уединенного велнес-курорта в горах.", 
        afterId: "1sjZR6wexV7V_6B6Y40_vakX8DWpYCDmp" 
      },
      { 
        name: "Йога Ретрит", 
        description: "Бохо-оазис: теплые древесные тона плитки в сочетании с оливковой керамикой и плетением. Изобилие декора Бохо, суккуленты в глине и мягкий свет превращают ванную комнату в пространство для медитации и обновления.", 
        afterId: "1-_C4W8vS7evBWOam7Z2Zve5kDFuGy6qN" 
      },
      { 
        name: "Пансионат", 
        description: "Французское изящество: чистота белой плитки и мебели под большой раковиной подчеркнута обрамлением, зеркал и картин, из натурального дерева. Живые цветы и весенняя свежесть создают атмосферу беззаботного утра в Провансе.", 
        afterId: "1zPiUC6_euwzRGdiYGOyix-_oMEvLMQp1" 
      }
    ]
  },
  {
    title: "Wet Zone",
    roomName: "Guest Bathroom / Гостевой санузел",
    subtitle: "Эстетика заботы",
    location: "Spanish Residence",
    beforeId: "1cltnTAJ7qT7KrF3zPsYr6MavqO6Ro25z",
    isPortrait: true,
    styles: [
      { 
        name: "Горный Шале", 
        description: "Альпийская эстетика: тумба из золотистого дерева и стены из плитки под светлый дуб идеально дополнены благородной оливковой «елочкой». Медный светильник в ретро-стиле и живая зелень создают атмосферу статусного загородного уюта.", 
        afterId: "14fP-lKZMuNixxc9EE52ZHX_eDLOG09mS" 
      },
      { 
        name: "Йога Ретрит", 
        description: "Бохо-релаксация: тепло золотистой мебели и фактура светлого дерева встречаются с ритмичной оливковой плиткой. Светильник и богатый декор в стиле Бохо вместе с суккулентами в глине превращают санузел в оазис спокойствия.", 
        afterId: "1Dem3EOzKTm3T8gfBcXnePp3rNnhEHgn-" 
      },
      { 
        name: "Пансионат", 
        description: "Французский шик: безупречная белизна стен эффектно контрастирует с оливковой «елочкой». Зеркала и картин, в обрамлении рам из натурального дерева, подчеркнуты декором из живых цветов в серебряных ведерках.", 
        afterId: "1jqxhSwzq-i7-F36OQzlQrwcdGRhqnQzP" 
      }
    ]
  }
];

export const Comparison: React.FC = () => {
  const [locIdx, setLocIdx] = useState(0);
  const [styleIdx, setStyleIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isChanging, setIsChanging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLoc = hotelData[locIdx] || hotelData[0];
  const currentStyle = currentLoc.styles[styleIdx] || currentLoc.styles[0];

  // OPTIMIZATION: Reduced image size to 1200 for faster loading and smoother rendering
  const getImgUrl = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1200&v=32`;

  useEffect(() => {
    const preload = (url: string) => {
      const img = new Image();
      img.src = url;
    };
    
    // Preload current style after images
    currentLoc.styles.forEach(s => preload(getImgUrl(s.afterId)));
    
    // Preload next location images aggressively
    if (locIdx + 1 < hotelData.length) {
      preload(getImgUrl(hotelData[locIdx + 1].beforeId));
      hotelData[locIdx + 1].styles.forEach(s => preload(getImgUrl(s.afterId)));
    }
  }, [locIdx, currentLoc.styles]);

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(position, 0), 100));
  }, []);

  const changeLocation = (idx: number) => {
    if (idx === locIdx) return;
    setIsChanging(true);
    // Faster transition for location change
    const timer = setTimeout(() => {
      setLocIdx(idx);
      setStyleIdx(0);
      setSliderPos(50);
      setIsChanging(false);
    }, 100);
    return () => clearTimeout(timer);
  };

  const changeStyle = (idx: number) => {
    if (idx === styleIdx) return;
    // OPTIMIZATION: No artificial delay for style changes, make it feel instant
    setStyleIdx(idx);
  };

  return (
    <section id="transformation" className="pt-24 pb-12 md:pt-32 md:pb-20 bg-[#041a16] relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16 md:mb-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-end">
          <div className="lg:w-1/2">
            <span className="text-[#ffcc00] text-[10px] font-black tracking-[0.6em] uppercase mb-4 block">Методология VedArta</span>
            <h2 className="text-4xl md:text-6xl font-serif italic text-[#f5f5dc] leading-tight">
              Инструмент <br /> <span className="text-[#ffcc00]">предвосхищения</span>
            </h2>
          </div>
          <div className="lg:w-1/2">
            <div className="border-l border-[#ffcc00] pl-8 space-y-6">
              <p className="text-[#f5f5dc]/80 text-lg font-light leading-relaxed italic">
                Как увидеть будущее до начала работ! Мы разработали интерактивный метод моделирования. В качестве примера мы представляем <span className="text-[#ffcc00] font-medium italic">"реальные кейсы трансформации"</span>. Выбирайте разные зоны и стили проекта <span className="text-white font-medium italic">"Spanish Switzerland"</span>.
              </p>
              <div className="space-y-3">
                <p className="text-[10px] text-[#ffcc00] font-black uppercase tracking-[0.3em]">Навигация по объекту:</p>
                <ul className="text-[13px] text-[#f5f5dc]/50 space-y-2 font-medium tracking-wide">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#ffcc00] rounded-full shadow-[0_0_8px_#ffcc00]"></span> Слева: Выбор точки обзора объекта</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#ffcc00] rounded-full shadow-[0_0_8px_#ffcc00]"></span> В центре: Смена концептуальной палитры</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#ffcc00] rounded-full shadow-[0_0_8px_#ffcc00]"></span> На фото: Интерактивный слайдер "До/После"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-white/[0.02] border border-white/5 p-6 md:p-12 rounded-sm shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="lg:w-1/3 space-y-8 md:space-y-12">
              <div className="space-y-4">
                <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest border-b border-white/5 pb-2">1. Выбор ракурса:</p>
                <div className="flex flex-col gap-2 max-h-[450px] overflow-y-auto custom-scrollbar pr-2">
                  {hotelData.map((room, idx) => (
                    <button
                      key={idx}
                      onClick={() => changeLocation(idx)}
                      className={`text-left px-5 py-4 transition-all text-[11px] font-black uppercase tracking-widest border-l-2 ${locIdx === idx ? 'bg-[#ffcc00]/10 text-[#ffcc00] border-[#ffcc00]' : 'text-white/30 border-transparent hover:text-white/60'}`}
                    >
                      {room.roomName}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest border-b border-white/5 pb-2">2. Концептуальный стиль:</p>
                <div className="grid grid-cols-1 gap-3">
                  {currentLoc.styles.map((style, idx) => (
                    <button
                      key={idx}
                      onClick={() => changeStyle(idx)}
                      className={`block w-full text-left px-5 py-4 md:px-8 md:py-5 transition-all border text-[10px] font-black uppercase tracking-widest ${styleIdx === idx ? 'bg-[#ffcc00] text-[#041a16] border-[#ffcc00] shadow-lg' : 'border-white/10 text-white/40 hover:border-white/20'}`}
                    >
                      {style.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={`lg:w-2/3 w-full flex flex-col justify-center transition-all duration-300 ${isChanging ? 'opacity-40' : 'opacity-100'}`}>
              <div className="relative p-3 md:p-4 border border-[#ffcc00]/30 bg-black shadow-[0_50px_100px_rgba(0,0,0,0.8)] rounded-sm group overflow-hidden">
                <div className="absolute inset-1.5 md:inset-2.5 border border-[#ffcc00]/10 group-hover:border-[#ffcc00]/30 transition-all duration-700 pointer-events-none z-30"></div>
                
                <div 
                  ref={containerRef}
                  className={`relative ${currentLoc.isPortrait ? 'aspect-[3/4] max-w-[500px] mx-auto' : 'aspect-[16/10]'} w-full cursor-col-resize select-none overflow-hidden rounded-sm bg-black touch-none transition-transform duration-700`}
                  onMouseMove={handleMove}
                  onTouchMove={handleMove}
                >
                  {/* AFTER IMAGE */}
                  <div className="absolute inset-0">
                    <img src={getImgUrl(currentStyle.afterId)} alt="After" className="w-full h-full object-cover" loading="eager" />
                  </div>
                  
                  {/* BEFORE IMAGE (SLIDER) */}
                  <div 
                    className="absolute inset-0 z-10" 
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                  >
                    <img src={getImgUrl(currentLoc.beforeId)} alt="Before" className="w-full h-full object-cover grayscale-[0.1]" loading="eager" />
                  </div>

                  {/* SLIDER HANDLE */}
                  <div 
                    className="absolute inset-y-0 z-20 w-[1px] bg-[#ffcc00] flex items-center justify-center shadow-[0_0_20px_#ffcc00] pointer-events-none" 
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#ffcc00]/50 bg-[#041a16]/95 text-[#ffcc00] flex items-center justify-center shadow-2xl -ml-[0.5px] backdrop-blur-md">
                       <div className="flex gap-1">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                          </svg>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                  <div className="w-12 h-px bg-[#ffcc00]"></div>
                  <p className="text-[#ffcc00] text-[10px] font-black uppercase tracking-[0.5em]">{currentLoc.subtitle}</p>
                </div>
                <div className="min-h-[80px]">
                  <p className="text-[#f5f5dc] text-xl md:text-2xl font-serif italic leading-relaxed max-w-2xl animate-fade-in" key={currentStyle.name}>
                    {currentStyle.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ffcc00; border-radius: 10px; }
      `}</style>
    </section>
  );
};
