import { useRef, useState, useEffect } from "react";
import {historyData} from "./historyData";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

export default function TimeLine() {

  // 현재 선택된 연도, 이전 선택 연도
  const [selectedYear, setSelectedYear] = useState("2024");
  const [prevSelectedYear, setPrevSelectedYear] = useState("2024");
  const yearRefs = useRef({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 이미지 인덱스 초기화
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedYear]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.2;
      let closestYear = selectedYear;
      let minDistance = Infinity;

      Object.entries(yearRefs.current).forEach(([year, ref]) => {
        if (ref) {
          const box = ref.getBoundingClientRect();
          const offset = box.top + window.scrollY;
          const distance = Math.abs(scrollPosition - offset);

          if (distance < minDistance) {
            minDistance = distance;
            closestYear = year;
          }
        }
      });

      setPrevSelectedYear(selectedYear);
      setSelectedYear(closestYear);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [selectedYear]);

  return (
    <div>
      {/*상단 연도 인덱스*/}
      <div className="w-full sticky top-0 bg-white">
        <div
          className={"container mx-auto flex justify-center items-start py-24"}
        >
          {Object.keys(historyData)
            .sort((a, b) => b - a)
            .map((year) => (
              <div className={"flex flex-col items-center"} key={year}>
                <button
                  className={`px-6 py-2 ${
                    selectedYear === year
                      ? "font-bold text-black"
                      : "text-gray-500"
                  }`}
                  onClick={() => {
                    yearRefs.current[year].scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  {year}
                </button>
                {selectedYear === year && (
                  <div className={"w-1 h-1 bg-black rounded-full"}></div>
                )}
              </div>
            ))}
        </div>
      </div>

      {/*연도별 내용*/}
      <div className={"flex w-[1400px]"}>

        {/*이미지 섹션*/}
        <div className={"sticky top-[25vh] w-[600px] h-[640px] overflow-hidden flex justify-center items-center"}>
          <FaChevronCircleLeft
            className={"absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl cursor-pointer"}
            onClick={() => {
              setCurrentImageIndex((prevIndex) => (prevIndex - 1 + historyData[selectedYear].images.length) % historyData[selectedYear].images.length);
            }}
            style={{zIndex: 100}}
          />
          {Object.keys(historyData).map((year) => (
            <div
              key={year}
              className={
                "w-full flex flex-col justify-center gap-2 top-0 object-cover transition-transform duration-500 ease-in-out"
              }
              style={{
                transform:
                  selectedYear > year
                    ? "translateY(200%)"
                    : selectedYear < year
                    ? "translateY(-200%)"
                    : "translateY(0)",
                opacity:
                  selectedYear === year ? 1 : 0,
                zIndex:
                  selectedYear === year
                    ? 20
                    : prevSelectedYear === year
                    ? 10
                    : 0,
                position: "absolute",
                transition:
                  "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
                scrollbarWidth: "none",
              }}
            >
              {Object.keys(historyData[year].images).map((index) => (
                <div
                  className={"top-1/2 absolute w-full h-[600px] flex flex-col gap-8 justify-center items-center"}
                  key={index}
                  style={{
                    transform:
                      currentImageIndex === Number(index)
                        ? "translateX(0)"
                    :Number(index) === 0 && currentImageIndex === 1
                      ? "translateX(-200%)"
                      : Number(index) === 0
                        ? "translateX(200%)"
                        : currentImageIndex > Number(index) || (currentImageIndex === 0 && Number(index) === historyData[year].images.length - 1)
                          ? "translateX(-200%)"
                          : "translateX(200%)",
                    opacity: currentImageIndex === Number(index) ? 1 : 0,
                    transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
                  }}
                >
                    <img
                      key={`${year}_${index}_1`}
                      className={`w-[430px] ${historyData[year].images[index][0].includes("patent")?"h-[600px]":"h-[240px]"} shadow-xl rounded-xl border-gray-200 object-cover`}
                      src={historyData[year].images[index][0]}
                      alt={`Image ${index}`}
                    />
                  {historyData[year].images[index].length > 1 && (
                    <img
                      key={`${year}_${index}_2`}
                      className={`w-[430px] h-[240px] shadow-xl rounded-xl border-gray-200 object-cover`}
                      src={historyData[year].images[index][1]}
                      alt={`Image ${index}`}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}

          <FaChevronCircleRight
            className={"absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl cursor-pointer"}
            onClick={() => {
              setCurrentImageIndex((prevIndex) => (prevIndex + 1) % historyData[selectedYear].images.length);
            }}
            style={{zIndex: 100}}
          />

        </div>

        {/*내용*/}
        <div className={"flex flex-col mx-12 border-t-2 border-black"}>
          {Object.entries(historyData)
            .sort(([a], [b]) => b - a)
            .map(([year, data]) => (
              <div
                key={year}
                ref={(el) => (yearRefs.current[year] = el)}
                data-year={year}
                style={{ scrollMarginTop: "25vh" }}
                className={"flex justify-start border-b-[1px] px-12 py-12"}
              >
                <h2 className={"text-[50px] font-semibold px-10"}>{year}</h2>
                <ul>
                  {data.events.map((event, index) => (
                    <li key={index} className="mt-2 mb-2 ml-12">
                      {event}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          <div className="h-[400px]"></div>
        </div>
      </div>
    </div>
  );
}
