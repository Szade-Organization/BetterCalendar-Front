import  { useState } from "react";
import "../../styles/Layout.css";
import BetterCalendar from "../../components/BetterCalendar/BetterCalendar";
import Statistics from "../../components/Statistics/Statistics";

const AccordionLayout = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleAccordion = (index) => {
    setActiveSection(index);
  };

  const sections = [
    {
      title: "Your week",
      content: "Your week contents here",
      color: "#CFF4D2",
    },
    {
      title: "Activities",
      content: <BetterCalendar />,
      color: "#7BE495",
    },
    {
      title: "Statistics",
      content: <Statistics />,
      color: "#56C596",
    },
    {
      title: "AI Planner",
      content: "AI planner contents here",
      color: "#329D9C",
    },
    {
      title: "Settings",
      content: "Settings contents here",
      color: "#3C6C8E",
    },
  ];

  return (
    <div className="font-lato antialiased maximized">
      <ul className="flex flex-row min-h-screen max-h-screen m-0 p-0 overflow-hidden list-none">
        {sections.map((section, index) => (
          <li
            key={index}
            className={`flex-item cursor-pointer transition-flex duration-800 ease bg-activitycolor overflow-hidden flex-${
              index + 1
            } ${activeSection === index ? "active" : ""}`}
            style={{ background: section.color }}
            onClick={() => toggleAccordion(index)}
          >
            <div className="section-title flex items-center justify-center m-5 p-0 text-center text-black font-Arial text-2xl max-w-25">
              <h2 className="m-auto transform -rotate-90 whitespace-nowrap text-4xl font-bold">
                {section.title}
              </h2>
            </div>
            <div className="section-content flex items-center justify-center m-0 p-0 opacity-0 transition-all duration-250 delay-100 ease-out overflow-hidden">
              <div className="w-5/6">{section.content}</div>
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default AccordionLayout;
