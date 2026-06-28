import React from "react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { UserInputContext } from "../../Context/userInputcontext";

function TopicDescription() {
    const { userInput, setUserInput } = React.useContext(UserInputContext);
    const handleTopicChange = (field, value) => {
        setUserInput((prevInput) => ({
            ...(prevInput || {}),
            [field]: value,
        }));
    };

    const handleDescriptionChange = (field, value) => {
        setUserInput((prevInput) => ({
            ...(prevInput || {}),
            [field]: value,
        }));
    };

    return (
        <div
            style={{
                display: "grid",
                gap: "20px",
                width: "100%",
                maxWidth: "760px",
                margin: "0 auto",
                padding: "28px",
                borderRadius: "24px",
                border: "1px solid #e9d5ff",
                background: "rgba(255,255,255,0.85)",
                boxShadow: "0 18px 50px rgba(124,58,237,0.08)",
                textAlign: "left",
            }}
        >
            <div style={{ display: "grid", gap: "8px" }}>
                <label style={{ fontSize: "14px", fontWeight: 700, color: "#1f2937" }}>
                    Enter your topic
                </label>
                <Input
                    placeholder="Topic"
                    value={userInput?.topic || ""}
                    onChange={(e) => handleTopicChange("topic", e.target.value)}
                />
            </div>

            <div style={{ display: "grid", gap: "8px" }}>
                <label style={{ fontSize: "14px", fontWeight: 700, color: "#1f2937" }}>
                    Tell us more about what you want to include in the course
                </label>

                <Textarea
                    placeholder="Course description"
                    rows={6}
                    value={userInput?.description || ""}
                    onChange={(e) => handleDescriptionChange("description", e.target.value)}
                />
            </div>
        </div>
    )
}

export default TopicDescription;