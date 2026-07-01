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
        <div className="cc-topic-container">
            <div className="cc-topic-field">
                <label className="cc-topic-label">
                    ✏️ Enter your topic
                </label>
                <p className="cc-topic-hint">What subject would you like to create a course about?</p>
                <Input
                    placeholder="e.g. Python Programming, Digital Marketing, Machine Learning..."
                    value={userInput?.topic || ""}
                    onChange={(e) => handleTopicChange("topic", e.target.value)}
                    className="cc-topic-input"
                />
            </div>

            <div className="cc-topic-field">
                <label className="cc-topic-label">
                    📝 Tell us more about your course
                </label>
                <p className="cc-topic-hint">Describe what you'd like to cover. The more detail, the better the AI output.</p>
                <Textarea
                    placeholder="Describe the key topics, target audience, learning goals..."
                    rows={6}
                    value={userInput?.description || ""}
                    onChange={(e) => handleDescriptionChange("description", e.target.value)}
                    className="cc-topic-textarea"
                />
            </div>
        </div>
    )
}

export default TopicDescription;