
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { Download } from "lucide-react";

function LessonPDFExporter({ lesson }) {

  const printRef = useRef(null);

  // Track whether we are currently making the PDF (to disable the button / show a message)
  const [isDownloading, setIsDownloading] = useState(false);

  const safeLesson = lesson ? lesson : {};


  const title = safeLesson.title ? safeLesson.title : "Lesson";
  const objectives = safeLesson.objectives ? safeLesson.objectives : [];
  const content = safeLesson.content ? safeLesson.content : [];

  async function downloadPDF() {
    setIsDownloading(true);

    try {
   
      const canvas = await html2canvas(printRef.current, {
        scale: 2, // higher scale = sharper image
        backgroundColor: "#ffffff",
      });

      // Step 2: Turn the screenshot into an image
      const imageData = canvas.toDataURL("image/png");

      // Step 3: Create a new PDF (portrait, millimeters, A4 size)
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Scale the image so it fits the width of the PDF page
      const imageHeight = (canvas.height * pdfWidth) / canvas.width;

      // Step 4: Add the image to the PDF, adding extra pages if it's too tall
      let heightUsedSoFar = 0;

      pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, imageHeight);
      heightUsedSoFar += pdfHeight;

      while (heightUsedSoFar < imageHeight) {
        pdf.addPage();
    
        pdf.addImage(imageData, "PNG", 0, -heightUsedSoFar, pdfWidth, imageHeight);
        heightUsedSoFar += pdfHeight;
      }

      // Step 5: Save the file
      const fileName = title.replace(/\s+/g, "_") + ".pdf";
      pdf.save(fileName);
    } catch (error) {
      console.error("PDF export failed:", error);
      alert("Sorry, the PDF could not be created. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div>
      {/* Button the user clicks */}
      <button
        onClick={downloadPDF}
        disabled={isDownloading}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 18px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: isDownloading ? "#5b6a99" : "#0F1B3D",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: 600,
          cursor: isDownloading ? "not-allowed" : "pointer",
        }}
      >
        <Download size={16} />
        {isDownloading ? "Preparing PDF..." : "Download PDF"}
      </button>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: "-9999px",
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        <div
          ref={printRef}
          style={{
            width: "800px",
            padding: "40px",
            backgroundColor: "#ffffff",
            color: "#000000",
            fontFamily: "Georgia, serif",
          }}
        >
      
          {objectives.length > 0 && (
            <div style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "20px" }}>
              <p style={{ fontWeight: "bold", marginBottom: "6px" }}>Learning Objectives</p>
              {objectives.map((objective, index) => (
                <p key={index}>• {objective}</p>
              ))}
            </div>
          )}


          {content.map((block, index) => (
            <LessonBlock key={index} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
}


function LessonBlock({ block }) {
  if (block.type === "heading") {
    return <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>{block.text}</h2>;
  }

  if (block.type === "paragraph") {
    return <p style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "12px" }}>{block.text}</p>;
  }

  if (block.type === "code") {
    return (
      <pre
        style={{
          backgroundColor: "#f0f0f0",
          padding: "12px",
          borderRadius: "6px",
          fontFamily: "monospace",
          fontSize: "13px",
          marginBottom: "12px",
          whiteSpace: "pre-wrap",
        }}
      >
        {block.code}
      </pre>
    );
  }

  if (block.type === "mcq") {
  
    const options = block.options ? block.options : [];

    return (
      <div style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "12px" }}>
        <p style={{ fontWeight: "bold", marginBottom: "8px" }}>{block.question}</p>
        {options.map((option, index) => {
          const isCorrect = index === block.correctIndex;
          return (
            <p key={index} style={{ color: isCorrect ? "green" : "black" }}>
              {String.fromCharCode(65 + index)}. {option} {isCorrect ? "(correct)" : ""}
            </p>
          );
        })}
      </div>
    );
  }

  if (block.type === "video") {
    return <p style={{ marginBottom: "12px" }}>[Video — watch online]</p>;
  }

  return null;
}

export default LessonPDFExporter;