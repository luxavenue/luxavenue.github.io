import React, { useState } from "react";
import DomesticCalculator from "./DomesticCalculator";
import OverseasCalculator from "./OverseasCalculator";

const CalculatorTabs = () => {
    const [activeTab, setActiveTab] = useState("domestic");

    return (
        <div className="calc-tabs">
            <div className="calc-tab-buttons">
                <button
                    className={activeTab === "domestic" ? "active" : ""}
                    onClick={() => setActiveTab("domestic")}
                >
                    국내 판매
                </button>
                <button
                    className={activeTab === "overseas" ? "active" : ""}
                    onClick={() => setActiveTab("overseas")}
                >
                    해외 판매
                </button>
            </div>

            <div className="calc-tab-content">
                {activeTab === "domestic" && <DomesticCalculator />}
                {activeTab === "overseas" && <OverseasCalculator />}
            </div>
        </div>
    );
};

export default CalculatorTabs;
