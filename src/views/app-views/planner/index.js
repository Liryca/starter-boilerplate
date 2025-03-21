import React, { useState } from "react";
import { saveAs } from "file-saver";
import { v4 as uuidv4 } from "uuid";
import ObjectList from "./components/ObjectList";
import Board from "./components/Board";
import { Button, Row, Col, Input, Space, Upload } from "antd";

import {
  UploadOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons";

const Planner = () => {
  const [objects, setObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);

  const handleAddObject = (object) => {
    const newObject = {
      ...object,
      id: uuidv4(),
      x: 100,
      y: 100,
      angle: 0,
      height: 100,
      width: 100,
      layer: 1,
    };
    setObjects([...objects, newObject]);
  };

  const handleMoveObject = (id, x, y) => {
    setObjects((prevObjects) =>
      prevObjects.map((obj) => (obj.id === id ? { ...obj, x, y } : obj))
    );
  };

  const handleRotateObject = (id, delta) => {
    setObjects((prevObjects) =>
      prevObjects.map((obj) =>
        obj.id === id ? { ...obj, angle: (obj.angle || 0) + delta } : obj
      )
    );
  };

  const handleSaveLayout = () => {
    const data = JSON.stringify(objects);
    const blob = new Blob([data], { type: "application/json" });
    saveAs(blob, "layout.json");
  };

  const handleLoadLayout = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);
      setObjects(data);
    };
    reader.readAsText(file);
    return false;
  };

  const handleDeleteObject = (id) => {
    setObjects(objects.filter((obj) => obj.id !== id));
    setSelectedObject(null);
  };

  const handleDeleteAll = () => {
    setObjects([]);
    setSelectedObject(null);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <ObjectList onAddObject={handleAddObject} />
          <div style={{ marginTop: "16px" }}>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSaveLayout}
              block
            >
              Сохранить
            </Button>
            <Upload
              beforeUpload={handleLoadLayout}
              showUploadList={false}
              style={{ marginTop: "8px" }}
            >
              <Button icon={<UploadOutlined />} block>
                Загрузить
              </Button>
            </Upload>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={handleDeleteAll}
              block
              style={{ marginTop: "8px" }}
            >
              Удалить все
            </Button>
            {selectedObject && (
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteObject(selectedObject.id)}
                block
                style={{ marginTop: "8px" }}
              >
                Удалить элемент
              </Button>
            )}
          </div>
          {selectedObject && (
            <div style={{ marginTop: "16px" }}>
              <h3>Параметры элемента</h3>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Input addonBefore="X" value={selectedObject.x} readOnly />
                <Input addonBefore="Y" value={selectedObject.y} readOnly />
                <Input
                  addonBefore="Угол"
                  value={selectedObject.angle}
                  readOnly
                />
                <Input
                  addonBefore="Высота"
                  value={selectedObject.height}
                  readOnly
                />
                <Input
                  addonBefore="Ширина"
                  value={selectedObject.width}
                  readOnly
                />
                <Input
                  addonBefore="Слой"
                  value={selectedObject.layer}
                  readOnly
                />
              </Space>
            </div>
          )}
        </Col>
        <Col span={18}>
          <Board
            objects={objects}
            onMoveObject={handleMoveObject}
            onRotateObject={handleRotateObject}
            onSelectObject={setSelectedObject}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Planner;
