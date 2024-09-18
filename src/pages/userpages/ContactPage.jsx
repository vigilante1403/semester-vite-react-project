import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [tag1, setTag1] = useState("chooseValue");
  const [tag2, setTag2] = useState(null);
  const [isTag2Added, setIsTag2Added] = useState(false);
  const [selectedTag, setSelectedTag] = useState("tag1"); // Xác định tag nào đang được chọn

  const handleSelectChange = (event) => {
    if (selectedTag === "tag2") {
      setTag2(event.target.value); // Gán giá trị cho tag2 nếu tag2 được chọn
    } else {
      setTag1(event.target.value); // Gán giá trị cho tag1 nếu tag1 được chọn
    }
  };

  const handleAddTag2 = () => {
    setIsTag2Added(true);
    setTag2("chooseValue"); // Thiết lập giá trị mặc định cho tag2
  };

  const handleRemoveTag1 = () => {
    setTag1("chooseValue"); // Đặt lại giá trị của tag1 về "chooseValue"
  };

  const handleRemoveTag2 = () => {
    setIsTag2Added(false); // Xóa bỏ tag2
    setTag2(null); // Đặt lại giá trị của tag2 về null
  };

  return (
    <div>
      {/* Select cho tag1 và tag2 */}
      <select value={selectedTag === "tag2" ? tag2 : tag1} onChange={handleSelectChange}>
        <option value="chooseValue">Choose a value</option>
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
        <option value="d">D</option>
      </select>

      {/* Hiển thị button thêm tag2 khi tag1 có giá trị khác chooseValue */}
      {tag1 !== "chooseValue" && !isTag2Added && (
        <button onClick={handleAddTag2}>Add tag2</button>
      )}

      {/* Hiển thị giá trị của tag1 với nút xóa */}
      <div style={{ marginTop: "10px" }}>
        {/* Khi nhấn vào tag1 thì select sẽ gán giá trị cho tag1 */}
        <div
          style={{
            display: "inline-block",
            marginRight: "10px",
            cursor: "pointer",
            border: selectedTag === "tag1" ? "2px solid blue" : "none",
          }}
          onClick={() => setSelectedTag("tag1")}
        >
          <span>Tag1: {tag1}</span>
          <button
            onClick={handleRemoveTag1}
            style={{
              marginLeft: "10px",
              cursor: "pointer",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              textAlign: "center",
            }}
          >
            x
          </button>
        </div>

        {/* Hiển thị giá trị của tag2 với nút xóa */}
        {isTag2Added && (
          <div
            style={{
              display: "inline-block",
              cursor: "pointer",
              border: selectedTag === "tag2" ? "2px solid blue" : "none",
            }}
            onClick={() => setSelectedTag("tag2")}
          >
            <span>Tag2: {tag2}</span>
            <button
              onClick={handleRemoveTag2}
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                textAlign: "center",
              }}
            >
              x
            </button>
          </div>
        )}
      </div>
    </div>
  );
}