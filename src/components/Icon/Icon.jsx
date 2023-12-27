import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";

const Icon = ({ type }) => {
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    const iconPath = `../../icons/${type}.svg`;

    const fetchIcon = async () => {
      try {
        const response = await fetch(iconPath);
        if (response.ok) {
          const svgText = await response.text();
          setSvgContent(svgText);
        } else {
          console.log("Icon not found");
        }
      } catch (error) {
        console.error("Error fetching icon:", error);
      }
    };

    fetchIcon();
  }, [type]);

  const sanitizedSvgContent = DOMPurify.sanitize(svgContent);

  return (
    <div className="flex items-center justify-center">
      {svgContent ? (
        <span dangerouslySetInnerHTML={{ __html: sanitizedSvgContent }} />
      ) : (
        <span className="text-red-500">Icon not found</span>
      )}
    </div>
  );
};

export default Icon;
