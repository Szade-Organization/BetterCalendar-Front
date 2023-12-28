import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "../../styles/Layout.css";

const Layout = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleAccordion = (index) => {
    setActiveSection(index === activeSection ? null : index);
  };

  const sections = [
    {
      title: "Your week",
      content: "Your week dashboard here",
      color: "#CFF4D2",
    },
    { title: "Activities", content: "Calendar here", color: "#7BE495" },
    {
      title: "Statistics",
      content: "Statistics contents here",
      color: "#56C596",
    },
    {
      title: "AI Planner",
      content: "AI planner contents here",
      color: "#329D9C",
    },
    { title: "Settings", content: "Settings contents here", color: "#3C6C8E" },
  ];

  return (
    <div className="font-lato antialiased maximized">
      <ul className="flex min-h-screen max-h-screen overflow-hidden list-none">
        {sections.map((section, index) => (
          <li
            key={index}
            className={`flex-item flex-${index + 1} ${
              activeSection === index ? "active" : ""
            }`}
            style={{ background: section.color }}
            onClick={() => toggleAccordion(index)}
          >
            <div className="section-title">
              <h2>{section.title}</h2>
            </div>
            <div className="section-content">
              <p>{section.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Layout;
