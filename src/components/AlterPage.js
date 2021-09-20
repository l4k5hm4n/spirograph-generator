import React, { useState, useEffect, useRef, createRef } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import "../style/style.css";
import "../style/alterPage.css";
function AlterPage({
  callChangeDisplay,
  alterFValue,
  alterMValue,
  alterNValue,
  alterScaleValue,
  alterStrokeWidthValue,
  alterColorValue,
  visible,
}) {
  const fValueProgressBar = useRef();
  const mValueProgressBar = useRef();
  const nValueProgressBar = useRef();
  const scaleValueProgressBar = useRef();
  const strokeWidthValueProgressBar = useRef();

  const [activeParameter, setActiveParameter] = useState("config");

  const [fValue, setFValue] = useState(alterFValue);
  const [mValue, setMValue] = useState(alterMValue);
  const [nValue, setNValue] = useState(alterNValue);
  const [scaleValue, setScaleValue] = useState(alterScaleValue);
  const [strokeWidthValue, setStrokeWidthValue] = useState(
    alterStrokeWidthValue
  );
  const [colorValue, setColorValue] = useState(alterColorValue);
  const [color, setColor] = useState("");
  const [sliderInputFValue, setSliderInputFValue] = useState(alterFValue);
  const [sliderInputMValue, setSliderInputMValue] = useState(alterMValue);
  const [tempMValue, setTempMValue] = useState(alterMValue);
  const [sliderInputNValue, setSliderInputNValue] = useState(alterNValue);
  const [sliderInputScaleValue, setSliderInputScaleValue] =
    useState(alterScaleValue);
  const [tempScaleValue, setTempScaleValue] = useState(alterScaleValue);
  const [sliderInputStrokeWidthValue, setSliderInputStrokeWidthValue] =
    useState(alterStrokeWidthValue);

  const toggleParameters = (parameter) => {
    setActiveParameter(parameter);
  };
  function slope(inputStart, inputEnd, outputStart, outputEnd) {
    return (outputEnd - outputStart) / (inputEnd - inputStart);
  }
  function round(p1) {
    return Math.floor(p1 + 0.5);
  }
  useEffect(() => {
    callChangeDisplay(
      fValue,
      mValue,
      nValue,
      scaleValue,
      strokeWidthValue,
      color
    );
    setSliderInputFValue(fValue);
    setSliderInputNValue(nValue);
    setSliderInputStrokeWidthValue(strokeWidthValue);
  }, [fValue, mValue, nValue, scaleValue, strokeWidthValue, color]);

  // useEffect(() => {
  //   setColorValue(color);
  //   // setSliderInputFValue(fValue);
  //   // setSliderInputNValue(nValue);
  //   // setSliderInputStrokeWidthValue(strokeWidthValue);

  //   console.log('dff color', fValue, mValue, nValue, scaleValue, strokeWidthValue, colorValue, color)

  // }, [color]);

  useEffect(() => {
    setTempMValue(sliderInputMValue);
    setTempScaleValue(sliderInputScaleValue);
  }, [sliderInputMValue, , sliderInputScaleValue]);

  useEffect(() => {
    if (visible) {
      setActiveParameter("config");
    }
  }, [visible]);

  useEffect(() => {
    setFValue(alterFValue);
    setMValue(alterMValue);
    setSliderInputMValue(
      round(((alterMValue - 15) * (100 - 1)) / (100 - 15) + 1)
    );
    setNValue(alterNValue);
    setScaleValue(alterScaleValue);
    setStrokeWidthValue(alterStrokeWidthValue);
    // setColor(alterColorValue);
    setColorValue(alterColorValue);
  }, [
    alterFValue,
    alterMValue,
    alterNValue,
    alterScaleValue,
    alterStrokeWidthValue,
    alterColorValue,
  ]);

  return (
    <div className="alterPage">
      <div className="tabs">
        <div
          id="parameters"
          className={`tab ${activeParameter === "config" ? "activeTab" : null}`}
          onClick={() => {
            toggleParameters("config");
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 14V16H6V14H0ZM0 2V4H10V2H0ZM10 18V16H18V14H10V12H8V18H10ZM4 6V8H0V10H4V12H6V6H4ZM18 10V8H8V10H18ZM12 6H14V4H18V2H14V0H12V6Z"
              fill="white"
            />
          </svg>
        </div>
        <div
          id="colorPalette"
          className={`tab ${activeParameter === "color" ? "activeTab" : null}`}
          onClick={() => toggleParameters("color")}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5 9C14.1022 9 13.7206 8.84196 13.4393 8.56066C13.158 8.27936 13 7.89782 13 7.5C13 7.10218 13.158 6.72064 13.4393 6.43934C13.7206 6.15804 14.1022 6 14.5 6C14.8978 6 15.2794 6.15804 15.5607 6.43934C15.842 6.72064 16 7.10218 16 7.5C16 7.89782 15.842 8.27936 15.5607 8.56066C15.2794 8.84196 14.8978 9 14.5 9ZM11.5 5C11.1022 5 10.7206 4.84196 10.4393 4.56066C10.158 4.27936 10 3.89782 10 3.5C10 3.10218 10.158 2.72064 10.4393 2.43934C10.7206 2.15804 11.1022 2 11.5 2C11.8978 2 12.2794 2.15804 12.5607 2.43934C12.842 2.72064 13 3.10218 13 3.5C13 3.89782 12.842 4.27936 12.5607 4.56066C12.2794 4.84196 11.8978 5 11.5 5ZM6.5 5C6.10218 5 5.72064 4.84196 5.43934 4.56066C5.15804 4.27936 5 3.89782 5 3.5C5 3.10218 5.15804 2.72064 5.43934 2.43934C5.72064 2.15804 6.10218 2 6.5 2C6.89782 2 7.27936 2.15804 7.56066 2.43934C7.84196 2.72064 8 3.10218 8 3.5C8 3.89782 7.84196 4.27936 7.56066 4.56066C7.27936 4.84196 6.89782 5 6.5 5ZM3.5 9C3.10218 9 2.72064 8.84196 2.43934 8.56066C2.15804 8.27936 2 7.89782 2 7.5C2 7.10218 2.15804 6.72064 2.43934 6.43934C2.72064 6.15804 3.10218 6 3.5 6C3.89782 6 4.27936 6.15804 4.56066 6.43934C4.84196 6.72064 5 7.10218 5 7.5C5 7.89782 4.84196 8.27936 4.56066 8.56066C4.27936 8.84196 3.89782 9 3.5 9ZM9 0C6.61305 0 4.32387 0.948211 2.63604 2.63604C0.948211 4.32387 0 6.61305 0 9C0 11.3869 0.948211 13.6761 2.63604 15.364C4.32387 17.0518 6.61305 18 9 18C9.39782 18 9.77936 17.842 10.0607 17.5607C10.342 17.2794 10.5 16.8978 10.5 16.5C10.5 16.11 10.35 15.76 10.11 15.5C9.88 15.23 9.73 14.88 9.73 14.5C9.73 14.1022 9.88804 13.7206 10.1693 13.4393C10.4506 13.158 10.8322 13 11.23 13H13C14.3261 13 15.5979 12.4732 16.5355 11.5355C17.4732 10.5979 18 9.32608 18 8C18 3.58 13.97 0 9 0Z"
              fill="white"
            />
          </svg>
        </div>
        <div
          id="strokeWidthSelector"
          className={`tab ${activeParameter === "stroke" ? "activeTab" : null}`}
          onClick={() => toggleParameters("stroke")}
        >
          <svg
            width="20"
            height="15"
            viewBox="0 0 20 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="20" height="1" fill="white" />
            <rect y="4" width="20" height="3" fill="white" />
            <rect y="10" width="20" height="5" fill="white" />
          </svg>
        </div>
      </div>
      <div id="alterTab">
        {activeParameter === "config" && (
          <div id="parametersTab">
            <div>
              <div className="inputContainer">
                <div className="sliderInputBgd">
                  <input
                    id="fValueInput"
                    className="range"
                    type="range"
                    min="-2"
                    max="2"
                    step="0.1"
                    value={fValue}
                    onChange={(e) => {
                      fValueProgressBar.current.style.width =
                        ((parseFloat(e.target.value) + 2) / 4) * 100 + "%";
                      setFValue(e.target.value);
                      if (e.target.value == 2) {
                        fValueProgressBar.current.style.borderRadius = "4px";
                      } else {
                        fValueProgressBar.current.style.borderRadius =
                          "4px 0 0 4px";
                      }
                    }}
                  ></input>
                </div>
                <div
                  className="progressBar"
                  ref={fValueProgressBar}
                  style={{
                    width: ((parseFloat(fValue) + 2) / 4) * 100 + "%",
                    borderRadius: fValue < 2 ? "4px 0 0 4px" : "4px",
                  }}
                ></div>
              </div>
              <div className="sliderInfo">
                <div className="sliderName">
                  <p>Ratio</p>
                  <div
                    className="infoHover"
                    data-tooltip="Ratio defines how far each loop, of the spirograph, reaches out."
                  >
                    <p>i</p>
                  </div>
                </div>
                <div className="sliderInfoValue">
                  <input
                    type="number"
                    min="-2"
                    max="2"
                    value={sliderInputFValue}
                    onChange={(e) => {
                      if (e.target.value.length <= 4) {
                        setSliderInputFValue(e.target.value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (e.target.value > 2) {
                          setSliderInputFValue(2);
                          setFValue(2);
                        } else if (e.target.value < -2) {
                          setSliderInputFValue(-2);
                          setFValue(-2);
                        } else {
                          var temp = Math.round(e.target.value * 10) / 10;
                          setSliderInputFValue(temp);
                          setFValue(temp);
                        }
                      }
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div>
              <div className="inputContainer">
                <div className="sliderInputBgd">
                  <input
                    id="mValueInput"
                    className="range"
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={sliderInputMValue}
                    onChange={(e) => {
                      mValueProgressBar.current.style.width =
                        Math.floor(
                          ((parseFloat(e.target.value) - 1) / 99) * 100
                        ) + "%";
                      setSliderInputMValue(e.target.value);
                      setMValue(
                        15 +
                          round(slope(1, 100, 15, 100) * (e.target.value - 1))
                      );
                      if (e.target.value == 100) {
                        mValueProgressBar.current.style.borderRadius = "4px";
                      } else {
                        mValueProgressBar.current.style.borderRadius =
                          "4px 0 0 4px";
                      }
                    }}
                  ></input>
                </div>

                <div
                  className="progressBar"
                  ref={mValueProgressBar}
                  style={{
                    width:
                      Math.floor(
                        ((parseFloat(sliderInputMValue) - 1) / 99) * 100
                      ) + "%",
                    borderRadius:
                      sliderInputMValue === 100 ? "4px" : "4px 0 0 4px",
                  }}
                ></div>
              </div>
              <div className="sliderInfo">
                <div className="sliderName">
                  <p>Outer Diameter</p>
                  <div
                    className="infoHover"
                    data-tooltip="The ratio between the Inner and Outer Diameters defines how many loops will be created."
                  >
                    <p>i</p>
                  </div>
                </div>
                <div className="sliderInfoValue">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={tempMValue}
                    onChange={(e) => {
                      if (e.target.value.length <= 3) {
                        setTempMValue(e.target.value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (e.target.value > 100) {
                          setTempMValue(100);
                          setSliderInputMValue(100);
                          setMValue(
                            15 + round(slope(1, 100, 15, 100) * (100 - 1))
                          );
                        } else if (e.target.value < 1) {
                          setTempMValue(1);
                          setSliderInputMValue(1);
                          setMValue(15);
                        } else {
                          var temp = Math.round(e.target.value);
                          setTempMValue(temp);
                          setSliderInputMValue(temp);
                          setMValue(
                            15 + round(slope(1, 100, 15, 100) * (temp - 1))
                          );
                        }
                      }
                    }}
                  ></input>
                  <span>%</span>
                </div>
              </div>
            </div>
            <div>
              <div className="inputContainer">
                <div className="sliderInputBgd">
                  <input
                    id="nValueInput"
                    className="range"
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={nValue}
                    onChange={(e) => {
                      nValueProgressBar.current.style.width =
                        Math.floor(
                          ((parseFloat(e.target.value) - 1) / 99) * 100
                        ) + "%";
                      setNValue(e.target.value);
                      if (e.target.value == 100) {
                        nValueProgressBar.current.style.borderRadius = "4px";
                      } else {
                        nValueProgressBar.current.style.borderRadius =
                          "4px 0 0 4px";
                      }
                    }}
                  ></input>
                </div>
                <div
                  className="progressBar"
                  ref={nValueProgressBar}
                  style={{
                    width:
                      Math.floor(((parseFloat(nValue) - 1) / 99) * 100) + "%",
                    borderRadius: nValue < 100 ? "4px 0 0 4px" : "4px",
                  }}
                ></div>
              </div>
              <div className="sliderInfo">
                <div className="sliderName">
                  <p>Inner Diameter</p>
                  <div
                    className="infoHover"
                    data-tooltip="The ratio between the Inner and Outer Diameters defines how many loops will be created."
                  >
                    <p>i</p>
                  </div>
                </div>
                <div className="sliderInfoValue">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={sliderInputNValue}
                    onChange={(e) => {
                      if (e.target.value.length <= 3) {
                        setSliderInputNValue(e.target.value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (e.target.value > 100) {
                          setSliderInputNValue(100);
                          setNValue(100);
                        } else if (e.target.value < 1) {
                          setSliderInputNValue(1);
                          setNValue(1);
                        } else {
                          var temp = Math.round(e.target.value);
                          setSliderInputNValue(temp);
                          setNValue(temp);
                        }
                      }
                    }}
                  ></input>
                  <span>%</span>
                </div>
              </div>
            </div>
            <div>
              <div className="inputContainer">
                <div className="sliderInputBgd">
                  <input
                    id="scaleValueInput"
                    className="range"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={sliderInputScaleValue}
                    onChange={(e) => {
                      scaleValueProgressBar.current.style.width =
                        Math.floor(
                          ((parseFloat(e.target.value) - 0) / 100) * 100
                        ) + "%";
                      setSliderInputScaleValue(e.target.value);
                      setScaleValue(
                        round(slope(0, 100, 20, 120) * (e.target.value - 0))
                      );
                      if (e.target.value == 100) {
                        scaleValueProgressBar.current.style.borderRadius =
                          "4px";
                      } else {
                        scaleValueProgressBar.current.style.borderRadius =
                          "4px 0 0 4px";
                      }
                    }}
                  ></input>
                </div>
                <div
                  className="progressBar"
                  ref={scaleValueProgressBar}
                  style={{
                    width:
                      Math.floor(
                        (parseFloat(sliderInputScaleValue) / 100) * 100
                      ) + "%",
                    borderRadius:
                      sliderInputScaleValue === 100 ? "4px" : "4px 0 0 4px",
                  }}
                ></div>
              </div>
              <div className="sliderInfo">
                <div className="sliderName">
                  <p>Scale</p>
                  <div
                    className="infoHover"
                    data-tooltip="Scale defines how large or small the final spirograph will be."
                  >
                    <p>i</p>
                  </div>
                </div>
                <div className="sliderInfoValue">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={tempScaleValue}
                    onChange={(e) => {
                      if (e.target.value.length <= 3) {
                        setTempScaleValue(e.target.value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (e.target.value > 100) {
                          setTempScaleValue(100);
                          setSliderInputScaleValue(100);
                          setScaleValue(
                            20 + round(slope(0, 100, 20, 100) * (100 - 0))
                          );
                        } else if (e.target.value < 0) {
                          setTempScaleValue(0);
                          setSliderInputScaleValue(0);
                          setScaleValue(20);
                        } else {
                          var temp = Math.round(e.target.value);
                          setTempScaleValue(temp);
                          setSliderInputScaleValue(temp);
                          setScaleValue(
                            20 + round(slope(0, 100, 20, 100) * (temp - 0))
                          );
                        }
                      }
                    }}
                  ></input>
                  <span>%</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeParameter === "color" && (
          <div id="colorPaletteTab">
            <div id="colorPicker">
              <HexColorPicker color={color} onChange={setColor} />
            </div>
            <div className="colorPickerInput">
              <HexColorInput color={color} onChange={setColor} prefixed alpha />
            </div>
          </div>
        )}
        {activeParameter === "stroke" && (
          <React.Fragment>
            <div className="inputContainer">
              <div className="sliderInputBgd">
                <input
                  id="strokeWidthValueInput"
                  className="range"
                  type="range"
                  min="0.02"
                  max="2"
                  step="0.02"
                  value={strokeWidthValue}
                  onChange={(e) => {
                    strokeWidthValueProgressBar.current.style.width =
                      Math.floor(
                        ((parseFloat(e.target.value) - 0.02) / 1.98) * 100
                      ) + "%";
                    setStrokeWidthValue(e.target.value);
                    if (e.target.value == 2) {
                      strokeWidthValueProgressBar.current.style.borderRadius =
                        "4px";
                    } else {
                      strokeWidthValueProgressBar.current.style.borderRadius =
                        "4px 0 0 4px";
                    }
                  }}
                ></input>
              </div>
              <div
                className="progressBar"
                ref={strokeWidthValueProgressBar}
                style={{
                  width:
                    Math.floor(
                      ((parseFloat(strokeWidthValue) - 0.02) / 1.98) * 100
                    ) + "%",
                  borderRadius: strokeWidthValue < 2 ? "4px 0 0 4px" : "4px",
                }}
              ></div>
            </div>
            <div className="sliderInfo">
              <div className="sliderName">
                <p>Stroke Width</p>
                <div
                  className="infoHover"
                  data-tooltip="Stroke Width defines the width of the spirograph line."
                >
                  <p>i</p>
                </div>
              </div>
              <div className="sliderInfoValue">
                <input
                  type="number"
                  value={sliderInputStrokeWidthValue}
                  onChange={(e) => {
                    if (e.target.value.length <= 4) {
                      setSliderInputStrokeWidthValue(e.target.value);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (e.target.value > 2) {
                        setSliderInputStrokeWidthValue(2);
                        setStrokeWidthValue(2);
                      } else if (e.target.value < 0.02) {
                        setSliderInputStrokeWidthValue(0.02);
                        setStrokeWidthValue(0.02);
                      } else {
                        var temp = Math.round(e.target.value * 50) / 50;
                        setSliderInputStrokeWidthValue(temp);
                        setStrokeWidthValue(temp);
                      }
                    }
                  }}
                ></input>
                <span>px</span>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default AlterPage;
