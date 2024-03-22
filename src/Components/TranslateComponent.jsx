import React, { useState } from "react";
import AWS from "aws-sdk";
import "./TranslateComponent.css";
// Configure AWS SDK
AWS.config.update({
  region: "us-west-2", // replace with your preferred AWS region
  accessKeyId: "AKIAQ4QBEDP6NZFZPOFG", // replace with your access key ID
  secretAccessKey: "GY7DhYZ4j0L3Q8udkiepaqAed7YG602sL8cVG1zu", // replace with your secret access key
});

const TranslateComponent = () => {
  const [textToTranslate, setTextToTranslate] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("hi"); // Default target language set to Telugu

  const translateText = async () => {
    const translate = new AWS.Translate();
    const params = {
      SourceLanguageCode: "auto",
      TargetLanguageCode: targetLanguage,
      Text: textToTranslate,
    };

    try {
      const response = await translate.translateText(params).promise();
      setTranslatedText(response.TranslatedText);
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  const handleLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
  };

  return (
    <div className="outerdiv">
      <h1>Solventek AI Translator</h1>
      <div>
        <textarea
          className="input"
          value={textToTranslate}
          onChange={(e) => setTextToTranslate(e.target.value)}
        />
      </div>

      <div>
        <select
          className="select"
          value={targetLanguage}
          onChange={handleLanguageChange}
        >
          <option value="hi">Hindi</option>
          <option value="te">Telugu</option>
          <option value="ta">Tamil</option>
          <option value="ml">Malayalam</option>
          <option value="en">English</option>
          <option value="kn">Kannada</option>
          <option value="mr">Marathi</option>
        </select>
      </div>

      <div>
        <button className="button" onClick={translateText}>
          Translate
        </button>
      </div>

      <div>
        <p className="translatedtext"> {translatedText}</p>
      </div>
    </div>
  );
};

export default TranslateComponent;
